"use client";

import DisableScrollRestoration from "@/app/components/DisableScroll";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Payment from "@/app/api/payment/payment";

export default function PaymentPage() {
  const payment = useSelector((state: any) => state.payment?.data || {
    productName: "",
    paymentError: "",
  });

  const [remarks, setRemarks] = useState(payment.productName || "");

  //  debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      if (remarks.length >= 3) {
        Payment.setPaymentProductName(remarks);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [remarks]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setRemarks(value);

    if (value.length < 3)
      Payment.setPaymentError("Remarks must be at least 3 characters.");
    else Payment.setPaymentError("");
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
