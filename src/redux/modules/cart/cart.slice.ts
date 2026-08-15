import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { CartState } from "./cart.type";

const initialState: CartState = {
  pendingIds: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addPendingId(state, action: PayloadAction<string>) {
      state.pendingIds.push(action.payload);
    },
    removePendingId(state, action: PayloadAction<string>) {
      state.pendingIds = state.pendingIds.filter((id) => id !== action.payload);
    },
    clearPendingIds(state) {
      state.pendingIds = [];
    },
  },
});

export const { addPendingId, removePendingId, clearPendingIds } =
  cartSlice.actions;

export default cartSlice.reducer;
