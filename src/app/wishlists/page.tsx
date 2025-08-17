"use client";
import AddtoCart from "../components/buttons/AddtoCart";
import Image from "next/image";
import { X } from "lucide-react";
import PageHeader from "../components/PageHeader";

const products = [
  {
    id: 1,
    name: "Light Brown Sweater",
    color: "Light Brown",
    size: "XXL",
    price: 64.0,
    dateAdded: "18 February 2024",
    status: "Instock",
    image: "/freemen.png",
  },
  {
    id: 2,
    name: "Modern Brown Dress",
    color: "Brown",
    size: "S",
    price: 90.0,
    dateAdded: "17 February 2024",
    status: "Instock",
    image: "/freemen.png",
  },
  {
    id: 3,
    name: "Brown Winter Coat",
    color: "Brown",
    size: "M",
    price: 60.0,
    dateAdded: "11 February 2024",
    status: "Instock",
    image: "/freemen.png",
  },
  {
    id: 4,
    name: "Classic White Shirt",
    color: "White",
    size: "S",
    price: 45.0,
    dateAdded: "05 February 2024",
    status: "Instock",
    image: "/free.png",
  },
  {
    id: 5,
    name: "Trendy Brown Coat",
    color: "Brown",
    size: "XXL",
    price: 75.0,
    dateAdded: "05 February 2024",
    status: "Instock",
    image: "/freemen.png",
  },
];

export default function Page() {
  const handleRemoveProduct = (productId: number) => {
    console.log(`[v0] Removing product with ID: ${productId}`);
  };

  const handleAddToCart = (productId: number) => {
    console.log(`[v0] Adding product ${productId} to cart`);
  };
  return (
    <>
      <PageHeader title="Wishlist" path="Wishlist" />
      <div className="max-w-7xl mx-auto  md:px-6  py-2 md:py-8">
        <div className="w-full my-3 overflow-hidden  ">
          {/* heading */}
          <div className="bg-amber-300/80 md:px-6 px-2 py-3 ">
            <div className="grid grid-cols-6 md:grid-cols-10 md:gap-4">
              <h3 className="col-span-2 md:col-span-4 font-semibold text-gray-900">
                Product
              </h3>
              <h3 className="col-span-1 font-semibold text-gray-900">Price</h3>
              <h3 className="col-span-2 font-semibold text-gray-900">
                Date Added
              </h3>
              <h3 className="col-span-1 font-semibold text-gray-900 whitespace-nowrap">
                Status
              </h3>
            </div>
          </div>

          <div className="bg-white">
            {products.map((product, index) => (
              <div
                key={product.id}
                className={`grid grid-cols-6 md:grid-cols-10 md:gap-4 items-center py-4 px-2 md:px-6 border-b border-gray-100 ${
                  index % 2 === 0 ? "bg-gray-50/50" : "bg-white"
                }`}
              >
                {/* Remove Button & Product Info */}
                <div className="col-span-2 md:col-span-4 flex flex-col md:flex-row items-center gap-3">
                  <button
                    onClick={() => handleRemoveProduct(product.id)}
                    className="p-1 h-auto hover:bg-gray-200"
                  >
                    <X className="h-4 w-4 text-gray-500" />
                  </button>

                  <div className="relative  aspect-square flex-shrink-0">
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      height={36}
                      width={36}
                      className="object-cover rounded-md"
                    />
                  </div>

                  <div className="min-w-0 flex-1">
                    <h4 className="font-semibold text-gray-900 text-sm md:text-base">
                      {product.name}
                    </h4>
                    <p className="text-gray-500 md:block hidden text-xs md:text-sm">
                      Color: {product.color} | Size: {product.size}
                    </p>
                  </div>
                </div>

                {/* Price */}
                <div className="col-span-1 text-sm md:text-base font-medium text-gray-900">
                  ${product.price.toFixed(2)}
                </div>

                {/* Date Added */}
                <div className="col-span-2 text-sm md:text-base text-gray-600">
                  {product.dateAdded}
                </div>

                {/* Status & Add to Cart */}
                <div className="col-span-1 flex flex-col  gap-2">
                  {product.status}
                  <div className="block md:hidden w-8 bg-orange-950 text-white p-2 ">
                    +
                  </div>
                </div>
                <div className="hidden  md:col-span-2 md:flex items-center justify-between gap-2">
                  <AddtoCart />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
