import DisableScrollRestoration from "@/app/components/DisableScroll";
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
  params,
}: ProductLayoutProps) {
  return (
    <>
      <DisableScrollRestoration />
      <div className="max-w-7xl mx-auto px-5 md:px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {imagegallery}
          {productdetails}
        </div>
        {descriptionandreview}
      </div>
      {children}
    </>
  );
}
