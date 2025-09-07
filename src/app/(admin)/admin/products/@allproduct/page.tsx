"use client";

import { useEffect, useState } from "react";
import { Trash2, UserPen } from "lucide-react";

interface AllProduct {
  id: string;
  name: string;
  description: string;
  brand: string;
  category: { name: string };
  mainImgUrl: string;
  sellingPrice: string;
  stockQty: number;
}

const Page = () => {
  const [products, setProducts] = useState<AllProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);

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

  const toggleSelect = (id: string) => {
    setSelectedProducts((prev) =>
      prev.includes(id) ? prev.filter((pid) => pid !== id) : [...prev, id]
    );
  };
  const handleDelete = async () => {
    const confirmed = confirm("do you really to delete?");
    if (!confirmed) {
      return;
    }
    try {
      const res = await fetch("/api/products", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ids: selectedProducts }),
      });

      const data = await res.json();
      if (res.ok) {
        console.log("Deleted:", data);
        setProducts((prev) =>
          prev.filter((p) => !selectedProducts.includes(p.id))
        );
        setSelectedProducts([]);
      } else {
        console.error("Delete failed:", data.message);
      }
    } catch (err) {
      console.error("Error deleting products:", err);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen  text-gray-300">
        <p>Loading products...</p>
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <div className="flex items-center justify-center h-screen  text-gray-400">
        <p>No products available...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#111111] py-10  text-gray-200">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Products List</h1>
        <button
          onClick={handleDelete}
          disabled={selectedProducts.length === 0}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            selectedProducts.length === 0
              ? "bg-gray-600 text-gray-300 cursor-not-allowed"
              : "bg-red-600 hover:bg-red-700 text-white"
          }`}
        >
          <Trash2 size={18} />
          Delete
        </button>
      </div>
      <div className="space-y-3">
        {/* Header Row */}
        <div className="grid grid-cols-12 gap-4 px-4 py-3 bg-[#1f1f1f] text-gray-400 text-sm rounded-lg">
          <div className="col-span-1"></div>
          <div className="col-span-4">Product</div>
          <div className="col-span-3">ID</div>
          <div className="col-span-1 text-right">Qty</div>
          <div className="col-span-2 text-right">Fix Price</div>
          <div className="col-span-1 text-right"></div>
        </div>

        {/* Data Rows */}
        {products.map((product) => (
          <div
            key={product.id}
            className="grid grid-cols-12 gap-4 px-4 py-4 bg-[#151515] rounded-lg hover:bg-[#1a1a1a] transition-colors"
          >
            <div className="col-span-1 flex items-center">
              <input
                type="checkbox"
                checked={selectedProducts.includes(product.id)}
                onChange={() => toggleSelect(product.id)}
                className="  w-4 h-4 cursor-pointer appearance-none rounded-sm border border-gray-400 
    checked:bg-[#AD46FF] checked:border-[#2A2553]"
              />
            </div>
            {/* Product */}
            <div className="col-span-4 flex items-center gap-3">
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
            <div className="col-span-3 flex items-center text-sm text-gray-400">
              #{product.id}
            </div>

            {/* Qty */}
            <div className="col-span-1 flex items-center justify-end text-sm">
              {product.stockQty ?? "—"}
            </div>

            {/* Fix Price */}
            <div className="col-span-2 flex items-center justify-end font-bold text-green-400">
              ${product.sellingPrice}
            </div>
            <div className="col-span-1 flex items-center justify-center">
              <button
                onClick={() => console.log("Edit product:", product.id)}
                className="p-2 rounded-md hover:bg-[#222] text-gray-300 hover:text-white transition-colors"
              >
                <UserPen size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Page;
