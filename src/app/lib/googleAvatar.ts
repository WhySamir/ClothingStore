import { uploadFromUrlToCloudinary } from "@/utlis/uploadonCloudinary";
import { prisma } from "@/app/lib/prisma";

interface Customer {
  id: string;
  userAvatarUrl: string | null;
}

export const googleAvatartoCloud = async (customer:Customer) => {

  if(!customer.userAvatarUrl){
    return null
  }
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
      return cloudinaryUrl
    }else{
        return  customer.userAvatarUrl;
    }
  
};