"use client";

interface SizeFilterProps {
  selectedSizes: string[];
  onChange: (sizes: string[]) => void;
}

const sizes = ["S", "M", "L", "XL", "XXL"];

export function SizeFilter({ selectedSizes, onChange }: SizeFilterProps) {
  const handleSizeChange = (size: string) => {
    if (selectedSizes.includes(size)) {
      onChange(selectedSizes.filter((s) => s !== size));
    } else {
      onChange([...selectedSizes, size]);
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-lg">Size</h3>
      <div className="space-y-3">
        {sizes.map((size) => (
          <div key={size} className="flex items-center space-x-3">
            <button
              onClick={() => handleSizeChange(size)}
              className={`w-4 h-4 rounded border transition-all flex-shrink-0 ${
                selectedSizes.includes(size)
                  ? "accent-orange-950 bg-orange-950"
                  : "border-gray-300 hover:border-primary"
              }`}
              aria-label={`Select size ${size}`}
            />
            <span
              className={`text-sm cursor-pointer transition-colors ${
                selectedSizes.includes(size)
                  ? "text-primary font-medium"
                  : "text-foreground hover:text-primary"
              }`}
              onClick={() => handleSizeChange(size)}
            >
              {size}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
