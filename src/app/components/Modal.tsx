"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

const Modal = ({ children, id }: { children: React.ReactNode; id: number }) => {
  const router = useRouter();

  // close modal on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        router.back(); // go to previous route
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [router]);

  // close modal on backdrop click
  const handleBackdropClick = () => {
    router.back();
  };

  return (
    <div
      onClick={handleBackdropClick}
      className="fixed inset-0 z-50 bg-neutral-900 opacity-90 flex  items-center justify-center"
    >
      <div
        onClick={() => router.refresh()}
        className="bg-white rounded-lg  w-120    relative"
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;
