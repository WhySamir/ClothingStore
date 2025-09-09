export type Product = {
  id: string | number;
  name: string;
  image: string;
  category: string;
  rating: number;
  price: number;
  originalPrice:number;
  discount: number;
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
  sizes: { size: string; stockQty: number }[];
  reviews: {  rating: number}[];
  tags: { name: string }[];
  hasCountdown?: boolean;
};
