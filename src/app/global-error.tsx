"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <html>
      <body className="flex flex-col items-center justify-center min-h-screen text-center bg-gray-100">
        <h1 className="text-3xl font-bold mb-4">Something went wrong!</h1>
        <p className="mb-4 text-gray-600">{error.message}</p>
        <button
          onClick={() => reset()}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Try again
        </button>
      </body>
    </html>
  );
}
