import { prisma } from "@/app/lib/prisma";
import { ApiError } from "@/utlis/ApiResponders/ApiError";
import { ApiResponds } from "@/utlis/ApiResponders/ApiResponds";
import { verifyUser } from "@/utlis/verifyUser";
import { NextRequest } from "next/server";

export async function POST(req:NextRequest){
    const {name} =await req.json();
    const customer =  await verifyUser(req);
    const customerId = customer.id
    if(name.trim()===""){
       return ApiError(400,"Please insert cart name")
    }
    if(!customerId){
      return  ApiError(401,"Unauthorized")
    }
    try {
        const existingCart = await prisma.cart.findFirst(
            {
                where:{
                    name,
                    customerId
                }
            }
        )
        if(existingCart){
          return  ApiResponds(409,"Cannot create cart withh same name again")
        }
    
        const cart = await prisma.cart.create({
            data: {
                name,
                customerId
            }
        })
        return ApiResponds(200,"Created cart sucessfully",cart)
    } catch (error) {
        return ApiError(400,error)
    }
}
