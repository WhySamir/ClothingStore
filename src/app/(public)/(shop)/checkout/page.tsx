// app/(shop)/checkout/page.tsx

"use client";

import DisableScrollRestoration from "@/app/components/DisableScroll";
import { useState } from "react";

export default function CheckoutPage() {
  const [sameAsShipping, setSameAsShipping] = useState(true);

  return (
    <>
      <DisableScrollRestoration />
      <div className="bg-white shadow-sm border border-gray-200 rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-6">Billing Details</h2>

        <form className="space-y-5">
          {/* First / Last Name */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                First Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Ex. John"
                className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-amber-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Last Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Ex. Doe"
                className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-amber-500"
                required
              />
            </div>
          </div>

          {/* Company */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Company Name (Optional)
            </label>
            <input
              type="text"
              placeholder="Enter Company Name"
              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-amber-500"
            />
          </div>

          {/* Country */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Country <span className="text-red-500">*</span>
            </label>
            <select className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-amber-500">
              <option>Select Country</option>
              <option>USA</option>
              <option>India</option>
              <option>Canada</option>
            </select>
          </div>

          {/* Street Address */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Street Address <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="Enter Street Address"
              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-amber-500"
              required
            />
          </div>

          {/* City / State */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                City <span className="text-red-500">*</span>
              </label>
              <select className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-amber-500">
                <option>Select City</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                State <span className="text-red-500">*</span>
              </label>
              <select className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-amber-500">
                <option>Select State</option>
              </select>
            </div>
          </div>

          {/* Zip / Phone */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Zip Code <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Enter Zip Code"
                className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-amber-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Phone <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                placeholder="Enter Phone Number"
                className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-amber-500"
                required
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              placeholder="Enter Email Address"
              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-amber-500"
              required
            />
          </div>

          {/* Delivery Address */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Delivery Address *
            </label>
            <div className="flex gap-4">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  checked={sameAsShipping}
                  onChange={() => setSameAsShipping(true)}
                />
                <span>Same as shipping address</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  checked={!sameAsShipping}
                  onChange={() => setSameAsShipping(false)}
                />
                <span>Use a different billing address</span>
              </label>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
