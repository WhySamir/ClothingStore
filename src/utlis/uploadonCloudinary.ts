import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

export const uploadFromUrlToCloudinary = async (
  imageUrl: string,
  userId: string
): Promise<string> => {
  try {
    const highResUrl = imageUrl.replace("=s96-c", "=s400-c");

    const result = await cloudinary.uploader.upload(highResUrl, {
      folder: 'clothingstore/avatars',
      public_id: `user_${userId}`,  
      overwrite: false,             
      fetch_format: 'auto',
      quality: 'auto',
    });

    return result.secure_url;
  } catch (error:unknown) {
    // If error is because public_id already exists, return constructed URL
    if (isCloudinaryError(error) && error.http_code === 409) {
      return cloudinary.url(`avatars/user_${userId}`, {
        secure: true,
        fetch_format: 'auto',
        quality: 'auto',
      });
    }

    console.error("Cloudinary URL upload failed:", error);
    return imageUrl; // fallback
  }
};


type CloudinaryError = {
  http_code: number;
  message?: string;
  [key: string]: unknown;
};

function isCloudinaryError(error: unknown): error is CloudinaryError {
  return (
    typeof error === "object" &&
    error !== null &&
    "http_code" in error &&
    typeof (error as Record<string, unknown>).http_code === "number"
  );
}