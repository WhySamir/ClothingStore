import ClientProvider from "@/app/components/ReactQueryClientProvider";
import { ProductImageProvider } from "@/app/ProductImageContext";
import type { ReactNode } from "react";

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
        {children}
      </ClientProvider>
    </>
  );
}
