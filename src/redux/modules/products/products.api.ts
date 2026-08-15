import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "@/redux/baseQuery";
import type {
  ProductOrg,
  ProductDetails,
  ProductAdditionalDetails,
  ProductReview,
} from "./products.type";

const unwrap = <T>(raw: any): T => {
  if (raw && "data" in raw) return raw.data as T;
  return raw as T;
};

export const productsApi = createApi({
  reducerPath: "productsApi",
  baseQuery,
  keepUnusedDataFor: 86400, // Keep cached data in Redux memory for 24 hours
  tagTypes: ["Products", "Product"],
  endpoints: (builder) => ({
    /** GET /api/products/female — Fetch female products */
    getWomenProducts: builder.query<ProductOrg[], void>({
      query: () => "/products/female",
      transformResponse: (raw: any) => unwrap<ProductOrg[]>(raw) ?? [],
      providesTags: ["Products"],
    }),

    /** GET /api/products/men — Fetch male products */
    getMenProducts: builder.query<ProductOrg[], void>({
      query: () => "/products/men",
      transformResponse: (raw: any) => unwrap<ProductOrg[]>(raw) ?? [],
      providesTags: ["Products"],
    }),

    /** GET /api/topsellproducts — Fetch top seller products */
    getTopSellProducts: builder.query<ProductOrg[], void>({
      query: () => "/topsellproducts",
      transformResponse: (raw: any) => unwrap<ProductOrg[]>(raw) ?? [],
      providesTags: ["Products"],
    }),

    /** GET /api/products/:productId/productdetails — Fetch product by ID */
    getProductById: builder.query<ProductDetails, string>({
      query: (productId) => `/products/${productId}/productdetails`,
      transformResponse: (raw: any) => unwrap<ProductDetails>(raw),
      providesTags: (_result, _error, id) => [{ type: "Product", id }],
    }),

    /** GET /api/products/:productId/additionaldetails — Fetch additional specifications */
    getProductAdditionalDetails: builder.query<
      ProductAdditionalDetails,
      string
    >({
      query: (productId) => `/products/${productId}/additionaldetails`,
      transformResponse: (raw: any) => unwrap<ProductAdditionalDetails>(raw),
      providesTags: (_result, _error, id) => [{ type: "Product", id }],
    }),

    /** GET /api/review/:productId — Fetch product reviews */
    getProductReviews: builder.query<ProductReview[], string>({
      query: (productId) => `/review/${productId}`,
      transformResponse: (raw: any) => unwrap<ProductReview[]>(raw) ?? [],
      providesTags: (_result, _error, id) => [{ type: "Product", id }],
    }),

    /** GET /api/products/:productId/imagegallery — Fetch product gallery images */
    getProductImages: builder.query<string[], string>({
      query: (productId) => `/products/${productId}/imagegallery`,
      transformResponse: (raw: any) => {
        const data = unwrap<any>(raw);
        if (!data) return [];
        const main = data.mainImgUrl ? [data.mainImgUrl] : [];
        const gallery = Array.isArray(data.images)
          ? data.images.map((item: any) => (typeof item === "string" ? item : item.url))
          : [];
        return [...main, ...gallery];
      },
      providesTags: (_result, _error, id) => [{ type: "Product", id }],
    }),
  }),
});

export const {
  useGetWomenProductsQuery,
  useGetMenProductsQuery,
  useGetTopSellProductsQuery,
  useGetProductByIdQuery,
  useGetProductAdditionalDetailsQuery,
  useGetProductReviewsQuery,
  useGetProductImagesQuery,
} = productsApi;
