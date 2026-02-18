"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Star } from "lucide-react";
import AddtoCart from "@/app/components/buttons/AddtoCart";
import { ItemsAddDel } from "@/app/components/buttons/ItemsAddDel";
import { useParams } from "next/navigation";
import { AddToWishlistButton } from "@/app/components/buttons/AddtoWishlist";
import { RootState, Actions } from "@/redux/store";
import ProductsApi from "@/app/api/products/productsApi";

export default function ProductDetailsClient({ initialProduct }: { initialProduct: any }) {
    const dispatch = useDispatch();
    const { productId } = useParams<{ productId: string }>();

    // Get product details from Redux
    const productState = useSelector((state: RootState) => state.productById);

    // Initialize Redux with initialProduct if empty
    useEffect(() => {
        if (initialProduct && (!productState?.data)) {
            dispatch(
                Actions.set("productById", {
                    data: initialProduct,
                    loading: false,
                    loadingState: true,
                }),
            );
        }
    }, [initialProduct, dispatch, productState?.data]);

    const product = productState?.data || initialProduct;
    const isLoading = productState?.loading && !product;
    const isError = false;

    // Fetch updated product details on mount (optional)
    useEffect(() => {
        if (!productId) return;
        const fetchProduct = async () => {
            try {
                if (!product) {
                    dispatch(Actions.set("productById", { loading: true, loadingState: true }));
                }
                await ProductsApi.fetchProductById(productId as string);
            } catch (err) {
                console.error("Error fetching product details:", err);
            }
        };
        fetchProduct();
    }, [productId, dispatch, product]);

    const [selectedColor, setSelectedColor] = useState({
        id: "",
        name: "",
        idx: 0,
        borderClass: "",
    });

    useEffect(() => {
        if (product && product.colors && product.colors.length > 0) {
            setSelectedColor({
                id: product.colors[0].id,
                idx: 0,
                name: product.colors[0].color,
                borderClass: product.colors[0].hexCode,
            });
        }

        if (product && product.sizes && product.sizes.length > 0) {
            const firstAvailable = product.sizes[0];
            setSelectedSize({
                id: firstAvailable.id,
                name: firstAvailable.size,
            });
        }
    }, [product]);

    const [selectedSize, setSelectedSize] = useState({
        id: "",
        name: "",
    });
    const [quantity, setQuantity] = useState(1);

    const sizes = ["S", "m", "M", "L", "XL", "XXL"]; // Some may be lowercase in DB? matched current logic
    const handleQuantityChange = (productId: string, newQty: number) => {
        setQuantity(newQty);
    };

    const productCart = {
        id: product?.id ?? "",
        name: product?.name ?? "",
        price: product?.sellingPrice ?? "",
    };

    return (
        <div className="space-y-6">
            {isLoading ? (
                <div className="space-y-6 animate-pulse">
                    <div className="h-4 bg-gray-200 rounded w-32"></div>
                    <div className="space-y-2">
                        <div className="h-8 bg-gray-200 rounded w-3/4"></div>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="flex gap-1">
                            {[...Array(5)].map((_, i) => (
                                <div key={i} className="w-5 h-5 bg-gray-200 rounded"></div>
                            ))}
                        </div>
                        <div className="h-4 bg-gray-200 rounded w-24"></div>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="h-8 bg-gray-200 rounded w-32"></div>
                        <div className="h-8 bg-gray-200 rounded w-32"></div>
                    </div>
                    <div className="space-y-2">
                        <div className="h-4 bg-gray-200 rounded w-full"></div>
                        <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                    </div>
                </div>
            ) : isError ? (
                "Error fetching product description"
            ) : (
                <div>
                    <p className="text-sm text-gray-600 my-2">
                        {product?.tags?.map((tag: any) => tag.name).join(" ")}
                    </p>
                    <h1 className="text-3xl font-semibold text-gray-900 mb-4">
                        {product?.name}
                    </h1>

                    <div className="flex items-center gap-2 mb-4">
                        <div className="flex">
                            {[...Array(5)].map((_, i) => (
                                <Star
                                    key={i}
                                    className="w-5 h-5 fill-yellow-400 text-yellow-400"
                                />
                            ))}
                        </div>
                        <span className="text-sm font-medium tracking-wider">
                            {product?.reviews?.length ?? 0} Reviews
                        </span>
                    </div>

                    <div className="flex items-center gap-3 mb-6">
                        <span className="text-3xl font-semibold text-gray-900">
                            $ {(Number(product?.sellingPrice) + 0).toFixed(2)}
                        </span>
                        <span className="text-xl text-gray-500 line-through">
                            $ {(Number(product?.sellingPrice) + 25).toFixed(2)}
                        </span>
                    </div>

                    <p className="text-gray-600 mb-6 line-clamp-2">
                        {product?.description}
                    </p>
                </div>
            )}

            {/* Color Selection */}
            <div>
                <div className="flex items-center gap-2 mb-3">
                    <span className="font-medium">Color :</span>
                    <span className="capitalize">{selectedColor.name}</span>
                </div>
                <div className="flex gap-2">
                    {product?.colors?.map((color: any, idx: number) => (
                        <button
                            key={color.id || color.hexCode + idx}
                            onClick={() =>
                                setSelectedColor({
                                    id: color.id,
                                    name: color.color,
                                    borderClass: color.hexCode,
                                    idx,
                                })
                            }
                            className={`w-8 h-8 flex items-center justify-center rounded-full border-2 ${selectedColor.name === color.color
                                    ? `border-gray-950`
                                    : "border-gray-200"
                                }`}
                        >
                            <div
                                style={{ backgroundColor: color.hexCode }}
                                className={`w-6 h-6 rounded-full flex items-center justify-center`}
                            ></div>
                        </button>
                    ))}
                </div>
            </div>

            {/* Size Selection */}
            <div>
                <div className="flex items-center gap-2 mb-3">
                    <span className="font-medium">Size :</span>
                    <span>{selectedSize.name}</span>
                </div>
                <div className="flex gap-2 mb-2 w-full flex-wrap">
                    {["S", "M", "L", "XL", "XXL"].map((size) => {
                        const isAvailable = product?.sizes?.some(
                            (s: any) => s.size.toUpperCase() === size,
                        );

                        return (
                            <button
                                key={size}
                                onClick={() =>
                                    isAvailable &&
                                    setSelectedSize({
                                        id:
                                            product?.sizes.find((s: any) => s.size.toUpperCase() === size)?.id ??
                                            "",
                                        name: size,
                                    })
                                }
                                disabled={!isAvailable}
                                className={`px-4 py-2 border rounded-md ${selectedSize.name.toUpperCase() === size
                                        ? "bg-yellow-200 border-yellow-200 text-black"
                                        : isAvailable
                                            ? "border-gray-300 hover:border-gray-400"
                                            : "border-gray-300 text-gray-400 cursor-not-allowed"
                                    }`}
                            >
                                {size}
                            </button>
                        );
                    })}
                </div>
                <button className="text-sm text-gray-600 underline">
                    View Size Guide
                </button>
            </div>

            {/* Stock Status */}
            <div className="flex gap-2">
                {product && product.stockQty <= 0 ? (
                    <button className="bg-red-400 px-2 text-black-800">
                        Out of Stock
                    </button>
                ) : (
                    <button className="bg-green-100 px-2 text-green-800">In Stock</button>
                )}
            </div>

            {/* Quantity and Actions */}
            <div className="flex-wrap flex flex-col md:flex-row md:items-center gap-4">
                <ItemsAddDel
                    id={productId || ""}
                    value={quantity}
                    onChange={(id: string, qty: number) => handleQuantityChange(id, qty)}
                />
                <AddtoCart
                    productCart={productCart}
                    color={selectedColor}
                    size={selectedSize}
                    quantity={quantity}
                />
                {product && <AddToWishlistButton productId={product.id} />}
            </div>

            {/* Product Info */}
            <div className="space-y-2 pt-6 border-t">
                <div className="flex gap-2">
                    <span className="font-medium">SKU :</span>
                    <span className="text-gray-600">{product?.id}</span>
                </div>
                <div className="flex gap-2">
                    <span className="font-medium">Tags :</span>
                    <span className="text-gray-600">
                        {product?.features?.map((feature: any) => feature.value).join(", ")}
                    </span>
                </div>
            </div>
        </div>
    );
}
