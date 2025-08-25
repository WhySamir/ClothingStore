import { AuthProvider } from "@/app/auth-context";
import { AdminSidebar } from "../admin_components/Sidebar";

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider>
      {
        <>
          <div className="min-h-screen bg-white">
            <div className="flex">
              {/* Sidebar */}
              <AdminSidebar />

              {/* Main content */}
              <div className="flex-1 min-h-screen ml-64 bg-[#111111]">
                <div className="px-8 py-6 text-[#E0E0E0]">{children}</div>
              </div>
            </div>
          </div>
        </>
      }
    </AuthProvider>
  );
}
