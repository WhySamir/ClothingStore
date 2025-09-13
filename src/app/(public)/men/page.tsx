"use client";

import { useEffect, useState } from "react";
import { FilterSidebar } from "@/app/components/shop/filter-sidebar";
// import { SortDropdown } from "@/components/sort-dropdown";
import ProductCard from "@/app/components/productcard/ProductCard";
import { ActiveFilters } from "../../components/shop/activefilters";
import { ProductOrg } from "@/app/components/productcard/productType";
import { Filters } from "@/types/FilterTypes";

export default function HomePage() {
  const [filters, setFilters] = useState<Filters>({
    feature: null,
    priceRange: [25, 125],
    color: null,
    size: null,
  });

  const [product, setProduct] = useState<ProductOrg[] | null>(null);

  const filteredProducts = product?.filter((product) => {
    const matchesPrice =
      Number(product?.sellingPrice) >= filters.priceRange[0] &&
      Number(product?.sellingPrice) <= filters.priceRange[1];
    const matchesColor =
      filters.color === null ||
      product.colors.map((c) => c.color).includes(filters.color);
    const matchesSize =
      filters.size === null ||
      product.sizes.map((s) => s.size).includes(filters.size);
    const matchesFeature =
      filters.feature === null ||
      product.tags.map((t) => t.name).includes(filters.feature) ||
      product.features.map((f) => f.value).includes(filters.feature);

    return matchesPrice && matchesColor && matchesSize && matchesFeature;
  });

  const updateFilters = (newFilters: Partial<Filters>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  const removeFilter = (type: keyof Filters, value: string | number | null) => {
    setFilters((prev) => {
      const updated = { ...prev };
      if (type === "priceRange") {
        updated.priceRange = [25, 125];
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

  useEffect(() => {
    const fetchMaleProducts = async () => {
      const response = await fetch("/api/products/men");

      const products = await response.json();
      setProduct(products.data);
    };
    fetchMaleProducts();
  }, []);
  useEffect(() => {
    console.log("Updated product:", product);
  }, [product]);

  const clearAllFilters = () => {
    setFilters({
      feature: null,
      priceRange: [25, 125],
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
            Showing 1-2 of {filteredProducts?.length} results
          </p>
        </div>
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filter Sidebar */}
          <div className="lg:w-64 hidden lg:block flex-shrink-0">
            <div className="sticky top-4    max-h-[calc(90svh)] scrollbar-clean overflow-y-auto">
              <FilterSidebar
                filters={filters}
                onFiltersChange={updateFilters}
              />
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Header with results count and sort */}

            {/* Active Filters */}
            <ActiveFilters
              filters={filters}
              onRemoveFilter={removeFilter}
              onClearAll={clearAllFilters}
            />

            {/* Product Grid */}

            {filteredProducts?.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground text-lg">
                  No products found matching your filters.
                </p>
                <p className="text-sm text-muted-foreground mt-2">
                  Try adjusting your search criteria.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2  place-items-center  lg:grid-cols-2 xl:grid-cols-3 gap-6">
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
