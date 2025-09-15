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
        tags:{
          select:{
            name:true
          }
        },
        id:true,
        name:true,
        reviews:{
            select:{
                rating:true
            }
        },
        sellingPrice:true,
        description:true,
        stockQty:true,
        discount:true,
        categoryId:true,
        colors:{
            select:{
              id:true,
                color:true,
                hexCode:true,
                stockQty:true
            }
        },
        sizes:{
            select:{
              id:true,
                size:true,
                stockQty:true
            }
        },
        features:{
            select:{
                key:true,value:true
            }
        },
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

