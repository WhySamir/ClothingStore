"use client";
//could not use server action here because it is a client component
import { createClient } from "@/utlis/supabase/client";
import { useState } from "react";

export default function SignInButton() {
  const handleGoogleLogin = async () => {
    const supabase = createClient();

    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`,
        scopes: "email",
        queryParams: {
          access_type: "offline",
          prompt: "consent",
        },
      },
    });
    // Supabase redirected the user to Google → and then Google redirected back to your app with a URL like:

    if (error) {
      console.error("Error during sign-in:", error);
    } else {
      console.log("Sign-in initiated:", data);
    }
  };

  return (
    <button onClick={handleGoogleLogin} className="border py-4 px-2">
      Login with Google
    </button>
  );
}
