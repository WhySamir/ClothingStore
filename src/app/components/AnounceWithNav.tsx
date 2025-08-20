"use client";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/app/components/Navbar";
import { Announcement } from "@/app/components/Announcement";
import { useAuth } from "@/app/auth-context";
import { useEffect, useRef, useState } from "react";

export function AnnounceWithNav() {
  const { user } = useAuth();
  const isLoggedIn = !!user;
  const ref = useRef<HTMLDivElement>(null);

  const [showAnnouncement, setShowAnnouncement] = useState(!isLoggedIn);
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
    ref.current?.scrollIntoView({ behavior: "smooth" });
    console.log(ref.current?.offsetHeight);
    setShowAnnouncement(!isLoggedIn);
  }, [isLoggedIn]);

  return (
    <>
      {/* Default navbar that scrolls naturally with the page */}
      <motion.div
        ref={ref}
        layout
        initial={false}
        className="relative box-border w-full z-40"
        transition={{ duration: 0.8, ease: "easeInOut" }}
      >
        <AnimatePresence mode="wait">
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
          className="fixed top-0 left-0 box-border w-full z-50 bg-white shadow-md"
        >
          <AnimatePresence mode="wait">
            {showAnnouncement && (
              <Announcement setShow={() => setShowAnnouncement(false)} />
            )}
          </AnimatePresence>
          <Navbar />
        </motion.div>
      )}
    </>
  );
}
