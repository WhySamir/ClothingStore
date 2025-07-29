import { prisma } from "@/app/lib/prisma";
import { ApiError } from "@/utlis/ApiResponders/ApiError";
import { ApiResponds } from "@/utlis/ApiResponders/ApiResponds";
import { verifyUser } from "@/utlis/verifyUser";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest, context: { params: Promise<{ id: string }> }) {
  try {
    const customer = await verifyUser(req);
    if (!customer) return ApiError(401, "Unauthorized");
    const {id} = await context.params;
    const order = await prisma.order.findUnique({
      where: { id },
      include: { items: true },
    });

    if (!order) return ApiError(404, "Order not found");
    if (order.customerId !== customer.id) return ApiError(403, "Forbidden");

    return ApiResponds(200, "Order fetched successfully", order);
  } catch (error) {
    return ApiError(500, error);
  }
}

export async function PATCH(req: NextRequest,context: { params: Promise<{ id: string }> }) {
  try {
    const customer = await verifyUser(req);
    if (!customer) return ApiError(401, "Unauthorized");

    const {id } =await context.params
    const { status } = await req.json();

    if (!status) return ApiError(400, "Status is required");

    const existingOrder = await prisma.order.findUnique({ where: { id } });
    if (!existingOrder) return ApiError(404, "Order not found");
    if (existingOrder.customerId !== customer.id) return ApiError(403, "Forbidden");

    const updatedOrder = await prisma.order.update({
      where: { id },
      data: { status },
    });

    return ApiResponds(200, "Order updated successfully", updatedOrder);
  } catch (error) {
    return ApiError(500, error);
  }
}

export async function DELETE(req: NextRequest, context: { params: Promise<{ id: string }> }) {
  try {
    const customer = await verifyUser(req);
    if (!customer) return ApiError(401, "Unauthorized");
    const {id} = await context.params
    const existingOrder = await prisma.order.findUnique({ where: { id } });
    if (!existingOrder) return ApiError(404, "Order not found");
    if (existingOrder.customerId !== customer.id) return ApiError(403, "Forbidden");

    await prisma.order.delete({ where: { id } });

    return ApiResponds(200, "Order deleted successfully");
  } catch (error) {
    return ApiError(500, error );
  }
}
