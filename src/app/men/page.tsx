"use client";

import { useState } from "react";
import { FilterSidebar } from "@/app/components/shop/filter-sidebar";
// import { SortDropdown } from "@/components/sort-dropdown";
import ProductCard from "@/app/components/productcard/ProductCard";
// Mock product data
const mockProducts = [
  {
    id: 1,
    name: "Trendy Brown Coat",
    category: "Coats",
    price: 75.0,
    originalPrice: 150.0,
    discount: 50,
    rating: 4.8,
    image: "/brown-coat-model.png",
    colors: ["brown"],
    sizes: ["S", "M", "L"],
    gender: "women",
  },
  {
    id: 2,
    name: "Classy Light Coat",
    category: "Coats",
    price: 165.0,
    originalPrice: 220.0,
    discount: 25,
    rating: 4.9,
    image: "/light-beige-coat-model.png",
    colors: ["beige"],
    sizes: ["M", "L", "XL"],
    gender: "women",
  },
  {
    id: 3,
    name: "Modern Brown Dress",
    category: "Dresses",
    price: 90.0,
    originalPrice: 100.0,
    discount: 10,
    rating: 4.8,
    image: "/brown-off-shoulder-dress-model.png",
    colors: ["brown"],
    sizes: ["S", "M", "L"],
    gender: "women",
  },
  {
    id: 4,
    name: "Modern Black Dress",
    category: "Dresses",
    price: 75.0,
    originalPrice: 100.0,
    discount: 25,
    rating: 4.9,
    image: "/black-polka-dot-dress-model.png",
    colors: ["black"],
    sizes: ["S", "M", "L", "XL"],
    gender: "women",
  },
  {
    id: 5,
    name: "Light Brown Sweater",
    category: "Sweater",
    price: 63.0,
    originalPrice: 70.0,
    discount: 10,
    rating: 4.7,
    image: "/beige-knit-model.png",
    colors: ["beige"],
    sizes: ["S", "M", "L"],
    gender: "women",
  },
  {
    id: 6,
    name: "Classic White Shirt",
    category: "Shirt",
    price: 45.0,
    originalPrice: 50.0,
    discount: 10,
    rating: 5.0,
    image: "/white-button-shirt-model.png",
    colors: ["white"],
    sizes: ["S", "M", "L", "XL"],
    gender: "women",
  },
];

export interface Filters {
  categories: string[];
  priceRange: [number, number];
  colors: string[];
  sizes: string[];
  gender: string[];
}

export default function HomePage() {
  const [filters, setFilters] = useState<Filters>({
    categories: [],
    priceRange: [25, 125],
    colors: [],
    sizes: [],
    gender: ["women"],
  });

  // Filter products based on current filters
  const filteredProducts = mockProducts.filter((product) => {
    const matchesCategory =
      filters.categories.length === 0 ||
      filters.categories.includes(product.category);
    const matchesPrice =
      product.price >= filters.priceRange[0] &&
      product.price <= filters.priceRange[1];
    const matchesColor =
      filters.colors.length === 0 ||
      filters.colors.some((color) => product.colors.includes(color));
    const matchesSize =
      filters.sizes.length === 0 ||
      filters.sizes.some((size) => product.sizes.includes(size));
    const matchesGender =
      filters.gender.length === 0 || filters.gender.includes(product.gender);

    return (
      matchesCategory &&
      matchesPrice &&
      matchesColor &&
      matchesSize &&
      matchesGender
    );
  });

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
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filter Sidebar */}
          <div className="lg:w-64 flex-shrink-0">
            <FilterSidebar filters={filters} onFiltersChange={updateFilters} />
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Header with results count and sort */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <div>
                <h1 className="text-2xl font-semibold mb-2">Filter Options</h1>
                <p className="text-muted-foreground">
                  Showing 1-2 of {mockProducts.length} results
                </p>
              </div>
              {/* <SortDropdown value={sortBy} onChange={setSortBy} /> */}
            </div>

            {/* Active Filters */}
            {/* <ActiveFilters
              filters={filters}
              onRemoveFilter={removeFilter}
              onClearAll={clearAllFilters}
            /> */}

            {/* Product Grid */}

            {mockProducts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground text-lg">
                  No products found matching your filters.
                </p>
                <p className="text-sm text-muted-foreground mt-2">
                  Try adjusting your search criteria.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {mockProducts.map((product) => (
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
