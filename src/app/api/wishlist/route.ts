import { prisma } from "@/app/lib/prisma";
import { verifyUser } from "@/utlis/verifyUser";
import { NextRequest } from "next/server";

export async function GET( req: NextRequest){

   try {
     const user =await verifyUser(req)
 
     const res = await prisma.wishlistItem.findMany({
         where: {
             customerId: user.id
         },
        select: {
            id: true,
            createdAt: true,
            product: {
        select: {
            id: true,
            name: true,
            price: true,
            mainImgUrl: true,
        colors: {
          take: 1,
          select: {
            id: true,
            color: true,
            hexCode: true,
          },
        },
        sizes: {
          take: 1,
          select: {
            id: true,
            size: true,
            stockQty: true,
          },
        },
      },
    },
  }});

  return new Response(JSON.stringify(res), { status: 200 });


   } catch (error) {
     console.error(error)
     return new Response("Failed to fetch wishlist", { status: 500 })
   }

}