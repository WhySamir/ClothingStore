import { prisma } from "@/app/lib/prisma";
import { ApiError } from "@/utlis/ApiResponders/ApiError";
import { ApiResponds } from "@/utlis/ApiResponders/ApiResponds";
import { verifyUser } from "@/utlis/verifyUser";
import { NextRequest } from "next/server";

export async function POST(req:NextRequest, context: { params: Promise<{ productId: string }> }) {
  const { productId } = await context.params;

  try {
    const body = await req.json();
    const { rating, comment } = body;

    const user = await verifyUser(req)
    const customerId=user.id

if (rating === undefined || comment.trim() === "") {

      return ApiError(400, "Rating and comment are required");
    }

    if (!customerId || !productId) {
      return ApiError(400, "Customer and Product ID is required");
    }
    const existingReview = await prisma.review.findFirst({
      where: { productId, customerId },
    });
    if(existingReview){
      return ApiResponds(200,"One customer cannot have multiple reviews",existingReview)
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

export async function DELETE(req:NextRequest, context: { params: Promise<{ productId: string }> }) {
  const { productId } = await context.params;

  try {
    const user = await verifyUser(req)
    const customerId=user.id

    if (!customerId || !productId) {
      return ApiError(400, "Customer and Product ID is required");
    }
    const existingReview = await prisma.review.findFirst({
      where: { productId, customerId },
    });
    if(!existingReview){
      return ApiResponds(200,"No review to delete",existingReview)
    }


    const review = await prisma.review.delete({
  where: { id: existingReview.id },
    }
    );

    return ApiResponds(200, "Review deleted successfully");
  } catch (error) {
    return ApiError(500, error);
  }
}
export async function GET(req:NextRequest, context: { params: Promise<{ productId: string }> }) {
  const { productId } = await context.params;

  try {
    const user = await verifyUser(req)
    const customerId=user.id

    if (!customerId || !productId) {
      return ApiError(400, "Customer and Product ID is required");
    }
    const existingReview = await prisma.review.findFirst({
      where: { productId, customerId },
    });
    if(existingReview){
      return ApiResponds(200,"Review",existingReview)
    }


    return ApiResponds(200, "No review found");
  } catch (error) {
    return ApiError(500, error);
  }
}

export async function PATCH(req:NextRequest, context: { params: Promise<{ productId: string }> }) {
  const { productId } = await context.params;

  try {
    const body = await req.json();
    const { rating, comment } = body;

    const user = await verifyUser(req)
    const customerId=user.id

if (rating === undefined || comment.trim() === "") {

      return ApiError(400, "Rating and comment are required");
    }

    if (!customerId || !productId) {
      return ApiError(400, "Customer and Product ID is required");
    }
    const existingReview = await prisma.review.findFirst({
      where:{
        customerId,productId
      }
    })
      if(!existingReview){
      return ApiResponds(200,"No review to update")
    }
  const updatedReview = await prisma.review.update({
    where: { productId_customerId: { productId, customerId } },
    data: {
      rating, comment
    }
  });

    return ApiResponds(201, "Review updated successfully",updatedReview);
  } catch (error) {
    return ApiError(500, error);
  }
}