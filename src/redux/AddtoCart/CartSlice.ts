import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CartItemUI {
  cartId: string;
  productId: string;
  itemQty: number;
  updatedAt: Date;
  product: {
    id: string |number;
    name: string;
    price: number;
    imageUrl?: string;
  };
}

interface CartState {
  cartItems: CartItemUI[];
}

const initialState: CartState = {
  cartItems: [],
};

export const CartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItemUI>) => {
      const existingItem = state.cartItems.find(
        (item) => item.cartId === action.payload.cartId
      );
      if (existingItem) {
        existingItem.itemQty += 1;
      } else {
        state.cartItems.push({ ...action.payload, itemQty: 1 });
      }
    },
    removeFromCart: (state, action: PayloadAction<{ cartId: string }>) => {
      state.cartItems = state.cartItems.filter(
        (item) => item.cartId !== action.payload.cartId
      );
    },
    clearCart: (state) => {
      state.cartItems = [];
    },
    increment: (state, action: PayloadAction<{ cartId: string }>) => {
      const item = state.cartItems.find(
        (item) => item.cartId === action.payload.cartId
      );
      if (item) item.itemQty += 1;
    },
    decrement: (state, action: PayloadAction<{ cartId: string }>) => {
      const item = state.cartItems.find(
        (item) => item.cartId === action.payload.cartId
      );
      if (item) {
        if (item.itemQty > 1) item.itemQty -= 1;
        else
          state.cartItems = state.cartItems.filter(
            (cartItem) => cartItem.cartId !== action.payload.cartId
          );
      }
    },
  },
});

// Selectors
export const selectCartItemCount = (state: { cart: CartState }) =>
  state.cart.cartItems.reduce((total, item) => total + item.itemQty, 0);

export const { addToCart, removeFromCart, clearCart, increment, decrement } =
  CartSlice.actions;

export default CartSlice.reducer;
