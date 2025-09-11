import ReviewForm from "@/app/components/ReviewForm";

export interface ProductDetailsType {
  id: string;
  name: string;
  description: string;
  sellingPrice: string|number;
  discount: number | null;
  categoryId: number;
  stockQty: number;
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


export interface ProductAdditionalDetailsType {
  description: string;
  material: string,
  sizes: { size: string }[],
  colors: { color: string }[],
  originCountry: string,
  brand: string
}

export interface Reviews{
  id:string;
  customer:{
    name:string;
    userAvatarUrl:string;
  }
  
  title:string;
  rating:number;
  comment:string;
  createdAt:Date;
  images:string[];
  verified:boolean;
  videos:string;
}