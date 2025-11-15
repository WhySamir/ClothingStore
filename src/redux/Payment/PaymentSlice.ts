// src/redux/payment/paymentSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Helper to generate transaction IDs
const generateId = () => Math.random().toString(36).substring(2, 9);

export interface PaymentState {
  amount: string;
  productName: string;
  transactionId: string;
  paymentError: string;
}

const initialState: PaymentState = {
  amount: "",
  productName: "",
  transactionId: "",
  paymentError: "",
};

export const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {
    setAmount(state, action: PayloadAction<string>) {
      state.amount = action.payload;
    },
    setProductName(state, action: PayloadAction<string>) {
      state.productName = action.payload;
    },
    regenerateTransactionId(state) {
      state.transactionId = `KHALTI-${generateId()}`;
    },
    resetPayment(state) {
      state.amount = "";
      state.productName = "";
      state.transactionId = ``;
    },
    setPaymentError(state, action: PayloadAction<string>) {
      state.paymentError = action.payload;
    },
  },
});

export const {
  setAmount,
  setProductName,
  regenerateTransactionId,
  resetPayment,
  setPaymentError,
} = paymentSlice.actions;

export default paymentSlice.reducer;
