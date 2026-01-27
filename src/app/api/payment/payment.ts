// api/payment.ts
import { store, Actions } from "@/redux/store/index";

// Helper to generate transaction IDs
const generateId = () => Math.random().toString(36).substring(2, 9);

export const setPaymentAmount = (amount: string) => {
  const currentPayment = store.getState().payment?.data || {};
  store.dispatch(
    Actions.set("payment", {
      ...currentPayment,
      amount,
    })
  );
};

export const setPaymentProductName = (productName: string) => {
  const currentPayment = store.getState().payment?.data || {};
  store.dispatch(
    Actions.set("payment", {
      ...currentPayment,
      productName,
    })
  );
};

export const regeneratePaymentTransactionId = () => {
  const currentPayment = store.getState().payment?.data || {};
  store.dispatch(
    Actions.set("payment", {
      ...currentPayment,
      transactionId: `KHALTI-${generateId()}`,
    })
  );
};

export const setPaymentError = (error: string) => {
  const currentPayment = store.getState().payment?.data || {};
  store.dispatch(
    Actions.set("payment", {
      ...currentPayment,
      paymentError: error,
    })
  );
};

export const resetPayment = () => {
  store.dispatch(
    Actions.set("payment", {
      amount: "",
      productName: "",
      transactionId: "",
      paymentError: "",
    })
  );
};

export const updatePayment = (data: Partial<{
  amount: string;
  productName: string;
  transactionId: string;
  paymentError: string;
}>) => {
  const currentPayment = store.getState().payment?.data || {};
  store.dispatch(
    Actions.update("payment", {
      ...currentPayment,
      ...data,
    })
  );
};

const Payment = {
  setPaymentAmount,
  setPaymentProductName,
  regeneratePaymentTransactionId,
  setPaymentError,
  resetPayment,
  updatePayment,
};

export default Payment;

