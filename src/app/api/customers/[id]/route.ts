import { prisma } from "@/app/lib/prisma";
import {  googleAvatartoCloud } from "@/app/server/controllers/customer.controller";
import { ApiError } from "@/utlis/Apis/ApiError";
import { ApiResponds } from "@/utlis/Apis/ApiResponds";
// import { ApiResponds } from "@/utlis/Apis/ApiResponds";

export async function GET(req:Request, {params}:{params:Promise<{id:string}>}){
    const {id } = await params;
    if(!id){
        return  ApiError(400, "Customer ID is required");
    }
    const customer = await prisma.customer.findUnique({
        where: { id },
    });
    if (!customer) {
    throw  ApiError(404, "Customer not found");
  }

  return  ApiResponds(200, "Customer fetched successfully", customer)
}
export async function POST(req:Request,{params}:{params:Promise<{id:string}>}){
    const customerId = (await params).id
      const customer = await prisma.customer.findUnique({ where: { id: customerId } });

      if (!customer) {
    throw  ApiError(404, "Customer not found");}
    return  googleAvatartoCloud(customer);
}