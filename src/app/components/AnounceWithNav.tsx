"use client";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/app/components/Navbar";
import { Announcement } from "@/app/components/Announcement";
import { useEffect, useState } from "react";
import { createClient } from "@/utlis/supabase/client";

export function AnnounceWithNav() {
  const [mounted, setMounted] = useState(false);
  const [showAnnouncement, setShowAnnouncement] = useState(true); // Default to true for SSR

  useEffect(() => {
    setMounted(true);

    const isLoggedIn = localStorage.getItem("isLoggedIn");
    setShowAnnouncement(!isLoggedIn);

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
