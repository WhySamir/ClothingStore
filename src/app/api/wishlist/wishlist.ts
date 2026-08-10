// api/cart.ts
import { request } from "@/utlis/ApiResponders";
import { ReturnType } from "../types";
import { toast } from "react-toastify";

export const addToWishlist = async (data: {
  productId: string;
  customerId: string;
}) => {
  try {
    const config: ReturnType = {
      url: `api/wishlist/${data.productId}`,
      method: "post",
      authorization: true,
      config: {},
    };
    const response = await request(config);
    return response;
  } catch (err: any) {
    if (err.message && err.message.toLowerCase().includes("already in wishlist")) {
      toast.warning("Already in wishlist");
    } else {
      toast.error(err.message || "Network Error");
    }
  }
};

export const fetchWishlist = async () => {
  try {
    const config: ReturnType = {
      url: "api/wishlist",
      method: "get",
      config: {
        showErr: false,
        store: {
          action: "set",
          key: "wishlistItems",
        },
      },
    };

    const response = await request(config);
    return response;
  } catch (err: any) {
    throw new Error(err.message || "Network Error");
  }
};

export const updateWishlistItem = async (
  wishlistId: string | number,
  itemQty: number,
) => {
  try {
    const config: ReturnType = {
      url: "api/wishlist",
      method: "patch",
      authorization: true,
      data: { wishlistId, itemQty }, // matches your server PATCH body
      config: {
        showErr: true,
        successMsg: "Wishlist item updated",
        store: {
          action: "update",
          key: "wishlistItems",
        },
      },
    };

    const response = await request(config);
    return response;
  } catch (err: any) {
    throw new Error(err.message || "Network Error");
  }
};

export const deleteWishlistItem = async (wishlistId: string | number) => {
  try {
    const config: ReturnType = {
      url: `api/wishlist/${wishlistId}`,
      method: "delete",
      authorization: true,
      config: {
        showErr: true,
        successMsg: "Wishlist item deleted",
        store: {
          action: "remove",
          key: "wishlistItems",
        },
      },
    };

    const response = await request(config);
    return response;
  } catch (err: any) {
    throw new Error(err.message || "Network Error");
  }
};

const Wishlist = {
  addToWishlist,
  fetchWishlist,
  updateWishlistItem,
  deleteWishlistItem,
  removeFromWishlist: deleteWishlistItem,
};
export default Wishlist;
