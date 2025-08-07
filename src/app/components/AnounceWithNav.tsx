"use client";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/app/components/Navbar";
import { Announcement } from "@/app/components/Announcement";
import { useEffect, useState } from "react";
import { createClient } from "@/utlis/supabase/client";

export function AnnounceWithNav() {
  const [showAnnouncement, setShowAnnouncement] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        setShowAnnouncement(false);
      }

      if (!user) {
        setShowAnnouncement(true);
      }
    };

    checkAuth();
  }, []);

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
