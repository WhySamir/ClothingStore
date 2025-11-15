"use client";
import { X, Check } from "lucide-react";

interface AddToCartToastProps {
  isOpen: boolean;
  onClose: () => void;
  product: {
    name: string;
    price: string | number;
  };
  color: {
    id: string;
    name: string;
  };
  size: {
    id: string;
    name: string;
  };
  bagCount: number;
  type: string;
  image: string;
}

export function AddToCartToast({
  isOpen,
  onClose,
  product,
  bagCount,
  color,
  size,
  type,
  image,
}: AddToCartToastProps) {
  if (!isOpen) return null;

  return (
    <div
      className={`
        fixed top-16 md:top-20 right-4 md:right-8 z-50 w-80 bg-white border border-gray-200 rounded-lg shadow-lg transform transition-all duration-300 ease-in-out
        ${isOpen ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"}`}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 bg-[#441306] rounded-full flex items-center justify-center">
            <Check className="w-3 h-3 text-white" />
          </div>
          <span className="font-medium text-gray-900">Added to {type}</span>
        </div>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Product Details */}
      <div className="p-4">
        <div className="flex gap-3">
          <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
            <img
              src={image || "/placeholder.svg"}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-medium text-gray-900 truncate">
              {product.name}
            </h3>
            <p className="text-sm text-gray-600 mt-1">{color.name}</p>
            <p className="text-sm text-gray-600">{size.name}</p>
            <p className="font-medium text-gray-900 mt-1">${product.price}</p>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="p-4 pt-0 space-y-3">
        <button
          onClick={() => (window.location.href = "/carts")}
          className="w-full justify-center text-gray-700 border-gray-300 hover:bg-gray-50 bg-transparent"
        >
          View Bag ({bagCount})
        </button>
      </div>
    </div>
  );
}
