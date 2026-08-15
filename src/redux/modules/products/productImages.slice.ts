import { createLegacySlice } from "@/redux/createLegacySlice";

export const productImagesSlice = createLegacySlice("productImages", {
  loading: true,
  loadingState: true,
  items: [],
});

export const productImagesActions = productImagesSlice.actions;
export default productImagesSlice.reducer;
