"use client";

import { motion } from "framer-motion";
import SignInButton from "./SignInButton";
import { useEffect } from "react";
import { createClient } from "@/utlis/supabase/client";

interface AnnouncementProps {
  setShow: (show: boolean) => void;
}

export function Announcement({ setShow }: AnnouncementProps) {
  useEffect(() => {
    const supabase = createClient();
    const checkSignIn = async () => {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();
      if (user) {
        setShow(false); // User is logged in
      }
    };

    checkSignIn();
  }, []);
  return (
    <motion.div
      layout
      initial={{
        opacity: 1,
        height: "auto",
        paddingTop: 16,
        paddingBottom: 16,
      }}
      animate={{
        opacity: 1,
        height: "auto",
        paddingTop: 16,
        paddingBottom: 16,
      }}
      exit={{
        // opacity: 40,
        height: 0, // collapse height
        paddingTop: 0, // remove vertical padding
        paddingBottom: 0,
      }}
      transition={{ duration: 0.7, ease: "easeInOut" }}
      style={{ transformOrigin: "top" }}
      className="w-full overflow-hidden bg-orange-950 text-white"
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center px-5 md:px-6">
        {/* contact */}
        <div className="flex items-center gap-2">
          <div className="text-lg font-medium text-white">Support</div>
          <div>(977)</div>
          <p>9768445916</p>
        </div>

        {/* Main Text */}
        <ul className="hidden md:flex">
          <li className="cursor-pointer">
            Sign up and <span className="font-semibold"> GET 25% OFF </span>
            for your first order.
          </li>
          <SignInButton />
        </ul>

        <div className="cursor-pointer">
          <span className="text-lg font-bold" onClick={() => setShow(false)}>
            ✕
          </span>
        </div>
      </div>
    </motion.div>
  );
}
