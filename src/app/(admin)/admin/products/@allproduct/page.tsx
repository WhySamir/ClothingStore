"use client";

import { useEffect, useState } from "react";

interface AllProduct {
  id: string;
  name: string;
  description: string;
  brand: string;
  category: { name: string };
  mainImgUrl: string;
  sellingPrice: string;
  qty?: number;
}

const Page = () => {
  const [products, setProducts] = useState<AllProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await fetch("/api/products");
        const allproducts = await response.json();
        setProducts(allproducts.data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    };
    getProducts();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-black text-gray-300">
        <p>Loading products...</p>
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <div className="flex items-center justify-center h-screen bg-black text-gray-400">
        <p>No products available...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#111111] py-10 px-6 text-gray-200">
      <h1 className="text-3xl font-bold text-white mb-8 ">Products List</h1>

      <div className="space-y-3">
        {/* Header Row */}
        <div className="grid grid-cols-12 gap-4 px-4 py-3 bg-[#1f1f1f] text-gray-400 text-sm rounded-lg">
          <div className="col-span-5">Product</div>
          <div className="col-span-4">ID</div>
          <div className="col-span-1 text-right">Qty</div>
          <div className="col-span-2 text-right">Fix Price</div>
        </div>

        {/* Data Rows */}
        {products.map((product) => (
          <div
            key={product.id}
            className="grid grid-cols-12 gap-4 px-4 py-4 bg-[#151515] rounded-lg hover:bg-[#1a1a1a] transition-colors"
          >
            {/* Product */}
            <div className="col-span-5 flex items-center gap-3">
              <img
                src={product.mainImgUrl}
                alt={product.name}
                className="w-10 h-10 rounded-md object-cover"
              />
              <div>
                <p className="font-semibold text-white">{product.name}</p>
                <span className="text-xs text-gray-500">
                  {product.category.name}
                </span>
              </div>
            </div>

            {/* ID */}
            <div className="col-span-4 flex items-center text-sm text-gray-400">
              #{product.id}
            </div>

            {/* Distributor */}

            {/* Qty */}
            <div className="col-span-1 flex items-center justify-end text-sm">
              {product.qty ?? "—"}
            </div>

            {/* Fix Price */}
            <div className="col-span-2 flex items-center justify-end font-bold text-green-400">
              ${product.sellingPrice}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Page;
