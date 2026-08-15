import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";

/**
 * Shared base query for all RTK Query APIs in this app.
 *
 * - baseUrl points to Next.js API routes under /api
 * - credentials: "include" sends the httpOnly session cookie automatically
 *   (the app uses cookie-based auth, no bearer token needed on the client)
 */
export const baseQuery = fetchBaseQuery({
  baseUrl: "/api",
  credentials: "include",
});
