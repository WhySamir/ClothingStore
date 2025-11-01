"use client";

import { useEffect, useState } from "react";
import { Trash2, UserPen } from "lucide-react";
import Image from "next/image";

interface Customer {
  id: string;
  name: string;
  email: string;
  createdAt: string;
  userAvatarUrl: string;
}

export default function CustomersManagement() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCustomers, setSelectedCustomers] = useState<string[]>([]);

  // Fetch customers
  useEffect(() => {
    const getCustomers = async () => {
      try {
        const response = await fetch("/api/private/admin/customers");
        const data = await response.json();
        console.log(data.data);
        setCustomers(data.data || []);
      } catch (error) {
        console.error("Failed to fetch customers:", error);
      } finally {
        setLoading(false);
      }
    };
    getCustomers();
  }, []);

  const toggleSelect = (id: string) => {
    setSelectedCustomers((prev) =>
      prev.includes(id) ? prev.filter((cid) => cid !== id) : [...prev, id]
    );
  };

  const handleDelete = async () => {
    const confirmed = confirm(
      "Do you really want to delete selected customers?"
    );
    if (!confirmed) return;

    try {
      // Delete each selected customer individually
      for (const id of selectedCustomers) {
        const res = await fetch(`/api/private/admin/customers/${id}`, {
          method: "DELETE",
        });

        if (!res.ok) {
          const data = await res.json();
          console.error(`Failed to delete customer ${id}:`, data.message);
        }
      }

      // Remove deleted customers from state
      setCustomers((prev) =>
        prev.filter((c) => !selectedCustomers.includes(c.id))
      );
      setSelectedCustomers([]);
    } catch (err) {
      console.error("Error deleting customers:", err);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen text-gray-300">
        <p>Loading customers...</p>
      </div>
    );
  }

  if (!customers || customers.length === 0) {
    return (
      <div className="flex items-center justify-center h-screen text-gray-400">
        <p>No customers found...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#111111] py-10 text-gray-200">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Customers Management</h1>
        <button
          onClick={handleDelete}
          disabled={selectedCustomers.length === 0}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            selectedCustomers.length === 0
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
          <div className="col-span-3">Name</div>
          <div className="col-span-3">Email</div>
          <div className="col-span-2 text-right">Customer ID</div>
          <div className="col-span-3 text-right">Joined</div>
        </div>

        {/* Data Rows */}
        {customers.map((customer) => (
          <div
            key={customer.id}
            className="grid grid-cols-12 gap-4 px-4 py-4 bg-[#151515] rounded-lg hover:bg-[#1a1a1a] transition-colors"
          >
            {/* Checkbox */}
            <div className="col-span-1 flex items-center">
              <input
                type="checkbox"
                checked={selectedCustomers.includes(customer.id)}
                onChange={() => toggleSelect(customer.id)}
                className="w-4 h-4 cursor-pointer appearance-none rounded-sm border border-gray-400 checked:bg-[#AD46FF] checked:border-[#2A2553]"
              />
            </div>

            {/* Name */}
            <div className="col-span-3 flex  gap-2 items-center">
              <Image
                src={customer.userAvatarUrl}
                alt="customer avatar"
                width={100}
                height={100}
                className="h-8 w-8 rounded-full "
              />
              <p className="font-semibold text-white">{customer.name}</p>
            </div>

            {/* Email */}
            <div className="col-span-3 flex items-center text-sm text-gray-400">
              {customer.email}
            </div>

            {/* Customer ID */}
            <div className="col-span-2 flex items-center justify-end text-sm text-gray-400">
              #{customer.id}
            </div>

            {/* Joined */}
            <div className="col-span-3 flex items-center justify-end text-xs text-gray-500">
              {new Date(customer.createdAt).toLocaleDateString()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
