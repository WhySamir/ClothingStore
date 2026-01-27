import request from "./request";
import { ApiRequestConfig } from "@/types/api";

/**
 * Utility functions for common API patterns
 */

// Helper to create a standard API config
export const createApiConfig = (
  url: string,
  method: "get" | "post" | "put" | "patch" | "delete" = "get",
  options: Partial<ApiRequestConfig> = {}
): ApiRequestConfig => ({
  url,
  method,
  authorization: method !== "get", // Automatically require auth for mutations
  config: {
    showErr: true,
    ...options.config,
  },
  ...options,
});

// Helper for GET requests
export const apiGet = async (url: string, storeKey?: string, params?: any) => {
  return request(
    createApiConfig(url, "get", {
      params,
      authorization: url.includes("/admin") ? true : false,
      config: {
        showErr: true,
        ...(storeKey && {
          store: {
            action: "set",
            key: storeKey,
          },
        }),
      },
    })
  );
};

// Helper for POST requests
export const apiPost = async (
  url: string,
  data: any,
  options: {
    storeKey?: string;
    successMsg?: string;
    storeAction?: "set" | "append" | "prepend";
  } = {}
) => {
  return request(
    createApiConfig(url, "post", {
      data,
      config: {
        showErr: true,
        successMsg: options.successMsg || "Created successfully",
        ...(options.storeKey && {
          store: {
            action: options.storeAction || "prepend",
            key: options.storeKey,
          },
        }),
      },
    })
  );
};

// Helper for PATCH requests
export const apiPatch = async (
  url: string,
  data: any,
  options: {
    storeKey?: string;
    successMsg?: string;
  } = {}
) => {
  return request(
    createApiConfig(url, "patch", {
      data,
      config: {
        showErr: true,
        successMsg: options.successMsg || "Updated successfully",
        ...(options.storeKey && {
          store: {
            action: "update",
            key: options.storeKey,
          },
        }),
      },
    })
  );
};

// Helper for DELETE requests
export const apiDelete = async (
  url: string,
  options: {
    storeKey?: string;
    successMsg?: string;
  } = {}
) => {
  return request(
    createApiConfig(url, "delete", {
      config: {
        showErr: true,
        successMsg: options.successMsg || "Deleted successfully",
        ...(options.storeKey && {
          store: {
            action: "remove",
            key: options.storeKey,
          },
        }),
      },
    })
  );
};

// Helper for file uploads
export const apiUpload = async (
  url: string,
  file: File,
  options: {
    storeKey?: string;
    successMsg?: string;
    additionalData?: any;
  } = {}
) => {
  // Convert file to base64
  const base64 = await new Promise<string>((resolve) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.readAsDataURL(file);
  });

  const [, base64Data] = base64.split(",");
  const extension = file.name.split(".").pop();

  const payload = {
    file: {
      base64: base64Data,
      extension,
    },
    ...options.additionalData,
  };

  return apiPost(url, payload, {
    storeKey: options.storeKey,
    successMsg: options.successMsg || "File uploaded successfully",
  });
};

// Helper for handling async operations with loading states
export const withLoading = async <T>(
  operation: () => Promise<T>,
  loadingCallback?: (loading: boolean) => void
): Promise<T> => {
  try {
    loadingCallback?.(true);
    const result = await operation();
    return result;
  } catch (error) {
    console.error("Operation failed:", error);
    throw error;
  } finally {
    loadingCallback?.(false);
  }
};

// Helper for pagination
export const apiGetPaginated = async (
  url: string,
  page: number = 1,
  limit: number = 10,
  storeKey?: string
) => {
  return apiGet(`${url}?page=${page}&limit=${limit}`, storeKey);
};

const apiHelpers = {
  createApiConfig,
  apiGet,
  apiPost,
  apiPatch,
  apiDelete,
  apiUpload,
  withLoading,
  apiGetPaginated,
};

export default apiHelpers;
