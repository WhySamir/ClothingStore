export interface ProductDetailsType {
  id: string;
  name: string;
  description: string;
  sellingPrice: string|number;
  discount: number | null;
  categoryId: number;
  tags: { name: string }[];
  reviews: { rating: number }[];
  colors: {
    color: string;
    hexCode: string;
    stockQty: number;
  }[];
  sizes: {
    size: string;
    stockQty: number;
  }[];
  features: {
    key: string;
    value: string;
  }[];
}
