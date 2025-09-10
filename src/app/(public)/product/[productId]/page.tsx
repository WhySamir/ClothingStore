import { ProductGrid } from "@/app/components/Youmightlike";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ productId: string }>;
}) {
  return (
    <>
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
