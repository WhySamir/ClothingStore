"use client";

import { Provider } from "react-redux";
import { store } from "./store";

/** Drop-in Redux store provider — wraps the app with the unified store */
export function StoreProvider({ children }: { children: React.ReactNode }) {
  return <Provider store={store}>{children}</Provider>;
}

export { useSelector, useDispatch } from "react-redux";
export type { RootState, AppDispatch } from "./store";
