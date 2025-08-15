"use client";
import { ChevronLeft, ChevronRight, Instagram } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export default function InstagramTestimonials() {
  const [instaHover, setinstaHover] = useState<number | null>(null);
  const instagramImages = [
    "/insta.jpg",
    "/insta3.jpg",
    "/insta1.jpg",
    "/insta2.jpg",
    "/insta5.jpg",
  ];

  return (
    <div className="max-w-7xl mx-auto px-4  md:py-16 space-y-20">
      {/* Instagram Section */}
      <section className="text-center">
        <p className="text-sm text-gray-600 mb-2">Follow Us</p>
        <h2 className="text-3xl font-bold text-gray-900 mb-12">
          Follow Us On Instagram
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3  lg:grid-cols-5 gap-4">
          {instagramImages.map((image, index) => (
            <div
              key={index}
              className="relative place-items-center  group cursor-pointer overflow-hidden rounded-lg"
              onMouseOver={() => setinstaHover(index)}
              onMouseOut={() => setinstaHover(null)}
            >
              <Image
                src={image}
                alt={`Instagram post ${index + 1}`}
                width={288}
                height={256}
                className="w-full max-w-72 h-64 object-cover transition-transform duration-300 group-hover:scale-105"
              />
              {instaHover === index && (
                <div className="absolute inset-0 bg-neutral-900/80 flex items-center justify-center">
                  <Instagram className="w-12 h-12 text-white" />
                </div>
              )}
              {/* <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300" /> */}
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section>
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">
              What Our Clients Say
            </h2>
          </div>

          <div className="flex gap-2">
            <button className="w-10 h-10 bg-yellow-400 border border-yellow-400 hover:bg-yellow-500 text-gray-900 rounded-md flex items-center justify-center transition-colors">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button className="w-10 h-10 bg-amber-900 border border-amber-900 hover:bg-amber-800 text-white rounded-md flex items-center justify-center transition-colors">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
        <div className="bg-white p-4 border border-slate-200 ">
          <div className="py-4 bg-[#f6f6f6] overflow-hidden  ">
            <div className="flex max-w-5xl mx-auto flex-col justify-center overflow-hidden md:flex-row gap-8 md:gap-10 items-center">
              <div className="bg-white relative items-center justify-center w-full max-w-60 md:max-w-64  h-70 md:w-80 md:h-80 flex-shrink-0 shadow-lg overflow-hidden">
                <Image
                  src="/women.png"
                  alt="Leslie Alexander"
                  fill
                  style={{
                    objectFit: "cover",
                    objectPosition: "calc(100% + 60px) center",
                    overflow: "hidden",
                  }}
                  className="items-center xl:ml-5 justify-center w-full flex"
                />
                <div className="relative mb-6">
                  <div className="absolute top-0 right-0 w-12 h-12 bg-yellow-300  flex items-center justify-center">
                    <span className="w-16 leading-none    text-center place-items-center font-bold text-gray-900">
                      <Image
                        src="/quote.svg"
                        alt="Quote"
                        width={32}
                        height={40}
                      />
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex-1">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-8 h-8 fill-yellow-300 text-yellow-400"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                  <span className="ml-2 text-sm font-semibold text-gray-900">
                    5.0
                  </span>
                </div>

                <p className="text-gray-600 max-w-130 text-lg leading-relaxed mb-6">
                  Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                  accusantium doloremque laudantium, totam rem aperiam, eaque
                  ipsa quae illo inventore veritatis et quasi architecto
                </p>

                <div>
                  <h4 className="font-semibold text-gray-900 text-lg">
                    Leslie Alexander
                  </h4>
                  <p className="text-gray-500">Fashion Enthusiast</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
