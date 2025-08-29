"use client";
import {
  addToWishlist,
  removeFromWishlist,
} from "@/redux/AddtoWishlist/WishlistSlice";
import { RootState } from "@/redux/store";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";

export const AddToWishlistButton = ({
  productId,
}: {
  productId: string | number;
}) => {
  const dispatch = useDispatch();

  const wishlist = useSelector(
    (state: RootState) => state.wishlist.wishlistItems
  );

  const handleAddToWishlist = async () => {
    const existingItem = wishlist.find(
      (i) => i.product.id === productId
      // i.color === selectedColor &&
      // i.size === selectedSize
    );
    if (existingItem) {
      dispatch(removeFromWishlist({ wishlistId: existingItem.id }));
    } else {
      const res = await fetch(`/api/wishlist/${productId}`, {
        method: "POST",
      });
      const newItem = await res.json();
      dispatch(addToWishlist(newItem));
    }
  };
  return (
    <button
      onClick={handleAddToWishlist}
      className="h-8 w-8 bg-white/90 hover:bg-white rounded-md flex items-center justify-center transition-colors"
    >
      <Image src="/heart.svg" alt="heart" height={20} width={20} />
    </button>
  );
};
