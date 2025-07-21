// app/dashboard/page.tsx
"use client";
import ShowUserData from "@/app/components/ShowUserData";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { redirect } from "next/navigation";

export default function DashboardPage() {
  const supabase = createClientComponentClient();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    redirect("/login"); // or wherever your login page is
  };
  return (
    <div className="p-6 text-white">
      <h1 className="text-3xl font-bold">Welcome to Dashboard</h1>
      <button onClick={() => handleLogout()} className="mx-3 border">
        Logout
      </button>
      <ShowUserData />
    </div>
  );
}
