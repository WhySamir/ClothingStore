import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "@/redux/baseQuery";
import type {
  CartItem,
  AddToCartRequest,
  UpdateCartRequest,
  DeleteCartRequest,
} from "./cart.type";

// ─── Helpers ─────────────────────────────────────────────────────────────────

/** Unwrap the server envelope: { message, data: T } */
const unwrap = <T>(raw: any): T => {
  if (raw && "data" in raw) return raw.data as T;
  return raw as T;
};

// ─── Cart API ─────────────────────────────────────────────────────────────────

export const cartApi = createApi({
  reducerPath: "cartApi",
  baseQuery,
  tagTypes: ["Cart"],
  endpoints: (builder) => ({
    /** GET /api/cart — fetch all cart items for the logged-in customer */
    getCart: builder.query<CartItem[], void>({
      query: () => "/cart",
      transformResponse: (raw: any) => unwrap<CartItem[]>(raw) ?? [],
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Cart" as const, id })),
              { type: "Cart", id: "LIST" },
            ]
          : [{ type: "Cart", id: "LIST" }],
    }),

    /** POST /api/cart — add an item to the cart */
    addToCart: builder.mutation<CartItem, AddToCartRequest>({
      query: (body) => ({
        url: "/cart",
        method: "POST",
        body,
      }),
      transformResponse: (raw: any) => unwrap<CartItem>(raw),
      invalidatesTags: [{ type: "Cart", id: "LIST" }],
    }),

    /** PATCH /api/cart — update quantity of a cart item (Optimistic Update for 0ms UI delay) */
    updateCartItem: builder.mutation<CartItem, UpdateCartRequest>({
      query: (body) => ({
        url: "/cart",
        method: "PATCH",
        body,
      }),
      transformResponse: (raw: any) => unwrap<CartItem>(raw),
      async onQueryStarted({ cartId, itemQty }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          cartApi.util.updateQueryData("getCart", undefined, (draft) => {
            const item = draft.find((i) => i.id === cartId);
            if (item) {
              item.itemQty = itemQty;
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

    /** DELETE /api/cart — remove a cart item (Optimistic Update for instant removal) */
    deleteCartItem: builder.mutation<{ id: string }, DeleteCartRequest>({
      query: (body) => ({
        url: "/cart",
        method: "DELETE",
        body,
      }),
      transformResponse: (raw: any) => unwrap<{ id: string }>(raw),
      async onQueryStarted({ cartId }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          cartApi.util.updateQueryData("getCart", undefined, (draft) => {
            const index = draft.findIndex((i) => i.id === cartId);
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
  useGetCartQuery,
  useAddToCartMutation,
  useUpdateCartItemMutation,
  useDeleteCartItemMutation,
} = cartApi;
