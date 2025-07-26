//many products have one categories like many men clothes in men category
//admin can CRUD products , customer read 

import { prisma } from "@/app/lib/prisma";
import { ApiError } from "@/utlis/ApiResponders/ApiError";
import { ApiResponds } from "@/utlis/ApiResponders/ApiResponds";
import { NextRequest, NextResponse } from "next/server";


export async function POST(request: NextRequest) {
  try {
    const {product,sizes,colors} = await request.json();
     const createdProduct =     await prisma.product.create({
            data: product
        })
     const productId = createdProduct.id;
   if (sizes && sizes.length > 0) {
      await prisma.productSize.createMany({
        data: sizes.map((size: { size: string; stockQty: number }) => ({
          size: size.size,
          stockQty: size.stockQty,
          productId
        }))
      });
    }
    //  if (images && images.length > 0) {
    //   await prisma.productImage.createMany({
    //     data: images.map((image: { url: string; alt?: string }) => ({
    //       url: image.url,
    //       alt: image.alt,
    //       productId
    //     }))
    //   });
    // }
    if (colors && colors.length > 0) {
      await prisma.productColor.createMany({
        data: colors.map((color: { color: string; hexCode?: string }) => ({
          color: color.color,
          hexCode: color.hexCode,
          productId
        }))
      });
    }
    return ApiResponds(201,  "Product received successfully",  { 
      productId,
      createdProduct
    } );
  } catch (error) {
    return ApiError(500, error )
 
  }
}


export async function GET(){
    return Response.json("hello from products route");
}