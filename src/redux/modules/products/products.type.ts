import { ProductOrg } from "@/app/components/productcard/productType";

export interface ProductTag {
  id?: string;
  name: string;
}

export interface ProductColor {
  id: string;
  color: string;
  hexCode: string;
  stockQty: number;
}

export interface ProductSize {
  id: string;
  size: string;
  stockQty: number;
}

export interface ProductFeature {
  id?: string;
  key: string;
  value: string;
}

export interface ProductImage {
  id: string;
  url: string;
}

export interface ProductReview {
  id: string;
  createdAt: string;
  rating: number;
  comment: string;
  customer?: {
    name: string;
    image?: string;
  };
}

export interface ProductDetails {
  id: string;
  name: string;
  description: string;
  sellingPrice: string | number;
  mainImgUrl: string;
  stockQty: number;
  discount: number | null;
  categoryId: number;
  tags: ProductTag[];
  colors: ProductColor[];
  sizes: ProductSize[];
  features: ProductFeature[];
  images?: ProductImage[];
  reviews?: ProductReview[];
}

export interface ProductAdditionalDetails {
  material?: string;
  sizes?: Array<{ id: string; size: string }>;
  colors?: Array<{ id: string; color: string; hexCode: string }>;
  originCountry?: string;
  brand?: string;
}

export type { ProductOrg };
