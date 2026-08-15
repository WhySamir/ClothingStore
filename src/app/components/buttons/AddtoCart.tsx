"use client";

import { useState } from "react";
import { AddToCartToast } from "../Toast";
import { useProductImage } from "@/app/ProductImageContext";
import { useAuth } from "@/app/auth-context";
import {
  useAddToCartMutation,
  useGetCartQuery,
} from "@/redux/modules/cart/cart.api";
import { toast } from "react-toastify";

interface sizeType {
  id: string;
  name: string;
}
interface colorType {
  idx: number;
  id: string;
  name: string;
}

const AddtoCart = ({
  color,
  size,
  productCart,
  quantity,
}: {
  color: colorType;
  size: sizeType;
  productCart: { id: string; name: string; price: string | number };
  quantity: number;
}) => {
  const { user } = useAuth();
  const [showToast, setShowToast] = useState(false);

  // RTK Query: fetch cart to get current item count
  const { data: cartItems = [] } = useGetCartQuery(undefined, {
    skip: !user,
  });
  const bagCount = cartItems.reduce(
    (sum: number, item: any) => sum + item.itemQty,
    0,
  );

  // RTK Query mutation
  const [addToCart, { isLoading: loading }] = useAddToCartMutation();

  const handleAddToCart = async () => {
    if (!user) {
      alert("Please login before adding to cart");
      setShowToast(false);
      return;
    }
    try {
      await addToCart({
        productId: productCart.id,
        colorId: color.id,
        sizeId: size.id,
        itemQty: Number(quantity),
      }).unwrap();

      setShowToast(true);
    } catch (error: any) {
      const message = error?.data?.message || error?.message;
      if (message && message.toLowerCase().includes("already in cart")) {
        toast.info("Item already in cart");
      } else {
        toast.error(message || "Failed to add to cart");
      }
    }
  };

  const { mainImgUrl, images } = useProductImage();
  let image = "";
  if (color.idx === 0) {
    image = mainImgUrl ?? "";
  } else image = images[color.idx - 1];

  if (!mainImgUrl) return <p>Loading...</p>;
  return (
    <>
      <button
        onClick={handleAddToCart}
        disabled={loading}
        className="bg-orange-950 cursor-pointer text-white py-2 px-5 md:px-8 disabled:opacity-60"
      >
        {loading ? "Adding..." : "Add To Cart"}
      </button>
      <AddToCartToast
        isOpen={showToast}
        onClose={() => setShowToast(false)}
        color={color}
        size={size}
        product={productCart}
        image={image}
        bagCount={bagCount}
        type="Cart"
      />
    </>
  );
};

export default AddtoCart;
