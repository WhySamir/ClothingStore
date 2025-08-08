"use client";

import { motion } from "framer-motion";
import SignInButton from "./SignInButton";

//64
export function Announcement({ setShow }: { setShow: () => void }) {
  return (
    <motion.div
      layout
      initial={{
        opacity: 1,
        height: "auto",
        paddingTop: 16,
        paddingBottom: 16,
        // scaleY: 1,
      }}
      animate={{
        opacity: 1,
        height: "auto",
        paddingTop: 16,
        paddingBottom: 16,
        // scaleY: 1,
      }}
      exit={{
        // opacity: 0,
        paddingBottom: 1,
        height: 0, // collapse height
        paddingTop: 0, // remove vertical padding
        // scaleY: 0,
        transformOrigin: "top",
      }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      style={{ transformOrigin: "top" }}
      className="w-full overflow-hidden bg-orange-950 text-white"
    >
      <div className=" max-w-7xl mx-auto flex justify-between items-center px-5 md:px-6">
        {/* contact */}
        <div className="flex items-center gap-2">
          <div className="font-medium  text-white">Support</div>
          <div>(977)</div>
          <p>9768445916</p>
        </div>

        {/* Main Text */}
        <ul className="hidden md:flex">
          <li className="cursor-pointer">
            Sign up and <span className="font-medium"> GET 25% OFF </span>
            for your first order.
          </li>
          <SignInButton buttonText="Sign in up now" />
        </ul>

        <div className="cursor-pointer">
          <span className="text-lg font-bold" onClick={setShow}>
            ✕
          </span>
        </div>
      </div>
    </motion.div>
  );
}
