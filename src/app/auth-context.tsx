"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { User } from "@supabase/auth-helpers-nextjs";
import { createClient } from "@/utlis/supabase/client";

interface AdminUser {
  id: string;
  fullName: string;
  userAvatarUrl: string | null;
}
const AuthContext = createContext<
  { user: User | null; admin: AdminUser | null } | undefined
>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      if (session?.user) {
        const u = session.user;
        setUser(u);
        const admin = {
          id: u.id,
          fullName: u.user_metadata?.full_name || "Admin",
          userAvatarUrl: null,
        };

        const res = await fetch("/api/private/admin", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id: admin.id,
            userAvatarUrl: u.user_metadata?.avatar_url,
          }),
        });

        const data = await res.json();
        if (data.success) {
          setAdminUser({ ...admin, userAvatarUrl: data.userAvatarUrl });
        } else {
          setAdminUser(admin);
        }
      }
    });
  }, []);

  return (
    <AuthContext.Provider value={{ user, admin: adminUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be inside AuthProvider");
  return context;
};
