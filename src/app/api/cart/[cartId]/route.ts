import { prisma } from "@/app/lib/prisma";
import { ApiError } from "@/utlis/ApiResponders/ApiError";
import { ApiResponds } from "@/utlis/ApiResponders/ApiResponds";
import { verifyUser } from "@/utlis/verifyUser";
import { NextRequest } from "next/server";

export async function GET(req:NextRequest,context: { params: Promise<{ cartId: string }> }) {
    const { cartId } = await context.params
    const customer =await verifyUser(req);

if(!customer){
    return ApiError(400,"No customer account login")
}
    try {
        const allCarts =  await prisma.cart.findMany({
            where:{
                customerId: customer.id,
                id: cartId
            }
        })
        if(allCarts){
        return ApiResponds(200,"Success",allCarts)
        }
    } catch (error) {
        return ApiError(400,error)
        
    }
}

export async function PATCH(req:NextRequest,context: { params: Promise<{ cartId: string }> }) {
    const {cartId} = await context.params;
    const {name} =await req.json();
    if(!name){
        return ApiError(401,"Name is required for updating")
    }
    if(!cartId){
        return ApiError(401,"CartId is required")
    }
      const customer =await verifyUser(req);

if(!customer){
    return ApiError(400,"No customer account login")
}

   try {
     const isExistingCartSame = await prisma.cart.findFirst({
         where:{
             id:cartId,
             name:name
         }
     })
     if(isExistingCartSame){
         return ApiError(409,"Cart with same name already exist")
     }
 
     const updatedCart = await prisma.cart.update({
         where:{
             id:cartId,
         },
         data:{
             name
         }
     })
     return ApiResponds(200,"Updated cart sucessfully",updatedCart)
     
   } catch (error) {
    return ApiError(400,error)
   }
}

export async function DELETE(req:NextRequest,context:{params:Promise<{cartId:string}>}){

    const { cartId: deleteCartId } = await context.params
    const customer = await verifyUser(req);
   

    if(!customer){
    return ApiError(400,"No customer account login")
}
    if(!deleteCartId){
        return ApiError(404,"No cart id")
    }

   try {
     const deleteCart = await prisma.cart.delete({
         where:{
             id: deleteCartId
         }
     })
     return ApiResponds(200,"Deleted successfully",deleteCart)
   } catch (error) {
    return ApiError(400,error)
   }
}