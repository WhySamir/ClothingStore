import { NextRequest, NextResponse } from "next/server";
import redis from "@/app/lib/redis";
import { verifyUser } from "@/utlis/verifyUser";

export async function POST(req: NextRequest) {
  try {
    const user = await verifyUser(req);

    if (user) {
      await redis.del(`customer:${user.id}`);
    //   await redis.del(`cart:${user.id}`); 
    }

    return NextResponse.json({ success: true, message: "Cache cleared" });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Error clearing cache", error }, { status: 500 });
  }
}
