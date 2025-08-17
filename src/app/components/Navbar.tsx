"use client";
import Image from "next/image";
import { globalLayoutCss } from "../globalcss";
import Menu from "./Menu";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { SmNav } from "./SmNavbar";
import { SmSearch } from "./search/SmSearch";
import { DesktopSearch } from "./search/DesktopSearch";
import Link from "next/link";
import { createClient } from "@/utlis/supabase/client";
import { useAuth } from "../auth-context";
import SignInButton from "./buttons/SignInButton";

//80
export default function Navbar() {
  const [isRotated, setIsRotated] = useState(false);
  const [show, setShow] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchSmOpen, setSmSearchOpen] = useState(false);
  const [smNavbar, setSmNavbar] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const [userDropdown, setUserDropdown] = useState(false);

  const supabase = createClient();
  const { user } = useAuth();

  const handleLogout = async () => {
    setUserDropdown(false);
    if (user) {
      await fetch("/logout", { method: "POST" });
    }
    await supabase.auth.signOut();
  };

  const toggleSearch = () => {
    if (smNavbar) {
      console.log(true);
      setSearchOpen(false);
      setSmSearchOpen((s: boolean) => !s);
      if (show) {
        setShow(false);
        setIsRotated(false);
      }
    } else {
      setSearchOpen((s: boolean) => !s);
      setSmSearchOpen(false);
    }
  };
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setSmNavbar(true);
      } else {
        setSmNavbar(false);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setUserDropdown(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <motion.nav
        layout
        transition={{ duration: 0.8, ease: "easeInOut" }}
        className="w-full  bg-white relative z-20"
      >
        <div className={`${globalLayoutCss}`}>
          {/* Logo */}
          <Link href={"/"} className="flex items-center gap-2">
            <div className="w-6 h-6 md:w-8 md:h-8 bg-orange-950 rounded-full flex items-center justify-center text-white font-bold text-lg">
              C
            </div>
            <span className="md:text-xl font-semibold">
              Clothing<span className="text-[#4b2e1a]">.</span>
            </span>
          </Link>
          {!searchOpen ? (
            /* Menu Links */
            <motion.ul
              className="hidden md:flex space-x-8 text-gray-800 font-medium"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <Link href={"/"} className="cursor-pointer hover:text-[#4b2e1a]">
                Home
              </Link>
              <Link href={"/"} className="cursor-pointer hover:text-[#4b2e1a]">
                Shop
              </Link>
              <Link href={"/"} className="cursor-pointer hover:text-[#4b2e1a]">
                Women
              </Link>
              <Link href={"/"} className="cursor-pointer hover:text-[#4b2e1a]">
                Men
              </Link>
              <Link href={"/"} className="cursor-pointer hover:text-[#4b2e1a]">
                About Us
              </Link>
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
                  <DesktopSearch />
                </motion.div>
              </AnimatePresence>
            </>
          )}

          {/* Icons */}
          <div className="flex items-center gap-x-3 md:gap-x-6 text-gray-700 text-xl">
            {!searchOpen || smNavbar ? (
              <button
                key="open"
                onClick={toggleSearch}
                className="h-6 w-6 transition duration-200 flex items-center"
              >
                <Image src="/search.svg" alt="Search" width={24} height={24} />
              </button>
            ) : (
              <button
                onClick={toggleSearch}
                className="h-6 transition duration-200 w-6 flex justify-end md:justify-start  items-center"
              >
                ✕
              </button>
            )}
            <Link href={"/wishlists"} className="hidden md:flex  h-6 w-6">
              <Image src="/heart.svg" alt="" height={24} width={24} />
            </Link>
            <Link href={"/carts"} className="hidden md:flex  h-6 w-6">
              <Image src="/cart.svg" alt="" height={24} width={24} />
            </Link>
            <div className="relative ">
              <button
                onClick={() => {
                  setUserDropdown((prev: boolean) => !prev);
                }}
                className="hidden md:flex h-6 w-6"
              >
                <Image src="/user.svg" alt="" height={24} width={24} />
              </button>
              {userDropdown &&
                (user ? (
                  <div ref={dropdownRef}>
                    <button
                      onClick={handleLogout}
                      className="md:block absolute  hidden -left-4 mt-2 min-w-fit bg-white shadow-lg rounded-lg p-2 z-50"
                    >
                      <p className="text-sm text-gray-500 cursor-pointer hover:text-black">
                        Logout
                      </p>
                    </button>
                  </div>
                ) : (
                  <div ref={dropdownRef}>
                    <SignInButton buttonText="Login" />
                  </div>
                ))}
            </div>

            <div className="icon_small flex  md:hidden">
              <div className="flex ">
                <Menu
                  show={show}
                  setShow={setShow}
                  isRotated={isRotated}
                  setIsRotated={setIsRotated}
                  searchSmOpen={searchSmOpen}
                  setSmSearchOpen={setSmSearchOpen}
                />
              </div>
            </div>
          </div>
        </div>
        {/* md-devices */}
        {/* <div className="iconify-slide"></div> */}
      </motion.nav>
      <AnimatePresence>
        {searchSmOpen && (
          <SmSearch
            key="sm-search"
            searchSmOpen={searchSmOpen}
            setSmSearchOpen={setSmSearchOpen}
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {show && (
          <SmNav
            key="sm-nav"
            show={show}
            setShow={setShow}
            setIsRotated={setIsRotated}
          />
        )}
      </AnimatePresence>
    </>
  );
}
