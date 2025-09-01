import { useState } from "react";
import { UseFormRegister } from "react-hook-form";

const sizeOptions = ["XS", "S", "M", "L", "XL", "XXL"];

interface SizesStockProps {
  register: UseFormRegister<any>;
}

export default function SizesStock({ register }: SizesStockProps) {
  const [selected, setSelected] = useState<string[]>([]);

  const toggleSize = (size: string) => {
    setSelected((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };

  return (
    <div className="bg-[#212328] p-6 rounded-2xl space-y-6">
      <h3 className="text-lg font-semibold mb-4">Sizes & Stock</h3>

      <div className="grid grid-cols-6 gap-3">
        {sizeOptions.map((size, idx) => {
          const isActive = selected.includes(size);
          return (
            <div
              key={size}
              onClick={() => toggleSize(size)}
              className={`p-3 rounded-lg cursor-pointer 
                ${isActive ? "bg-[#2b2d31]" : "bg-[#1a1c20]"} 
                text-gray-300`}
            >
              <label className="block text-center font-semibold">{size}</label>

              {isActive && (
                <>
                  <input
                    type="hidden"
                    {...register(`sizes.${idx}.size`)}
                    value={size}
                  />
                  <input
                    type="number"
                    min={0}
                    {...register(`sizes.${idx}.stockQty`, {
                      valueAsNumber: true,
                    })}
                    placeholder="0"
                    onClick={(e) => e.stopPropagation()}
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
