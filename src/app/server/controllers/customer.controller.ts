//1 supabase bata user data lai table customer ma save garne
//2 make logic for customer to admin mapping 
// 1 2 done in supabase triggers and functions

import { prisma } from "@/app/lib/prisma";
import { ApiResponds } from "@/utlis/Apis/ApiResponds";
import { uploadFromUrlToCloudinary } from "@/utlis/uploadonCloudinary";
import {  Customer } from "@prisma/client";


// 3 add multer and store to cloudinary
// CustomerCreateInput



