// 1 list all customers but admin privleged
// 2 delete a specific customer

import { prisma } from "@/app/lib/prisma";
import { isUserAdmin } from "@/app/server/controllers/admin.controllers";
import { ApiResponds } from "@/utlis/ApiResponders/ApiResponds";
import { NextRequest } from "next/server";

export async function GET(req:NextRequest){
    const isAdmin = await isUserAdmin(req);
    if(!isAdmin){
return ApiResponds(403,"user is not admin")
    }

    const customers =  await prisma.customer.findMany();
    if (customers.length === 0) {
        return ApiResponds(204, "No customers yet");
      }
    return ApiResponds(200,'All Customers',customers)
}