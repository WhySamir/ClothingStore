import { prisma } from "@/app/lib/prisma";
import ProductDetailsClient from "./ProductDetailsClient";

async function getProduct(id: string) {
  try {
    const product = await prisma.product.findUnique({
      where: { id },
      select: {
        tags: {
          select: {
            name: true,
          },
        },
        id: true,
        name: true,
        reviews: {
          select: {
            rating: true,
          },
        },
        sellingPrice: true,
        description: true,
        stockQty: true,
        discount: true,
        categoryId: true,
        colors: {
          select: {
            id: true,
            color: true,
            hexCode: true,
            stockQty: true,
          },
        },
        sizes: {
          select: {
            id: true,
            size: true,
            stockQty: true,
          },
        },
        features: {
          select: {
            key: true,
            value: true,
          },
        },
      },
    });
    return JSON.parse(JSON.stringify(product));
  } catch (error) {
    console.error("ISR Fetch Error (Product Details):", error);
    return null;
  }
}

export default async function ProductDetailsPage({
  params,
}: {
  params: Promise<{ productId: string }>;
}) {
  const { productId } = await params;
  const initialProduct = await getProduct(productId);

  return <ProductDetailsClient initialProduct={initialProduct} />;
}
