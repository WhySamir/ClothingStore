//validation for admin 

import { prisma } from "@/app/lib/prisma";
import { verifyUser } from "@/utlis/verifyUser";

import { NextRequest } from "next/server";
export async function isUserAdmin (req: NextRequest): Promise<boolean> {
    const user =await verifyUser(req)
  
    if (!user) return false
  
    const  isAdmin = await prisma.admin.findUnique({ where: { id: user.id } })
  
    if (!isAdmin) return false;
    return true

}