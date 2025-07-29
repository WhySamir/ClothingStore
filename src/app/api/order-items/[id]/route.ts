import { prisma } from "@/app/lib/prisma";
import { ApiError } from "@/utlis/ApiResponders/ApiError";
import { ApiResponds } from "@/utlis/ApiResponders/ApiResponds";
import { verifyUser } from "@/utlis/verifyUser";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest, context: { params: Promise<{ id: string }> }) {
  try {
    const customer = await verifyUser(req);
    if (!customer) return ApiError(401, "Unauthorized");
    const {id} = await context.params
    const item = await prisma.orderItem.findUnique({
      where: { id },
      include: { product: true, order: true },
    });

    if (!item) return ApiError(404, "Order item not found");
    if (item.order.customerId !== customer.id) return ApiError(403, "Forbidden");

    return ApiResponds(200, "Order item fetched successfully", item);
  } catch (error) {
    return ApiError(500, error );
  }
}

export async function PATCH(req: NextRequest, context: { params: Promise<{ id: string }> }) {
  try {
    const customer = await verifyUser(req);
    if (!customer) return ApiError(401, "Unauthorized");

    const { quantity, price } = await req.json();
const {id} = await context.params
    const existingItem = await prisma.orderItem.findUnique({
      where: { id },
      include: { order: true },
    });

    if (!existingItem) return ApiError(404, "Order item not found");
    if (existingItem.order.customerId !== customer.id) return ApiError(403, "Forbidden");

    const updatedItem = await prisma.orderItem.update({
      where: { id },
      data: {
        ...(quantity !== undefined && { quantity }),
        ...(price !== undefined && { price }),
      },
    });

    return ApiResponds(200, "Order item updated successfully", updatedItem);
  } catch (error) {
    return ApiError(500, error );
  }
}

export async function DELETE(req: NextRequest, context: { params: Promise<{ id: string }> }){
  try {
    const customer = await verifyUser(req);
    if (!customer) return ApiError(401, "Unauthorized");
    const {id} = await context.params

    const existingItem = await prisma.orderItem.findUnique({
      where: { id },
      include: { order: true },
    });

    if (!existingItem) return ApiError(404, "Order item not found");
    if (existingItem.order.customerId !== customer.id) return ApiError(403, "Forbidden");

    await prisma.orderItem.delete({ where: { id } });

    return ApiResponds(200, "Order item deleted successfully");
  } catch (error) {
    return ApiError(500, error);
  }
}
