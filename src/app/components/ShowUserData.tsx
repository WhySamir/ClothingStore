"use client";
import { useEffect, useState } from "react";
import { createClient } from "@/utlis/supabase/client";
import type { User } from "@supabase/supabase-js";

export default function ShowUserData() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const supabase = createClient();
      const { data, error } = await supabase.auth.getUser();
      if (error) console.error(error);
      else setUser(data.user);
    };
    fetchUser();
  }, []);

  if (!user) return <p>Loading user...</p>;

  return (
    <div>
      <p className="text-green-400">Logged in as: {user.email}</p>
      <pre className="text-black">{JSON.stringify(user, null, 2)}</pre>
    </div>
  );
}
