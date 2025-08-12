"use client";

import { useState, useEffect } from "react";
import { Expand, Star } from "lucide-react";
import Image from "next/image";

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  originalPrice: number;
  discount: number;
  rating: number;
  image: string;
  hasCountdown?: boolean;
}

const products: Product[] = [
  {
    id: 1,
    name: "Trendy Brown Coat",
    category: "Coats",
    price: 75.0,
    originalPrice: 150.0,
    discount: 50,
    rating: 4.8,
    image: "/woman-brown-coat-hat.png",
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
    image: "/woman-red-beret-beige-coat.png",
  },
  {
    id: 3,
    name: "Modern Brown Dress",
    category: "Dresses",
    price: 90.0,
    originalPrice: 100.0,
    discount: 10,
    rating: 4.8,
    image: "/placeholder-hqy6m.png",
  },
  {
    id: 4,
    name: "Modern Black Dress",
    category: "Dresses",
    price: 75.0,
    originalPrice: 100.0,
    discount: 25,
    rating: 4.7,
    image: "/fashionable-woman-black-dress.png",
  },
  {
    id: 5,
    name: "Modern Black Dress",
    category: "Dresses",
    price: 75.0,
    originalPrice: 100.0,
    discount: 25,
    rating: 4.7,
    image: "/fashionable-woman-black-dress.png",
  },
  {
    id: 6,
    name: "Modern Black Dress",
    category: "Dresses",
    price: 75.0,
    originalPrice: 100.0,
    discount: 25,
    rating: 4.7,
    image: "/fashionable-woman-black-dress.png",
  },
];

const categories = ["All", "Women", "Men"];

function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState({
    days: 5,
    hours: 12,
    minutes: 30,
    seconds: 25,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else if (prev.days > 0) {
          return {
            ...prev,
            days: prev.days - 1,
            hours: 23,
            minutes: 59,
            seconds: 59,
          };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="absolute bottom-4 left-4 bg-orange-200 w-64 mr-3 px-2 py-3 flex items-center gap-4 text-sm font-medium">
      <div className="text-center">
        <div className="text-lg font-bold">
          {timeLeft.days.toString().padStart(2, "0")}
        </div>
        <div className="text-xs">Days</div>
      </div>
      <div className="text-lg">:</div>
      <div className="text-center">
        <div className="text-lg font-bold">
          {timeLeft.hours.toString().padStart(2, "0")}
        </div>
        <div className="text-xs">Hours</div>
      </div>
      <div className="text-lg">:</div>
      <div className="text-center">
        <div className="text-lg font-bold">
          {timeLeft.minutes.toString().padStart(2, "0")}
        </div>
        <div className="text-xs">Mins</div>
      </div>
      <div className="text-lg">:</div>
      <div className="text-center">
        <div className="text-lg font-bold">
          {timeLeft.seconds.toString().padStart(2, "0")}
        </div>
        <div className="text-xs">Sec</div>
      </div>
    </div>
  );
}

export default function ProductShowcase() {
  const [activeCategory, setActiveCategory] = useState("All");

  return (
    <div className=" h-full w-full  text-black  pt-[10vh]">
      <div className=" w-full xl:max-w-[90vw] ml-auto px-4 xl:px-0 py-8">
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
        <div className="pt-6 w-full ">
          <div className="flex gap-4 overflow-x-auto custom-scrollbar">
            {products.map((product) => (
              <div
                key={product.id}
                className="flex-shrink-0 w-72 group relative   overflow-hidden shadow-sm hover:shadow-lg transition-shadow "
              >
                {/* Product Image */}
                <div className="relative aspect-[3/4] overflow-hidden bg-[#F6F6F6]">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />

                  {/* Discount Badge */}
                  <div className="absolute text-green-300 top-4 left-4 text-green font-bold px-2 py-1 rounded bg-white">
                    {product.discount}% off
                  </div>

                  {/* Action Icons */}
                  <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="h-8 w-8 bg-white/90 hover:bg-white rounded-md flex items-center justify-center transition-colors">
                      <Image
                        src="./heart.svg"
                        alt="heart"
                        height={20}
                        width={20}
                      />
                    </button>
                    <button className="h-8 w-8 bg-white/90 hover:bg-white rounded-md flex items-center justify-center transition-colors">
                      <Expand className="h-4 w-4" />
                    </button>
                  </div>

                  {/* Countdown Timer */}
                  {product.hasCountdown && <CountdownTimer />}
                </div>

                {/* Product Info */}
                <div className="p-4">
                  <div className="flex justify-between items-center">
                    <p className="text-sm text-gray-500 mb-1">
                      {product.category}
                    </p>

                    {/* Rating */}
                    <div className="flex items-center gap-1 mb-2">
                      <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                      <span className="text-sm font-medium">
                        {product.rating}
                      </span>
                    </div>
                  </div>

                  <h3 className="font-semibold text-gray-900 mb-2">
                    {product.name}
                  </h3>

                  {/* Price */}
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold text-gray-900">
                      ${product.price.toFixed(2)}
                    </span>
                    <span className="text-sm text-gray-500 line-through">
                      ${(product.price + 25).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
