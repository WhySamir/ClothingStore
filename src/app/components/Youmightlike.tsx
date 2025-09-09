"use client";

import { useState } from "react";
import { Product, ProductOrg } from "./productcard/productType";
import ProductCard from "./productcard/ProductCard";

const products: ProductOrg[] = [
  {
    id: "cmf8i3kbn0001sie0qmx2y2z0",
    name: "Trendy Brown Coat",
    categoryId: 2,
    sellingPrice: "75",
    discount: null,
    mainImgUrl:
      "https://res.cloudinary.com/dcfrlqakq/image/upload/v1757177473/clothingstore/productImage/main/tmcpkcen2ak1jpl4he7c.png",
    colors: [
      {
        color: "Blue",
        hexCode: "#00102D",
        stockQty: 1,
      },
      {
        color: "Green",
        hexCode: "#003727",
        stockQty: 1,
      },
    ],
    sizes: [
      {
        size: "L",
        stockQty: 10,
      },
    ],
    reviews: [],
    tags: [
      {
        name: "Coats",
      },
    ],
  },
  {
    id: "cmfa2x6770001si444r136drp",
    name: "Modern Black Dress",
    categoryId: 2,
    sellingPrice: "80",
    discount: null,
    mainImgUrl:
      "https://res.cloudinary.com/dcfrlqakq/image/upload/v1757272915/clothingstore/productImage/main/yvul3dxyqegryv7j1kr9.png",
    colors: [
      {
        color: "Dark Bluish",
        hexCode: "#160D2C",
        stockQty: 1,
      },
      {
        color: "Green",
        hexCode: "#081B18",
        stockQty: 1,
      },
    ],
    sizes: [
      {
        size: "XL",
        stockQty: 3,
      },
      {
        size: "XXL",
        stockQty: 5,
      },
    ],
    reviews: [],
    tags: [
      {
        name: "Dresses",
      },
    ],
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
