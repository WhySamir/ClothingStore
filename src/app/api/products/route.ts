import { prisma } from "@/app/lib/prisma";
import { ApiError } from "@/utlis/ApiResponders/ApiError";
import { ApiResponds } from "@/utlis/ApiResponders/ApiResponds";

export async function GET() {
  try {
    const products = await prisma.product.findMany({
      select: {
        id: true,
        name: true,
        description: true,
        sellingPrice: true,
        brand: true,
        mainImgUrl: true,
        stockQty: true,
        category: {
          select: { name: true },
        },
      },
    });
    // );
    return ApiResponds(200, "Products got successfully", products);
  } catch (error) {
    return ApiError(500, error);
  }
}
