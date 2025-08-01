import React from "react";

export default function LandingPage() {
  return (
    <>
      <section className="relative bg-[#F6F6F6]  min-h-[88dvh]  flex items-center ">
        {/* Dotted Background Decorations */}
        <img
          src="/dts"
          alt="decoration"
          className="absolute top-0  left-1/2 -translate-x-1/2 w-32 h-16"
        />
        <img
          src="/dts-bottom-left.png"
          alt="decoration"
          className="absolute bottom-0 left-1/4 translate-y-1/2 w-32 h-16"
        />

        <div className="max-w-7xl mx-auto px-6 pt-4  grid grid-cols-1 md:grid-cols-2  items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-white px-4 py-1.5 rounded-full shadow">
              <span className="text-xl font-semibold text-yellow-800">
                50% OFF
              </span>
              <span className="text-xl  text-black">Summer Super Sale</span>
            </div>

            <h1 className="mt-6 max-w-112 text-4xl font-bold leading-tight tracking-tight text-gray-900">
              Step into Style: Your
            </h1>
            <h1 className="my-2 text-4xl font-bold leading-tight tracking-tight text-gray-900">
              Ultimate Fashion Destination{" "}
            </h1>

            <p className="mt-4 text-gray-600 leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore.
            </p>
            <button className="mt-6 px-6 py-3 bg-orange-950 text-white rounded hover:bg-[#4a1800] transition">
              Shop Now →
            </button>
          </div>

          {/* Right Image & Callout */}
          <div className="relative">
            <div className="relative flex items-center justify-end md:h-[86dvh] w-full">
              <img
                src="/heroine.png"
                alt="Model with sunglasses"
                className="w-full h-full    md:max-w-[31.25rem] "
              />
            </div>
            {/* Callout Circle */}
            {/* <div className="absolute top-10 right-4 text-center">
              <div className="bg-yellow-400 w-24 h-24 rounded-full flex items-center justify-center shadow-lg">
                <img src="/sunglasses.png" alt="Sunglasses" className="w-10" />
              </div>
              <p className="text-xs text-gray-700 mt-2 w-24 rotate-[20deg]">
                UNIQUE AND GORGEOUS DESIGN
              </p>
            </div> */}
          </div>
        </div>
      </section>
      <article className="h-[80vh] bg-black"></article>
    </>
  );
}
