// context/ProductImageContext.tsx
"use client";

import { createContext, useContext, useState } from "react";

interface ProductImageContextType {
  images: string[];
  mainImgUrl: string | null;
  setImages: (images: string[]) => void;
  setMainImgUrl: (url: string) => void;
}

const ProductImageContext = createContext<ProductImageContextType | undefined>(
  undefined
);

export function ProductImageProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [images, setImages] = useState<string[]>([]);
  const [mainImgUrl, setMainImgUrl] = useState<string | null>(null);

  return (
    <ProductImageContext.Provider
      value={{ images, mainImgUrl, setImages, setMainImgUrl }}
    >
      {children}
    </ProductImageContext.Provider>
  );
}

export function useProductImage() {
  const ctx = useContext(ProductImageContext);
  if (!ctx)
    throw new Error("useProductImage must be used within ProductImageProvider");
  return ctx;
}
