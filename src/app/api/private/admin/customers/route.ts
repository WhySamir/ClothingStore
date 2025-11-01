// 1 list all customers but admin privleged

import { prisma } from "@/app/lib/prisma";

import { isUserAdmin } from "@/app/server/controllers/admin.controllers";
import { ApiResponds } from "@/utlis/ApiResponders/ApiResponds";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const isAdmin = await isUserAdmin(req);
  if (!isAdmin) {
    return ApiResponds(403, "user is not admin");
  }

  const customers = await prisma.customer.findMany();
  if (customers.length === 0) {
    return ApiResponds(204, "No customers yet");
  }
  return ApiResponds(200, "All Customers", customers);
}

export async function POST(req: NextRequest) {
  const isAdmin = await isUserAdmin(req);
  if (!isAdmin) return ApiResponds(403, "User is not admin");

  try {
    const body = await req.json();
    const { id, name, email, userAvatarUrl, provider, providerId } = body;

    if (!email) return ApiResponds(400, "Email is required");

    // Check if customer exists (created automatically by Supabase trigger)
    const existing = await prisma.customer.findUnique({ where: { email } });
    if (existing) return ApiResponds(409, "Customer already exists");

    // Let Prisma generate id automatically if your model has @default(cuid())
    const customer = await prisma.customer.create({
      data: {
        id,
        name,
        email,
        userAvatarUrl,
        provider,
        providerId,
      },
    });

    return ApiResponds(201, "Customer created successfully", customer);
  } catch (err) {
    console.error(err);
    return ApiResponds(500, "Server error");
  }
}
