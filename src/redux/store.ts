
import { configureStore } from "@reduxjs/toolkit";
import { CartSlice } from "@/redux/AddtoCart/CartSlice";

export const store = configureStore({
  reducer: {
    cart: CartSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;