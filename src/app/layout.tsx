import type { Metadata } from "next";
import "./globals.css";

import { Geist_Mono } from "next/font/google";
import { AuthProvider } from "./auth-context";
import GoogleOneTap from "./components/GoogleOneTap";
import { ReduxProvider } from "./ReduxProvider";

import { GoogleAnalytics } from "@next/third-parties/google";

const siteUrl = "https://clothing-store-pearl-psi.vercel.app";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "ClothingStore",
  description: "Your fastest online clothing store with amazing deals.",
  keywords: ["clothing store", "fashion", "online shopping", "trendy clothes"],
  manifest: "/manifest.json",
  openGraph: {
    title: "ClothingStore",
    description: "Your fastest online clothing store with amazing deals.",
    url: new URL(siteUrl),
    siteName: "ClothingStore",
    images: [
      {
        url: `${siteUrl}/metaImg.jpg`,
        width: 2400,
        height: 1260,
        alt: "ClothingStore — Fast Online Shopping",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ClothingStore — Fashion at Your Fingertips",
    description: "Shop clothes fast with amazing deals.",
    images: [`${siteUrl}/metaImg.jpg`],
    creator: "@samir",
  },
};

export default async function RootLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={` ${geistMono.variable}  antialiased`}>
        <GoogleOneTap />{" "}
        <AuthProvider>
          <ReduxProvider>{children}</ReduxProvider>
        </AuthProvider>
        {modal}
        <GoogleAnalytics gaId="G-D3P2EM15QV" />
      </body>
    </html>
  );
}
