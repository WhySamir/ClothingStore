"use client";
import ShowUserData from "@/app/components/ShowUserData";
import { createClient } from "@/utlis/supabase/client";
import { useRouter } from "next/navigation";

export default function AdminData() {
  const router = useRouter();
  const supabase = createClient();

  const handleLogout = async () => {
    await fetch("/logout", { method: "POST" });
    await supabase.auth.signOut();
    router.push("/");
  };

  return (
    <div className="p-6 text-black  overflow-auto">
      <h1 className="text-3xl font-bold">Welcome to Dashboard</h1>
      <button onClick={handleLogout} className="mx-3 border">
        Logout
      </button>
      <ShowUserData />
    </div>
  );
}
