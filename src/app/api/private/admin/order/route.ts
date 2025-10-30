import { prisma } from "@/app/lib/prisma";
import { ApiError } from "@/utlis/ApiResponders/ApiError";
import { ApiResponds } from "@/utlis/ApiResponders/ApiResponds";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const order = await prisma.order.findMany({
      select: {
        createdAt: true,
        customerId: true,
        id: true,
        items: true,
        status: true,
        totalAmount: true,
      },
    });
    // );
    return ApiResponds(200, "order got successfully", order);
  } catch (error) {
    return ApiError(500, error);
  }
}

export async function DELETE(req: Request) {
  try {
    const { ids } = await req.json();

    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return NextResponse.json(
        { success: false, message: "No order IDs provided" },
        { status: 400 }
      );
    }

    // Find which IDs actually exist
    const existingOrders = await prisma.order.findMany({
      where: { id: { in: ids } },
      select: { id: true },
    });

    if (existingOrders.length === 0) {
      return NextResponse.json(
        { success: false, message: "No order found for the provided IDs" },
        { status: 404 }
      );
    }

    const existingIds = existingOrders.map((p) => p.id);

    // Delete only existing ones
    await prisma.order.deleteMany({
      where: { id: { in: existingIds } },
    });

    return NextResponse.json({
      success: true,
      message: "orders deleted",
      deletedIds: existingIds,
      notFoundIds: ids.filter((id) => !existingIds.includes(id)),
    });
  } catch (error) {
    console.error("DELETE /api/private/admin/orders error:", error);
    return NextResponse.json(
      { success: false, message: "Server error", error: `${error}` },
      { status: 500 }
    );
  }
}
