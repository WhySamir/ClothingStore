import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { PaymentState } from "./payment.type";

const generateId = () => Math.random().toString(36).substring(2, 9);

const initialState: PaymentState = {
  loading: false,
  data: {
    amount: "",
    productName: "",
    transactionId: "",
    paymentError: "",
  },
};

const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {
    setPaymentAmount(state, action: PayloadAction<string>) {
      state.data.amount = action.payload;
    },
    setPaymentProductName(state, action: PayloadAction<string>) {
      state.data.productName = action.payload;
    },
    regeneratePaymentTransactionId(state) {
      state.data.transactionId = `KHALTI-${generateId()}`;
    },
    setPaymentError(state, action: PayloadAction<string>) {
      state.data.paymentError = action.payload;
    },
    resetPayment(state) {
      state.data = {
        amount: "",
        productName: "",
        transactionId: "",
        paymentError: "",
      };
    },
    updatePayment(state, action: PayloadAction<Partial<PaymentState["data"]>>) {
      state.data = { ...state.data, ...action.payload };
    },
  },
});

export const {
  setPaymentAmount,
  setPaymentProductName,
  regeneratePaymentTransactionId,
  setPaymentError,
  resetPayment,
  updatePayment,
} = paymentSlice.actions;

export default paymentSlice.reducer;
