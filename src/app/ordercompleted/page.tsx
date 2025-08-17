// app/(shop)/order-confirmed/page.tsx

"use client";

export default function OrderConfirmed() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* Success Icon + Message */}
      <div className="text-center mb-8">
        {/* <FaCheckCircle className="text-amber-500 text-6xl mx-auto mb-4" /> */}
        <h2 className="text-2xl font-bold">Your order is completed!</h2>
        <p className="text-gray-600">
          Thank you. Your Order has been received.
        </p>
      </div>

      {/* Order Info Card */}
      <div className="bg-amber-400 rounded-lg shadow p-6 grid grid-cols-1 md:grid-cols-4 items-center gap-6 text-center md:text-left">
        {/* Order ID */}
        <div>
          <p className="text-sm text-gray-800">Order ID</p>
          <p className="font-semibold text-lg">#SDGT1254FD</p>
        </div>

        {/* Payment Method */}
        <div>
          <p className="text-sm text-gray-800">Payment Method</p>
          <p className="font-semibold text-lg">Paypal</p>
        </div>

        {/* Transaction ID */}
        <div>
          <p className="text-sm text-gray-800">Transaction ID</p>
          <p className="font-semibold text-lg">TR542SSFE</p>
        </div>

        {/* Delivery Date + Invoice */}
        <div className="flex flex-col md:items-end">
          <p className="text-sm text-gray-800">Estimated Delivery Date</p>
          <p className="font-semibold text-lg mb-3">24 February 2024</p>
          <button className="bg-orange-950 text-white px-5 py-2 rounded-md hover:bg-amber-800 transition">
            Download Invoice
          </button>
        </div>
      </div>
    </div>
  );
}
