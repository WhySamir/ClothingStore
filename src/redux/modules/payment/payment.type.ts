export interface PaymentData {
  amount: string;
  productName: string;
  transactionId: string;
  paymentError: string;
}

export interface PaymentState {
  loading: boolean;
  data: PaymentData;
}
