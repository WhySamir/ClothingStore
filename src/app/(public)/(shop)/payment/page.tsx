"use client";

import DisableScrollRestoration from "@/app/components/DisableScroll";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setPaymentProductName,
  setPaymentError,
} from "@/redux/modules/payment/payment.slice";
import type { RootState } from "@/redux/store";

export default function PaymentPage() {
  const dispatch = useDispatch();
  const payment = useSelector(
    (state: RootState) =>
      state.payment?.data || {
        productName: "",
        paymentError: "",
      },
  );

  const [remarks, setRemarks] = useState(payment.productName || "");

  useEffect(() => {
    const timer = setTimeout(() => {
      if (remarks.length >= 3) {
        dispatch(setPaymentProductName(remarks));
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [remarks, dispatch]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setRemarks(value);

    if (value.length < 3)
      dispatch(setPaymentError("Remarks must be at least 3 characters."));
    else dispatch(setPaymentError(""));
  };

  return (
    <>
      <DisableScrollRestoration />
      <div className="bg-white shadow-sm border border-gray-200 rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-6">Select Payment Method</h2>

        <div className="space-y-4">
          <label className="flex items-center gap-3 border rounded-md p-3 cursor-pointer hover:bg-gray-50">
            <input type="radio" name="payment" value="Khalti" defaultChecked />
            <span>Khalti</span>
          </label>

          <div>
            <label className="block text-sm font-medium mb-1">
              Remarks <span className="text-red-500">*</span>
            </label>

            <input
              type="text"
              value={remarks}
              onChange={handleChange}
              placeholder="Ex. Shirt"
              className={`w-full border rounded-md px-3 py-2 focus:outline-none focus:ring ${
                payment.paymentError ? "border-red-500" : "focus:ring-amber-500"
              }`}
            />

            {payment.paymentError && (
              <p className="text-red-500 text-sm mt-1">
                {payment.paymentError}
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
