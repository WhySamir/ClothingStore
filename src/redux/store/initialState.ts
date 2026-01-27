interface ObjectState<T> {
  loading: boolean;
  loadingState: boolean;
  data?: T | null;
  items?: T | null;
}
interface ListState<T> {
  loading: boolean;
  loadingState: boolean;
  data?: T[];
  items?: T[];
  page?: number;
  totalPages?: number;
  totalItems?: number;
}

interface RootState {
  admin: ObjectState<any>;
  cartItems: ObjectState<any>;
  wishlistItems: ObjectState<any>;
  payment: ObjectState<any>;
  womenProducts: ListState<any>;
  menProducts: ListState<any>;
  productById: ObjectState<any>;
  productDescription: ObjectState<any>;
  productAdditionalDetails: ObjectState<any>;
  productReviews: ListState<any>;
  productImages: ListState<any>;
}

const initialState: RootState = {
  admin: {
    loading: true,
    loadingState: true,
    data: {},
  },
  cartItems: {
    loading: true,
    loadingState: true,
    items: [],
  },
  wishlistItems: {
    loading: true,
    loadingState: true,
    items: [],
  },
  payment: {
    loading: false,
    loadingState: true,
    data: {
      amount: "",
      productName: "",
      transactionId: "",
      paymentError: "",
    },
  },
  womenProducts: {
    loading: true,
    loadingState: true,
    items: [],
  },
  menProducts: {
    loading: true,
    loadingState: true,
    items: [],
  },
  productById: {
    loading: true,
    loadingState: true,
    data: null,
  },
  productDescription: {
    loading: true,
    loadingState: true,
    data: null,
  },
  productAdditionalDetails: {
    loading: true,
    loadingState: true,
    data: null,
  },
  productReviews: {
    loading: true,
    loadingState: true,
    items: [],
  },
  productImages: {
    loading: true,
    loadingState: true,
    items: [],
  },
};

export default initialState;
