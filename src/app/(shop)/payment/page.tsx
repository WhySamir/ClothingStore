// app/(shop)/payment/page.tsx

"use client";

import { useState } from "react";

export default function PaymentPage() {
  const [selected, setSelected] = useState<string>("paypal");

  return (
    <div className="bg-white shadow-sm border border-gray-200 rounded-lg p-6">
      <h2 className="text-2xl font-semibold mb-6">Select Payment Method</h2>

      <div className="space-y-4">
        {/* PayPal */}
        <label className="flex items-center gap-3 border rounded-md p-3 cursor-pointer hover:bg-gray-50">
          <input
            type="radio"
            name="payment"
            value="paypal"
            checked={selected === "paypal"}
            onChange={() => setSelected("paypal")}
          />
          {/* <FaPaypal className="text-blue-600 text-xl" /> */}
          <span>Paypal</span>
        </label>

        {/* Visa */}
        <label className="flex items-center gap-3 border rounded-md p-3 cursor-pointer hover:bg-gray-50">
          <input
            type="radio"
            name="payment"
            value="visa"
            checked={selected === "visa"}
            onChange={() => setSelected("visa")}
          />
          {/* <FaCcVisa className="text-blue-700 text-2xl" /> */}
          <span>**** **** **** 8047</span>
        </label>

        {/* Google Pay */}
        <label className="flex items-center gap-3 border rounded-md p-3 cursor-pointer hover:bg-gray-50">
          <input
            type="radio"
            name="payment"
            value="gpay"
            checked={selected === "gpay"}
            onChange={() => setSelected("gpay")}
          />
          {/* <FaGooglePay className="text-black text-2xl" /> */}
          <span>Google Pay</span>
        </label>

        {/* COD */}
        <label className="flex items-center gap-3 border rounded-md p-3 cursor-pointer hover:bg-gray-50">
          <input
            type="radio"
            name="payment"
            value="cod"
            checked={selected === "cod"}
            onChange={() => setSelected("cod")}
          />
          {/* <FaMoneyBillWave className="text-green-600 text-xl" /> */}
          <span>Cash On Delivery</span>
        </label>

        {/* New Card */}
        <label className="flex items-center gap-3 border rounded-md p-3 cursor-pointer hover:bg-gray-50">
          <input
            type="radio"
            name="payment"
            value="card"
            checked={selected === "card"}
            onChange={() => setSelected("card")}
          />
          <span className="font-medium">Add New Credit/Debit Card</span>
        </label>

        {/* Card Form (only if selected) */}
        {selected === "card" && (
          <div className="border rounded-md p-4 space-y-4 bg-gray-50">
            <div>
              <label className="block text-sm font-medium mb-1">
                Card Holder Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Ex. John Doe"
                className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-amber-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Card Number <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="4716 9627 1635 8047"
                className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-amber-500"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Expiry Date <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="02/30"
                  className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-amber-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  CVV <span className="text-red-500">*</span>
                </label>
                <input
                  type="password"
                  placeholder="000"
                  className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-amber-500"
                  required
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
