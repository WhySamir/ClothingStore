import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "./auth-context";
import Script from "next/script";
import GoogleOneTap from "./components/GoogleOneTap";
import { Poppins } from "next/font/google";
import { ReduxProvider } from "@/redux/Provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
});

export default async function RootLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${poppins.variable} antialiased`}
      >
        <Script
          src="https://accounts.google.com/gsi/client"
          strategy="afterInteractive"
        />
        <GoogleOneTap />{" "}
        <AuthProvider>
          <ReduxProvider>{children}</ReduxProvider>
        </AuthProvider>
        {modal}
      </body>
    </html>
  );
}
