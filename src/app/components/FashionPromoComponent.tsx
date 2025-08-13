import Image from "next/image";
import React from "react";

const FashionPromoComponent = () => {
  return (
    <div className="my-20 flex items-center justify-center ">
      <div className="w-full  bg-[#F6F6F6] overflow-hidden">
        <div className="flex max-w-7xl mx-auto  flex-col md:flex-row">
          {/* Image Section */}
          <div className="lg:w-1/2 relative">
            <div className="w-full max-h-112 lg:max-h-full  lg:h-full  object-cover">
              <Image
                src="/fashion.png"
                alt="Fashion Models"
                width={1200} // natural width of your image
                height={800} // natural height of your image
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          {/* <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent"></div> */}

          {/* Content Section */}
          <div className="lg:w-1/2 p-8 lg:p-12 flex flex-col justify-center">
            {/* Limited Time Badge */}
            <div className="inline-flex items-center  rounded-full text-lg font-medium  w-fit">
              Limited Time Offers
            </div>

            {/* Main Heading */}
            <h1 className="text-2xl md:text-4xl max-w-112 font-bold text-gray-900 mb-4 leading-8 md:leading-12">
              25% Off All Fashion Favorites - Limited Time!
            </h1>

            {/* Description */}
            <p className="text-gray-600 text-lg mb-4 leading-relaxed max-w-md">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt
            </p>

            {/* CTA Button */}
            {/* <button className="group bg-amber-800 hover:bg-amber-900 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 flex items-center justify-center w-fit hover:scale-105 shadow-lg hover:shadow-xl">
              Shop Now
            </button> */}
            <button className="mt-6 px-6 py-3 bg-orange-950 text-white rounded hover:bg-[#4a1800]   flex items-center justify-center w-fit ">
              Shop Now →
            </button>

            {/* Decorative Elements */}
            <div className="absolute top-4 right-4 w-20 h-20 bg-gradient-to-br from-orange-200 to-amber-200 rounded-full opacity-20 blur-xl"></div>
            <div className="absolute bottom-4 left-4 w-16 h-16 bg-gradient-to-br from-amber-200 to-orange-200 rounded-full opacity-20 blur-xl"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FashionPromoComponent;
