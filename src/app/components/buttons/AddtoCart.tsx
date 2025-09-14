"use client";
import { useState } from "react";
import { AddToCartToast } from "../Toast";

const sampleProduct = {
  name: "Nike Run Defy",
  category: "Men's Road Running Shoes",
  size: "Size 9",
  price: "$60",
  image: "/nike-running-shoe.jpg",
};

const AddtoCart = () => {
  const [showToast, setShowToast] = useState(false);
  const handleAddToCart = () => {
    setShowToast(true);
  };

  return (
    <>
      <button
        onClick={handleAddToCart}
        className="bg-orange-950 text-white py-2  px-5 md:px-8"
      >
        Add To Cart
      </button>
      <AddToCartToast
        isOpen={showToast}
        onClose={() => setShowToast(false)}
        product={sampleProduct}
        bagCount={3}
        type="Cart"
      />
    </>
  );
};

export default AddtoCart;
