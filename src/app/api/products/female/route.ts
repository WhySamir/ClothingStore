import { prisma } from "@/app/lib/prisma";
import { ApiError } from "@/utlis/ApiResponders/ApiError";
import { ApiResponds } from "@/utlis/ApiResponders/ApiResponds";

export async function GET() {
   try {
     const men = await prisma.product.findMany({
         where:{
             categoryId:2
         }
     })
     return ApiResponds(200, "Female products fetched successfully", men)
   } catch (error) {
     return ApiError(500, error);
    
   }
}