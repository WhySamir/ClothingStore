import DisableScrollRestoration from "@/app/components/DisableScroll";
import type { ReactNode } from "react";
import { ProductGrid } from "@/app/components/Youmightlike";

interface ProductLayoutProps {
  children: ReactNode;
  imagegallery: ReactNode;
  productdetails: ReactNode;
  params: { productId: string };
}

export default function ProductLayout({
  children,
  imagegallery,
  productdetails,
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
      </div>
      {children}
      <div className=" h-full w-full  text-black  md:pt-[10vh]">
        <div className=" w-full xl:max-w-[90vw] ml-auto px-4 xl:px-0 md:py-8">
          <div className="mb-8 w-full text-center">
            <p className="text-gray-600 mb-2">Related Products</p>
            <h1 className="text-4xl font-semibold text-gray-900 mb-8">
              Explore Related Products
            </h1>
          </div>
          <ProductGrid />
        </div>
      </div>
    </>
  );
}
