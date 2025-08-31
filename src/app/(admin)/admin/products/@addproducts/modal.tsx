"use client";

import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProductFormData, productSchema } from "@/app/lib/validation";
import { useState } from "react";

const categories = ["Coats", "Shirts", "Dresses", "Sweaters", "Pants"];
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

  const { fields: sizeFields, append: addSize } = useFieldArray({
    control,
    name: "sizes",
  });
  const { fields: colorFields, append: addColor } = useFieldArray({
    control,
    name: "colors",
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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
      <div className="bg-[#1a1c20] w-full lg:max-w-4xl 2xl:max-w-5xl max-h-[90vh] p-8 text-gray-200 rounded-2xl overflow-y-auto">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-12 gap-6"
        >
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
            <div className="aspect-square rounded-xl bg-[#2b2d31] flex items-center justify-center border-2 border-dashed border-gray-600">
              <span className="text-gray-500">Upload Hero Image </span>
            </div>
          </div>

          {/* Sizes */}
          <div className="col-span-12 bg-[#212328] p-6 rounded-2xl">
            <h3 className="text-lg font-semibold mb-4">Sizes & Stock</h3>
            <div className="grid grid-cols-6 gap-3">
              {sizeFields.map((field, idx) => (
                <div
                  key={field.id}
                  className="p-3 rounded-lg bg-[#2b2d31] text-gray-300"
                >
                  <label className="block font-semibold">
                    {sizeOptions[idx]}
                  </label>
                  <input
                    type="hidden"
                    {...register(`sizes.${idx}.size`)}
                    value={sizeOptions[idx]} // lock in the size label
                  />
                  <input
                    type="number"
                    min={0}
                    {...register(`sizes.${idx}.stockQty`, {
                      valueAsNumber: true,
                    })}
                    placeholder="Stock"
                    className="mt-2 w-full rounded-md px-2 py-1 bg-[#1a1c20] border border-gray-600 text-gray-200 text-sm"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Colors */}
          <div className="col-span-12 bg-[#212328] p-6 rounded-2xl">
            <h3 className="text-lg font-semibold mb-4">Colors</h3>
            <button
              type="button"
              onClick={() => addColor({ color: "", hexCode: "" })}
              className="mt-2 px-3 py-1 rounded bg-purple-600 hover:bg-purple-700"
            >
              + Add Color
            </button>
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
              + Add Color
            </button>
          </div>

          {/* Features */}
          <div className="col-span-12 bg-[#212328] p-6 rounded-2xl">
            <h3 className="text-lg font-semibold mb-4">Features</h3>
            <button
              type="button"
              onClick={() => addFeature({ key: "", value: "" })}
              className="mt-2 px-3 py-1 rounded bg-purple-600 hover:bg-purple-700"
            >
              + Add Feature
            </button>
            {featureFields.map((field, idx) => (
              <div key={field.id} className="flex gap-3 mb-2">
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
          </div>

          {/* Pricing & Stock */}
          <div className="col-span-12 bg-[#212328] p-6 rounded-2xl space-y-4">
            <h3 className="text-lg font-semibold">Pricing and Stock</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm">Current Price</label>
                <input
                  type="number"
                  {...register("product.costPrice")}
                  className="w-full rounded-lg px-3 py-2 bg-[#2b2d31] border border-gray-600"
                />
              </div>
              <div>
                <label className="text-sm">Total Stock</label>
                <input
                  type="number"
                  {...register("product.stockQty")}
                  className="w-full rounded-lg px-3 py-2 bg-[#2b2d31] border border-gray-600"
                />
              </div>
              <div>
                <label className="text-sm">Category</label>
                <select
                  {...register("product.categoryId")}
                  className="w-full rounded-lg px-3 py-2 bg-[#2b2d31] border border-gray-600"
                >
                  <option value="">Select category</option>
                  {categories.map((cat, i) => (
                    <option key={i} value={i + 1} className="bg-[#1a1c20]">
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="col-span-12 flex justify-end gap-3">
            <button
              type="button"
              onClick={() => setIsAddDialogOpen(false)}
              className="px-5 py-2 rounded-lg bg-gray-700 hover:bg-gray-600"
            >
              Cancel
            </button>
            <button
              type="submit"
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
