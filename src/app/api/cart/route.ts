import { prisma } from "@/app/lib/prisma";
import { ApiError } from "@/utlis/ApiResponders/ApiError";
import { ApiResponds } from "@/utlis/ApiResponders/ApiResponds";
import { verifyUser } from "@/utlis/verifyUser";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const customer = await verifyUser(req);
  if (!customer?.id) return ApiError(401, "Unauthorized");

  const { productId, colorId, sizeId, itemQty } = await req.json();
  if (!productId || !colorId || !sizeId || !itemQty)
    return ApiError(400, "productId, colorId, sizeId, itemQty required");

  try {
    const existing = await prisma.cart.findUnique({
      where: { customerId_productId_colorId_sizeId: { customerId: customer.id, productId, colorId, sizeId } }
    });

    if (existing) {
      return ApiError(409, "Item already in cart");
    }

    const cartItem = await prisma.cart.create({
      data: { customerId: customer.id, productId, colorId, sizeId, itemQty }
    });

    return ApiResponds(201, "Cart item added", cartItem);
  } catch (error) {
    return ApiError(500, error);
  }
}


export async function GET(req: NextRequest) {
  const customer = await verifyUser(req);
  if (!customer?.id) return ApiError(401, "Unauthorized");

  try {
    const items = await prisma.cart.findMany({
      where: { customerId: customer.id },
      select: {
            id: true,
            createdAt: true,
            itemQty: true,
            product: {
              select: {
                id: true,
                name: true,
                sellingPrice: true,
               mainImgUrl:true,
               stockQty:true,
              }
            },
            color: {
              select: {
                id: true,
                color: true,
                hexCode: true, stockQty: true
              }
            },
            size: {
              select: {
                id: true,
                size: true,
                stockQty: true
              }
            }
          }
    });

    return ApiResponds(200, "Cart fetched successfully", items);
  } catch (error) {
    return ApiError(500, error);
  }
}

export async function PATCH(req: NextRequest) {
  const customer = await verifyUser(req);
  if (!customer?.id) return ApiError(401, "Unauthorized");

  const { cartId, itemQty } = await req.json();
  if (!cartId || itemQty == null)
    return ApiError(400, "cartId, itemQty required");

  try {
    const updated = await prisma.cart.update({
      where: {id:cartId  },
      data: { itemQty }
    });

    return ApiResponds(200, "Cart item updated", updated);
  } catch (error) {
    return ApiError(500, error);
  }
}

export async function DELETE(req: NextRequest) {
  const customer = await verifyUser(req);
  if (!customer?.id) return ApiError(401, "Unauthorized");

  const { cartId } = await req.json();

  if (!cartId) return ApiError(400, "cartId required");

  try {
    const deleted = await prisma.cart.delete({
      where: { id: cartId }
    });

    return ApiResponds(200, "Cart item deleted", deleted);
  } catch (error) {
    return ApiError(500, error);
  }
}

