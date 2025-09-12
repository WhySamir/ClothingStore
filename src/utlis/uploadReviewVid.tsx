import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

export const uploadReviewVid = async (
  buffer: Buffer,
  productId?: string,
  filename?: string
): Promise<string> => {
  return new Promise((resolve, reject) => {
    const upload = cloudinary.uploader.upload_stream(
      {
        folder: "clothingstore/review/videos",
        public_id: filename
          ? filename.split(".")[0]
          : productId
          ? `product-${productId}`
          : undefined,
        resource_type: "video",
        fetch_format: "auto",
        quality: "auto",
      },
      (err, result) => {
        if (err) {
          console.error("Main Image Upload Failed:", err);
          return reject(err);
        }
        resolve(result?.secure_url || "");
      }
    );

    upload.end(buffer);
  });
};
