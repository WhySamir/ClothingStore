
import { configureStore } from "@reduxjs/toolkit";
import { CartSlice } from "@/redux/AddtoCart/CartSlice";
import { WishlistSlice } from "./AddtoWishlist/WishlistSlice";

export const store = configureStore({
  reducer: {
    cart: CartSlice.reducer,
    wishlist: WishlistSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;