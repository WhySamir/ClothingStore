import { createSlice, PayloadAction } from "@reduxjs/toolkit";


type WishlistItem = {
    id: string|number;
    customerId: string;
    createdAt: string;
    product: {
    id: string |number;
    name: string;
    sellingPrice: number;
    mainImgUrl: string;
    colors:{
        id: string|number;
        color: string;
        hexCode: string;
    }[],
    sizes:{
        id: string|number;
        size: string;
        stockQty:number
    }[]
  };
}

interface WishlistState {
  wishlistItems: WishlistItem[];
}

const initialState: WishlistState = {
  wishlistItems: [],
};

export const WishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
     setWishlist: (state, action: PayloadAction<WishlistItem[]>) => {
      state.wishlistItems = action.payload;
    },
    addToWishlist: (state, action: PayloadAction<WishlistItem>) => {
    const exists = state.wishlistItems.find(
    (item) => item.product.id === action.payload.product.id
    );
    if (!exists) {
    state.wishlistItems.push(action.payload);
  }
},
    removeFromWishlist: (state, action: PayloadAction<{ wishlistId: string|number }>) => {
      state.wishlistItems = state.wishlistItems.filter(
        (item) => item.id !== action.payload.wishlistId
      );
    },
    clearWishlist: (state) => {
      state.wishlistItems = [];
    },
  },
});

// Selectors
export const selectWishlistItemCount = (state: { wishlist: WishlistState }) =>
  state.wishlist.wishlistItems.length;

export const {setWishlist, addToWishlist, removeFromWishlist, clearWishlist } =
  WishlistSlice.actions;

export default WishlistSlice.reducer;

    