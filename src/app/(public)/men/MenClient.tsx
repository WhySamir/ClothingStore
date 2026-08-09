"use client";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FilterSidebar } from "@/app/components/shop/filter-sidebar";
import ProductCard from "@/app/components/productcard/ProductCard";
import { ProductSkeleton } from "@/app/components/productcard/ProductSkeleton";
import { ActiveFilters } from "../../components/shop/activefilters";
import { ProductOrg } from "@/app/components/productcard/productType";
import { Filters } from "@/types/FilterTypes";
import { RootState, Actions } from "@/redux/store";
import ProductsApi from "@/app/api/products/productsApi";

export default function MenClient({
    initialProducts,
}: {
    initialProducts: ProductOrg[];
}) {
    const dispatch = useDispatch();
    const [filters, setFilters] = useState<Filters>({
        feature: null,
        priceRange: [25, 2000],
        color: null,
        size: null,
    });

    // Get men products from Redux
    const menProductsState = useSelector((state: RootState) => state.menProducts);

    // Initialize Redux with initialProducts if empty
    useEffect(() => {
        if (initialProducts && (!menProductsState?.items || menProductsState.items.length === 0)) {
            dispatch(
                Actions.set("menProducts", {
                    items: initialProducts,
                    loading: false,
                    loadingState: true,
                }),
            );
        }
    }, [initialProducts, dispatch, menProductsState?.items]);

    const product =
        menProductsState?.items && menProductsState.items.length > 0
            ? menProductsState.items
            : initialProducts || [];

    // Only show loading if we have NO products at all
    const isLoading = menProductsState?.loading && product.length === 0;

    // Fetch men products on mount
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                if (product.length === 0) {
                    dispatch(
                        Actions.set("menProducts", { loading: true, loadingState: true }),
                    );
                }
                await ProductsApi.fetchMenProducts();
            } catch (err) {
                console.error("Error fetching men products:", err);
            }
        };

        fetchProducts();
    }, [dispatch, product.length]);

    const filteredProducts = product?.filter((product: ProductOrg) => {
        const matchesPrice =
            !filters.priceRange ||
            (Number(product?.sellingPrice) >= filters.priceRange[0] &&
                Number(product?.sellingPrice) <= filters.priceRange[1]);
        const matchesColor =
            filters.color === null ||
            product.colors.map((c) => c.color).includes(filters.color);
        const matchesSize =
            filters.size === null ||
            product.sizes.map((s) => s.size).includes(filters.size);
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
                        {isLoading ? (
                            <span className="inline-block w-24 h-4 bg-gray-200 animate-pulse rounded"></span>
                        ) : (
                            `Showing ${filteredProducts?.length ?? 0} results`
                        )}
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
                        {/* Active Filters */}
                        <ActiveFilters
                            filters={filters}
                            onRemoveFilter={removeFilter}
                            onClearAll={clearAllFilters}
                        />

                        {/* Product Grid */}

                        {isLoading ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 place-items-center lg:grid-cols-2 xl:grid-cols-3 gap-6">
                                {[...Array(6)].map((_, i) => (
                                    <ProductSkeleton key={i} />
                                ))}
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
                            <div className="grid grid-cols-1 sm:grid-cols-2  place-items-center  lg:grid-cols-2 xl:grid-cols-3 gap-6">
                                {filteredProducts.map((product: ProductOrg) => (
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
