import { prisma } from "@/app/lib/prisma";
import { ApiError } from "@/utlis/ApiResponders/ApiError";
import { ApiResponds } from "@/utlis/ApiResponders/ApiResponds";
import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
// import { ApiResponds } from "@/utlis/Apis/ApiResponds";
// getCustomerById
// only admin or customer itself
export async function GET(req:Request, {params}:{params:Promise<{id:string}>}){
    const {id } = await params;
    if(!id){
        return  ApiError(400, "Customer ID is required");
    } 
    
    const supabase = createServerComponentClient({ cookies });
    const {
      data: { user },
    } = await supabase.auth.getUser();
  
    if (!user) {
      return ApiError(401, "Unauthorized: User not logged in");
    }
    const customer = await prisma.customer.findUnique({
        where: { id },
    });
    if (!customer) {
    throw  ApiError(404, "Customer not found");
  }
  const isAdmin = user.user_metadata?.role === "admin";
  const isOwner = user.email === customer.email;

  if (!isAdmin && !isOwner) {
    return ApiError(403, "Forbidden: You are not allowed to access this customer");
  }

  return  ApiResponds(200, "Customer fetched successfully", customer)
}
