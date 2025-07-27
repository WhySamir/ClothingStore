import { prisma } from "@/app/lib/prisma";
import { ApiError } from "@/utlis/ApiResponders/ApiError";
import { ApiResponds } from "@/utlis/ApiResponders/ApiResponds";
import { NextRequest } from "next/server";

export async function POST(req:NextRequest, context: { params: Promise<{ productId: string }> }) {
  const { productId } = await context.params;

  try {
    const body = await req.json();
    const {customerId, rating, comment } = body;

    if (!rating || !comment) {
      return ApiError(400, "Rating and comment are required");
    }

    if (!customerId || !productId) {
      return ApiError(400, "Customer and Product ID is required");
    }
    const existingReview = await prisma.review.findFirst({
      where: { productId, customerId },
    });
    if(existingReview){
      return ApiResponds(204,"One customer cannot have multiple reviews",existingReview)
    }


    const review = await prisma.review.create({
      data: {
        productId: productId,
        rating,
        comment,
        customerId
      },
    });

    return ApiResponds(201, "Review created successfully", review);
  } catch (error) {
    return ApiError(500, error);
  }
}