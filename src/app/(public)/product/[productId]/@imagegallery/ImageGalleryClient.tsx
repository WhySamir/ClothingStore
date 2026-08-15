"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useParams } from "next/navigation";
import { useProductImage } from "@/app/ProductImageContext";
import { useGetProductImagesQuery } from "@/redux/modules/products/products.api";

export default function ImageGalleryClient({ initialData }: { initialData: any }) {
    const { productId } = useParams<{ productId: string }>();

    const [selectedImage, setSelectedImage] = useState(0);
    const { setImages, setMainImgUrl } = useProductImage();

    const {
        data: fetchedImages,
        isLoading: isFetching,
        error: isError,
    } = useGetProductImagesQuery(productId as string, {
        skip: !productId,
    });

    useEffect(() => {
        if (fetchedImages && fetchedImages.length > 0) {
            setMainImgUrl(fetchedImages[0]);
            setImages(fetchedImages.slice(1));
        } else if (initialData) {
            setMainImgUrl(initialData.mainImgUrl || "");
            setImages(initialData.images?.map((img: any) => img.url) || []);
        }
    }, [fetchedImages, initialData, setImages, setMainImgUrl]);

    const productImages = fetchedImages && fetchedImages.length > 0
        ? fetchedImages
        : initialData ? [initialData.mainImgUrl, ...(initialData.images?.map((img: any) => img.url) || [])] : [];

    const isLoading = isFetching && productImages.length === 0;

    const nextImage = () => {
        if (productImages.length === 0) return;
        setSelectedImage((prev) => (prev + 1) % productImages.length);
    };

    const prevImage = () => {
        if (productImages.length === 0) return;
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
                    <div>Error fetching product image</div>
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
                    <div>Error fetching product images</div>
                ) : (
                    productImages.map((url: string, index: number) => (
                        <button
                            key={index}
                            onClick={() => setSelectedImage(index)}
                            className={`relative w-20 h-20 overflow-hidden border-2 ${selectedImage === index ? "border-amber-900" : "border-gray-200"
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
