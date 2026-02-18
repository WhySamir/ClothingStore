import { prisma } from "@/app/lib/prisma";
import WomenClient from "./WomenClient";

export const revalidate = 60; // ISR: Revalidate every 60 seconds

async function getWomenProducts() {
  try {
    const products = await prisma.product.findMany({
      where: {
        categoryId: 2, // Women
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
    // Serialize Prisma data (e.g., Decimal to string if necessary, but here we just need them)
    // Most of your Redux code handles sellingPrice as string or number
    return JSON.parse(JSON.stringify(products));
  } catch (error) {
    console.error("ISR Fetch Error (Women):", error);
    return [];
  }
}

export default async function WomenPage() {
  const initialProducts = await getWomenProducts();

  return <WomenClient initialProducts={initialProducts} />;
}
