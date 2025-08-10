"use client";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/app/components/Navbar";
import { Announcement } from "@/app/components/Announcement";
import { useAuth } from "@/app/auth-context";
import { useEffect, useState } from "react";

export function AnnounceWithNav() {
  const { user } = useAuth();
  const isLoggedIn = !!user;

  const [showAnnouncement, setShowAnnouncement] = useState(!isLoggedIn);

  useEffect(() => {
    setShowAnnouncement(!isLoggedIn);
  }, [isLoggedIn]);

  return (
    <motion.div layout transition={{ duration: 0.8, ease: "easeInOut" }}>
      <AnimatePresence mode="wait">
        {showAnnouncement && (
          <Announcement setShow={() => setShowAnnouncement(false)} />
        )}
      </AnimatePresence>
      <Navbar />
    </motion.div>
  );
}
