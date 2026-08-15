import { createLegacySlice } from "@/redux/createLegacySlice";

export const topSellProductsSlice = createLegacySlice("topSellProducts", {
  loading: true,
  loadingState: true,
  items: [],
});

export const topSellProductsActions = topSellProductsSlice.actions;
export default topSellProductsSlice.reducer;
