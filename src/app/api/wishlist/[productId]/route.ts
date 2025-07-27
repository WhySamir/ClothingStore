import { prisma } from "@/app/lib/prisma";
import { ApiError } from "@/utlis/ApiResponders/ApiError";
import { ApiResponds } from "@/utlis/ApiResponders/ApiResponds";
import { verifyUser } from "@/utlis/verifyUser";
import { NextRequest } from "next/server";

export const dynamic = 'force-dynamic'


export async function GET(
  req: NextRequest,
  context: { params: Promise<{ productId: string }> }   
) {
  try{
  const { productId } = await context.params; 
   const user =await verifyUser(req)
    if (!user) {
      return ApiError(401, "Unauthorized");
    }
     if (!productId || !user.id) {
         return ApiError(400, "Customer ID is required");
     }
    
     const wishlistItems = await prisma.wishlistItem.findMany({
         where:{
             productId,
             customerId: user.id,
         }
     })
        if (wishlistItems.length === 0) {
            return ApiResponds(204, "No items found in wishlist");
        }

     return ApiResponds(200, "Wishlist retrieved successfully", wishlistItems);
   } catch (error) {
     return ApiError(500, error);
   }
}

export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ productId: string }> }   
) {
  try {
    const { productId } = await context.params;  
    const user =await verifyUser(req)
    if (!productId || !user ) {
      return ApiError(400, "Product ID and Customer ID are required");
    }
    const existing = await prisma.wishlistItem.findFirst({
      where: { productId, customerId:user.id },
    });
    if (!existing) {
      return ApiResponds(204, "No Wishlist item found to delete");
    }
    const deletedItem = await prisma.wishlistItem.delete({
      where: {
        id: existing.id
      }
    });

    return ApiResponds(200, "Wishlist item deleted successfully", deletedItem);
  } catch (error) {
    return ApiError(500, error);
  }
}

export async function POST(req:NextRequest, context: { params: Promise<{ productId: string }> }  ){
    try {
       const {productId} = await context.params
      const user = await verifyUser(req)
        if (!productId || !user) {
            return ApiError(400, "Product ID and Customer ID are required");
        }
         const existing = await prisma.wishlistItem.findFirst({
      where: { productId, customerId:user.id },
    });

    if (existing) {
      return ApiError(400, "Product already in wishlist");
    }
        const response =  await  prisma.wishlistItem.create({
            data:{
                productId,
                customerId:user.id
            }
        })
        return ApiResponds(200, "Product added to wishlist successfully", response);
    } catch (error) {
        return ApiError(500, error);
    }
}
