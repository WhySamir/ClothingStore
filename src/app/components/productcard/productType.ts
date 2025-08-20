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
