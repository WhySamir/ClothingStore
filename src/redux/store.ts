import { configureStore, combineReducers } from "@reduxjs/toolkit";

// ─── RTK Slices ───────────────────────────────────────────────────────────────
import paymentReducer from "./modules/payment/payment.slice";
import cartReducer from "./modules/cart/cart.slice";
import wishlistReducer from "./modules/wishlist/wishlist.slice";

// ─── RTK Query APIs ───────────────────────────────────────────────────────────
import { cartApi } from "./modules/cart/cart.api";
import { wishlistApi } from "./modules/wishlist/wishlist.api";
import { productsApi } from "./modules/products/products.api";

const rootReducer = combineReducers({
  // Slices
  payment: paymentReducer,
  cart: cartReducer,
  wishlist: wishlistReducer,

  // RTK Query Reducers
  [cartApi.reducerPath]: cartApi.reducer,
  [wishlistApi.reducerPath]: wishlistApi.reducer,
  [productsApi.reducerPath]: productsApi.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      cartApi.middleware,
      wishlistApi.middleware,
      productsApi.middleware,
    ),
  devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
