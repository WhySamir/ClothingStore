"use client";

import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProductFormData, productSchema } from "@/app/lib/validation";
import SizesStock from "./SizesStock";
import { ImagePlus, Plus } from "lucide-react";

const sizeOptions = ["XS", "S", "M", "L", "XL", "XXL"];

const Modal = ({
  setIsAddDialogOpen,
  handleAddProduct,
}: {
  setIsAddDialogOpen: (open: boolean) => void;
  handleAddProduct: SubmitHandler<any>;
}) => {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      product: {
        name: "",
        description: "",
        sellingPrice: 0,
        costPrice: 0,
        stockQty: 0,
        categoryId: "",
        brand: "",
        material: "",
        originCountry: "",
      },
      sizes: [{ size: "", stockQty: 0 }],
      colors: [{ color: "", hexCode: "" }],
      features: [{ key: "", value: "" }],
    },
  });

  const { fields: colorFields, append: addColor } = useFieldArray({
    control,
    name: "colors",
  });
  const {
    fields: imgFields,
    append: addImg,
    remove,
  } = useFieldArray({
    control,
    name: "imagesMeta",
  });
  const { fields: featureFields, append: addFeature } = useFieldArray({
    control,
    name: "features",
  });

  const onSubmit = (data: ProductFormData) => {
    const payload = {
      ...data,
      imagesMeta: (data.colors ?? []).map((c) => ({ color: c.color })),
    };
    handleAddProduct(payload);
  };

  async function addDummyProduct() {
    async function fetchImage(url: string, filename: string) {
      const res = await fetch(url);
      const blob = await res.blob();
      return new File([blob], filename, { type: blob.type });
    }
    const mainImageFile = await fetchImage("/review.webp", "review.webp");

    const additionalImages = [
      await fetchImage("/review2.webp", "review2.webp"),
    ];

    const dummyData = {
      product: {
        name: "Vintage Denim Jacket",
        description: "Classic oversized denim jacket with a relaxed fit...",
        sellingPrice: 3200,
        costPrice: 2000,
        stockQty: 12,
        categoryId: "2",
        brand: "Levi's",
        material: "100% Cotton Denim",
        originCountry: "Italy",
      },
      sizes: [
        { size: "S", stockQty: 5 },
        { size: "M", stockQty: 7 },
      ],
      colors: [{ color: "Light Brown", hexCode: "#b7825f" }],
      features: [
        { key: "fit", value: "Oversized" },
        { key: "closure", value: "Button Down" },
        { key: "season", value: "All Season" },
      ],
      imagesMeta: [{ color: "Light Brown" }],
      tags: [{ name: "Jacket" }],
    };

    const formData = new FormData();
    formData.append("data", JSON.stringify(dummyData));
    formData.append("mainImage", mainImageFile);
    additionalImages.forEach((file) => formData.append("images", file));

    try {
      const res = await fetch("/api/private/admin/products", {
        method: "POST",
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsImtpZCI6IlJjZzJqenMxYTlxZmEvNDgiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3pybWNsaW5oeGVuYndsZGFoeHBhLnN1cGFiYXNlLmNvL2F1dGgvdjEiLCJzdWIiOiI1ZmE0ZWMwZC04ZmYxLTQ2NzMtOTQwNy02YzY3ODZlOTg4YWQiLCJhdWQiOiJhdXRoZW50aWNhdGVkIiwiZXhwIjoxNzU2Njc1MDIwLCJpYXQiOjE3NTY2NzE0MjAsImVtYWlsIjoiY3NpdDIzMDgxMDI1X3NhbWlyQGFjaHNuZXBhbC5lZHUubnAiLCJwaG9uZSI6IiIsImFwcF9tZXRhZGF0YSI6eyJwcm92aWRlciI6Imdvb2dsZSIsInByb3ZpZGVycyI6WyJnb29nbGUiXX0sInVzZXJfbWV0YWRhdGEiOnsiYXZhdGFyX3VybCI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS9hL0FDZzhvY0oxVkY5OGE0Qm1rLWFPWUxCU0d1dlQwdE82eERxeU9Fd1YxUkdZVW1RVFZwRnR2Q2c9czk2LWMiLCJjdXN0b21fY2xhaW1zIjp7ImhkIjoiYWNoc25lcGFsLmVkdS5ucCJ9LCJlbWFpbCI6ImNzaXQyMzA4MTAyNV9zYW1pckBhY2hzbmVwYWwuZWR1Lm5wIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImZ1bGxfbmFtZSI6IlNhbWlyIFNoYWt5YSIsImlzcyI6Imh0dHBzOi8vYWNjb3VudHMuZ29vZ2xlLmNvbSIsIm5hbWUiOiJTYW1pciBTaGFreWEiLCJwaG9uZV92ZXJpZmllZCI6ZmFsc2UsInBpY3R1cmUiOiJodHRwczovL2xoMy5nb29nbGV1c2VyY29udGVudC5jb20vYS9BQ2c4b2NKMVZGOThhNEJtay1hT1lMQlNHdXZUMHRPNnhEcXlPRXdWMVJHWVVtUVRWcEZ0dkNnPXM5Ni1jIiwicHJvdmlkZXJfaWQiOiIxMTEwNTUzOTU1MjAwNzY5NDAxNDMiLCJyb2xlIjoiYWRtaW4iLCJzdWIiOiIxMTEwNTUzOTU1MjAwNzY5NDAxNDMifSwicm9sZSI6ImF1dGhlbnRpY2F0ZWQiLCJhYWwiOiJhYWwxIiwiYW1yIjpbeyJtZXRob2QiOiJvYXV0aCIsInRpbWVzdGFtcCI6MTc1NjY2Nzg4Nn1dLCJzZXNzaW9uX2lkIjoiYWI5MDY1MGMtNjg5NS00YWE5LTlkNGUtZWEzOTRkZDk4NjExIiwiaXNfYW5vbnltb3VzIjpmYWxzZX0.PbBW7_LAJzVPFkuxr2AdEGSgdU8xPYZmJz1IAQYHzR0",
        },
        body: formData,
      });

      const json = await res.json();
      console.log("Response:", json);
    } catch (err) {
      console.error("Error adding product:", err);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
      <div className="bg-[#1a1c20] w-full lg:max-w-4xl 2xl:max-w-5xl max-h-[90vh] p-8 text-gray-200 rounded-2xl overflow-y-auto">
        <form onSubmit={handleSubmit(onSubmit)} className="">
          <div className="grid grid-cols-12 gap-6">
            {/* General Information */}
            <div className="col-span-7 bg-[#212328] p-6 rounded-2xl space-y-6">
              <h3 className="text-lg font-semibold">General Information</h3>

              <div className="space-y-2">
                <label className="text-sm">Product Name</label>
                <input
                  {...register("product.name")}
                  placeholder="Enter product name"
                  className="w-full rounded-lg px-3 py-2 bg-[#2b2d31] border border-gray-600"
                />
                {errors.product?.costPrice && (
                  <p className="text-red-500 text-xs">
                    {errors.product?.name?.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm">Description</label>
                <textarea
                  {...register("product.description")}
                  placeholder="Enter product description"
                  className="w-full rounded-lg px-3 py-2 bg-[#2b2d31] border border-gray-600"
                />
              </div>

              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="text-sm">Brand</label>
                  <input
                    {...register("product.brand")}
                    placeholder="Brand name"
                    className="w-full rounded-lg px-3 py-2 bg-[#2b2d31] border border-gray-600"
                  />
                </div>
                <div className="flex-1">
                  <label className="text-sm">Material</label>
                  <input
                    {...register("product.material")}
                    placeholder="Material"
                    className="w-full rounded-lg px-3 py-2 bg-[#2b2d31] border border-gray-600"
                  />
                </div>
              </div>

              <div className="flex-1">
                <label className="text-sm">Origin Country</label>
                <input
                  {...register("product.originCountry")}
                  placeholder="e.g. Italy"
                  className="w-full rounded-lg px-3 py-2 bg-[#2b2d31] border border-gray-600"
                />
              </div>
            </div>

            {/* Upload Image */}
            <div className="col-span-5 flex flex-col bg-[#212328] p-6 rounded-2xl space-y-4">
              <h3 className="text-lg font-semibold">Upload Image</h3>
              <div className="aspect-square rounded-xl bg-[#2b2d31] flex flex-col items-center justify-center border-2 border-dashed border-gray-600">
                <ImagePlus size={48} className="text-gray-400 mb-1" />
                <span className="text-xs text-gray-500">
                  Upload Hero Image{" "}
                </span>
              </div>
              <div className="flex gap-3">
                {/* Add button */}
                {imgFields.length < 4 && (
                  <div
                    onClick={() => addImg({ image: "" })}
                    className="aspect-square cursor-pointer w-12 rounded-lg bg-[#2b2d31] 
                 flex items-center justify-center border-2 border-dashed border-gray-600 text-gray-400"
                  >
                    +
                  </div>
                )}

                {/* Render image fields */}
                {imgFields.map((field, idx) => (
                  <div key={field.id} className="relative">
                    <input
                      type="text"
                      {...register(`imagesMeta.${idx}.image`)}
                      className="aspect-square outline-none cursor-pointer w-12 rounded-lg bg-[#2b2d31] 
                 flex items-center justify-center border-2 border-dashed border-gray-600 text-gray-400"
                    />
                    <button
                      type="button"
                      onClick={() => remove(idx)}
                      className="absolute -top-2 -right-2 bg-red-600 text-white w-5 h-5 
                   flex items-center justify-center rounded-full text-xs"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/* Sizes */}
          <div className="my-6 grid grid-cols-12 gap-6">
            <div className="col-span-7 bg-[#212328] p-6 rounded-2xl space-y-6">
              {/* <h3 className="text-lg font-semibold mb-4">Sizes & Stock</h3> */}
              <div className="col-span-7">
                <SizesStock register={register} />
              </div>
            </div>
            <div className="col-span-5 flex flex-col bg-[#212328] p-6 rounded-2xl space-y-4">
              <h3 className="text-lg font-semibold mb-4">Gender</h3>
              <div className="flex flex-col gap-2">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    value={1}
                    {...register("product.categoryId")}
                    className="accent-[#212328]"
                  />
                  Male
                </label>

                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    value={2}
                    {...register("product.categoryId")}
                    className="accent-[#212328]"
                  />
                  Female
                </label>
              </div>
            </div>
          </div>
          {/* Colors */}
          <div className="mb-6 grid grid-cols-12 gap-6">
            <div className="col-span-7 bg-[#212328] p-6 rounded-2xl space-y-6">
              <h3 className="text-lg font-semibold mb-4">Colors</h3>

              {colorFields.map((field, idx) => (
                <div key={field.id} className="flex gap-3 mb-2">
                  <input
                    {...register(`colors.${idx}.color`)}
                    placeholder="Color name"
                    className="flex-1 rounded-lg px-3 py-2 bg-[#2b2d31] border border-gray-600"
                  />
                  <input
                    type="color"
                    {...register(`colors.${idx}.hexCode`)}
                    className="w-16 h-10 rounded-lg"
                  />
                </div>
              ))}
              <button
                type="button"
                onClick={() => addColor({ color: "", hexCode: "" })}
                className="mt-2 px-3 py-1 rounded bg-purple-600 hover:bg-purple-700"
              >
                Add Color
              </button>
            </div>

            {/* Features */}
            <div className="col-span-5  bg-[#212328] p-6 rounded-2xl space-y-4">
              <h3 className="text-lg font-semibold mb-4">Features</h3>

              {featureFields.map((field, idx) => (
                <div key={field.id} className="flex flex-col gap-3 mb-2">
                  <input
                    {...register(`features.${idx}.key`)}
                    placeholder="Key (e.g. Fit)"
                    className="flex-1 rounded-lg px-3 py-2 bg-[#2b2d31] border border-gray-600"
                  />
                  <input
                    {...register(`features.${idx}.value`)}
                    placeholder="Value (e.g. Oversized)"
                    className="flex-1 rounded-lg px-3 py-2 bg-[#2b2d31] border border-gray-600"
                  />
                </div>
              ))}
              <button
                type="button"
                onClick={() => addFeature({ key: "", value: "" })}
                className="mt-2 px-3 py-1 rounded bg-purple-600 hover:bg-purple-700"
              >
                Add Feature
              </button>
            </div>
          </div>
          {/* Pricing & Stock */}
          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-7 bg-[#212328] p-6 rounded-2xl space-y-4">
              <h3 className="text-lg font-semibold">Pricing and Stock</h3>
              <div className="">
                <div className="w-fit mb-1">
                  <label className="text-sm">Actual Price</label>
                  <input
                    min={0}
                    type="number"
                    {...register("product.costPrice")}
                    className="w-full rounded-lg px-3 py-2 bg-[#2b2d31] border border-gray-600"
                  />
                </div>
                <div className="w-fit">
                  <label className="text-sm">Selling Price</label>
                  <input
                    min={0}
                    type="number"
                    {...register("product.sellingPrice")}
                    className="w-full rounded-lg px-3 py-2 bg-[#2b2d31] border border-gray-600"
                  />
                </div>
              </div>
            </div>
            <div className="col-span-5  bg-[#212328] p-6 rounded-2xl space-y-4">
              <div>
                <label className="text-sm ">Category</label>
                <input
                  type="text"
                  className="w-full rounded-lg mt-1 px-3 py-2 bg-[#2b2d31] border border-gray-600"
                />
              </div>
            </div>
          </div>
          {/* Actions */}
          <div className="col-span-12 mt-4 flex justify-end gap-3">
            <button
              type="button"
              onClick={() => setIsAddDialogOpen(false)}
              className="px-5 py-2 rounded-lg bg-gray-700 hover:bg-gray-600"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                addDummyProduct();
              }}
              type="button"
              className="px-5 py-2 rounded-lg bg-purple-600 hover:bg-purple-700"
            >
              Add Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;
