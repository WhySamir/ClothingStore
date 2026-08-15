"use client";

import { X, Check, Heart } from "lucide-react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

interface AddToCartToastProps {
  isOpen: boolean;
  onClose: () => void;
  product: {
    name: string;
    price: string | number;
  };
  color?: {
    name: string;
  };
  size?: {
    name: string;
  };
  image?: string;
  type?: "Cart" | "Wishlist";
  bagCount?: number;
}

export function AddToCartToast({
  isOpen,
  onClose,
  product,
  color,
  size,
  image,
  bagCount = 1,
}: AddToCartToastProps) {
  const router = useRouter();

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        onClose();
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose]);

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
          <span className="font-medium text-gray-900">Added to Bag</span>
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
            <p className="text-sm text-gray-500 mt-0.5">
              {color?.name ? `Color: ${color.name}` : ""}{" "}
              {size?.name ? `| Size: ${size.name}` : ""}
            </p>
            <p className="font-medium text-gray-900 mt-1">
              ${Number(product.price).toFixed(2)}
            </p>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="p-4 pt-0 space-y-3">
        <button
          onClick={() => {
            onClose();
            router.push("/carts");
          }}
          className="w-full py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 bg-transparent transition-colors flex items-center justify-center"
        >
          View Bag ({bagCount})
        </button>
      </div>
    </div>
  );
}

interface AddToWishlistToastProps {
  isOpen: boolean;
  onClose: () => void;
  product: {
    name: string;
    price: string | number;
  };
  image?: string;
  wishlistCount?: number;
}

export function AddToWishlistToast({
  isOpen,
  onClose,
  product,
  image,
  wishlistCount = 0,
}: AddToWishlistToastProps) {
  const router = useRouter();

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        onClose();
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose]);

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
            <Heart className="w-3 h-3 text-white fill-white" />
          </div>
          <span className="font-medium text-gray-900">Added to Wishlist</span>
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
            <p className="font-medium text-gray-900 mt-1">
              ${Number(product.price).toFixed(2)}
            </p>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="p-4 pt-0 space-y-3">
        <button
          onClick={() => {
            onClose();
            router.push("/wishlists");
          }}
          className="w-full py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 bg-transparent transition-colors flex items-center justify-center cursor-pointer"
        >
          View Wishlist {wishlistCount > 0 ? `(${wishlistCount})` : ""}
        </button>
      </div>
    </div>
  );
}

