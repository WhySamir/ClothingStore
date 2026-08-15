// ─── Cart Item Shapes ────────────────────────────────────────────────────────

export interface CartProduct {
  id: string;
  name: string;
  sellingPrice: string | number;
  mainImgUrl: string;
  stockQty: number;
}

export interface CartColor {
  id: string;
  color: string;
  hexCode: string;
  stockQty: number;
}

export interface CartSize {
  id: string;
  size: string;
  stockQty: number;
}

export interface CartItem {
  id: string;
  itemQty: number;
  createdAt: string;
  product: CartProduct;
  color: CartColor;
  size: CartSize;
}

// ─── API Request / Response Shapes ───────────────────────────────────────────

export interface AddToCartRequest {
  productId: string;
  colorId: string;
  sizeId: string;
  itemQty: number;
}

export interface UpdateCartRequest {
  cartId: string;
  itemQty: number;
}

export interface DeleteCartRequest {
  cartId: string;
}

export interface CartApiResponse<T = unknown> {
  success?: boolean;
  message?: string;
  data?: T;
}

// ─── Slice State ─────────────────────────────────────────────────────────────

export interface CartState {
  /** Optimistic "pending add" IDs — can be expanded as needed */
  pendingIds: string[];
}
