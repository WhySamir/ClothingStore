import { createLegacySlice } from "@/redux/createLegacySlice";

export const menProductsSlice = createLegacySlice("menProducts", {
  loading: true,
  loadingState: true,
  items: [],
});

export const menProductsActions = menProductsSlice.actions;
export default menProductsSlice.reducer;
