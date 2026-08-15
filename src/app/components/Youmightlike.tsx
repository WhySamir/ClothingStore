"use client";

import { useState } from "react";
import { ProductOrg } from "./productcard/productType";
import ProductCard from "./productcard/ProductCard";
import { ProductSkeletonRow } from "./skeletons/ProductSkeleton";
import { useGetTopSellProductsQuery } from "@/redux/modules/products/products.api";

const categories = ["All", "Women", "Men"];

function ProductShowcase() {
  const [activeCategory, setActiveCategory] = useState("All");

  const {
    data: products = [],
    isLoading: loading,
    error: apiError,
    refetch,
  } = useGetTopSellProductsQuery();

  const errorMessage = apiError
    ? "Something went wrong while fetching products"
    : "";

  return (
    <div className="h-full w-full text-black md:pt-[10vh]">
      <div className="w-full xl:max-w-[90vw] ml-auto px-4 xl:px-0 md:py-8">
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
        <ProductGrid
          products={products}
          loading={loading}
          error={errorMessage}
          activeCategory={activeCategory}
          onRetry={() => refetch()}
        />
      </div>
    </div>
  );
}

type GridProps = {
  products: ProductOrg[];
  loading: boolean;
  error: string;
  activeCategory: string;
  onRetry?: () => void;
};

function ProductGrid({
  products,
  loading,
  error,
  activeCategory,
  onRetry,
}: GridProps) {
  if (loading) return <ProductSkeletonRow count={4} />;

  if (error) {
    return (
      <div className="py-12 px-6 flex flex-col items-center justify-center text-center">
        <div className="w-12 h-12 rounded-full bg-orange-50 flex items-center justify-center mb-3">
          <svg
            className="w-6 h-6 text-orange-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>
        <p className="text-gray-700 text-sm font-medium mb-3">{error}</p>
        {onRetry && (
          <button
            onClick={onRetry}
            className="px-4 py-1.5 text-md font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
          >
            Try again
          </button>
        )}
      </div>
    );
  }

  const filteredProducts =
    activeCategory === "All"
      ? products
      : activeCategory === "Men"
        ? products.filter((p) => p.categoryId === 1)
        : products.filter((p) => p.categoryId === 2);

  if (filteredProducts.length === 0)
    return (
      <div className="text-center py-10 text-lg">
        No top seller products found
      </div>
    );

  return (
    <div className="pt-6 w-full">
      <div className="flex gap-4 overflow-x-auto custom-scrollbar">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

export { ProductShowcase, ProductGrid };
