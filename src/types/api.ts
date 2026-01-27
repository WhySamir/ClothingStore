// API Request Configuration Types
export interface ApiRequestConfig {
  url: string;
  method?: "get" | "post" | "put" | "patch" | "delete";
  data?: any;
  params?: any;
  authorization?: boolean;
  config?: {
    store?: {
      action?: "update" | "reset" | "set" | "remove" | "append" | "prepend";
      key: string;
      loading?: boolean;
    };
    successMsg?: string;
    showErr?: boolean;
    onSuccess?: (data: any) => void;
    onError?: (err: Error, errMsg: string) => void;
  };
}

// API Response Types
export interface ApiResponse<T = any> {
  data: T;
  message?: string;
  errors?: Array<{ message: string }>;
}

// Admin User Type
export interface AdminUser {
  id: number;
  username: string;
  email: string;
  token: string;
  role?: string;
}
