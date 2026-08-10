"use client";
import { useState } from "react";
import Wishlist from "@/app/api/wishlist/wishlist";
import { useAuth } from "@/app/auth-context";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { Actions, RootState } from "@/redux/store";
import { AddToWishlistToast } from "../Toast";
import { useOptionalProductImage } from "@/app/ProductImageContext";

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
  const dispatch = useDispatch();
  const [showToast, setShowToast] = useState(false);
  const imageCtx = useOptionalProductImage();

  const wishlistState = useSelector(
    (state: RootState) => (state as any).wishlistItems,
  );
  const wishlistCount = wishlistState?.items?.length || 0;

  const handleAddToWishlist = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!user) {
      alert("Please login to add product in wishlist");
      return;
    }
    try {
      const response = await Wishlist.addToWishlist({
        productId: String(productId),
        customerId: user.id,
      });

      if (response) {
        // Dispatch to Redux to update wishlist state
        dispatch(Actions.append("wishlistItems", response));
        setShowToast(true);
      }
    } catch (error) {
      //console.error("Error adding to wishlist:", error);
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

