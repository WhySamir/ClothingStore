import { prisma } from "@/app/lib/prisma";
import { ApiError } from "@/utlis/ApiResponders/ApiError";
import { ApiResponds } from "@/utlis/ApiResponders/ApiResponds";
import { NextRequest } from "next/server";
import { uploadProductMainImage } from "@/utlis/uploadProductImgonCloudinary";
import type { ProductColor } from "@prisma/client";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const rawData = formData.get("data") as string;
    const { product, sizes, colors, features, imagesMeta,tags } = JSON.parse(rawData);

    //product Image main
    const mainFile = formData.get("mainImage") as File | null;
    if (!mainFile) {
      return ApiError(400, "No main image uploaded");
    }

    const mainBuffer = Buffer.from(await mainFile.arrayBuffer());
    const mainImgUrl = await uploadProductMainImage(mainBuffer);

    // product
    const createdProduct = await prisma.product.create({
      data: {
        ...product,
        mainImgUrl,
      },
    });
    const productId = createdProduct.id;

    //sizes
    if (sizes && sizes.length > 0) {
      await prisma.productSize.createMany({
        data: sizes.map((size: { size: string; stockQty: number }) => ({
          size: size.size,
          stockQty: size.stockQty,
          productId,
        })),
      });
    }
    //features
    if (features && features.length > 0) {
      await prisma.productFeature.createMany({
        data: features.map((feature: { key: string; value: string }) => ({
          key: feature.key,
          value: feature.value,
          productId,
        })),
      });
    }
  // colors
    let createdColors: ProductColor[] = [];
    if (colors && colors.length > 0) {
      createdColors = await prisma.$transaction(
        colors.map((color: { color: string; hexCode?: string }) =>
          prisma.productColor.create({
            data: { color: color.color, hexCode: color.hexCode, productId },
          })
        )
      );
    }
   if (tags && tags.length > 0) {
  await prisma.$transaction(
    tags.map((tag: { name: string }) => prisma.tag.create({
      data: {
        name: tag.name,
        productId
      }
    }))
  );
}

    const uploadedImages = [];
    const files = formData.getAll("images") as File[];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const meta = imagesMeta[i]|| { color: null };; // match color

      const buffer = Buffer.from(await file.arrayBuffer());
      const url = await uploadProductMainImage(buffer);

      let colorId: string | null = null;
      if (meta.color) {
        const matchColor = createdColors.find((c) => c.color === meta.color);
        if (matchColor) colorId = matchColor.id;
      }

      // Save in DB
      const savedImage = await prisma.productImage.create({
        data: {
          url,
          alt: meta.alt || null,
          productId,
          ...(colorId ? { productColorId:colorId } : {}),
        },
      });

      uploadedImages.push(savedImage);
    }

    return ApiResponds(201, " Product created successfully", {
      productId,
      createdProduct,
      uploadedImages,
    });
  } catch (error) {
    console.error(" Product creation failed:", error);
return new Response(
  JSON.stringify({ success: false, message: error }),
  { status: 500, headers: { "Content-Type": "application/json" } }
);  }
}
