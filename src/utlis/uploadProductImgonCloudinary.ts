import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

/**
 * Uploads a product image (from a File buffer) to Cloudinary
 */
export const uploadProductMainImage = async (
  buffer: Buffer,
  productId?: string
): Promise<string> => {
  return new Promise((resolve, reject) => {
    const upload = cloudinary.uploader.upload_stream(
      {
        folder: "clothingstore/productImage",
        public_id: productId ? `product-${productId}` : undefined,
        overwrite: true,
        fetch_format: "auto",
        quality: "auto",
      },
      (err, result) => {
        if (err) {
          console.error("Cloudinary Upload Failed:", err);
          reject(err);
        } else {
          resolve(result?.secure_url || "");
        }
      }
    );

    upload.end(buffer);
  });
};
