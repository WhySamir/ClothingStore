import { prisma } from "@/app/lib/prisma";
import { createSupabaseServerClient } from "@/utlis/supabase/server";

export async function GET() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return new Response("Unauthorized", { status: 401 });
  }

  // Now you can use user.id
  const customer = await prisma.customer.findUnique({ where: { id: user.id } });
console.log(customer)
  return Response.json(customer);
}
