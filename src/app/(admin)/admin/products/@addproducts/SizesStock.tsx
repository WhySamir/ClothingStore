import { ProductFormData } from "@/app/lib/validation";
import { useState, useEffect } from "react";
import { UseFormRegister, Control, useWatch } from "react-hook-form";

const sizeOptions = ["XS", "S", "M", "L", "XL", "XXL"];

interface SizesStockProps {
  register: UseFormRegister<ProductFormData>;
  control: Control<ProductFormData>; // pass control if you want to use useWatch
}

interface SelectedSize {
  size: string;
  stockQty: number;
}

export default function SizesStock({ register, control }: SizesStockProps) {
  const [selectedSizes, setSelectedSizes] = useState<SelectedSize[]>([]);

  // Optional: Watch current form sizes to prefill on edit
  const watchedSizes = useWatch({
    control,
    name: "sizes",
    defaultValue: [],
  });

  useEffect(() => {
    if (watchedSizes && watchedSizes.length > 0) {
      setSelectedSizes(
        watchedSizes.map((s: SelectedSize) => ({
          size: s.size,
          stockQty: s.stockQty,
        }))
      );
    }
  }, [watchedSizes]);

  const toggleSize = (size: string) => {
    setSelectedSizes((prev) => {
      const exists = prev.find((s) => s.size === size);
      if (exists) return prev.filter((s) => s.size !== size);
      return [...prev, { size, stockQty: 0 }];
    });
  };

  const handleQtyChange = (size: string, value: number) => {
    setSelectedSizes((prev) =>
      prev.map((s) => (s.size === size ? { ...s, stockQty: value } : s))
    );
  };

  return (
    <div className="bg-[#212328] p-6 rounded-2xl space-y-6">
      <h3 className="text-lg font-semibold mb-4">Sizes & Stock</h3>

      <div className="grid grid-cols-6 gap-3">
        {sizeOptions.map((size) => {
          const isActive = selectedSizes.some((s) => s.size === size);
          const selectedObj = selectedSizes.find((s) => s.size === size);

          return (
            <div
              key={size}
              onClick={() => toggleSize(size)}
              className={`p-3 rounded-lg cursor-pointer 
                ${isActive ? "bg-[#2b2d31]" : "bg-[#1a1c20]"} 
                text-gray-300`}
            >
              <label className="block text-center font-semibold">{size}</label>

              {isActive && selectedObj && (
                <>
                  <input
                    type="hidden"
                    {...register(
                      `sizes.${selectedSizes.indexOf(selectedObj)}.size`
                    )}
                    value={size}
                  />
                  <input
                    type="number"
                    min={0}
                    {...register(
                      `sizes.${selectedSizes.indexOf(selectedObj)}.stockQty`,
                      { valueAsNumber: true }
                    )}
                    value={selectedObj.stockQty}
                    onChange={(e) =>
                      handleQtyChange(size, Number(e.target.value))
                    }
                    onKeyDown={(e) => e.stopPropagation()}
                    onClick={(e) => e.stopPropagation()}
                    placeholder="0"
                    className="mt-2 w-full rounded-md px-2 py-1 bg-[#0f1115] border border-gray-600 text-gray-200 text-sm"
                  />
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
