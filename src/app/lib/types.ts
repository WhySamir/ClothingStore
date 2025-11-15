export type PaymentMethod = "khalti";

export interface PaymentRequestData {
  amount: string;
  productName: string;
  transactionId: string;
  method: PaymentMethod;
}

export interface KhaltiConfigData {
  return_url: string;
  website_url: string;
  amount: number;
  purchase_order_id: string;
  purchase_order_name: string;
  customer_info: {
    name: string;
    email: string;
    phone: string;
  };
}

export interface KhaltiResponse {
  khaltiPaymentUrl: string;
}

export interface DummyDataResponse {
  amount: string;
  productName: string;
  transactionId: string;
}
