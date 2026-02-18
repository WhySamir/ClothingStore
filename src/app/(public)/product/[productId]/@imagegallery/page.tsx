import { prisma } from "@/app/lib/prisma";
import ImageGalleryClient from "./ImageGalleryClient";

async function getImages(id: string) {
  try {
    const product = await prisma.product.findUnique({
      where: { id },
      select: {
        id: true,
        mainImgUrl: true,
        images: {
          select: {
            url: true,
          },
        },
      },
    });
    return JSON.parse(JSON.stringify(product));
  } catch (error) {
    console.error("ISR Fetch Error (Image Gallery):", error);
    return null;
  }
}

export default async function ImageGalleryPage({
  params,
}: {
  params: Promise<{ productId: string }>;
}) {
  const { productId } = await params;
  const initialData = await getImages(productId);

  return <ImageGalleryClient initialData={initialData} />;
}
