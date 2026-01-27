"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { useProductImage } from "@/app/ProductImageContext";
import { RootState, Actions } from "@/redux/store";
import ProductsApi from "@/app/api/products/productsApi";

interface Images {
  url: string;
}

interface ImageType {
  images: Images[];
  mainImgUrl: string;
}

export default function ImageGallery() {
  const { productId } = useParams<{ productId: string }>();
  const dispatch = useDispatch();

  const [selectedImage, setSelectedImage] = useState(0);
  const { setImages, setMainImgUrl } = useProductImage();

  // Get product images from Redux
  const imagesState = useSelector((state: RootState) => state.productImages);
  const productImages = imagesState?.items || [];
  const isLoading = imagesState?.loading || false;
  const isError = false;

  // Fetch product images on mount
  useEffect(() => {
    if (!productId) return;

    const fetchImages = async () => {
      try {
        const res = await fetch(`/api/products/${productId}/imagegallery`);
        if (!res.ok) {
          window.location.href = "/404";
          return;
        }

        const { data }: { data: ImageType } = await res.json();
        const merged = [data.mainImgUrl, ...data.images.map((img) => img.url)];

        // Set to context
        setImages(data.images.map((img) => img.url));
        setMainImgUrl(data.mainImgUrl);

        // Set to Redux
        dispatch(Actions.set("productImages", merged));
      } catch (err) {
        console.error("Error fetching images:", err);
        dispatch(Actions.set("productImages", []));
      }
    };

    fetchImages();
  }, [productId, dispatch, setImages, setMainImgUrl]);

  const nextImage = () => {
    setSelectedImage((prev) => (prev + 1) % productImages.length);
  };

  const prevImage = () => {
    setSelectedImage(
      (prev) => (prev - 1 + productImages.length) % productImages.length,
    );
  };

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="relative aspect-square bg-gray-100 overflow-hidden">
        {isLoading ? (
          <div className="w-full h-full bg-gray-200 animate-pulse"></div>
        ) : isError ? (
          "Error fetching product image"
        ) : (
          <Image
            src={productImages[selectedImage] || "/placeholder.svg"}
            alt={`Product image ${selectedImage + 1}`}
            fill
            priority
            className="object-cover "
          />
        )}
        <button
          onClick={prevImage}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-yellow-200 border border-yellow-200 text-gray-900 p-2 md:p-4"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={nextImage}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-orange-950 border border-orange-950 hover:bg-orange-900 text-white p-2 md:p-4"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Thumbnails */}
      <div className="flex gap-2">
        {isLoading ? (
          <div className="flex gap-2 animate-pulse">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="w-20 h-20 bg-gray-200 rounded border border-gray-300"
              ></div>
            ))}
          </div>
        ) : isError ? (
          "Error fetching product images"
        ) : (
          productImages.map((url, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(index)}
              className={`relative w-20 h-20 overflow-hidden border-2 ${
                selectedImage === index ? "border-amber-900" : "border-gray-200"
              }`}
            >
              <Image
                src={url || "/placeholder.svg"}
                alt={`Thumbnail ${index + 1}`}
                fill
                className="object-cover"
              />
            </button>
          ))
        )}
      </div>
    </div>
  );
}
