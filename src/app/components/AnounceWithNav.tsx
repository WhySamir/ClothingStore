"use client";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/app/components/Navbar";
import { Announcement } from "@/app/components/Announcement";
import { useEffect, useState } from "react";
import { createClient } from "@/utlis/supabase/client";

export function AnnounceWithNav() {
  const [mounted, setMounted] = useState(false);
  const [showAnnouncement, setShowAnnouncement] = useState(false); // Default to true for SSR

  useEffect(() => {
    // Only run on client side
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    setShowAnnouncement(!isLoggedIn);
    setMounted(true);

    // Listen for storage events (when localStorage changes in other tabs)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "isLoggedIn") {
        setShowAnnouncement(!e.newValue);
      }
    };

    window.addEventListener("storage", handleStorageChange);

    // Cleanup
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  return (
    <>
      <motion.div layout transition={{ duration: 0.8, ease: "easeInOut" }}>
        <AnimatePresence mode="wait">
          {mounted && showAnnouncement && (
            <Announcement setShow={() => setShowAnnouncement(false)} />
          )}
        </AnimatePresence>

        <Navbar />
      </motion.div>
    </>
  );
}
