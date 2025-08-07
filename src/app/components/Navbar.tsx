"use client";
import Image from "next/image";
import { globalLayoutCss } from "../globalcss";
import Menu from "./Menu";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { SmNav } from "./SmNavbar";
import { SmSearch } from "./SmSearch";
// import { useRouter } from "next/router";
//80
export default function Navbar() {
  // const router = useRouter();
  const [isRotated, setIsRotated] = useState(false);
  const [show, setShow] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchSmOpen, setSmSearchOpen] = useState(false);
  const [smNavbar, setSmNavbar] = useState(false);

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

  return (
    <>
      <motion.nav
        layout
        //   initial={{ opacity: 1, y: 0 }}
        //   animate={{ y: announcementClosed ? -10 : 0 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        className="w-full  bg-white relative z-20"
      >
        <div className={`${globalLayoutCss}`}>
          {/* Logo */}
          <div
            className="flex items-center gap-2"
            // onClick={() => router.push("/")}
          >
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
                  <div className="flex items-center bg-[#F6F6F6] rounded-full flex-1 px-4 md:py-2">
                    <Image
                      src="/search.svg"
                      alt="Search"
                      width={16}
                      height={16}
                    />
                    <input
                      type="text"
                      placeholder="Search clothes..."
                      // value={search}
                      // onChange={(e) => setSearch(e.target.value)}
                      // onKeyDown={(e) => {
                      //   if (e.key === "Enter" && search.trim()) {
                      //     handleSearch(search.trim());
                      //   }
                      // }}
                      className="   md:ml-2 rounded-md w-full bg-transparent outline-none"
                    />
                  </div>
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
