import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

const getFormat = (filename?: string) => {
  if (!filename) return undefined;
  const ext = filename.split(".").pop()?.toLowerCase();
  // Only use format if not webp, jpg, png — Cloudinary auto handles these
  if (ext && !["jpg", "jpeg", "png", "webp"].includes(ext)) return "auto";
  return undefined;
};

export const uploadMainProductImage = async (
  buffer: Buffer,
  productId?: string,
  filename?: string
): Promise<string> => {
  return new Promise((resolve, reject) => {
    const upload = cloudinary.uploader.upload_stream(
      {
        folder: "clothingstore/productImage/main",
        public_id: productId ? `product-${productId}` : undefined,
        overwrite: true,
        resource_type: "image",
        fetch_format: "auto",
        quality: "auto",
        format: getFormat(filename),
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

export const uploadColorProductImage = async (
  buffer: Buffer,
  productId?: string,
  color?: string,
  filename?: string
): Promise<string> => {
  const publicId = productId && color ? `product-${productId}-${color}` : undefined;

  return new Promise((resolve, reject) => {
    const upload = cloudinary.uploader.upload_stream(
      {
        folder: "clothingstore/productImage/colors",
        public_id: publicId,
        overwrite: true,
        resource_type: "image",
        fetch_format: "auto",
        quality: "auto",
        format: getFormat(filename),
      },
      (err, result) => {
        if (err) {
          console.error("Color Image Upload Failed:", err);
          return reject(err);
        }
        resolve(result?.secure_url || "");
      }
    );

    upload.end(buffer);
  });
};
