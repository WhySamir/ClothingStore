import { prisma } from "@/app/lib/prisma";
import { ApiError } from "@/utlis/ApiResponders/ApiError";
import { ApiResponds } from "@/utlis/ApiResponders/ApiResponds";
import { verifyUser } from "@/utlis/verifyUser";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const customer = await verifyUser(req);
    if (!customer) return ApiError(401, "Unauthorized");

    const orders = await prisma.order.findMany({
      where: { customerId: customer.id },
      include: { items: true }, 
    });

    return ApiResponds(200, "Fetched orders successfully", orders);
  } catch (error) {
    return ApiError(500, error);
  }
}

export async function POST(req: NextRequest) {
  try {
    const customer = await verifyUser(req);
    if (!customer) return ApiError(401, "Unauthorized");

    const body = await req.json();
    const { totalAmount, status } = body;

    if (!totalAmount) return ApiError(400, "Total amount is required");

    const order = await prisma.order.create({
      data: {
        customerId: customer.id,
        totalAmount,
        status: status || "PENDING",
      },
    });

    return ApiResponds(201, "Order created successfully", order);
  } catch (error) {
    return ApiError(500, error );
  }
}
