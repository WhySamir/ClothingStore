import { NextRequest } from "next/server";
import { ApiError } from "@/utlis/ApiResponders/ApiError";
import { ApiResponds } from "@/utlis/ApiResponders/ApiResponds";
import { prisma } from "@/app/lib/prisma";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }   
) {
  const { id } = await context.params;          

  try {
    const product = await prisma.product.findUnique({
      where: { id },
      select:{
          id:true,
         mainImgUrl:true,
         
         images:{
            select:{
                url:true
            }
         }
         }
    });

    if (!product) {
      return ApiError(404, "Product not found");
    }

    return ApiResponds(200, "Product details fetched", product);
  } catch (error) {
    return ApiError(500, error);
  }
}

