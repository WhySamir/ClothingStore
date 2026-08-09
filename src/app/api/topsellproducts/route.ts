import { prisma } from "@/app/lib/prisma";
import { ApiError } from "@/utlis/ApiResponders/ApiError";
import { ApiResponds } from "@/utlis/ApiResponders/ApiResponds";

export async function GET() {
  try {
    const topProducts = await prisma.product.findMany({
      orderBy: { stockQty: "desc" },
      select: {
        id: true,
        name: true,
        sellingPrice: true,
        discount: true,
        mainImgUrl: true,
        stockQty: true,
        features: true,
        tags: true,
        colors: true,
        sizes: true,
        categoryId: true,
      },
    });

    return ApiResponds(200, "Top selling products fetched", topProducts);
  } catch (error) {
    //console.error("Top seller products error:", error);
    return ApiError(500, "Unable to fetch top selling products right now.");
  }
}
