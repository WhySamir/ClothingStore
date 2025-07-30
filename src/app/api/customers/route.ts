import { prisma } from "@/app/lib/prisma";
import { verifyUser } from "@/utlis/verifyUser";
import { NextRequest } from "next/server";
import { getOrSetCache } from "@/app/lib/cache";
import { ApiError } from "@/utlis/ApiResponders/ApiError";

export async function GET(req:NextRequest) {
    const user = await verifyUser(req)

  if (!user) {
    return new Response("Unauthorized", { status: 401 });
  }
try {
  
  const customerProfile = await getOrSetCache(
      `customer:${user.id}`, 
      3000, // ~1hr
      () => prisma.customer.findUnique({ where: { id: user.id },
      select: { id: true, name: true, email: true, provider: true, userAvatarUrl: true } })
    );

  const [cartCount, wishlistCount] = await Promise.all([
  prisma.cart.count({ where: { customerId: user.id } }),
  prisma.wishlistItem.count({ where: { customerId: user.id } }),
]);
  
    return Response.json({...customerProfile,cartCount,wishlistCount});
} catch (error) {
  return ApiError(500,error)
  
}
}
