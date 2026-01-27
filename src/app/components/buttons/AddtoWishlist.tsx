"use client";
import Wishlist from "@/app/api/wishlist/wishlist";
import { useAuth } from "@/app/auth-context";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { Actions } from "@/redux/store";

export const AddToWishlistButton = ({
  productId,
}: {
  productId: string | number;
}) => {
  const { user } = useAuth();
  const dispatch = useDispatch();

  const handleAddToWishlist = async () => {
    if (!user) {
      alert("Please login to add product in wishlist");
      return;
    }
    try {
      const response = await Wishlist.addToWishlist({
        productId: String(productId),
        customerId: user.id,
      });

      // Dispatch to Redux to update wishlist state
      dispatch(Actions.append("wishlistItems", response));
    } catch (error) {
      console.error("Error adding to wishlist:", error);
    }
  };
  return (
    <button
      onClick={handleAddToWishlist}
      className="h-8 w-8 bg-white/90 cursor-pointer hover:bg-white rounded-md flex items-center justify-center transition-colors"
    >
      <Image src="/heart.svg" alt="heart" height={20} width={20} />
    </button>
  );
};
