"use client";

import { useState } from "react";
import { X } from "lucide-react";
import Image from "next/image";
import { ItemsAddDel } from "../../components/buttons/ItemsAddDel";

interface Product {
  id: string;
  name: string;
  color: string;
  size: string;
  price: number;
  quantity: number;
  image: string;
}

const initialProducts: Product[] = [
  {
    id: "1",
    name: "Trendy Brown Coat",
    color: "Brown",
    size: "XXL",
    price: 75.0,
    quantity: 4,
    image: "/brown-coat.png",
  },
  {
    id: "2",
    name: "Classy Light Coat",
    color: "Cream",
    size: "XXL",
    price: 165.0,
    quantity: 1,
    image: "/light-cream-coat.png",
  },
  {
    id: "3",
    name: "Light Brown Sweater",
    color: "Light Brown",
    size: "S",
    price: 63.0,
    quantity: 1,
    image: "/light-brown-sweater.png",
  },
  {
    id: "4",
    name: "Modern Brown Dress",
    color: "Brown",
    size: "S",
    price: 90.0,
    quantity: 2,
    image: "/brown-dress.png",
  },
];

export default function ShoppingCart() {
  const [products, setProducts] = useState<Product[]>(initialProducts);

  const handleRemoveProduct = (id: string) => {
    setProducts(products.filter((product) => product.id !== id));
  };

  const handleQuantityChange = (id: string, newValue: number) => {
    setProducts(
      products.map((product) =>
        product.id === id ? { ...product, quantity: newValue } : product
      )
    );
  };
  const subtotal = products.reduce(
    (sum, product) => sum + product.price * product.quantity,
    0
  );

  const shipping = 0;
  const taxes = 0;
  const couponDiscount = 100;
  const total = subtotal + shipping + taxes - couponDiscount;

  return (
    <div className="w-full overflow-hidden">
      {/* Table Header */}
      <div className="bg-amber-300 px-2 md:px-6 py-4">
        <div className="grid grid-cols-12 gap-1 md:gap-4 items-center">
          <h3 className="col-span-3 md:col-span-4 font-semibold text-gray-900">
            Product
          </h3>
          <h3 className="col-span-2 font-semibold text-gray-900 text-center">
            Price
          </h3>
          <h3 className="col-span-4 font-semibold text-gray-900 text-center">
            Quantity
          </h3>
          <h3 className="col-span-3  md:col-span-2 font-semibold text-gray-900 text-center">
            Subtotal
          </h3>
        </div>
      </div>

      {/* Product Rows */}
      <div className="bg-white">
        {products.map((product) => (
          <div
            key={product.id}
            className="grid grid-cols-12  md:gap-4 items-center py-6 px-2 md:px-6 border-b border-gray-100 bg-white"
          >
            {/* Product Info with Remove Button */}
            <div className="col-span-3 md:col-span-4  flex-col flex sm:flex-row items-center gap-4">
              <button
                onClick={() => handleRemoveProduct(product.id)}
                className="p-1 hover:bg-gray-100 rounded"
              >
                <X className="h-5 w-5 text-gray-400" />
              </button>

              <div className="relative w-16 h-16 flex-shrink-0">
                <Image
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  fill
                  className="object-cover rounded-lg"
                />
              </div>

              <div className=" min-w-0 flex-1">
                <h4 className="font-semibold text-gray-900 text-base mb-1">
                  {product.name}
                </h4>
                <p className="text-gray-500 text-sm hidden sm:block">
                  Color : {product.color} | Size : {product.size}
                </p>
              </div>
            </div>

            {/* Price */}
            <div className="col-span-2 text-center">
              <span className="text-base font-medium text-gray-900">
                ${product.price.toFixed(2)}
              </span>
            </div>

            {/* Quantity Controls */}
            <div className="col-span-4 text-center itesm-center flex justify-center">
              <ItemsAddDel
                key={product.id}
                value={product.quantity}
                onChange={(newValue) =>
                  handleQuantityChange(product.id, newValue)
                }
              />
            </div>
            {/* Subtotal */}
            <div className="col-span-3  md:col-span-2  text-center">
              <span className="text-base font-medium text-gray-900">
                ${(product.price * product.quantity).toFixed(2)}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
