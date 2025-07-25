//validation for admin 

import { prisma } from "@/app/lib/prisma";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
export async function isUserAdmin (_req: Request): Promise<boolean> {
    const supabase = createServerComponentClient({cookies});
    const {
      data: { user },
    } = await supabase.auth.getUser();
  
    if (!user) return false
  
    const  isAdmin = await prisma.admin.findUnique({ where: { id: user.id } })
  
    if (!isAdmin) return false;
    return true

}