"use client";
import { useEffect, useState } from "react";
import { createClient } from "@/utlis/supabase/client";
import type { Session, User } from "@supabase/supabase-js";

export default function ShowUserData({
  children,
}: {
  children: React.ReactNode;
}) {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supabase = createClient();

    supabase.auth.getSession().then(({ data, error }) => {
      if (error) {
        console.error("Error fetching session:", error.message);
        setSession(null);
      } else {
        setSession(data.session);
      }
      setLoading(false);
    });
  }, []);

  if (loading) return <p>Loading session...</p>;
  if (!session) return <p className="text-red-500">Not logged in</p>;

  const user: User = session.user;

  return <>{children}</>;
}
