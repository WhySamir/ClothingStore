// import nodemailer from "nodemailer";
// import { NextResponse } from "next/server";
// import { Redis } from "ioredis";
// import { ApiError } from "@/utlis/ApiResponders/ApiError";

// const redis = new Redis(process.env.UPSTASH_REDIS_URL!);

// export async function POST(req: Request) {
//   const { name, email, subject, message } = await req.json();

//   if (!email)
//     return NextResponse.json({ error: "Email is required" }, { status: 400 });

//   const key = `contact:${email}`;
//   const lastSent = await redis.get(key);

//   if (lastSent) {
//     return NextResponse.json(
//       { error: "You can only send one email per day" },
//       { status: 429 }
//     );
//   }

//   const transporter = nodemailer.createTransport({
//     service: "gmail",
//     auth: {
//       user: process.env.EMAIL_USER,
//       pass: process.env.EMAIL_PASS,
//     },
//   });
//   try {
//     await transporter.sendMail({
//       from: `"${name}" <${email}>`,
//       to: process.env.EMAIL_USER,
//       subject,
//       text: message,
//     });
//     await redis.set(key, "sent", "EX", 24 * 60 * 60);

//     return NextResponse.json({ success: true });
//   } catch (err: unknown) {
//     return ApiError(500, err);
//   }
// }

import nodemailer from "nodemailer";
import { NextResponse } from "next/server";
import { ApiError } from "@/utlis/ApiResponders/ApiError";

export async function POST(req: Request) {
  const { name, email, subject, message } = await req.json();

  if (!email) {
    return NextResponse.json({ error: "Email is required" }, { status: 400 });
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  try {
    await transporter.sendMail({
      from: `"${name}" <${email}>`,
      to: process.env.EMAIL_USER,
      subject,
      text: message,
    });

    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    return ApiError(500, err);
  }
}
