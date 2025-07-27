import { prisma } from "@/app/lib/prisma";
import { verifyUser } from "@/utlis/verifyUser";
import { NextRequest } from "next/server";

export async function GET(req:NextRequest) {
    const user = await verifyUser(req)

  if (!user) {
    return new Response("Unauthorized", { status: 401 });
  }

  // Now you can use user.id
  const customer = await prisma.customer.findUnique({ where: { id: user.id } });
console.log(customer)
  return Response.json(customer);
}
