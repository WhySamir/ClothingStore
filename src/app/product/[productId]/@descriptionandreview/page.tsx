"use client";

import { useEffect, useRef, useState } from "react";

export default function page() {
  const [select, setSelect] = useState<number>(0);
  const [lineStyle, setLineStyle] = useState({ width: 0, left: 0 });
  const tabRefs = useRef<HTMLHeadingElement[]>([]);

  const tabs = ["Description", "Additional Information", "Review"];

  useEffect(() => {
    if (tabRefs.current[select]) {
      const tab = tabRefs.current[select];
      setLineStyle({
        width: tab.offsetWidth,
        left: tab.offsetLeft,
      });
    }
  }, [select]);
  return (
    <>
      <div className="flex flex-col mt-8 md:mt-20  items-center">
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
        {/* description &review */}
        {select === 0 && (
          <div className="desc my-8">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Blanditiis
            explicabo doloremque atque vitae minus accusamus provident quidem
            aperiam aliquid molestiae asperiores magni sint, neque vero fugit,
            eius, perspiciatis officia nam?
          </div>
        )}
        {select === 1 && (
          <div className="w-full my-8 overflow-hidden  border border-border">
            <div className="bg-amber-400 px-6 py-4">
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
                    {spec.feature}
                  </div>
                  <div className="md:col-span-5 text-foreground">
                    {spec.description}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        {select === 2 && (
          <div className="desc my-8 w-full">
            {/* //rating */}
            <div className="w-full my-8 overflow-hidden  ">
              <div className=" px-6 py-4">
                <div className="grid grid-cols-5 md:grid-cols-7 gap-4">
                  <div className="col-span-2 flex flex-col items-center justify-center border border-r-1 border-gray-300 h-full w-full font-semibold text-gray-900">
                    <h3>4.9 out of 5</h3>
                    <h1>star</h1>
                    <span> (101 )reviews</span>
                  </div>
                  <div className="font-semibold text-gray-900">Description</div>
                </div>
              </div>
            </div>
            {/* //graph */}
            {/* list */}
          </div>
        )}
      </div>
    </>
  );
}
const specs = [
  { feature: "Material", description: "Cotton" },
  { feature: "Size", description: "S,M,L,XL,XXL,XXXL" },
  { feature: "Color", description: "Brown, Grey, Green, Red, Blue" },
  { feature: "Country of Origin", description: "United States" },
  { feature: "Brand", description: "KD Design" },
];
