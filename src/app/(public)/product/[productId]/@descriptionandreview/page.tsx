"use client";

import Review from "@/app/components/Review";
import { ProductAdditionalDetailsType } from "@/types/productDetailsType";
import { useParams } from "next/navigation";
import { use, useEffect, useRef, useState } from "react";

interface Stats {
  averageRating: number;
  totalReviews: number;
  ratingDistribution: {
    5: number;
    4: number;
    3: number;
    2: number;
    1: number;
  };
}

export default function Page({ stats }: { stats?: Stats }) {
  const [select, setSelect] = useState<number>(0);
  const [lineStyle, setLineStyle] = useState({ width: 0, left: 0 });
  const tabRefs = useRef<HTMLHeadingElement[]>([]);
  const { productId } = useParams<{ productId: string }>();

  const [productDetails, setProductDetails] =
    useState<ProductAdditionalDetailsType | null>(null);

  const tabs = ["Description", "Additional Information", "Review"];

  useEffect(() => {
    const updateLineStyle = () => {
      if (tabRefs.current[select]) {
        const tab = tabRefs.current[select];
        setLineStyle({
          width: tab.offsetWidth,
          left: tab.offsetLeft,
        });
      }
    };
    updateLineStyle();
    window.addEventListener("resize", updateLineStyle);
    return () => {
      window.removeEventListener("resize", updateLineStyle);
    };
  }, [select]);

  useEffect(() => {
    const fetchProductionAdditionalInfo = async () => {
      if (!productId) return (window.location.href = "/404");
      const response = await fetch(
        `/api/products/${productId}/additionaldetails`
      );
      const data = await response.json();
      setProductDetails(data.data);
    };
    fetchProductionAdditionalInfo();
  }, []);

  const specs = productDetails
    ? [
        { key: "Material", value: productDetails.material || "Not found" },
        {
          key: "Sizes",
          value: productDetails.sizes?.length
            ? productDetails.sizes.map((s) => s.size).join(", ")
            : "N/A",
        },
        {
          key: "Colors",
          value: productDetails.colors?.length
            ? productDetails.colors.map((c) => c.color).join(", ")
            : "N/A",
        },
        { key: "Origin Country", value: productDetails.originCountry || "N/A" },
        { key: "Brand", value: productDetails.brand || "N/A" },
      ]
    : [];

  return (
    <>
      <div className="flex flex-col mt-8 md:mt-20  ">
        <div className="relative flex justify-center gap-8 md:gap-16 items-center">
          {tabs.map((tab, index) => (
            <h1
              key={index}
              ref={(el) => {
                if (el) tabRefs.current[index] = el;
              }}
              onClick={() => setSelect(index)}
              className="text-gray-600  md:text-2xl cursor-pointer relative"
            >
              {tab}
            </h1>
          ))}

          {/* Sliding underline */}
          <div
            className="absolute -bottom-2.5 h-1 bg-black rounded-full transition-all duration-300 ease-in-out"
            style={{
              width: lineStyle.width,
              left: lineStyle.left,
            }}
          ></div>
        </div>
        {/* Gray line below */}
        <div className="line w-full h-0.5 bg-gray-200 mt-2"></div>
        {/* description */}
        {select === 0 && (
          <div className="desc my-8 md:px-12">
            {productDetails?.description || "No description available."}
          </div>
        )}
        {/* additional info */}
        {select === 1 && (
          <div className="w-full my-8 overflow-hidden  border border-border">
            <div className="bg-amber-300/80 px-6 py-4">
              <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
                <h3 className="col-span-1 font-semibold text-gray-900">
                  Feature
                </h3>
                <h3 className="font-semibold text-gray-900">Description</h3>
              </div>
            </div>
            <div className="divide-y divide-border">
              {specs.map((spec, index) => (
                <div
                  key={index}
                  className={`px-6 py-4 grid grid-cols-2 md:grid-cols-6 gap-4 ${
                    index % 2 === 0 ? "bg-background" : "bg-muted/30"
                  }`}
                >
                  <div className="col-span-1 font-medium text-muted-foreground">
                    {spec.key}
                  </div>
                  <div className="md:col-span-5 text-foreground">
                    {spec.value}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        {select === 2 && <Review />}
      </div>
    </>
  );
}
