"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Star } from "lucide-react";
import AddtoCart from "@/app/components/buttons/AddtoCart";
import { ItemsAddDel } from "@/app/components/buttons/ItemsAddDel";
import { useParams, useRouter } from "next/navigation";
import { ProductDetailsType } from "@/types/productDetailsType";
import { AddToWishlistButton } from "@/app/components/buttons/AddtoWishlist";
import { RootState, Actions } from "@/redux/store";
import ProductsApi from "@/app/api/products/productsApi";

export default function ProductDetails() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { productId } = useParams<{ productId: string }>();

  // Get product details from Redux
  const productState = useSelector((state: RootState) => state.productById);
  const product = productState?.data;
  const isLoading = productState?.loading || false;
  const isError = false;

  // Fetch product details on mount
  useEffect(() => {
    if (!productId) {
      router.push("/404");
      return;
    }

    const fetchProduct = async () => {
      try {
        await ProductsApi.fetchProductById(productId as string);
      } catch (err) {
        console.error("Error fetching product details:", err);
        dispatch(
          Actions.set("productById", {
            data: null,
            loading: false,
            loadingState: true,
          }),
        );
      }
    };

    fetchProduct();
  }, [productId, dispatch, router]);

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

  const sizes = ["S", "M", "L", "XL", "XXL"];
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
          {/* Tags Skeleton */}
          <div className="h-4 bg-gray-200 rounded w-32"></div>

          {/* Title Skeleton */}
          <div className="space-y-2">
            <div className="h-8 bg-gray-200 rounded w-3/4"></div>
          </div>

          {/* Rating Skeleton */}
          <div className="flex items-center gap-2">
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="w-5 h-5 bg-gray-200 rounded"></div>
              ))}
            </div>
            <div className="h-4 bg-gray-200 rounded w-24"></div>
          </div>

          {/* Price Skeleton */}
          <div className="flex items-center gap-3">
            <div className="h-8 bg-gray-200 rounded w-32"></div>
            <div className="h-8 bg-gray-200 rounded w-32"></div>
          </div>

          {/* Description Skeleton */}
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
            {product?.tags.map((tag: any) => tag.name).join(" ")}
          </p>
          <h1 className="text-3xl font-semibold text-gray-900 mb-4">
            {product?.name}
          </h1>

          {/* Rating */}
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
              {product?.reviews.length} Reviews
            </span>
          </div>

          {/* Price */}
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl font-semibold text-gray-900">
              $ {(Number(product?.sellingPrice) + 0).toFixed(2)}
            </span>

            <span className="text-xl text-gray-500 line-through">
              $ {(Number(product?.sellingPrice) + 25).toFixed(2)}
            </span>
          </div>

          {/* Description */}
          <p className="text-gray-600 mb-6  line-clamp-2">
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
          {product?.colors.map((color: any, idx: number) => (
            <button
              key={color.hexCode + idx}
              onClick={() =>
                setSelectedColor({
                  id: color.id,
                  name: color.color,
                  borderClass: color.hexCode,
                  idx,
                })
              }
              className={`w-8 h-8 flex items-center justify-center rounded-full   border-2  ${
                selectedColor.name === color.color
                  ? `border-${color.hexCode}`
                  : "border-gray-200"
              }`}
            >
              <div
                style={{ backgroundColor: color.hexCode }}
                className={`color w-6 h-6 rounded-full flex items-center justify-center } `}
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
          {sizes.map((size) => {
            // check if this size is available in the product
            const isAvailable = product?.sizes.some(
              (s: any) => s.size === size,
            );

            return (
              <button
                key={size}
                onClick={() =>
                  isAvailable &&
                  setSelectedSize({
                    id:
                      product?.sizes.find((s: any) => s.size === size)?.id ??
                      "",
                    name: size,
                  })
                }
                disabled={!isAvailable} // disable if not available
                className={`px-4 py-2 border rounded-md ${
                  selectedSize.name === size
                    ? "bg-yellow-200 border-yellow-200 text-black"
                    : isAvailable
                      ? "border-gray-300 hover:border-gray-400"
                      : "border-gray-300 text-gray-400 cursor-not-allowed" // style disabled sizes
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

      {/* Clear and Stock Status */}
      <div className="flex gap-2">
        {product && product.stockQty <= 1 ? (
          <button className="bg-red-400 px-2 text-black-800">
            Out of Stock
          </button>
        ) : (
          <button className="bg-green-100 px-2 text-green-800">In Stock</button>
        )}
      </div>

      {/* Quantity and Actions */}
      <div className="flex-wrap flex flex-col md:flex-row  md:items-center gap-4">
        <ItemsAddDel
          id={productId}
          value={quantity}
          onChange={(id: string, qty: number) => handleQuantityChange(id, qty)}
        />
        <AddtoCart
          productCart={productCart}
          color={selectedColor}
          size={selectedSize}
          quantity={quantity}
        />

        {/* <button className="bg-yellow-200 border border-yellow-200  py-2 text-black px-8">
          Buy Now
        </button> */}

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
            {product?.features.map((feature: any) => feature.value).join(", ")}
          </span>
        </div>
        {/* <div className="flex items-center gap-2">
          <span className="font-medium">Share :</span>
          <div className="flex gap-2">
            <Facebook className="w-5 h-5 text-gray-600 hover:text-blue-600 cursor-pointer" />
            <Instagram className="w-5 h-5 text-gray-600 hover:text-pink-600 cursor-pointer" />
            <Linkedin className="w-5 h-5 text-gray-600 hover:text-blue-700 cursor-pointer" />
            <Twitter className="w-5 h-5 text-gray-600 hover:text-blue-400 cursor-pointer" />
          </div>
        </div> */}
      </div>
    </div>
  );
}
