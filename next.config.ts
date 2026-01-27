import type { NextConfig } from "next";
import withSerwistInit from "@serwist/next";

const withSerwist = withSerwistInit({
  swSrc: "src/app/sw.ts",
  swDest: "public/sw.js", // output service worker
  disable: process.env.NODE_ENV !== "production", // optional: disable in dev
});

const baseConfig: NextConfig = {
  reactStrictMode: true,
  typescript: {
    ignoreBuildErrors: true, // allow build even with type errors
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
    ],
  },
};

export default process.env.NODE_ENV === "production"
  ? withSerwist(baseConfig)
  : baseConfig;
