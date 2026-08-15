"use client";
import { useState } from "react";
import { useAuth } from "@/app/auth-context";
import Image from "next/image";
import { AddToWishlistToast } from "../Toast";
import { useOptionalProductImage } from "@/app/ProductImageContext";
import { useAddToWishlistMutation, useGetWishlistQuery } from "@/redux/modules/wishlist/wishlist.api";
import { toast } from "react-toastify";

interface AddToWishlistButtonProps {
  productId: string | number;
  product?: {
    name?: string;
    price?: string | number;
    sellingPrice?: string | number;
    mainImgUrl?: string;
    image?: string;
  };
}

export const AddToWishlistButton = ({
  productId,
  product,
}: AddToWishlistButtonProps) => {
  const { user } = useAuth();
  const [showToast, setShowToast] = useState(false);
  const imageCtx = useOptionalProductImage();

  // RTK Query: get current wishlist count (skip if not logged in)
  const { data: wishlistItems = [] } = useGetWishlistQuery(undefined, {
    skip: !user,
  });
  const wishlistCount = wishlistItems.length;

  // RTK Query: add to wishlist mutation
  const [addToWishlist] = useAddToWishlistMutation();

  const handleAddToWishlist = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!user) {
      alert("Please login to add product in wishlist");
      return;
    }
    try {
      await addToWishlist({ productId: String(productId) }).unwrap();
      setShowToast(true);
    } catch (error: any) {
      const message: string = error?.data?.message ?? error?.message ?? "";
      if (message.toLowerCase().includes("already in wishlist")) {
        toast.warning("Already in wishlist");
      }
      // other errors are silently ignored (matching old behaviour)
    }
  };

  const toastProduct = {
    name: product?.name || "Product",
    price: product?.sellingPrice ?? product?.price ?? 0,
  };
  const toastImage =
    product?.mainImgUrl || product?.image || imageCtx?.mainImgUrl || "";

  return (
    <>
      <button
        onClick={handleAddToWishlist}
        className="h-8 w-8 bg-white/90 cursor-pointer hover:bg-white rounded-md flex items-center justify-center transition-colors"
      >
        <Image src="/heart.svg" alt="heart" height={20} width={20} />
      </button>
      <AddToWishlistToast
        isOpen={showToast}
        onClose={() => setShowToast(false)}
        product={toastProduct}
        image={toastImage}
        wishlistCount={wishlistCount}
      />
    </>
  );
};
