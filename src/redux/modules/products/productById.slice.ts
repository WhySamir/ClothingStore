import { createLegacySlice } from "@/redux/createLegacySlice";

export const productByIdSlice = createLegacySlice("productById", {
  loading: true,
  loadingState: true,
  data: null,
});

export const productByIdActions = productByIdSlice.actions;
export default productByIdSlice.reducer;
