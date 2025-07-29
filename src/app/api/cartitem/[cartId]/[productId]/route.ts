import { prisma } from "@/app/lib/prisma";
import { ApiError } from "@/utlis/ApiResponders/ApiError";
import { ApiResponds } from "@/utlis/ApiResponders/ApiResponds";
import { verifyUser } from "@/utlis/verifyUser";
import { NextRequest } from "next/server";

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ cartId: string, productId: string}> }
) {
  const { cartId, productId } =await context.params;
    const customer =  await verifyUser(request);
       const customerId = customer.id

        if(!customerId){
            return ApiError(402,"Unauthorized")
        }

    if(!cartId||!productId){
        return ApiError(400,"No cartid or productid")
    }
    try {
        const cartItem = await prisma.cartItem.findUnique({
      where: {
        cartId_productId: { cartId, productId }
      }
    });
        return ApiResponds(200,"got cartitem sucess",cartItem)
    } catch (error) {
        return ApiError(500,error)
    }
}

export async function PATCH( request: NextRequest,
  context: { params: Promise<{ cartId: string, productId: string}> }
) {
    const customer =  await verifyUser(request);
       const customerId = customer.id

        if(!customerId){
            return ApiError(401,"Unauthorized")
        }
    const { cartId, productId } =await context.params;
     if(!cartId||!productId){
        return ApiError(400,"No cartid or productid")
    }
    const {itemQty} = await request.json()
    if(itemQty<0){
        return ApiError(500,'please put valid int(itemQty)')
    }
   try {
     const existingCartItem = await prisma.cartItem.findFirst({
         where: {
         cartId: cartId,
         productId: productId,
         itemQty
       }
     })
     if(existingCartItem){
         return ApiError(409,"no change")
     }
     const updateCartItem =await prisma.cartItem.update({
         where:{
                      cartId_productId: { cartId, productId }
         },
         data:{
         itemQty
         }
     })
     return ApiResponds(200,"Updated cartItem sucess",updateCartItem)
   } catch (error) {
    ApiError(400,error)
   }
}

export async function DELETE(request:NextRequest,  context: { params: Promise<{ cartId: string, productId: string}> }
){
 const customer =  await verifyUser(request);
       const customerId = customer.id

        if(!customerId){
            return ApiError(402,"Unauthorized")
        }
    const { cartId, productId } =await context.params;
     if(!cartId||!productId){
        return ApiError(400,"No cartid or productid")
    }
    try {
        const existCartItem = await prisma.cartItem.findUnique({
            where:{
            cartId_productId: { cartId, productId }
            }
        })
        if(!existCartItem){
            return ApiError(404,'Cart item doesnt exist');
        }
        const deleteItem = await prisma.cartItem.delete({
            where:{
            cartId_productId: { cartId, productId }
            }
        })
        return ApiResponds(200,"Deleted cartItem sucess",deleteItem)
    } catch (error) {
        return ApiError(500,error)
        
    }
}