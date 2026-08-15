// ─── Wishlist Item Shapes ─────────────────────────────────────────────────────

export interface WishlistProduct {
  id: string;
  name: string;
  sellingPrice: string | number;
  mainImgUrl: string;
  colors?: Array<{ color: string }>;
  sizes?: Array<{ size: string; stockQty: number }>;
}

export interface WishlistItem {
  id: string;
  createdAt: string;
  product: WishlistProduct;
}

// ─── API Request / Response Shapes ───────────────────────────────────────────

export interface AddToWishlistRequest {
  productId: string;
}

export interface RemoveFromWishlistRequest {
  wishlistId: string;
}

// ─── Slice State ─────────────────────────────────────────────────────────────

export interface WishlistState {
  /** Optimistic "pending add" product IDs */
  pendingProductIds: string[];
}
