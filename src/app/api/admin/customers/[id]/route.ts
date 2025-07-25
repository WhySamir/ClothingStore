import { prisma } from "@/app/lib/prisma";
import { isUserAdmin } from "@/app/server/controllers/admin.controllers";
import { ApiResponds } from "@/utlis/ApiResponders/ApiResponds";
import { createClient } from "@supabase/supabase-js";


const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabaseAdmin = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);
export async function DELETE(
  req: Request,
  {params}:{params:Promise<{id:string}>}
) {
  const { id } = await params;

  if (!id) return new Response("Customer ID required", { status: 400 });

  // Validate if the request is coming from an admin
  const isAdmin = await isUserAdmin(req)
  if (!isAdmin) return ApiResponds(403, "User is not admin");
  try {
    // 1. Delete from Prisma (optional - depends on your policy)
    await prisma.customer.delete({ where: { id } });

    // 2. Delete from Supabase Auth
    const { error } = await supabaseAdmin.auth.admin.deleteUser(id);

    if (error) {
      console.error("Supabase deletion error:", error.message);
      return new Response("Failed to delete user from auth", { status: 500 });
    }

    return new Response("User deleted successfully", { status: 200 });
  } catch (err: unknown) {
    console.error(err);
    return new Response("Server error", { status: 500 });
  }
}
