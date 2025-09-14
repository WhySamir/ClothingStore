"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { Customer } from "@prisma/client";
import { User } from "@supabase/supabase-js";
import { createClient } from "@/utlis/supabase/client";

const AuthContext = createContext<
  { customer: Customer | null; user: User | null } | undefined
>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [customer, setCustomer] = useState<Customer | null>(null);

  const supabase = createClient();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        // Only fetch if cookie exists
        const cookies = document.cookie;
        if (!cookies.includes("sb-access-token")) return;

        const res = await fetch("/api/customers");
        const data = await res.json();
        setCustomer(data);
      } catch (err) {
        console.log("Failed to fetch user:", err);
      }
    };

    fetchUser();
  }, []);

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();

      if (error) {
        if (
          error instanceof Error &&
          error.message.includes("Auth session missing")
        ) {
          setUser(null);
        } else {
          console.error(error);
        }
        return;
      }
      setUser(user);
    };
    getUser();

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
      }
    );

    return () => {
      listener?.subscription.unsubscribe();
    };
  }, [supabase]);

  return (
    <AuthContext.Provider value={{ customer, user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be inside AuthProvider");
  return context;
};
