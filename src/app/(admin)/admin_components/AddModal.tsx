import { ProductFormData, productSchema } from "@/app/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { ImagePlus } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import SizesStock from "../admin/products/@addproducts/SizesStock";

export const AddModal = ({
  setIsAddDialogOpen,
}: {
  setIsAddDialogOpen: (open: boolean) => void;
}) => {
  const {
    control,
    register,
    handleSubmit,
    setValue,
    trigger,
    setError,
    formState: { errors },
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      product: {
        name: "",
      },
      mainImage: undefined,
      colors: [
        { color: "", hexCode: "" },
        { color: "", hexCode: "" },
      ],
      imagesMeta: [],
      features: [{ key: "", value: "" }],
    },
  });

  const [heroImage, setHeroImage] = useState<File | null>(null);
  const [noImage, setNoImage] = useState<boolean>(false);

  type imgFields = { image: File };
  const {
    fields: imgFields,
    append: addImg,
    remove,
  } = useFieldArray({
    control,
    name: "imagesMeta",
  });
  const {
    fields: colorFields,
    append: addColor,
    // remove: removeColor,
  } = useFieldArray({
    control,
    name: "colors",
  });

  const {
    fields: featureFields,
    append: addFeature,
    // remove: removeFeature,
  } = useFieldArray({
    control,
    name: "features",
  });

  const onSubmit = async (data: ProductFormData) => {
    const valid = await trigger();
    if (!valid) return;
    if (!heroImage) {
      setNoImage(true);
      return;
    }
    setNoImage(false);

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

    if (heroImage) formData.append("mainImage", heroImage);

    imagesMeta.forEach((img, index) => {
      if (img.file) {
        formData.append(`images[${index}]`, img.file);
      }
    });
    for (let [key, value] of formData.entries()) {
      console.log(key, value);
    }
    setIsAddDialogOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
      <div className="bg-[#1a1c20] w-full lg:max-w-4xl 2xl:max-w-5xl max-h-[90vh] p-8 text-gray-200 rounded-2xl overflow-y-auto">
        <form onSubmit={handleSubmit(onSubmit)} className="">
          {errors.root && (
            <div className="mb-4 p-3 bg-red-900/30 border border-red-700 rounded-lg">
              <p className="text-red-400 text-sm">{errors.root.message}</p>
            </div>
          )}
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
                {errors.product?.name && (
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
                {errors.product?.description && (
                  <p className="text-red-500 text-xs">
                    {errors.product?.description?.message}
                  </p>
                )}
              </div>

              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="text-sm">Brand</label>
                  <input
                    {...register("product.brand")}
                    placeholder="Brand name"
                    className="w-full rounded-lg px-3 py-2 bg-[#2b2d31] border border-gray-600"
                  />
                  {errors.product?.brand && (
                    <p className="text-red-500 text-xs">
                      {errors.product?.brand?.message}
                    </p>
                  )}
                </div>
                <div className="flex-1">
                  <label className="text-sm">Material</label>
                  <input
                    {...register("product.material")}
                    placeholder="Material"
                    className="w-full rounded-lg px-3 py-2 bg-[#2b2d31] border border-gray-600"
                  />
                  {errors.product?.material && (
                    <p className="text-red-500 text-xs">
                      {errors.product?.material?.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex-1">
                <label className="text-sm">Origin Country</label>
                <input
                  {...register("product.originCountry")}
                  placeholder="e.g. Italy"
                  className="w-full rounded-lg px-3 py-2 bg-[#2b2d31] border border-gray-600"
                />
                {errors.product?.originCountry && (
                  <p className="text-red-500 text-xs">
                    {errors.product?.originCountry?.message}
                  </p>
                )}
              </div>
            </div>
            {/* ________________________________- */}

            {/* upload image */}
            <div className="col-span-5 flex flex-col bg-[#212328] p-6 rounded-2xl space-y-4">
              <h3 className="text-lg font-semibold">Upload Image</h3>

              {/* ________________________________- */}
              {/* mainImage */}

              <label className="uploadHero aspect-square rounded-xl bg-[#2b2d31] flex flex-col items-center justify-center border-2 border-dashed border-gray-600">
                {heroImage ? (
                  <div className="relative w-full h-full">
                    <Image
                      src={URL.createObjectURL(heroImage)}
                      alt="Hero"
                      fill
                      className="object-cover rounded-xl"
                    />
                    <button
                      type="button"
                      onClick={() => setHeroImage(null)}
                      className="absolute -top-2 -right-2 bg-red-600 text-white w-5 h-5 
                               flex items-center justify-center rounded-full text-xs"
                    >
                      ✕
                    </button>
                  </div>
                ) : (
                  <>
                    {" "}
                    <ImagePlus size={48} className="text-gray-400 mb-1" />
                    <span
                      className={`text-xs ${
                        noImage ? "text-red-500" : "text-gray-500"
                      }`}
                    >
                      Upload Hero Image
                    </span>
                  </>
                )}
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      setValue("mainImage", file, { shouldValidate: true });
                      setHeroImage(file); // for preview
                    }
                  }}
                />
              </label>
              {errors.mainImage && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.mainImage.message}
                </p>
              )}

              <div className="flex gap-3">
                {imgFields.length < 4 && (
                  <label className="aspect-square cursor-pointer w-12 rounded-lg bg-[#2b2d31] flex items-center justify-center border-2 border-dashed border-gray-600 text-gray-400">
                    <div className="text-gray-400 text-lg">+</div>
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

              {/* Per-item errors */}
              {errors.imagesMeta &&
                Array.isArray(errors.imagesMeta) &&
                errors.imagesMeta.map((imgError, index) => {
                  if (imgError?.file?.message) {
                    return (
                      <p key={index} className="text-red-500 text-xs">
                        {imgError.file.message}
                      </p>
                    );
                  }
                  return null;
                })}
            </div>
          </div>
          {/* ________________________________ */}
          {/* sizes stocks and gender */}
          <div className="my-6 grid grid-cols-12 gap-6">
            <div className="col-span-7 bg-[#212328] p-6 rounded-2xl space-y-6">
              {/* <h3 className="text-lg font-semibold mb-4">Sizes & Stock</h3> */}
              <div className="col-span-7">
                <SizesStock register={register} />
                {errors.sizes && (
                  <p className="text-red-500 text-xs">
                    {errors.sizes?.message}
                  </p>
                )}
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
                {errors.product?.categoryId && (
                  <p className="text-red-500 text-xs">
                    {errors.product?.categoryId?.message}
                  </p>
                )}
              </div>
            </div>
          </div>
          {/* ________________________________ */}
          {/* feature and colors */}
          <div className="mb-6 grid grid-cols-12 gap-6">
            {/* colors */}
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

            {/*  Features */}
            <div className="col-span-5 bg-[#212328] p-6 rounded-2xl space-y-4">
              <h3 className="text-lg font-semibold mb-4">Features</h3>

              {featureFields.map((field, idx) => (
                <div key={field.id} className="flex flex-col gap-1 mb-2">
                  <input
                    {...register(`features.${idx}.key` as const)}
                    placeholder="Key (e.g. Fit)"
                    className="flex-1 rounded-lg px-3 py-2 bg-[#2b2d31] border border-gray-600"
                  />
                  {errors.features?.[idx]?.key && (
                    <p className="text-red-500 text-xs">
                      {errors.features[idx]?.key?.message}
                    </p>
                  )}

                  <input
                    {...register(`features.${idx}.value` as const)}
                    placeholder="Value (e.g. Oversized)"
                    className="flex-1 rounded-lg px-3 py-2 bg-[#2b2d31] border border-gray-600"
                  />
                  {errors.features?.[idx]?.value && (
                    <p className="text-red-500 text-xs">
                      {errors.features[idx]?.value?.message}
                    </p>
                  )}
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

          {/* ________________________________ */}
          {/* price and tags */}
          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-7 bg-[#212328] p-6 rounded-2xl space-y-4">
              <h3 className="text-lg font-semibold">Pricing and Stock</h3>
              <div className="">
                <div className="w-fit mb-1">
                  <label className="text-sm">Actual Price</label>
                  <input
                    min={0}
                    type="number"
                    {...register("product.costPrice", { valueAsNumber: true })}
                    className="w-full rounded-lg px-3 py-2 bg-[#2b2d31] border border-gray-600"
                  />
                  {errors.product?.costPrice && (
                    <p className="text-red-500 text-xs">
                      {errors.product.costPrice.message}
                    </p>
                  )}
                </div>
                <div className="w-fit">
                  <label className="text-sm">Selling Price</label>
                  <input
                    min={0}
                    type="number"
                    {...register("product.sellingPrice", {
                      valueAsNumber: true,
                    })}
                    className="w-full rounded-lg px-3 py-2 bg-[#2b2d31] border border-gray-600"
                  />
                  {errors.product?.sellingPrice && (
                    <p className="text-red-500 text-xs">
                      {errors.product.sellingPrice.message}
                    </p>
                  )}
                </div>
              </div>
            </div>
            {/* tags */}
            <div className="col-span-5  bg-[#212328] p-6 rounded-2xl space-y-4">
              <div>
                <label className="text-sm ">Tags</label>
                <input
                  {...register("tags.0.name")}
                  type="text"
                  className="w-full rounded-lg mt-1 px-3 py-2 bg-[#2b2d31] border border-gray-600"
                />
                {errors.tags?.[0]?.name && (
                  <p className="text-xs text-red-500">
                    {errors.tags[0]?.name?.message}
                  </p>
                )}
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
