//1 supabase bata user data lai table customer ma save garne
//2 make logic for customer to admin mapping 
// 1 2 done in supabase triggers and functions

import { prisma } from "@/app/lib/prisma";
import { ApiResponds } from "@/utlis/Apis/ApiResponds";
import { uploadFromUrlToCloudinary } from "@/utlis/uploadonCloudinary";
import {  Customer } from "@prisma/client";


// 3 add multer and store to cloudinary
// CustomerCreateInput
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


