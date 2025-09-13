"use client";

import { Filters } from "@/types/FilterTypes";
import { X } from "lucide-react";

interface ActiveFiltersProps {
  filters: Filters;
  onRemoveFilter: (type: keyof Filters, value: string | number | null) => void;
  onClearAll: () => void;
}

export function ActiveFilters({
  filters,
  onRemoveFilter,
  onClearAll,
}: ActiveFiltersProps) {
  const hasActiveFilters =
    filters.color ||
    filters.size ||
    filters.feature ||
    filters.priceRange[0] !== 25 ||
    filters.priceRange[1] !== 125;

  if (!hasActiveFilters) return null;

  return (
    <div className="flex flex-wrap items-center space-x-4 space-y-3 mb-4 px-4  rounded-lg">
      <span className="text-sm font-medium  mr-2">Active Filter</span>

      <div className="flex items-center gap-2 bg-yellow-400 border border-yellow-400  px-2 py-1 text-sm text-black">
        {filters.feature}
        <button
          onClick={() => onRemoveFilter("feature", filters.feature)}
          className=" pt-0.5 transition-colors"
        >
          <X className="h-3 w-3" />
        </button>
      </div>

      <div className="flex items-center gap-2 bg-yellow-400 border border-yellow-400  px-2 py-1 text-sm text-black">
        {filters.color}
        <button
          onClick={() => onRemoveFilter("color", filters.color)}
          className=" pt-0.5 transition-colors"
        >
          <X className="h-3 w-3" />
        </button>
      </div>

      <div className="flex items-center gap-2 bg-yellow-400 border border-yellow-400  px-2 py-1 text-sm text-black">
        {filters.size}
        <button
          onClick={() => onRemoveFilter("size", filters.size)}
          className=" pt-0.5 transition-colors"
        >
          <X className="h-3 w-3" />
        </button>
      </div>

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

      <button onClick={onClearAll} className="pb-2 underline">
        Clear All
      </button>
    </div>
  );
}
