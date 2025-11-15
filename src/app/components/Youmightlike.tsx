"use client";

import { useEffect, useState } from "react";
import { ProductOrg } from "./productcard/productType";
import ProductCard from "./productcard/ProductCard";

const categories = ["All", "Women", "Men"];

function ProductShowcase() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [products, setProducts] = useState<ProductOrg[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch("/api/topsellproducts");
        const data = await res.json();

        if (!res.ok) {
          setError(data.message || "Failed to load products");
          setLoading(false);
          return;
        }

        setProducts(data.data);
      } catch (err) {
        setError("Something went wrong while fetching products");
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

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
          error={error}
          activeCategory={activeCategory}
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
};

function ProductGrid({ products, loading, error, activeCategory }: GridProps) {
  if (loading)
    return <div className="text-center py-10 text-lg">Loading products...</div>;

  if (error)
    return (
      <div className="text-center py-10 text-red-500 text-lg">{error}</div>
    );

  // 👇 Filter products based on category
  const filteredProducts =
    activeCategory === "All"
      ? products
      : activeCategory === "Men"
      ? products.filter((p) => p.categoryId === 1)
      : products.filter((p) => p.categoryId === 2);
  if (filteredProducts.length === 0)
    return <div className="text-center py-10 text-lg">No products found</div>;

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
