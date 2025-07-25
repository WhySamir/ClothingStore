import { uploadFromUrlToCloudinary } from "@/utlis/uploadonCloudinary";
import { Customer } from "@prisma/client";
import { prisma } from "@/app/lib/prisma";
import { ApiResponds } from "@/utlis/ApiResponders/ApiResponds";

export const googleAvatartoCloud = async (customer:Customer) => {
  // Upload avatars for all customers who have userAvatarUrl but it's not yet on Cloudinary
    if (
      customer.userAvatarUrl &&
      !customer.userAvatarUrl.includes("res.cloudinary.com") // avoid re-uploading
    ) {
      const cloudinaryUrl = await uploadFromUrlToCloudinary(customer.userAvatarUrl, customer.id);
      // Update customer with new avatar URL
      await prisma.customer.update({
        where: { id: customer.id },
        data: { userAvatarUrl: cloudinaryUrl },
      });
    }else{
        return  ApiResponds(200, "No avatar to upload or already uploaded to Cloudinary", customer.userAvatarUrl);
    }
  return  ApiResponds(
     200,
     "Avatars uploaded successfully",
  );
};