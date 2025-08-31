"use client";

import { useState } from "react";

import {
  Star,
  Heart,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
} from "lucide-react";
import AddtoCart from "@/app/components/buttons/AddtoCart";
import { ItemsAddDel } from "@/app/components/buttons/ItemsAddDel";
import { updateQty } from "@/redux/AddtoCart/CartSlice";
import { useDispatch } from "react-redux";

export default function ProductDetails({ productId }: { productId: string }) {
  const [selectedColor, setSelectedColor] = useState({
    name: "brown",
    borderClass: "amber-800",
  });
  const dispatch = useDispatch();

  const [selectedSize, setSelectedSize] = useState("XXL");
  const [quantity, setQuantity] = useState(4);

  const colors = [
    { name: "brown", class: "amber-800" },
    { name: "gray", class: "gray-400" },
    { name: "teal", class: "teal-600" },
    { name: "red", class: "red-600" },
    { name: "blue", class: "blue-600" },
  ];

  const sizes = ["S", "M", "L", "XL", "XXL", "XXXL"];
  const handleQuantityChange = (productId: string, newQty: number) => {
    setQuantity(newQty);
    dispatch(updateQty({ id: productId, itemQty: newQty }));
  };

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm text-gray-600 my-2">Coats</p>
        <h1 className="text-3xl font-semibold text-gray-900 mb-4">
          Trendy Brown Coat
        </h1>

        {/* Rating */}
        <div className="flex items-center gap-2 mb-4">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className="w-5 h-5 fill-yellow-400 text-yellow-400"
              />
            ))}
          </div>
          <span className="text-sm font-medium tracking-wider">
            4.8 (241 Review)
          </span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-3 mb-6">
          <span className="text-3xl font-semibold text-gray-900">$75.00</span>
          <span className="text-xl text-gray-500 line-through">$150.00</span>
        </div>

        {/* Description */}
        <p className="text-gray-600 mb-6">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
      </div>

      {/* Color Selection */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <span className="font-medium">Color :</span>
          <span className="capitalize">{selectedColor.name}</span>
        </div>
        <div className="flex gap-2">
          {colors.map((color) => (
            <button
              key={color.name}
              onClick={() =>
                setSelectedColor({
                  name: color.name,
                  borderClass: color.class,
                })
              }
              className={`w-8 h-8 flex items-center justify-center rounded-full   border-2  ${
                selectedColor.name === color.name
                  ? `border-${color.class}`
                  : "border-gray-200"
              }`}
            >
              <div
                className={`color w-6 h-6 rounded-full flex items-center justify-center bg-${color.class} `}
              ></div>
            </button>
          ))}
        </div>
      </div>

      {/* Size Selection */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <span className="font-medium">Size :</span>
          <span>{selectedSize}</span>
        </div>
        <div className="flex gap-2 mb-2 w-full flex-wrap">
          {sizes.map((size) => (
            <button
              key={size}
              onClick={() => setSelectedSize(size)}
              className={`px-4 py-2 border rounded-md ${
                selectedSize === size
                  ? "bg-yellow-200 border border-yellow-200  text-black"
                  : "border-gray-300 hover:border-gray-400"
              }`}
            >
              {size}
            </button>
          ))}
        </div>
        <button className="text-sm text-gray-600 underline">
          View Size Guide
        </button>
      </div>

      {/* Clear and Stock Status */}
      <div className="flex gap-2">
        <button className="bg-gray-100">Clear ×</button>
        <button className="bg-green-100 text-green-800">In Stock</button>
      </div>

      {/* Quantity and Actions */}
      <div className="flex-wrap flex flex-col md:flex-row  md:items-center gap-4">
        <ItemsAddDel
          id={productId}
          value={quantity}
          onChange={(id: string, qty: number) => handleQuantityChange(id, qty)}
        />
        <AddtoCart />

        <button className="bg-yellow-400 border border-yellow-400  py-2 text-black px-8">
          Buy Now
        </button>

        <button>
          <Heart className="w-5 h-5" />
        </button>
      </div>

      {/* Product Info */}
      <div className="space-y-2 pt-6 border-t">
        <div className="flex gap-2">
          <span className="font-medium">SKU :</span>
          <span className="text-gray-600">GHFT95245AAA</span>
        </div>
        <div className="flex gap-2">
          <span className="font-medium">Tags :</span>
          <span className="text-gray-600">Women, Coat, Fashion, Jacket</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-medium">Share :</span>
          <div className="flex gap-2">
            <Facebook className="w-5 h-5 text-gray-600 hover:text-blue-600 cursor-pointer" />
            <Instagram className="w-5 h-5 text-gray-600 hover:text-pink-600 cursor-pointer" />
            <Linkedin className="w-5 h-5 text-gray-600 hover:text-blue-700 cursor-pointer" />
            <Twitter className="w-5 h-5 text-gray-600 hover:text-blue-400 cursor-pointer" />
          </div>
        </div>
      </div>
    </div>
  );
}
