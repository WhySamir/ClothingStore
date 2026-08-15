import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { WishlistState } from "./wishlist.type";

const initialState: WishlistState = {
  pendingProductIds: [],
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    addPendingProductId(state, action: PayloadAction<string>) {
      if (!state.pendingProductIds.includes(action.payload)) {
        state.pendingProductIds.push(action.payload);
      }
    },
    removePendingProductId(state, action: PayloadAction<string>) {
      state.pendingProductIds = state.pendingProductIds.filter(
        (id) => id !== action.payload,
      );
    },
    clearPendingProductIds(state) {
      state.pendingProductIds = [];
    },
  },
});

export const {
  addPendingProductId,
  removePendingProductId,
  clearPendingProductIds,
} = wishlistSlice.actions;

export default wishlistSlice.reducer;
