import { prisma } from "@/app/lib/prisma";
import MenClient from "./MenClient";

export const revalidate = 60; // ISR: Revalidate every 60 seconds

async function getMenProducts() {
  try {
    const products = await prisma.product.findMany({
      where: {
        categoryId: 1, // Men
      },
      select: {
        id: true,
        name: true,
        categoryId: true,
        sellingPrice: true,
        discount: true,
        mainImgUrl: true,
        colors: {
          select: {
            color: true,
            hexCode: true,
            stockQty: true,
          },
        },
        sizes: {
          select: {
            size: true,
            stockQty: true,
          },
        },
        reviews: true,
        tags: {
          select: {
            name: true,
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
    return JSON.parse(JSON.stringify(products));
  } catch (error) {
    console.error("ISR Fetch Error (Men):", error);
    return [];
  }
}

export default async function MenPage() {
  const initialProducts = await getMenProducts();

  return <MenClient initialProducts={initialProducts} />;
}
