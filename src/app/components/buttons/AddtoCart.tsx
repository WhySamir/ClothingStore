"use client";
import { useEffect, useState } from "react";
import { AddToCartToast } from "../Toast";
import { useParams } from "next/navigation";
import { useProductImage } from "@/app/ProductImageContext";

//productid bata images liyera au
//then for the color only index ani size line

//nono simply make backend from productId

const sampleProduct = {
  name: "Nike Run Defy",
  category: "Men's Road Running Shoes",
  size: "Size 9",
  price: "$60",
  image: "/nike-running-shoe.jpg",
};
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
  const [showToast, setShowToast] = useState(false);
  const [loading, setLoading] = useState(false);

  // useEffect(() => {
  const addToCart = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId: productCart.id,
          colorId: color.id,
          sizeId: size.id,
          itemQty: quantity,
        }),
      });

      const data = await res.json();
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
        className="bg-orange-950 text-white py-2  px-5 md:px-8"
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
