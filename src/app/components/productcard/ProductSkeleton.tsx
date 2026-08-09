import React from "react";

export const ProductSkeleton = () => {
    return (
        <div className="flex-shrink-0 w-72 animate-pulse overflow-hidden shadow-sm bg-white">
            {/* Product Image Skeleton */}
            <div className="relative aspect-[4/5] bg-gray-200"></div>

            {/* Product Info Skeleton */}
            <div className="p-4 space-y-4">
                <div className="flex justify-between items-center">
                    <div className="h-3 w-20 bg-gray-200 rounded"></div>
                    <div className="h-4 w-12 bg-gray-200 rounded"></div>
                </div>

                <div className="h-5 w-56 bg-gray-200 rounded"></div>

                <div className="flex items-center gap-3">
                    <div className="h-7 w-20 bg-gray-200 rounded"></div>
                    <div className="h-4 w-16 bg-gray-200 rounded"></div>
                </div>
            </div>
        </div>
    );
};
