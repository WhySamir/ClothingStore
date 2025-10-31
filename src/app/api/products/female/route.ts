import { prisma } from "@/app/lib/prisma";
import { ApiError } from "@/utlis/ApiResponders/ApiError";
import { ApiResponds } from "@/utlis/ApiResponders/ApiResponds";

export async function GET() {
  try {
    const female = await prisma.product.findMany({
      where: {
        categoryId: 2,
      },
      select: {
        id: true,
        name: true,
        categoryId: true,
        sellingPrice: true,
        discount: true,
        mainImgUrl: true,
        colors: {
          select: {
            color: true,
            hexCode: true,
            stockQty: true,
          },
        },
        sizes: {
          select: {
            size: true,
            stockQty: true,
          },
        },
        reviews: true,
        tags: {
          select: {
            name: true,
          },
        },
      },
    });
    return ApiResponds(200, "Female products fetched successfully", female);
  } catch (error) {
    return ApiError(500, error);
  }
}
