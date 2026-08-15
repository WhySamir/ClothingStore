import { createLegacySlice } from "@/redux/createLegacySlice";

export const womenProductsSlice = createLegacySlice("womenProducts", {
  loading: true,
  loadingState: true,
  items: [],
});

export const womenProductsActions = womenProductsSlice.actions;
export default womenProductsSlice.reducer;
