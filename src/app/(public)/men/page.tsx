"use client";

import { useEffect, useState } from "react";
import { FilterSidebar } from "@/app/components/shop/filter-sidebar";
// import { SortDropdown } from "@/components/sort-dropdown";
import ProductCard from "@/app/components/productcard/ProductCard";
import { ActiveFilters } from "../../components/shop/activefilters";
import { ProductOrg } from "@/app/components/productcard/productType";
// Mock product data

export interface Filters {
  categories: string[];
  priceRange: [number, number];
  colors: string[];
  sizes: string[];
  gender: string[];
}

export default function HomePage() {
  const [product, setProduct] = useState<ProductOrg[] | null>(null);

  const [filters, setFilters] = useState<Filters>({
    categories: [],
    priceRange: [25, 125],
    colors: [],
    sizes: [],
    gender: [],
  });

  useEffect(() => {
    const fetchMaleProduct = async () => {
      try {
        const response = await fetch("/api/products/men");
        const products = await response.json();
        setProduct(products.data || []);
      } catch (error) {
        console.error("Error fetching products:", error);
        setProduct([]);
      }
    };

    fetchMaleProduct();
  }, []);

  useEffect(() => {
    console.log("Updated product:", product);
  }, [product]);

  const updateFilters = (newFilters: Partial<Filters>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  const removeFilter = (type: keyof Filters, value: string | number) => {
    setFilters((prev) => {
      const updated = { ...prev };
      if (type === "priceRange") {
        updated.priceRange = [25, 125];
      } else if (Array.isArray(updated[type])) {
        updated[type] = (updated[type] as string[]).filter(
          (item) => item !== value
        );
      }
      return updated;
    });
  };

  const clearAllFilters = () => {
    setFilters({
      categories: [],
      priceRange: [25, 125],
      colors: [],
      sizes: [],
      gender: [],
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
            Showing 1-2 of {product?.length} results
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

            {product?.length === 0 ? (
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
                {product?.map((product) => (
                  <ProductCard key={product?.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
