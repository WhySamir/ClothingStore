import { prisma } from "@/app/lib/prisma";
import { ApiError } from "@/utlis/ApiResponders/ApiError";
import { ApiResponds } from "@/utlis/ApiResponders/ApiResponds";
import { NextRequest } from "next/server";
import { uploadMainProductImage, uploadColorProductImage } from "@/utlis/uploadProductImgonCloudinary";
import { Prisma, type ProductColor } from "@prisma/client";

export async function POST(request: NextRequest) {
  try {
    let totalStockQty = 0;
    const formData = await request.formData();
    const rawData = formData.get("data") as string;
    const { product, sizes, colors, features, imagesMeta, tags } = JSON.parse(rawData);

    if (!product.categoryId) return ApiError(400, "categoryId is required");

    const categoryExists = await prisma.category.findUnique({ where: { id: product.categoryId } });
    if (!categoryExists) return ApiError(400, `Invalid categoryId: ${product.categoryId}`);

    // Main product image
    const mainFile = formData.get("mainImage") as File | null;
    if (!mainFile) return ApiError(400, "No main image uploaded");
    const mainBuffer = Buffer.from(await mainFile.arrayBuffer());
    const mainImgUrl = await uploadMainProductImage(mainBuffer);

    // Create product
    const createdProduct = await prisma.product.create({
      data: {
        ...product,
        sellingPrice: new Prisma.Decimal(product.sellingPrice),
        costPrice: new Prisma.Decimal(product.costPrice),
        mainImgUrl,
        stockQty: totalStockQty,
      },
    });

    const productId = createdProduct.id;

    // Sizes
    if (sizes?.length) {
      totalStockQty = sizes.reduce((sum: number, s: { stockQty: number }) => sum + Number(s.stockQty || 0), 0);
      await prisma.productSize.createMany({
        data: sizes.map((s: { size: string; stockQty: number }) => ({
          size: s.size,
          stockQty: s.stockQty,
          productId,
        })),
      });
      await prisma.product.update({ where: { id: productId }, data: { stockQty: totalStockQty } });
    }

    // Features
    if (features?.length) {
      await prisma.productFeature.createMany({
        data: features.map((f: { key: string; value: string }) => ({ ...f, productId })),
      });
    }

    // Colors
    let createdColors: ProductColor[] = [];
    if (colors?.length) {
      createdColors = await prisma.$transaction(
        colors.map((c: { color: string; hexCode?: string }) =>
          prisma.productColor.create({ data: { ...c, productId } })
        )
      );
    }

    // Tags
    if (tags?.length) {
      await prisma.$transaction(
        tags.map((t: { name: string }) => prisma.tag.create({ data: { ...t, productId } }))
      );
    }

    // Color images
    const uploadedImages = [];
    const files = formData.getAll("images") as File[];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const meta = imagesMeta[i] || { color: null };
      const buffer = Buffer.from(await file.arrayBuffer());

      let colorName = meta.color || undefined;
      const url = await uploadColorProductImage(buffer, productId, colorName);

      let colorId: string | null = null;
      if (colorName) {
        const matchColor = createdColors.find((c) => c.color === colorName);
        if (matchColor) colorId = matchColor.id;
      }

      const savedImage = await prisma.productImage.create({
        data: {
          url,
          alt: meta.alt || null,
          productId,
          ...(colorId ? { productColorId: colorId } : {}),
        },
      });

      uploadedImages.push(savedImage);
    }

    return ApiResponds(201, "Product created successfully", { productId, createdProduct, uploadedImages });
  } catch (error) {
    console.error("Product creation failed:", error);
    return new Response(JSON.stringify({ success: false, message: error }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
