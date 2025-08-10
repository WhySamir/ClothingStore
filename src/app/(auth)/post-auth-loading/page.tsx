import { createClient } from "@/utlis/supabase/server";
import { redirect } from "next/navigation";

export default async function PostAuthLoading() {
  const supabase = createClient();
  const {
    data: { session },
  } = await (await supabase).auth.getSession();

  if (!session) {
    redirect("/");
  }

  redirect("/dashboard");
}
