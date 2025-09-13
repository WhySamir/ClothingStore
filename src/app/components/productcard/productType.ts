export type Product = {
  id: string | number;
  name: string;
  mainImgUrl: string;
  categoryId: string;
  sellingPrice:number;
  discount: number;
  tags: { name: string }[];
  reviews: {  rating: number}[];

  hasCountdown?: boolean;
};

export type ProductOrg = {
  id: string | number;
  name: string;
  categoryId: number;
  sellingPrice: string;
  discount: number|null;
  mainImgUrl: string;
  colors: { color: string; hexCode: string; stockQty: number }[];
  features: { key: string; value: string }[];
  sizes: { size: string; stockQty: number }[];
  reviews: {  rating: number}[];
  tags: { name: string }[];
  hasCountdown?: boolean;
};
