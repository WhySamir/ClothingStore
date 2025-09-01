"use client";

import { useState } from "react";
import { Product } from "./productcard/productType";
import ProductCard from "./productcard/ProductCard";

const products: Product[] = [
  {
    id: 1,
    name: "Trendy Brown Coat",
    category: "Coats",
    price: 75.0,
    originalPrice: 150.0,
    discount: 50,
    rating: 4.8,
    image: "/fourbyfive.png",
    hasCountdown: true,
  },
  {
    id: 2,
    name: "Classy Light Coat",
    category: "Coats",
    price: 165.0,
    originalPrice: 220.0,
    discount: 25,
    rating: 4.9,
    image: "/coat.png",
  },
  {
    id: 3,
    name: "Modern Brown Dress",
    category: "Dresses",
    price: 90.0,
    originalPrice: 100.0,
    discount: 10,
    rating: 4.8,
    image: "/coat.png",
  },
  {
    id: 4,
    name: "Modern Black Dress",
    category: "Dresses",
    price: 75.0,
    originalPrice: 100.0,
    discount: 25,
    rating: 4.7,
    image: "/coat.png",
  },
  {
    id: 5,
    name: "Modern Black Dress",
    category: "Dresses",
    price: 75.0,
    originalPrice: 100.0,
    discount: 25,
    rating: 4.7,
    image: "/coat.png",
  },
  {
    id: 6,
    name: "Modern Black Dress",
    category: "Dresses",
    price: 75.0,
    originalPrice: 100.0,
    discount: 25,
    rating: 4.7,
    image: "/coat.png",
  },
];

const categories = ["All", "Women", "Men"];

function ProductShowcase() {
  const [activeCategory, setActiveCategory] = useState("All");

  return (
    <div className=" h-full w-full  text-black  md:pt-[10vh]">
      <div className=" w-full xl:max-w-[90vw] ml-auto px-4 xl:px-0 md:py-8">
        {/* Header */}
        <div className="mb-8">
          <p className="text-gray-600 mb-2">Our Products</p>
          <h1 className="text-4xl font-bold text-gray-900 mb-8">
            Our Top Seller Products
          </h1>

          {/* Category Filters */}
          <div className="flex gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                  activeCategory === category
                    ? "bg-orange-800 text-white hover:bg-orange-700"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid */}
        <ProductGrid />
      </div>
    </div>
  );
}

function ProductGrid() {
  return (
    <div className="pt-6 w-full ">
      <div className="flex gap-4 overflow-x-auto custom-scrollbar">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

export { ProductShowcase, ProductGrid };
