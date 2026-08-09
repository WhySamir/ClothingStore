"use client";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/app/components/Navbar";
import { Announcement } from "@/app/components/Announcement";
import { useAuth } from "@/app/auth-context";
import { useEffect, useRef, useState } from "react";
import { createClient } from "@/utlis/supabase/client";

export function AnnounceWithNav() {
  const { user } = useAuth();
  const isLoggedIn = !!user;
  const ref = useRef<HTMLDivElement>(null);

  // 1. Optimistic UI: Default to TRUE so SSR renders it.
  // This ensures Navbar and Announcement appear "together" immediately.
  const [showAnnouncement, setShowAnnouncement] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  const [showStickyNavbar, setShowStickyNavbar] = useState(false);

  useEffect(() => {
    let lastScrollTop = 0;
    const navbarHeight = 140; // Height of navbar + announcement

    const handleScroll = () => {
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;

      // Hide sticky navbar only when at the very top
      if (scrollTop === 0) {
        setShowStickyNavbar(false);
        lastScrollTop = scrollTop;
        return;
      }

      // Show/hide sticky navbar based on scroll direction after navbar height
      if (scrollTop > navbarHeight) {
        if (scrollTop < lastScrollTop) {
          // Scrolling up - show sticky navbar
          setShowStickyNavbar(true);
        } else {
          // Scrolling down - hide sticky navbar
          setShowStickyNavbar(false);
        }
      }

      lastScrollTop = scrollTop;
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    setIsMounted(true);
    const supabase = createClient();

    // 2. Check LocalStorage & Session to potentially HIDE it
    const checkInitialState = async () => {
      // Immediate check from storage (fastest)
      const stored = localStorage.getItem("showAnnounceWithNav");

      if (stored === "false") {
        setShowAnnouncement(false);
      } else {
        // If not explicitly closed, check session
        const {
          data: { session },
        } = await supabase.auth.getSession();
        if (session) {
          setShowAnnouncement(false);
          localStorage.setItem("showAnnounceWithNav", "false");
        }
      }
    };

    checkInitialState();

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
      {/* Default navbar that scrolls naturally with the page */}
      <motion.div
        ref={ref}
        layout
        initial={false}
        className="relative box-border w-full z-[888]"
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        <AnimatePresence mode="popLayout">
          {showAnnouncement && (
            <Announcement setShow={() => setShowAnnouncement(false)} />
          )}
        </AnimatePresence>
        <Navbar />
      </motion.div>

      {/* Sticky navbar that only appears when scrolling up */}
      {showStickyNavbar && (
        <motion.div
          initial={{ y: -140, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="fixed top-0 left-0 box-border w-full z-[999] bg-white shadow-md"
        >
          {/* Clean sticky navbar without announcement for better UX */}
          <Navbar />
        </motion.div>
      )}
    </>
  );
}
