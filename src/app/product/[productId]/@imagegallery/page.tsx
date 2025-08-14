"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function ImageGallery() {
  const [selectedImage, setSelectedImage] = useState(0);

  const images = ["/coat.png", "/coat.png", "/coat.png", "/coat.png"];

  const nextImage = () => {
    setSelectedImage((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setSelectedImage((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="space-y-4">
      <div className="relative aspect-square bg-gray-100  overflow-hidden">
        <Image
          src={images[selectedImage]}
          alt="Trendy Brown Coat"
          fill
          className="object-cover"
        />
        <button
          onClick={prevImage}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-yellow-200 border border-yellow-200  text-gray-900 p-2 md:p-4 "
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={nextImage}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-amber-900 border border-amber-900 hover:bg-amber-800 text-white  p-2 md:p-4 "
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Thumbnail Images */}
      <div className="flex gap-2">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => setSelectedImage(index)}
            className={`relative w-20 h-20  overflow-hidden border-2 ${
              selectedImage === index ? "border-amber-900" : "border-gray-200"
            }`}
          >
            <Image
              src={image || "/placeholder.svg"}
              alt={`Product view ${index + 1}`}
              fill
              className="object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
