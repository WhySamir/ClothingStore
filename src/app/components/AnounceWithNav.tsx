"use client";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/app/components/Navbar";
import { Announcement } from "@/app/components/Announcement";
import { useEffect, useRef, useState } from "react";
import { createClient } from "@/utlis/supabase/client";

export function AnnounceWithNav() {
  const ref = useRef<HTMLDivElement>(null);

  // 1. Initialize as false on server, will be hydrated correctly on client
  const [showAnnouncement, setShowAnnouncement] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  const [showStickyNavbar, setShowStickyNavbar] = useState(false);

  // Handle sticky scroll logic
  useEffect(() => {
    let lastScrollTop = 0;
    const handleScroll = () => {
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      if (scrollTop === 0) {
        setShowStickyNavbar(false);
      } else if (scrollTop > 140) {
        setShowStickyNavbar(scrollTop < lastScrollTop);
      }
      lastScrollTop = scrollTop;
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const supabase = createClient();

    // 2. Sync state immediately on mount to be safe
    const checkInitialAuth = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      // Check localStorage for stored preference
      const stored = localStorage.getItem("showAnnounceWithNav");
      let shouldShow = !session;

      if (stored !== null) {
        shouldShow = stored !== "false";
      }

      setShowAnnouncement(shouldShow);
      if (!session) {
        localStorage.setItem("showAnnounceWithNav", "true");
      }
    };

    checkInitialAuth();
    setIsMounted(true);

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      const shouldShow = !session;
      setShowAnnouncement(shouldShow);
      localStorage.setItem("showAnnounceWithNav", String(shouldShow));
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <>
      <motion.div
        ref={ref}
        layout
        className="relative box-border w-full z-[888]"
        transition={{ duration: 0.8, ease: "easeInOut" }}
      >
        <AnimatePresence mode="wait">
          {/* Only render once mounted to prevent hydration mismatch */}
          {isMounted && showAnnouncement === true && (
            <Announcement setShow={() => setShowAnnouncement(false)} />
          )}
        </AnimatePresence>
        <Navbar />
      </motion.div>

      {showStickyNavbar && (
        <motion.div
          initial={{ y: -140, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="fixed top-0 left-0 box-border w-full z-[999] bg-white shadow-md"
        >
          {/* Only show navbar on sticky to save space, or keep announcement if desired */}
          <AnimatePresence mode="wait">
            {isMounted && showAnnouncement === true && (
              <Announcement setShow={() => setShowAnnouncement(false)} />
            )}
          </AnimatePresence>
          <Navbar />
        </motion.div>
      )}
    </>
  );
}
