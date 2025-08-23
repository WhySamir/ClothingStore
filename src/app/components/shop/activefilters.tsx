"use client";

import { Filters } from "@/app/men/page";
import { X } from "lucide-react";

interface ActiveFiltersProps {
  filters: Filters;
  onRemoveFilter: (type: keyof Filters, value: string | number) => void;
  onClearAll: () => void;
}

export function ActiveFilters({
  filters,
  onRemoveFilter,
  onClearAll,
}: ActiveFiltersProps) {
  const hasActiveFilters =
    filters.categories.length > 0 ||
    filters.colors.length > 0 ||
    filters.sizes.length > 0 ||
    filters.gender.length > 0 ||
    filters.priceRange[0] !== 25 ||
    filters.priceRange[1] !== 125;

  if (!hasActiveFilters) return null;

  return (
    <div className="flex flex-wrap items-center space-x-4 space-y-3 mb-4 px-4  rounded-lg">
      <span className="text-sm font-medium  mr-2">Active Filter</span>

      {filters.gender.map((gender) => (
        <div
          key={gender}
          className="flex items-center gap-2 bg-yellow-400 border border-yellow-400  px-2 py-1 text-sm text-black"
        >
          {gender.charAt(0).toUpperCase() + gender.slice(1)}
          <button
            onClick={() => onRemoveFilter("gender", gender)}
            className=" pt-0.5 transition-colors"
          >
            <X className="h-3 w-3" />
          </button>
        </div>
      ))}

      {filters.categories.map((category) => (
        <div
          key={category}
          className="flex items-center gap-2 bg-yellow-400 border border-yellow-400  px-2 py-1 text-sm text-black"
        >
          {category}
          <button
            onClick={() => onRemoveFilter("categories", category)}
            className=" pt-0.5 transition-colors"
          >
            <X className="h-3 w-3" />
          </button>
        </div>
      ))}

      {filters.colors.map((color) => (
        <div
          key={color}
          className="flex items-center gap-2 bg-yellow-400 border border-yellow-400  px-2 py-1 text-sm text-black"
        >
          {color.charAt(0).toUpperCase() + color.slice(1)}
          <button
            onClick={() => onRemoveFilter("colors", color)}
            className=" pt-0.5 transition-colors"
          >
            <X className="h-3 w-3" />
          </button>
        </div>
      ))}

      {filters.sizes.map((size) => (
        <div
          key={size}
          className="flex items-center gap-2 bg-yellow-400 border border-yellow-400  px-2 py-1 text-sm text-black"
        >
          {size}
          <button
            onClick={() => onRemoveFilter("sizes", size)}
            className=" pt-0.5 transition-colors"
          >
            <X className="h-3 w-3" />
          </button>
        </div>
      ))}

      {(filters.priceRange[0] !== 25 || filters.priceRange[1] !== 125) && (
        <div className="flex items-center gap-2 bg-yellow-400 border border-yellow-400  px-2 py-1 text-sm text-black">
          Price: ${filters.priceRange[0]}.00 - ${filters.priceRange[1]}.00
          <button
            onClick={() => onRemoveFilter("priceRange", 0)}
            className=" pt-0.5 transition-colors"
          >
            <X className="h-3 w-3" />
          </button>
        </div>
      )}

      <button
        onClick={onClearAll}
        className="text-destructive hover:text-destructive hover:bg-destructive/10 underline"
      >
        Clear All
      </button>
    </div>
  );
}
