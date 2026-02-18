import { prisma } from "@/app/lib/prisma";
import DescriptionClient from "./DescriptionClient";

async function getProductData(id: string) {
  try {
    const product = await prisma.product.findUnique({
      where: { id },
      select: {
        description: true,
        material: true,
        sizes: {
          select: {
            size: true,
          },
        },
        colors: {
          select: {
            color: true,
          },
        },
        originCountry: true,
        brand: true,
      },
    });
    return JSON.parse(JSON.stringify(product));
  } catch (error) {
    console.error("ISR Fetch Error (Description/Additional):", error);
    return null;
  }
}

export default async function DescriptionPage({
  params,
}: {
  params: Promise<{ productId: string }>;
}) {
  const { productId } = await params;
  const data = await getProductData(productId);

  return (
    <DescriptionClient
      initialDescription={data}
      initialAdditionalInfo={data}
    />
  );
}
