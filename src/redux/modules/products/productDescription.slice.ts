import { createLegacySlice } from "@/redux/createLegacySlice";

export const productDescriptionSlice = createLegacySlice("productDescription", {
  loading: true,
  loadingState: true,
  data: null,
});

export const productDescriptionActions = productDescriptionSlice.actions;
export default productDescriptionSlice.reducer;
