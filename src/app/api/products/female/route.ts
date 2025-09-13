import { prisma } from "@/app/lib/prisma";
import { ApiError } from "@/utlis/ApiResponders/ApiError";
import { ApiResponds } from "@/utlis/ApiResponders/ApiResponds";
import { NextRequest } from "next/server";




export async function GET(req:NextRequest) {
   try {
    const { searchParams } = new URL(req.url);


     const tag = searchParams.get("tag") || undefined;
    const color = searchParams.get("color") || undefined;
    const size = searchParams.get("size") || undefined;
    const minPrice = searchParams.get("minPrice")
      ? Number(searchParams.get("minPrice"))
      : undefined;
    const maxPrice = searchParams.get("maxPrice")
      ? Number(searchParams.get("maxPrice"))
      : undefined;

     const female = await prisma.product.findMany({
         where:{
             categoryId:2,
             ...(minPrice !== undefined || maxPrice !== undefined
          ? {
              sellingPrice: {
                gte: minPrice ?? 0,
                lte: maxPrice ?? Number.MAX_SAFE_INTEGER,
              },
            }
          : {}),

        ...(tag && {
          tags: {
            some: {
              name: {
                equals: tag,
                mode: "insensitive", 
              },
            },
          },
        }),

        ...(color && {
          colors: {
            some: {
              color: {
                equals: color,
                mode: "insensitive",
              },
            },
          },
        }),

        ...(size && {
          sizes: {
            some: {
              size: {
                equals: size,
                mode: "insensitive",
              },
            },
          },
        }),
      },
         select:{
          id:true,
          name:true,
          categoryId:true,
          sellingPrice:true,
          discount:true,
          mainImgUrl:true,
          colors:{
            select:{
              color:true,
              hexCode:true,
              stockQty:true
            }
          },
          sizes:{
            select:{
              size:true,
              stockQty:true
            }
          },
          reviews:true,tags:{
            select:{
              name:true
            }
          },features:{
            select:{
              key:true,
              value:true
            }
          }
         }
     })
     return ApiResponds(200, "Female products fetched successfully", female)
   } catch (error) {
     return ApiError(500, error);
    
   }
}