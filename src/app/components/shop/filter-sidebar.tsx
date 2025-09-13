"use client";

import { CategoryFilter } from "@/app/components/shop/category";
import { PriceRangeFilter } from "./price-range-filter";
import { ColorFilter } from "@/app/components/shop/color-filter";
import { SizeFilter } from "./size-filter";
import { Filters } from "@/types/FilterTypes";

interface FilterSidebarProps {
  filters: Filters;
  onFiltersChange: (filters: Partial<Filters>) => void;
}

export function FilterSidebar({
  filters,
  onFiltersChange,
}: FilterSidebarProps) {
  return (
    <div className="space-y-6 px-2 ">
      <CategoryFilter
        selectedCategories={filters.feature}
        onChange={(feature) => onFiltersChange({ feature })}
      />

      <PriceRangeFilter
        priceRange={filters.priceRange}
        onChange={(priceRange) => onFiltersChange({ priceRange })}
      />

      <ColorFilter
        selectedColors={filters.color}
        onChange={(color) => onFiltersChange({ color })}
      />

      <SizeFilter
        selectedSize={filters.size}
        onChange={(size) => onFiltersChange({ size })}
      />
    </div>
  );
}
