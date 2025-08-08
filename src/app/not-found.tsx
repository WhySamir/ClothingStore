"use client";

import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();
  return (
    <div className="flex flex-col items-center justify-center h-[90dvh] text-center">
      <h1 className="text-4xl font-bold mb-4">Oops! - Page Not Found</h1>
      <p className="text-gray-600">
        Sorry, we couldn’t find the page you’re looking for.
      </p>
      <button
        onClick={() => router.push("/")}
        className="mt-6 px-6 py-3 bg-orange-950 text-white rounded transition"
      >
        Go To Home Page
      </button>
    </div>
  );
}
