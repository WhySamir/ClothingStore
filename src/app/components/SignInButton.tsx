"use client";
//could not use server action here because it is a client component
import { createClient } from "@/utlis/supabase/client";
import { redirect } from "next/dist/server/api-utils";

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

    if (error) {
      console.error("Error during sign-in:", error);
    } else {
      console.log("Sign-in initiated:", data);
    }
  };

  return (
    <>
      <button
        onClick={handleGoogleLogin}
        className="underline ml-1 text-[#F6BE63] underline-offset-4"
      >
        Sign in up now
      </button>
    </>
  );
}
