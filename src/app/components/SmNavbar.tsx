"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import React from "react";
import { motion } from "framer-motion";
interface Props {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  setIsRotated: React.Dispatch<React.SetStateAction<boolean>>;
}
export const SmNav: React.FC<Props> = ({ setShow, setIsRotated }) => {
  const [closing, setClosing] = useState(false);
  const [activePath, setActivePath] = useState(location.pathname);
  const handleSetActive = (path: string) => {
    setClosing(true);
    setTimeout(() => {
      setShow(false);
      setIsRotated(false);
      setActivePath(path);
    }, 300);
  };
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setShow((prev) => !prev); // Hide when screen size is `lg` or larger
        setIsRotated((prev) => !prev);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <>
      <motion.div
        initial={{ x: "100%" }} // Start off-screen to the left
        animate={{ x: 0 }} // Animate to visible (x: 0)
        exit={{ x: "100%" }} // Animate out to the left
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className={`${
          closing ? "closing-animation" : ""
        } lg:hidden   w-full max-w-sm  fixed z-10 right-0 top-[10vh] px-[4vh] sm:px-[8vh]  bg-slate-100  h-full overflow-hidden`}
      >
        <div className="flex flex-col pt-[16vh] sm:pt-[7.125rem] justify-between gap-[4vh]  mb-8">
          <Link
            href="/"
            className={`text-xl leading-7 text-neutral-700 ${
              activePath === "/" ? "text-[#111111] font-bold  " : ""
            }"`}
            onClick={() => handleSetActive("/")}
          >
            HOME
          </Link>
          <Link
            href="/about"
            className={`text-xl leading-7 text-neutral-700 ${
              activePath === "/about" ? "text-[#111111] font-bold  " : ""
            }"`}
            onClick={() => handleSetActive("/about")}
          >
            ABOUT
          </Link>

          <Link
            href="/work"
            className={`text-xl leading-7 text-neutral-700  ${
              activePath === "/work" ? "text-[#111111] font-bold " : ""
            }"`}
            onClick={() => handleSetActive("/work")}
          >
            WORK
          </Link>
          <Link
            href="/case-study"
            className={`text-xl leading-7 text-neutral-700   ${
              activePath === "/case-study" ? "text-[#111111] font-bold " : ""
            }"`}
            onClick={() => handleSetActive("/case-study")}
          >
            CASE STUDY
          </Link>
        </div>
      </motion.div>
    </>
  );
};
