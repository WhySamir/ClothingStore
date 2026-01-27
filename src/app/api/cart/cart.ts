// api/cart.ts
import { request } from "@/utlis/ApiResponders";
import { ReturnType } from "../types";

export const addToCart = async (data: any) => {
  try {
    const config: ReturnType = {
      url: "api/cart",
      method: "post",
      data,
      authorization: true,
      config: {
        showErr: true,
        successMsg: "Cart item added!",
        store: {
          action: "set",
          key: "cartItems",
        },
      },
    };

    const response = await request(config);
    return response;
  } catch (err: any) {
    throw new Error(err.message || "Network Error");
  }
};

export const fetchCart = async () => {
  try {
    const config: ReturnType = {
      url: "api/cart",
      method: "get",
      config: {
        showErr: false,
        store: {
          action: "set",
          key: "cartItems",
      },
      },
    };

    const response = await request(config);
    return response;
  } catch (err: any) {
    throw new Error(err.message || "Network Error");
  }
};

export const updateCartItem = async (
  cartId: string | number,
  itemQty: number
) => {
  try {
    const config: ReturnType = {
      url: "api/cart",
      method: "patch",
      authorization: true,
      data: { cartId, itemQty }, // matches your server PATCH body
      config: {
        showErr: true,
        successMsg: "Cart item updated",
        store: {
          action: "update",
          key: "cartItems",
        },
      },
    };

    const response = await request(config);
    return response;
  } catch (err: any) {
    throw new Error(err.message || "Network Error");
  }
};

export const deleteCartItem = async (cartId: string | number) => {
  try {
    const config: ReturnType = {
      url: "api/cart",
      method: "delete",
      authorization: true,
      data: { cartId },
      config: {
        showErr: true,
        successMsg: "Cart item deleted",
        store: {
          action: "remove",
          key: "cartItems",
        },
      },
    };

    const response = await request(config);
    return response;
  } catch (err: any) {
    throw new Error(err.message || "Network Error");
  }
};

const Cart = {
  addToCart,
  fetchCart,
  updateCartItem,
  deleteCartItem,
};
export default Cart;

