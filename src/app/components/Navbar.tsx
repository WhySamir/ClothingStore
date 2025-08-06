"use client";
import Image from "next/image";
import { globalLayoutCss } from "../globalcss";
import Menu from "./Menu";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { SmNav } from "./SmNavbar";
import { SmSearch } from "./SmSearch";
//80
export default function Navbar() {
  const [isRotated, setIsRotated] = useState(false);
  const [show, setShow] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchSmOpen, setSmSearchOpen] = useState(false);
  const [smNavbar, setSmNavbar] = useState(false);
  const navRef = useRef<HTMLUListElement | null>(null);
  const ulRef = useRef<HTMLUListElement | null>(null);
  const toggleSearch = () => {
    if (smNavbar) {
      setSearchOpen(false);
      setSmSearchOpen((s: boolean) => !s);
    }
    !smNavbar && setSearchOpen((s: boolean) => !s);
  };
  useEffect(() => {
    if (navRef.current) {
      const width = navRef.current.offsetWidth;
      const height = navRef.current.offsetHeight;
      console.log("UL width:", width);
      console.log("UL height:", height);
      if (width < 768) {
        setSmNavbar(true);
      }
    }

    if (ulRef.current) {
      const width = ulRef.current.offsetWidth;
      const height = ulRef.current.offsetHeight;
      console.log("UL width:", width);
      console.log("UL height:", height);
    }
  }, []);

  return (
    <>
      <motion.nav
        ref={navRef}
        layout
        //   initial={{ opacity: 1, y: 0 }}
        //   animate={{ y: announcementClosed ? -10 : 0 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        className="w-full  bg-white relative"
      >
        <div className={`${globalLayoutCss}`}>
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 md:w-8 md:h-8 bg-orange-950 rounded-full flex items-center justify-center text-white font-bold text-lg">
              C
            </div>
            <span className="md:text-xl font-semibold">
              Clothing<span className="text-[#4b2e1a]">.</span>
            </span>
          </div>
          {!searchOpen ? (
            /* Menu Links */
            <motion.ul
              ref={ulRef}
              className="hidden md:flex space-x-8 text-gray-800 font-medium"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <li className="cursor-pointer hover:text-[#4b2e1a]">Home</li>
              <li className="cursor-pointer hover:text-[#4b2e1a]">Shop</li>
              <li className="cursor-pointer hover:text-[#4b2e1a]">Women</li>
              <li className="cursor-pointer hover:text-[#4b2e1a]">Men</li>
              <li className="cursor-pointer hover:text-[#4b2e1a]">About Us</li>
            </motion.ul>
          ) : (
            <>
              <AnimatePresence>
                {/* Search Input */}
                <motion.div
                  key="input"
                  initial={{ x: 200, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className=" hidden md:flex items-center h-6  w-fit md:w-full md:max-w-[372px]"
                >
                  <input
                    type="text"
                    placeholder="Search clothes..."
                    className=" border border-gray-300 px-1 md:px-4 md:py-1 rounded-md w-full outline-none"
                  />
                </motion.div>
              </AnimatePresence>
            </>
          )}

          {/* Icons */}
          <div className="flex items-center gap-x-3 md:gap-x-6 text-gray-700 text-xl">
            {!searchOpen ? (
              <button
                key="open"
                onClick={toggleSearch}
                className="h-6 w-6 transition duration-200 flex items-center"
              >
                <Image src="/search.svg" alt="Search" width={24} height={24} />
              </button>
            ) : (
              !smNavbar && (
                <button
                  onClick={toggleSearch}
                  className="h-6 transition duration-200 w-6 flex justify-end md:justify-start  items-center"
                >
                  ✕
                </button>
              )
            )}
            <button className="hidden md:flex  h-6 w-6">
              <Image src="./heart.svg" alt="" height={24} width={24} />
            </button>
            <button className="hidden md:flex  h-6 w-6">
              <Image src="./cart.svg" alt="" height={24} width={24} />
            </button>
            <button className="hidden md:flex h-6 w-6">
              <Image src="./user.svg" alt="" height={24} width={24} />
            </button>

            <div className="icon_small flex  md:hidden">
              <div className="flex ">
                <Menu
                  show={show}
                  setShow={setShow}
                  isRotated={isRotated}
                  setIsRotated={setIsRotated}
                />
              </div>
            </div>
          </div>
        </div>
        {/* md-devices */}
        {/* <div className="iconify-slide"></div> */}
      </motion.nav>
      <AnimatePresence>
        {show && (
          <SmNav
            key="sm-nav"
            show={show}
            setShow={setShow}
            setIsRotated={setIsRotated}
          />
        )}
        {searchSmOpen && (
          <SmSearch
            key="sm-search"
            searchSmOpen={searchSmOpen}
            setSmSearchOpen={setSmSearchOpen}
          />
        )}
      </AnimatePresence>
    </>
  );
}
