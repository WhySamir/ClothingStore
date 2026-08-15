import { createLegacySlice } from "@/redux/createLegacySlice";

export const productReviewsSlice = createLegacySlice("productReviews", {
  loading: true,
  loadingState: true,
  items: [],
});

export const productReviewsActions = productReviewsSlice.actions;
export default productReviewsSlice.reducer;
