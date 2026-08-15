"use client";
import { useState } from "react";
import { FilterSidebar } from "@/app/components/shop/filter-sidebar";
import ProductCard from "@/app/components/productcard/ProductCard";
import { ActiveFilters } from "../../components/shop/activefilters";
import { ProductOrg } from "@/app/components/productcard/productType";
import { Filters } from "@/types/FilterTypes";
import { ProductSkeletonGrid } from "@/app/components/skeletons/ProductSkeleton";
import { useGetWomenProductsQuery } from "@/redux/modules/products/products.api";

export default function Women() {
  const [filters, setFilters] = useState<Filters>({
    feature: null,
    priceRange: [25, 2000],
    color: null,
    size: null,
  });

  // RTK Query hook
  const {
    data: products = [],
    isLoading: loading,
    error: apiError,
    refetch,
  } = useGetWomenProductsQuery();

  const errorMessage = apiError
    ? "Unable to fetch women products right now."
    : "";

  const filteredProducts = products?.filter((product: ProductOrg) => {
    const matchesPrice =
      !filters.priceRange ||
      (Number(product?.sellingPrice) >= filters.priceRange[0] &&
        Number(product?.sellingPrice) <= filters.priceRange[1]);
    const matchesColor =
      filters.color === null ||
      product.colors?.map((c) => c.color).includes(filters.color);
    const matchesSize =
      filters.size === null ||
      product.sizes?.map((s) => s.size).includes(filters.size);
    const matchesFeature =
      filters.feature === null ||
      (product.tags?.map((t) => t.name) ?? []).includes(filters.feature) ||
      (product.features?.map((f) => f.value) ?? []).includes(filters.feature);

    return matchesPrice && matchesColor && matchesSize && matchesFeature;
  });

  const updateFilters = (newFilters: Partial<Filters>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  const removeFilter = (type: keyof Filters) => {
    setFilters((prev) => {
      const updated = { ...prev };
      if (type === "priceRange") {
        updated.priceRange = [25, 2000];
      } else if (type === "size") {
        updated.size = null;
      } else if (type === "color") {
        updated.color = null;
      } else if (type === "feature") {
        updated.feature = null;
      }
      return updated;
    });
  };

  const clearAllFilters = () => {
    setFilters({
      feature: null,
      priceRange: [25, 2000],
      color: null,
      size: null,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto p-5 md:py-6 md:px-6">
        <div className="flex items-center justify-between mb-3">
          <h1 className="text-xl font-semibold mb-2 hidden lg:block">
            Filter Options
          </h1>
          <p className="text-muted-foreground">
            {loading
              ? "Loading..."
              : errorMessage
                ? "Error fetching products"
                : `Showing ${filteredProducts?.length ?? 0} results`}
          </p>
        </div>
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filter Sidebar */}
          <div className="lg:w-64 hidden lg:block flex-shrink-0">
            <div className="sticky top-4 max-h-[calc(90svh)] scrollbar-clean overflow-y-auto">
              <FilterSidebar
                filters={filters}
                onFiltersChange={updateFilters}
              />
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Active Filters */}
            <ActiveFilters
              filters={filters}
              onRemoveFilter={removeFilter}
              onClearAll={clearAllFilters}
            />

            {/* Product Grid */}
            {loading ? (
              <ProductSkeletonGrid count={6} />
            ) : errorMessage ? (
              <div className="py-12 px-6 flex flex-col items-center justify-center text-center">
                <div className="w-12 h-12 rounded-full bg-orange-50 flex items-center justify-center mb-3">
                  <svg
                    className="w-6 h-6 text-orange-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                    />
                  </svg>
                </div>
                <p className="text-gray-700 text-sm font-medium mb-3">
                  {errorMessage}
                </p>
                <button
                  onClick={() => refetch()}
                  className="px-4 py-1.5 text-md font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
                >
                  Try again
                </button>
              </div>
            ) : !filteredProducts || filteredProducts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground text-lg">
                  No products found matching your filters.
                </p>
                <p className="text-sm text-muted-foreground mt-2">
                  Try adjusting your search criteria.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 place-items-center lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProducts?.map((product: ProductOrg) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
