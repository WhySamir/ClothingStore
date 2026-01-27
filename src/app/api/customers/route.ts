import { prisma } from "@/app/lib/prisma";
import { verifyUser } from "@/utlis/verifyUser";
import { NextRequest } from "next/server";
import { ApiError } from "@/utlis/ApiResponders/ApiError";

export async function GET(req:NextRequest) {
  
  try {
    
  const user = await verifyUser(req)
  const customerProfile = await prisma.customer.findUnique({ where: { id: user.id },
      select: { id: true, name: true, email: true, provider: true, userAvatarUrl: true } });

     if (!customerProfile) {
      return Response.json(
        { error: "Customer profile not found" },
        { status: 404 }
      );
    }

  const [cartCount, wishlistCount] = await Promise.all([
  prisma.cart.count({ where: { customerId: user.id } }),
  prisma.wishlistItem.count({ where: { customerId: user.id } }),
]);
  
    return Response.json({...customerProfile,cartCount,wishlistCount});
} catch (error: unknown) {
  if (error instanceof Error) {
    console.error("API /customers failed:", error.message, error.stack);
  } else {
    console.error("API /customers failed with non-Error:", error);
  }
  
}
}
