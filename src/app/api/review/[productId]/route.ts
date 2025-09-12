import { prisma } from "@/app/lib/prisma";
import { ApiError } from "@/utlis/ApiResponders/ApiError";
import { ApiResponds } from "@/utlis/ApiResponders/ApiResponds";
import { uploadReviewImgonCloudinary } from "@/utlis/uploadReviewImgonCloudinary";
import { uploadReviewVid } from "@/utlis/uploadReviewVid";
import { verifyUser } from "@/utlis/verifyUser";
import { NextRequest } from "next/server";

export async function POST(req:NextRequest, context: { params: Promise<{ productId: string }> }) {
  const { productId } = await context.params;

  try {
    const formData =  await req.formData()
    const rating = formData.get("rating");
    const comment = formData.get("comment")?.toString();
    const title = formData.get("title")?.toString();

    const images = formData.getAll("images") as File[];
    const videos = formData.getAll("video") as File[];

    const user = await verifyUser(req)
    const customerId=user.id

    if (rating === (0 || undefined) || comment?.trim() === "" || title?.trim() === "") {

      return ApiError(400, "Rating, comment and title are required");
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

   const imageUrl: string[] = await Promise.all(
  images.map(async (image) => {
    const arrayBuffer = await image.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    return uploadReviewImgonCloudinary(buffer, productId, image.name);
  })
);
    let videoUrl = "";
  if (videos[0]) {
  const arrayBuffer = await videos[0].arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  videoUrl = await uploadReviewVid(buffer, productId, videos[0].name);
}

    const review = await prisma.review.create({
      data: {
        productId: productId,
        rating: Number(rating),
        comment:comment!,
        title,
        customerId,
        images:imageUrl ,
        videos:videoUrl,
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
    const {reviewId} = await req.json();
    const user = await verifyUser(req)
    const customerId=user.id

    

    if (!reviewId || !customerId || !productId) {
      return ApiError(400, "Review Id, Customer and Product ID is required");
    }
    const existingReview = await prisma.review.findFirst({
      where: { productId, customerId },
    });
    if(!existingReview){
      return ApiResponds(200,"No review to delete",existingReview)
    }


     await prisma.review.delete({
      where: { id:reviewId },
    });

    return ApiResponds(200, "Review deleted successfully");
  } catch (error) {
    return ApiError(500, error);
  }
}

export async function GET(req:NextRequest,
  context: { params: Promise<{ productId: string }> }   
) {
  const { productId } = await context.params;

  try {
    const product = await prisma.product.findUnique({
      where: { id: productId },
      select:{
        reviews:
        {
          select:{
            id:true,
            rating:true,
            title:true,
            comment:true,
            createdAt:true,
            images:true,
            verified:true,
            videos:true,
            customer:{
              select:{
                name:true,
                userAvatarUrl:true
              }
            }
          }
        }
      }
    });

    if (!product) {
      return ApiError(404, "Product not found");
    }

    return ApiResponds(200, "Product details fetched", product);
  } catch (error) {
    return ApiError(500, error);
  }
}


export async function PATCH(req:NextRequest, context: { params: Promise<{ productId: string }> }) {
  const { productId } = await context.params;

  try {
    const body = await req.json();
    const { rating, comment,title } = body;

    const user = await verifyUser(req)
    const customerId=user.id

if (rating === undefined || comment.trim() === "" || title.trim() === "") {

      return ApiError(400, "Rating, comment and title are required");
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
      rating, comment,title
    }
  });

    return ApiResponds(201, "Review updated successfully",updatedReview);
  } catch (error) {
    return ApiError(500, error);
  }
}