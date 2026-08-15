import { createLegacySlice } from "@/redux/createLegacySlice";

export const productAdditionalDetailsSlice = createLegacySlice(
  "productAdditionalDetails",
  {
    loading: true,
    loadingState: true,
    data: null,
  },
);

export const productAdditionalDetailsActions =
  productAdditionalDetailsSlice.actions;
export default productAdditionalDetailsSlice.reducer;
