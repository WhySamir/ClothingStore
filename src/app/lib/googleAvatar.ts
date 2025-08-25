import { uploadFromUrlToCloudinary } from "@/utlis/uploadonCloudinary";
import { prisma } from "@/app/lib/prisma";
import { ApiError } from "@/utlis/ApiResponders/ApiError";

interface Customer {
  id: string;
  userAvatarUrl: string | null;
}

export const  googleAvatartoCloud = async (customer:Customer) => {

  if(!customer.userAvatarUrl){
    console.log("No avatar URL provided for user:",customer.id);
    return null
  }
  // Upload avatars for all customers who have userAvatarUrl but it's not yet on Cloudinary
   try {
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
   } catch (error) {
    console.error("Error uploading avatar for user:", customer.id, error);
  return ApiError(500, error);
   }
  
};