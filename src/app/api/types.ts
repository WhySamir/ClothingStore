// Re-export from the main types file for backward compatibility
export type {
  ApiRequestConfig as ReturnType,
  ApiResponse,
  AdminUser,
} from "@/types/api";

// Keep the old Config interface for backward compatibility
export interface Config {
  store?: {
    action?: "update" | "reset" | "set" | "remove" | "append" | "prepend";
    key: string;
    loading?: boolean;
  };
  successMsg?: string;
  showErr?: boolean;
  onSuccess?: (data: any) => void;
  onError?: (err: Error, errMsg: string) => void;
}
