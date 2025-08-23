"use client";

import { CategoryFilter } from "@/app/components/shop/category";
import { PriceRangeFilter } from "./price-range-filter";
import { ColorFilter } from "@/app/components/shop/color-filter";
import { SizeFilter } from "./size-filter";
import type { Filters } from "@/app/men/page";

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
        selectedCategories={filters.categories}
        onChange={(categories) => onFiltersChange({ categories })}
      />

      <PriceRangeFilter
        priceRange={filters.priceRange}
        onChange={(priceRange) => onFiltersChange({ priceRange })}
      />

      <ColorFilter
        selectedColors={filters.colors}
        onChange={(colors) => onFiltersChange({ colors })}
      />

      <SizeFilter
        selectedSizes={filters.sizes}
        onChange={(sizes) => onFiltersChange({ sizes })}
      />
    </div>
  );
}
