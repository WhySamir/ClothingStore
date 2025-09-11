"use client";

import { useEffect, useState } from "react";

import { Star } from "lucide-react";
import AddtoCart from "@/app/components/buttons/AddtoCart";
import { ItemsAddDel } from "@/app/components/buttons/ItemsAddDel";
import { updateQty } from "@/redux/AddtoCart/CartSlice";
import { useDispatch } from "react-redux";
import { useParams } from "next/navigation";
import { ProductDetailsType } from "@/types/productDetailsType";
import { AddToWishlistButton } from "@/app/components/buttons/AddtoWishlist";

export default function ProductDetails() {
  const { productId } = useParams<{ productId: string }>();
  const [product, setProduct] = useState<ProductDetailsType | null>(null);

  useEffect(() => {
    if (!productId) return;

    const fetchProductDesc = async () => {
      const res = await fetch(`/api/products/${productId}/productdetails`);
      if (!res.ok) throw new Error("Failed to fetch  product details");
      const { data }: { data: ProductDetailsType } = await res.json();
      setProduct(data);
    };

    fetchProductDesc();
  }, [productId]);

  const [selectedColor, setSelectedColor] = useState({
    name: product?.colors[0]?.color,
    borderClass: product?.colors[0]?.hexCode,
  });
  const dispatch = useDispatch();

  const [selectedSize, setSelectedSize] = useState("XL");
  const [quantity, setQuantity] = useState(1);

  const sizes = ["S", "M", "L", "XL", "XXL"];
  const handleQuantityChange = (productId: string, newQty: number) => {
    setQuantity(newQty);
    dispatch(updateQty({ id: productId, itemQty: newQty }));
  };

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm text-gray-600 my-2">
          {product?.tags.map((tag) => tag.name).join(" ")}
        </p>
        <h1 className="text-3xl font-semibold text-gray-900 mb-4">
          {product?.name}
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
            {product?.reviews.length} Reviews
          </span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-3 mb-6">
          <span className="text-3xl font-semibold text-gray-900">
            ${(Number(product?.sellingPrice) + 0).toFixed(2)}
          </span>
          <span className="text-xl text-gray-500 line-through">
            ${(Number(product?.sellingPrice) + 25).toFixed(2)}
          </span>
        </div>

        {/* Description */}
        <p className="text-gray-600 mb-6  line-clamp-2">
          {product?.description}
        </p>
      </div>

      {/* Color Selection */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <span className="font-medium">Color :</span>
          <span className="capitalize">{selectedColor.name}</span>
        </div>
        <div className="flex gap-2">
          {product?.colors.map((color) => (
            <button
              key={color.hexCode}
              onClick={() =>
                setSelectedColor({
                  name: color.color,
                  borderClass: color.hexCode,
                })
              }
              className={`w-8 h-8 flex items-center justify-center rounded-full   border-2  ${
                selectedColor.name === color.color
                  ? `border-${color.hexCode}`
                  : "border-gray-200"
              }`}
            >
              <div
                style={{ backgroundColor: color.hexCode }}
                className={`color w-6 h-6 rounded-full flex items-center justify-center } `}
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
        {product && product.stockQty <= 1 ? (
          <button className="bg-red-400 px-2 text-black-800">
            Out of Stock
          </button>
        ) : (
          <button className="bg-green-100 px-2 text-green-800">In Stock</button>
        )}
      </div>

      {/* Quantity and Actions */}
      <div className="flex-wrap flex flex-col md:flex-row  md:items-center gap-4">
        <ItemsAddDel
          id={productId}
          value={quantity}
          onChange={(id: string, qty: number) => handleQuantityChange(id, qty)}
        />
        <AddtoCart />

        <button className="bg-yellow-200 border border-yellow-200  py-2 text-black px-8">
          Buy Now
        </button>

        {product && <AddToWishlistButton productId={product.id} />}
      </div>

      {/* Product Info */}
      <div className="space-y-2 pt-6 border-t">
        <div className="flex gap-2">
          <span className="font-medium">SKU :</span>
          <span className="text-gray-600">{product?.id}</span>
        </div>
        <div className="flex gap-2">
          <span className="font-medium">Tags :</span>
          <span className="text-gray-600">
            {product?.features.map((feature) => feature.value).join(", ")}
          </span>
        </div>
        {/* <div className="flex items-center gap-2">
          <span className="font-medium">Share :</span>
          <div className="flex gap-2">
            <Facebook className="w-5 h-5 text-gray-600 hover:text-blue-600 cursor-pointer" />
            <Instagram className="w-5 h-5 text-gray-600 hover:text-pink-600 cursor-pointer" />
            <Linkedin className="w-5 h-5 text-gray-600 hover:text-blue-700 cursor-pointer" />
            <Twitter className="w-5 h-5 text-gray-600 hover:text-blue-400 cursor-pointer" />
          </div>
        </div> */}
      </div>
    </div>
  );
}
