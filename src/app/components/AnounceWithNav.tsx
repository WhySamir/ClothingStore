"use client";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/app/components/Navbar";
import { Announcement } from "@/app/components/Announcement";
import { useState } from "react";

export function AnnounceWithNav() {
  const [showAnnouncement, setShowAnnouncement] = useState(true);

  return (
    <>
      <motion.div layout transition={{ duration: 0.8, ease: "easeInOut" }}>
        <AnimatePresence mode="wait">
          {showAnnouncement && (
            <Announcement setShow={() => setShowAnnouncement(false)} />
          )}
        </AnimatePresence>

        <Navbar />
      </motion.div>
    </>
  );
}
