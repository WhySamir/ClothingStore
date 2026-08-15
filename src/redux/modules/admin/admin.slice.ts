import { createLegacySlice } from "@/redux/createLegacySlice";

export const adminSlice = createLegacySlice("admin", {
  loading: true,
  loadingState: true,
  data: {},
});

export const adminActions = adminSlice.actions;
export default adminSlice.reducer;
