import ClientProvider from "@/app/components/ReactQueryClientProvider";

import { ProductImageProvider } from "@/app/ProductImageContext";
import type { ReactNode } from "react";
import { prisma } from "@/app/lib/prisma";
import { ProductShowcase } from "@/app/components/Youmightlike";

export const revalidate = 60; // ISR: Revalidate every 60 seconds

// Optional: Pre-render some products for faster initial load
export async function generateStaticParams() {
  const products = await prisma.product.findMany({
    take: 10,
    select: { id: true },
    orderBy: { createdAt: "desc" },
  });

  return products.map((product) => ({
    productId: product.id,
  }));
}

interface ProductLayoutProps {
  children: ReactNode;
  imagegallery: ReactNode;
  productdetails: ReactNode;
  descriptionandreview: ReactNode;
  params: { productId: string };
}

export default function ProductLayout({
  children,
  imagegallery,
  productdetails,
  descriptionandreview,
}: ProductLayoutProps) {
  return (
    <>
      {" "}
      <ClientProvider>
        <div className="max-w-7xl mx-auto px-5 md:px-6 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <ProductImageProvider>
              {imagegallery}
              {productdetails}
            </ProductImageProvider>
          </div>
          {descriptionandreview}
        </div>
        <div className=" h-full w-full  text-black  md:pt-[10vh]">
          <div className=" w-full xl:max-w-[90vw] ml-auto px-4 xl:px-0 md:py-8">
            <div className="mb-8 w-full text-center">
              <p className="text-gray-600 mb-2">You Might Like</p>
              <h1 className="text-4xl font-semibold text-gray-900 mb-8">
                Explore More Products
              </h1>
            </div>
            <ProductShowcase />
          </div>
        </div>
        {/* {children} */}
      </ClientProvider>
    </>
  );
}
