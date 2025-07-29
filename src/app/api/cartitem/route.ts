import { prisma } from "@/app/lib/prisma";
import { ApiError } from "@/utlis/ApiResponders/ApiError";
import { ApiResponds } from "@/utlis/ApiResponders/ApiResponds";
import { verifyUser } from "@/utlis/verifyUser";
import { NextRequest } from "next/server";

export async function POST(req:NextRequest) {
const customer =  await verifyUser(req);
       const customerId = customer.id

        if(!customerId){
            return ApiError(402,"Unauthorized")
        }
  try {
    const body = await req.json();
    const { productId, cartId ,itemQty} = body;

    if (!productId || !cartId ||!itemQty) {
      return ApiError(400, "Customer,itemQty and Product ID is required");
    }
    const existingCartItem = await prisma.cartItem.findFirst({
      where: { productId,  cartId },
    });
    if(existingCartItem){
      return ApiResponds(200,"cartItem cannot be crated again on same product",existingCartItem)
    }


    const cartItem = await prisma.cartItem.create({
      data: {
        productId: productId,
        cartId,
        itemQty
      },
    });

    return ApiResponds(201, "Cart item created successfully", cartItem);
  } catch (error) {
    return ApiError(500, error);
  }
}