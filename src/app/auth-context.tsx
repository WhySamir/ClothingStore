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
        const res = await fetch("/api/customers");
        const data = await res.json();
        setCustomer(data);
      } catch (err) {
        console.error("Failed to fetch user:", err);
      }
    };
    fetchUser();
  }, []);

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
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
