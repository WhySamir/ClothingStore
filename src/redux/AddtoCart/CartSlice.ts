import { Decimal } from "@prisma/client/runtime/library";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Product {
  id: string;
  name: string;
  price: Decimal;
  mainImgUrl: string;
}

interface Color {
  id: string;
  color: string;
  hexCode: string;
}

interface Sizes {
  id: string;
  size: string;
  stockQty: number;
}

interface CartItem {
  id: string;        // unique cart item id
  productId: string;
  itemQty: number;
  colorId: string;
  sizeId: string;
  product: Product;
  color: Color;
  size: Sizes;
}

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

export const CartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCart: (state, action: PayloadAction<CartItem[]>) => {
      state.items = action.payload;
    },
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const exists = state.items.find(i => i.id === action.payload.id);
      if (exists) {
        exists.itemQty += action.payload.itemQty;
      } else {
        state.items.push(action.payload);
      }
    },
    updateQty: (state, action: PayloadAction<{ id: string; itemQty: number }>) => {
      const item = state.items.find(i => i.id === action.payload.id);
      if (item) item.itemQty = action.payload.itemQty;
    },
    removeFromCart: (state, action: PayloadAction<{ id: string }>) => {
      state.items = state.items.filter(i => i.id !== action.payload.id);
    },
    clearCart: state => {
      state.items = [];
    },
  },
});

export const { setCart, addToCart, updateQty, removeFromCart, clearCart } = CartSlice.actions;
export default CartSlice.reducer;
