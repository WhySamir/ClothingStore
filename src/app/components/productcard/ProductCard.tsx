import Image from "next/image";
import { useRouter } from "next/navigation";
import { Expand, Star } from "lucide-react";
import { ProductOrg } from "@/app/components/productcard/productType";
import { CountdownTimer } from "@/app/components/productcard/CountdownTimer";
import { AddToWishlistButton } from "../buttons/AddtoWishlist";

interface ProductCardProps {
  product: ProductOrg;
}

export default function ProductCard({ product }: ProductCardProps) {
  const router = useRouter();

  return (
    <div
      key={product.id}
      onClick={() => {
        window.location.href = `/product/${product.id}`;
      }}
      className="flex-shrink-0 w-72 group relative overflow-hidden shadow-sm hover:shadow-lg transition-shadow"
    >
      {/* Product Image */}
      <div className="relative aspect-[4/5] overflow-hidden bg-[#F6F6F6]">
        <Image
          src={product.mainImgUrl}
          alt={product.name}
          fill
          style={{
            objectFit: "cover",
            objectPosition: "center calc(100% + 1rem)",
            overflow: "hidden",
          }}
          className="group-hover:scale-105 transition-transform duration-300"
        />

        {/* Discount Badge */}
        <div className="absolute top-4 left-4 text-green font-bold px-2 py-1 rounded bg-white text-green-300">
          {product.discount}% off
        </div>

        {/* Action Icons */}
        <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <AddToWishlistButton productId={product.id} />
          <button
            onClick={(e) => {
              e.stopPropagation();
              router.push(`/product/${product.id}`, { scroll: false });
            }}
            className="h-8 w-8 bg-white/90 hover:bg-white rounded-md flex items-center justify-center transition-colors"
          >
            <Expand className="h-4 w-4" />
          </button>
        </div>

        {/* Countdown Timer */}
        {product.hasCountdown && <CountdownTimer />}
      </div>

      {/* Product Info */}
      <div className="p-4">
        <div className="flex justify-between items-center">
          <p className="text-sm text-gray-500 mb-1">{product.tags[0].name}</p>

          {/* Rating */}
          <div className="flex items-center gap-1 mb-2">
            <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
            <span className="text-sm font-medium">
              {product.reviews[0]?.rating}
            </span>
          </div>
        </div>

        <h3 className="font-semibold text-gray-900 mb-2">{product.name}</h3>

        {/* Price */}
        <div className="flex items-center gap-2">
          <span className="text-lg font-bold text-gray-900">
            ${Number(product.sellingPrice).toFixed(2)}
          </span>
          <span className="text-sm text-gray-500 line-through">
            ${(Number(product?.sellingPrice) + 25).toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
}
