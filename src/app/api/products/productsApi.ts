// API helper for products
import { request } from "@/utlis/ApiResponders";
import { ReturnType } from "../types";
import { ProductOrg } from "@/app/components/productcard/productType";

export const fetchWomenProducts = async (): Promise<ProductOrg[]> => {
  try {
    const config: ReturnType = {
      url: "api/products/female",
      method: "get",
      config: {
        showErr: false,
        store: {
          action: "set",
          key: "womenProducts",
        },
      },
    };

    const response = await request(config);
    return response;
  } catch (err: any) {
    throw new Error(err.message || "Network Error");
  }
};

export const fetchMenProducts = async (): Promise<ProductOrg[]> => {
  try {
    const config: ReturnType = {
      url: "api/products/men",
      method: "get",
      config: {
        showErr: false,
        store: {
          action: "set",
          key: "menProducts",
        },
      },
    };

    const response = await request(config);
    return response;
  } catch (err: any) {
    throw new Error(err.message || "Network Error");
  }
};

export const fetchProductById = async (productId: string): Promise<any> => {
  try {
    const config: ReturnType = {
      url: `api/products/${productId}/productdetails`,
      method: "get",
      config: {
        showErr: false,
        store: {
          action: "set",
          key: "productById",
        },
      },
    };

    const response = await request(config);
    return response;
  } catch (err: any) {
    throw new Error(err.message || "Network Error");
  }
};

export const fetchProductDescription = async (
  productId: string,
): Promise<any> => {
  try {
    const config: ReturnType = {
      url: `api/products/${productId}/productdetails`,
      method: "get",
      config: {
        showErr: false,
        store: {
          action: "set",
          key: "productDescription",
        },
      },
    };

    const response = await request(config);
    return response;
  } catch (err: any) {
    throw new Error(err.message || "Network Error");
  }
};

export const fetchProductAdditionalDetails = async (
  productId: string,
): Promise<any> => {
  try {
    const config: ReturnType = {
      url: `api/products/${productId}/additionaldetails`,
      method: "get",
      config: {
        showErr: false,
        store: {
          action: "set",
          key: "productAdditionalDetails",
        },
      },
    };

    const response = await request(config);
    return response;
  } catch (err: any) {
    throw new Error(err.message || "Network Error");
  }
};

export const fetchProductReviews = async (
  productId: string,
): Promise<any[]> => {
  try {
    const config: ReturnType = {
      url: `api/review/${productId}`,
      method: "get",
      config: {
        showErr: false,
        store: {
          action: "set",
          key: "productReviews",
        },
      },
    };

    const response = await request(config);
    return response;
  } catch (err: any) {
    throw new Error(err.message || "Network Error");
  }
};

export const fetchProductImages = async (productId: string): Promise<any[]> => {
  try {
    const config: ReturnType = {
      url: `api/products/${productId}/images`,
      method: "get",
      config: {
        showErr: false,
        store: {
          action: "set",
          key: "productImages",
        },
      },
    };

    const response = await request(config);
    return response;
  } catch (err: any) {
    throw new Error(err.message || "Network Error");
  }
};

const ProductsApi = {
  fetchWomenProducts,
  fetchMenProducts,
  fetchProductById,
  fetchProductDescription,
  fetchProductAdditionalDetails,
  fetchProductReviews,
  fetchProductImages,
};

export default ProductsApi;
