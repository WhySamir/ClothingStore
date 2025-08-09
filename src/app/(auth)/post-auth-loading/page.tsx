"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function PostAuthLoading() {
  const router = useRouter();
  useEffect(() => {
    router.replace("/dashboard");
  }, [router]);
  return <p>Signing you in...</p>;
}
