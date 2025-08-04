"use client";
import Image from "next/image";
import { globalLayoutCss } from "../globalcss";
import Menu from "./Menu";
import { useState } from "react";
import { motion } from "framer-motion";
//80
export default function Navbar() {
  const [isRotated, setIsRotated] = useState(false);
  const [show, setShow] = useState(false);

  return (
    <motion.nav
      layout
      //   initial={{ opacity: 1, y: 0 }}
      //   animate={{ y: announcementClosed ? -10 : 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="w-full  bg-white"
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

        {/* Menu Links */}
        <ul className="hidden md:flex space-x-8 text-gray-800 font-medium">
          <li className="cursor-pointer hover:text-[#4b2e1a]">Home</li>
          <li className="cursor-pointer hover:text-[#4b2e1a]">Shop</li>
          <li className="cursor-pointer hover:text-[#4b2e1a]">Women</li>
          <li className="cursor-pointer hover:text-[#4b2e1a]">Men</li>
          <li className="cursor-pointer hover:text-[#4b2e1a]">About Us</li>
        </ul>

        {/* Icons */}
        <div className="flex items-center gap-x-3 md:gap-x-6 text-gray-700 text-xl">
          <button className=" h-6 w-6 ">
            <Image src="./search.svg" alt="" height={24} width={24} />
          </button>
          <button className="hidden md:flex  h-6 w-6">
            <Image src="./heart.svg" alt="" height={24} width={24} />
          </button>
          <button className=" h-6 w-6">
            <Image src="./cart.svg" alt="" height={24} width={24} />
          </button>
          <button className=" h-6 w-6">
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

        {/* md-devices */}
        {/* <div className="iconify-slide"></div> */}
      </div>
    </motion.nav>
  );
}
