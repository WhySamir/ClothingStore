"use client";

import { StoreProvider } from "@/redux/libs";

/**
 * App-level Redux provider — delegates to the unified StoreProvider
 * defined in src/redux/libs.tsx.
 */
export function ReduxProvider({ children }: { children: React.ReactNode }) {
  return <StoreProvider>{children}</StoreProvider>;
}
