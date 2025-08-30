import { prisma } from "@/app/lib/prisma";
import { ApiError } from "@/utlis/ApiResponders/ApiError";
import { ApiResponds } from "@/utlis/ApiResponders/ApiResponds";
import { verifyUser } from "@/utlis/verifyUser";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const customer = await verifyUser(req);
    if (!customer) return ApiError(401, "Unauthorized");

    const items = await prisma.orderItem.findMany({
      where: {
        order: { customerId: customer.id },
      },
      include: { product: true, order: true }, // optional for details
    });

    return ApiResponds(200, "Fetched order items successfully", items);
  } catch (error) {
    return ApiError(500, error);
  }
}

export async function POST(req: NextRequest) {
  try {
    const customer = await verifyUser(req);
    if (!customer) return ApiError(401, "Unauthorized");

    const { orderId, productId, quantity, price, shippingCost, taxes, couponDiscount } = await req.json();

    if (!orderId || !productId || !quantity || !price || !shippingCost || !taxes || !couponDiscount) {
      return ApiError(400, "orderId, productId, quantity, price, shippingCost, taxes, and couponDiscount are required");
    }

    const order = await prisma.order.findUnique({ where: { id: orderId } });
    if (!order) return ApiError(404, "Order not found");
    if (order.customerId !== customer.id) return ApiError(403, "Forbidden");

    const orderItem = await prisma.orderItem.create({
      data: {
        orderId,
        productId,
        quantity,
        price,
        shippingCost,
        taxes,
        couponDiscount
      },
    });

    return ApiResponds(201, "Order item created successfully", orderItem);
  } catch (error) {
    return ApiError(500, error );
  }
}
