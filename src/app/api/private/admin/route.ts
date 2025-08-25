import { NextResponse } from "next/server";
import { uploadFromUrlToCloudinary } from "@/utlis/uploadonCloudinary";
import { prisma } from "@/app/lib/prisma";

export async function POST(req: Request) {
  try {
    const { id,userAvatarUrl } = await req.json();

    if (!userAvatarUrl ) {
      return NextResponse.json({ error: "No valid avatar provided" }, { status: 400 });
    }
    if( userAvatarUrl.includes("res.cloudinary.com")){
        return NextResponse.json({ success: true, userAvatarUrl });
    }

    const cloudinaryUrl = await uploadFromUrlToCloudinary( userAvatarUrl,id);
    await prisma.customer.update({
        where: { id},
        data: { userAvatarUrl: cloudinaryUrl },
          });
    return NextResponse.json({ success: true, userAvatarUrl: cloudinaryUrl });
  } catch (e: unknown) {
    if (e instanceof Error) {
      return NextResponse.json({ success: false, error: e.message }, { status: 500 });
    }
  }
}

 

