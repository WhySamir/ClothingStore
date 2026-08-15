import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "@/redux/baseQuery";
import type {
  WishlistItem,
  AddToWishlistRequest,
  RemoveFromWishlistRequest,
} from "./wishlist.type";

// ─── Helpers ─────────────────────────────────────────────────────────────────

/** Unwrap the server envelope: { message, data: T } */
const unwrap = <T>(raw: any): T => {
  if (raw && "data" in raw) return raw.data as T;
  return raw as T;
};

// ─── Wishlist API ─────────────────────────────────────────────────────────────

export const wishlistApi = createApi({
  reducerPath: "wishlistApi",
  baseQuery,
  tagTypes: ["Wishlist"],
  endpoints: (builder) => ({
    /** GET /api/wishlist — fetch all wishlist items for the logged-in customer */
    getWishlist: builder.query<WishlistItem[], void>({
      query: () => "/wishlist",
      transformResponse: (raw: any) => unwrap<WishlistItem[]>(raw) ?? [],
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Wishlist" as const, id })),
              { type: "Wishlist", id: "LIST" },
            ]
          : [{ type: "Wishlist", id: "LIST" }],
    }),

    /** POST /api/wishlist/:productId — add a product to the wishlist */
    addToWishlist: builder.mutation<WishlistItem, AddToWishlistRequest>({
      query: ({ productId }) => ({
        url: `/wishlist/${productId}`,
        method: "POST",
      }),
      transformResponse: (raw: any) => unwrap<WishlistItem>(raw),
      invalidatesTags: [{ type: "Wishlist", id: "LIST" }],
    }),

    /** DELETE /api/wishlist/:wishlistId — remove an item from the wishlist (Optimistic Update for 0ms delay) */
    removeFromWishlist: builder.mutation<
      { id: string },
      RemoveFromWishlistRequest
    >({
      query: ({ wishlistId }) => ({
        url: `/wishlist/${wishlistId}`,
        method: "DELETE",
      }),
      transformResponse: (raw: any) => unwrap<{ id: string }>(raw),
      async onQueryStarted({ wishlistId }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          wishlistApi.util.updateQueryData("getWishlist", undefined, (draft) => {
            const index = draft.findIndex(
              (i) => String(i.id) === String(wishlistId),
            );
            if (index !== -1) {
              draft.splice(index, 1);
            }
          }),
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),
  }),
});

export const {
  useGetWishlistQuery,
  useAddToWishlistMutation,
  useRemoveFromWishlistMutation,
} = wishlistApi;
