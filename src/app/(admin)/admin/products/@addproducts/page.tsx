"use client";

import { ProductFormData } from "@/app/lib/validation";
import { Plus } from "lucide-react";
import { useState } from "react";
import Modal from "./modal";

const Page = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddProduct = (data: ProductFormData) => {
    console.log("✅ New Product:", data);
    // TODO: call your API or mutation here
    setIsModalOpen(false); // close modal after submit
  };

  return (
    <div className="flex justify-between items-center">
      <div className="flex flex-col mb-4 ">
        <div>
          <h1 className="text-3xl font-bold leading-12 ">Product Management</h1>
        </div>
        <div className="flex items-center justify-between gap-2">
          <h1 className=" ">Manage your store inventory and product catalog</h1>
        </div>
      </div>
      <button
        onClick={() => setIsModalOpen(true)}
        className="flex items-center px-2 py-2 pr-4 font-semibold rounded-lg bg-purple-500 justify-center bg-accent hover:bg-accent/90"
      >
        <Plus className="h-4 w-4 mr-2" />
        Add Product
      </button>
      {isModalOpen && (
        <Modal
          setIsAddDialogOpen={setIsModalOpen}
          handleAddProduct={handleAddProduct}
        />
      )}
    </div>
  );
};

export default Page;
