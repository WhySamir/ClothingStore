"use client";
import { useState } from "react";
import { AddToCartToast } from "../Toast";
import { useProductImage } from "@/app/ProductImageContext";
import { useAuth } from "@/app/auth-context";
import Cart from "@/app/api/cart/cart";

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
  const [loading, setLoading] = useState(false);

  // useEffect(() => {
  const addToCart = async () => {
    if (!user) {
      alert("Please login before adding to card");
      setShowToast(false);
      return;
    }
    try {
      setLoading(true);

      const payload = {
        productId: productCart.id,
        colorId: color.id,
        sizeId: size.id,
        itemQty: Number(quantity),
      };
      const data = Cart.addToCart(payload);

      setShowToast(true);

      console.log("Response:", data);
    } catch (error) {
      console.error("Error adding to cart:", error);
    } finally {
      setLoading(false);
    }
  };

  // addToCart();
  // }, []);

  const { mainImgUrl, images } = useProductImage();
  let image = "";
  if (color.idx === 0) {
    image = mainImgUrl ?? "";
  } else image = images[color.idx - 1];

  if (!mainImgUrl) return <p>Loading...</p>;
  return (
    <>
      <button
        onClick={addToCart}
        className="bg-orange-950 cursor-pointer text-white py-2  px-5 md:px-8"
      >
        Add To Cart
      </button>
      <AddToCartToast
        isOpen={showToast}
        onClose={() => setShowToast(false)}
        color={color}
        size={size}
        product={productCart}
        image={image}
        bagCount={3}
        type="Cart"
      />
    </>
  );
};

export default AddtoCart;
