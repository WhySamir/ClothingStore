"use client";
//could not use server action here because it is a client component
import { createClient } from "@/utlis/supabase/client";

interface OAuthButtonProps {
  buttonText: string;
  className?: string;
}

export default function SignInButton({
  buttonText,
  className,
}: OAuthButtonProps) {
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
      {buttonText === "Login" && !className ? (
        <button
          onClick={handleGoogleLogin}
          className={`md:block  absolute  hidden -left-4 mt-2 min-w-fit bg-white shadow-lg rounded-lg p-2 z-50 ${className}`}
        >
          <p className="text-sm text-gray-500 cursor-pointer hover:text-black">
            {buttonText}
          </p>
        </button>
      ) : buttonText === "Login" && className ? (
        <button
          onClick={handleGoogleLogin}
          className={` text-center ${className}`}
        >
          <p className="  cursor-pointer ">{buttonText}</p>
        </button>
      ) : (
        <button
          onClick={handleGoogleLogin}
          className="text-xs md:text-sm underline ml-1 text-[#F6BE63] underline-offset-4"
        >
          {buttonText}
        </button>
      )}
    </>
  );
}
