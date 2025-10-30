"use client";

import { useEffect, useState } from "react";
import { Trash2, UserPen } from "lucide-react";

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

export default function OrdersManagement() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrders, setSelectedOrders] = useState<string[]>([]);

  // Fetch Orders
  useEffect(() => {
    const getOrders = async () => {
      try {
        const response = await fetch("/api/private/admin/order");
        const data = await response.json();
        console.log(data);
        setOrders(data.data || []);
      } catch (error) {
        console.error("Failed to fetch orders:", error);
      } finally {
        setLoading(false);
      }
    };
    getOrders();
  }, []);

  const toggleSelect = (id: string) => {
    setSelectedOrders((prev) =>
      prev.includes(id) ? prev.filter((oid) => oid !== id) : [...prev, id]
    );
  };

  const handleDelete = async () => {
    const confirmed = confirm("Do you really want to delete selected orders?");
    if (!confirmed) return;

    try {
      const res = await fetch("/api/private/admin/order", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ids: selectedOrders }),
      });

      const data = await res.json();
      if (res.ok) {
        setOrders((prev) => prev.filter((o) => !selectedOrders.includes(o.id)));
        setSelectedOrders([]);
      } else {
        console.error("Delete failed:", data.message);
      }
    } catch (err) {
      console.error("Error deleting orders:", err);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen text-gray-300">
        <p>Loading orders...</p>
      </div>
    );
  }

  if (!orders || orders.length === 0) {
    return (
      <div className="flex items-center justify-center h-screen text-gray-400">
        <p>No orders found...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#111111] py-10 text-gray-200">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Orders Management</h1>
        <button
          onClick={handleDelete}
          disabled={selectedOrders.length === 0}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            selectedOrders.length === 0
              ? "bg-gray-600 text-gray-300 cursor-not-allowed"
              : "bg-red-600 hover:bg-red-700 text-white"
          }`}
        >
          <Trash2 size={18} />
          Delete
        </button>
      </div>

      <div className="space-y-3">
        {/* Header Row */}
        <div className="grid grid-cols-12 gap-4 px-4 py-3 bg-[#1f1f1f] text-gray-400 text-sm rounded-lg">
          <div className="col-span-1"></div>
          <div className="col-span-3">Customer</div>
          <div className="col-span-2">Order ID</div>
          <div className="col-span-1 text-right">Items</div>
          <div className="col-span-2 text-right">Total</div>
          <div className="col-span-2 text-right">Status</div>
          <div className="col-span-1 text-right">Date</div>
        </div>

        {/* Data Rows */}
        {orders.map((order) => (
          <div
            key={order.id}
            className="grid grid-cols-12 gap-4 px-4 py-4 bg-[#151515] rounded-lg hover:bg-[#1a1a1a] transition-colors"
          >
            {/* Checkbox */}
            <div className="col-span-1 flex items-center">
              <input
                type="checkbox"
                checked={selectedOrders.includes(order.id)}
                onChange={() => toggleSelect(order.id)}
                className="w-4 h-4 cursor-pointer appearance-none rounded-sm border border-gray-400 checked:bg-[#AD46FF] checked:border-[#2A2553]"
              />
            </div>

            {/* Customer */}
            <div className="col-span-3 flex flex-col justify-center">
              <p className="font-semibold text-white">samir</p>
              <span className="text-xs text-gray-500">shakya</span>
            </div>

            {/* Order ID */}
            <div className="col-span-2 flex items-center text-sm text-gray-400">
              #{order.id}
            </div>

            {/* Items */}
            <div className="col-span-1 flex items-center justify-end text-sm">
              {order.items.length}
            </div>

            {/* Total */}
            <div className="col-span-2 flex items-center justify-end font-bold text-green-400">
              ${Number(order.totalAmount).toFixed(2)}
            </div>

            {/* Status */}
            <div
              className={`col-span-2 flex items-center justify-end font-medium ${
                order.status === "completed"
                  ? "text-green-400"
                  : order.status === "pending"
                  ? "text-yellow-400"
                  : "text-red-400"
              }`}
            >
              {order.status}
            </div>

            {/* Date */}
            <div className="col-span-1 flex items-center justify-end text-xs text-gray-500">
              {new Date(order.createdAt).toLocaleDateString()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
