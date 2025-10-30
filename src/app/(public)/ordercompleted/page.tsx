"use client";

import { useEffect, useState } from "react";

interface OrderItem {
  id: string;
  orderId: string;
  productId: string;
  quantity: number;
  price: number;
  couponDiscount: number;
  shippingCost: number;
  taxes: number;
}

interface Order {
  createdAt: string;
  customerId: string;
  id: string;
  items: OrderItem[];
  status: string;
  totalAmount: number;
}

export default function OrderConfirmed() {
  const [order, setOrder] = useState<Order | null>(null);

  useEffect(() => {
    async function fetchLatestOrder() {
      try {
        const res = await fetch("/api/order");
        if (!res.ok) throw new Error("Failed to fetch orders");

        const data = await res.json();
        console.log(data);
        setOrder(data.data[0]);
      } catch (err) {
        console.error(err);
      }
    }

    fetchLatestOrder();
  }, []);

  if (!order)
    return (
      <div className="max-w-7xl mx-auto px-4 py-12 text-center text-gray-600">
        Loading your order...
      </div>
    );

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* Success Icon + Message */}
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold">Your order is completed!</h2>
        <p className="text-gray-600">
          Thank you. Your Order has been received.
        </p>
      </div>

      {/* Order Info Card */}
      <div className="bg-amber-400 shadow p-6 grid grid-cols-1 md:grid-cols-4 items-center gap-6 text-center md:text-left">
        <div>
          <p className="text-sm text-gray-800">Order ID</p>
          <p className="font-semibold text-lg">{order.id}</p>
        </div>

        <div>
          <p className="text-sm text-gray-800">Payment Method</p>
          <p className="font-semibold text-lg">Khalti</p>
        </div>

        <div>
          <p className="text-sm text-gray-800">Transaction ID</p>
          <p className="font-semibold text-lg">{order.id}</p>
        </div>

        <div className="flex flex-col md:items-end">
          <p className="text-sm text-gray-800">Estimated Delivery Date</p>
          <p className="font-semibold text-lg mb-3">{order.createdAt}</p>
          <button className="bg-orange-950 text-white px-5 py-2 rounded-md hover:bg-amber-800 transition">
            Download Invoice
          </button>
        </div>
      </div>

      {/* Optionally display ordered items */}
      {/* <div className="mt-8 bg-white p-6 shadow rounded-md">
        <h3 className="text-lg font-semibold mb-4">Order Items</h3>
        {order?.length > 0 ? (
          order.map((item) => (
            <div key={item.id} className="flex justify-between mb-2">
              <span>{item.id}</span>
              <span>
                {item.status} × ${Number(item.totalAmount).toFixed(2)}
              </span>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No items in this order.</p>
        )}
      </div> */}
    </div>
  );
}
