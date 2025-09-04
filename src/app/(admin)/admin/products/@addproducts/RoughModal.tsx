import { ProductFormData, productSchema } from "@/app/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { ImagePlus } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";

export const RModal = ({
  setIsAddDialogOpen,
}: {
  setIsAddDialogOpen: (open: boolean) => void;
}) => {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    trigger,
    setValue,
    setError,
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      colors: [
        { color: "", hexCode: "" },
        { color: "", hexCode: "" },
      ],
      imagesMeta: [],
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

  const onSubmit = async (data: ProductFormData) => {
    const valid = await trigger();
    if (!valid) return;

    if (data.colors.length !== data.imagesMeta.length) {
      setError("colors", {
        type: "manual",
        message: `Number of colors (${data.colors.length}) must match number of images (${data.imagesMeta.length})`,
      });
      return;
    }

    const formData = new FormData();
    const { imagesMeta, ...restData } = data;
    formData.append("data", JSON.stringify(restData));

    imagesMeta.forEach((img, index) => {
      if (img.file) formData.append(`images[${index}]`, img.file);
    });

    for (let [key, value] of formData.entries()) {
      console.log(key, value);
    }

    setIsAddDialogOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
      <div className="bg-[#1a1c20] w-full lg:max-w-4xl 2xl:max-w-5xl max-h-[90vh] p-8 text-gray-200 rounded-2xl overflow-y-auto">
        <form onSubmit={handleSubmit(onSubmit)}>
          {errors.root && (
            <div className="mb-4 p-3 bg-red-900/30 border border-red-700 rounded-lg">
              <p className="text-red-400 text-sm">{errors.root.message}</p>
            </div>
          )}
          <div className="grid grid-cols-12 gap-6">
            {/* Colors */}
            <div className="col-span-7 bg-[#212328] p-6 rounded-2xl space-y-6">
              <h3 className="text-lg font-semibold mb-4">Colors</h3>

              {colorFields.map((field, idx) => {
                const colorError = errors.colors?.[idx]?.color;
                const hexError = errors.colors?.[idx]?.hexCode;

                return (
                  <div key={field.id} className="flex flex-col gap-1 mb-2">
                    <div className="flex gap-3">
                      <input
                        {...register(`colors.${idx}.color` as const)}
                        placeholder="Color name"
                        className="flex-1 rounded-lg px-3 py-2 bg-[#2b2d31] border border-gray-600"
                      />
                      <input
                        type="text"
                        {...register(`colors.${idx}.hexCode` as const)}
                        className="w-16 h-10 rounded-lg px-3 py-2 border border-gray-600"
                      />
                    </div>
                    {colorError && (
                      <p className="text-red-500 text-xs">
                        {colorError.message}
                      </p>
                    )}
                    {errors.colors?.message && (
                      <p className="text-red-500 text-xs">
                        {errors.colors.message}
                      </p>
                    )}
                    {hexError && (
                      <p className="text-red-500 text-xs">{hexError.message}</p>
                    )}
                  </div>
                );
              })}
              <button
                type="button"
                onClick={() => {
                  if (colorFields.length < 4) {
                    addColor({ color: "", hexCode: "" });
                  }
                }}
                disabled={colorFields.length >= 4}
                className="mt-2 px-3 py-1 rounded bg-purple-600 hover:bg-purple-700 disabled:bg-gray-600 disabled:cursor-not-allowed"
              >
                {colorFields.length >= 4 ? "Maximum 4 colors" : "Add Color"}
              </button>

              {/* Colors array level error */}
              {errors.colors?.message && (
                <p className="text-red-500 text-xs">{errors.colors.message}</p>
              )}
            </div>

            {/* Images */}
            <div className="col-span-5 flex flex-col bg-[#212328] p-6 rounded-2xl space-y-4">
              <h3 className="text-lg font-semibold">Upload Images</h3>

              <div className="flex gap-3">
                {imgFields.length < 4 && (
                  <label className="aspect-square cursor-pointer w-12 rounded-lg bg-[#2b2d31] flex items-center justify-center border-2 border-dashed border-gray-600 text-gray-400">
                    <ImagePlus size={48} className="text-gray-400 mb-1" />
                    <span className="text-xs text-gray-500">Add Image</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e: any) => {
                        if (e.target.files?.[0]) {
                          const file = e.target.files[0];
                          if (file) addImg({ file, color: "", alt: "" });
                        }
                      }}
                    />
                  </label>
                )}

                {imgFields.map((field, idx) => {
                  const fileObj = field.file;
                  return (
                    <div key={field.id} className="relative w-12 h-12">
                      {fileObj ? (
                        <Image
                          src={URL.createObjectURL(fileObj)}
                          alt="preview"
                          fill
                          className="object-cover rounded-lg border border-gray-600"
                        />
                      ) : (
                        <div className="aspect-square w-12 rounded-lg bg-[#2b2d31] border border-dashed border-gray-600" />
                      )}
                      <button
                        type="button"
                        onClick={() => remove(idx)}
                        className="absolute -top-2 -right-2 bg-red-600 text-white w-5 h-5 flex items-center justify-center rounded-full text-xs"
                      >
                        ✕
                      </button>
                      {errors.imagesMeta?.[idx]?.file && (
                        <p className="text-red-500 text-xs">
                          {errors.imagesMeta[idx]?.file?.message}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Images array level error */}
              {errors.imagesMeta?.message && (
                <p className="text-red-500 text-xs">
                  {errors.imagesMeta.message}
                </p>
              )}
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
