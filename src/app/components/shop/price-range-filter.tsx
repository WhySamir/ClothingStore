"use client";

// import { Slider } from "@/components/ui/slider"

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
          <span>${priceRange[0]}.00</span>
          <span>${priceRange[1]}.00</span>
        </div>
        {/* <Slider
          value={priceRange}
          onValueChange={(value) => onChange(value as [number, number])}
          max={200}
          min={0}
          step={5}
          className="w-full"
        /> */}
        <div className="flex justify-between text-sm">
          <span>${priceRange[0]}.00</span>
          <span>-</span>
          <span>${priceRange[1]}.00</span>
        </div>
      </div>
    </div>
  );
}
