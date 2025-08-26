"use client";
import { AuthProvider } from "@/app/auth-context";
import { AdminSidebar } from "../admin_components/Sidebar";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider>
      {
        <>
          <div className="min-h-screen bg-white relative box-border  flex">
            {/* Sidebar */}
            <AdminSidebar />

            {/* Main content */}
            <div className="w-full ml-64 p-6 text-[#E0E0E0] bg-[#111111]">
              {children}
            </div>
          </div>
        </>
      }
    </AuthProvider>
  );
}
