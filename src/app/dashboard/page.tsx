// app/dashboard/page.tsx
"use client";
import ShowUserData from "@/app/components/ShowUserData";
import { createClient } from "@/utlis/supabase/client";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const router = useRouter();
  const supabase = createClient();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  return (
    <div className="p-6 text-white">
      <h1 className="text-3xl font-bold">Welcome to Dashboard</h1>
      <button onClick={handleLogout} className="mx-3 border">
        Logout
      </button>
      <ShowUserData />
    </div>
  );
}
