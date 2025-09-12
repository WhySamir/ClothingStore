"use client";

interface PriceRangeFilterProps {
  priceRange: [number, number];
  onChange: (range: [number, number]) => void;
}

export function PriceRangeFilter({
  priceRange,
  onChange,
}: PriceRangeFilterProps) {
  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-lg">Price</h3>
      <div className="space-y-4">
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>
            ${priceRange[0]}.00 - ${priceRange[1]}.00
          </span>
        </div>
      </div>
    </div>
  );
}
