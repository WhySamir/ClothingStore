"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

interface Order {
  id: string;
  status: string;
  totalAmount: number;
  createdAt: string;
}

export default function OrderCompletedInner() {
  const params = useSearchParams();
  const id = params.get("id");

  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) {
      setError("No order ID provided.");
      setLoading(false);
      return;
    }

    async function fetchOrder() {
      try {
        const res = await fetch(`/api/order/${id}`);

        const data = await res.json();

        if (!res.ok) {
          setError(data.message || "Failed to fetch order.");
          setLoading(false);
          return;
        }

        if (!data.data) {
          setError("No order found.");
          setLoading(false);
          return;
        }

        setOrder(data.data);
      } catch (err) {
        console.error(err);
        setError("Something went wrong while fetching the order.");
      } finally {
        setLoading(false);
      }
    }

    fetchOrder();
  }, [id]);

  // Loading state
  if (loading)
    return <div className="p-8 text-center text-xl">Loading order...</div>;

  // If error occurred
  if (error)
    return <div className="p-8 text-center text-xl text-red-500"> {error}</div>;

  // If order is null after loading
  if (!order)
    return <div className="p-8 text-center text-xl"> No order available.</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold">Your order is completed!</h2>
        <p className="text-gray-600">
          Thank you. Your Order has been received.
        </p>
      </div>

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
    </div>
  );
}
