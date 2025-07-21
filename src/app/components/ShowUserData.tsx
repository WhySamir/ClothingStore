"use client";
import { useEffect, useState } from "react";
import { createClient } from "@/utlis/supabase/client";
import type { User } from "@supabase/supabase-js";

export default function ShowUserData() {
  const [user, setUser] = useState<User | null | undefined>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const supabase = createClient();
      const { data, error } = await supabase.auth.getUser();
      if (error) {
        setUser(null);
      } else setUser(data.user ?? null);
    };
    fetchUser();
  }, []);
  if (user === undefined) return <p>Loading user...</p>;
  if (user === null) return <p className="text-red-500">Not logged in</p>;

  return (
    <div>
      <p className="text-green-400">Logged in as: {user.email}</p>
      <pre className="text-black">{JSON.stringify(user, null, 2)}</pre>
    </div>
  );
}
