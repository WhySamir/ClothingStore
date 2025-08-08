"use client";
import { useState, useEffect } from "react";
import React from "react";
import { motion } from "framer-motion";
// import { useRouter } from "next/router";
import Image from "next/image";
import { PopularSearch } from "./PopularSearch";
import { RecentSearch } from "./RecentSearch";

interface Props {
  searchSmOpen: boolean;
  setSmSearchOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const popularSearchTerms = [
  "v5 rnr",
  "tech wovens",
  "jordan",
  "jordan 4",
  "air max",
  "dunks",
  "air forces",
  "soccer cleats",
];

export const SmSearch: React.FC<Props> = ({ setSmSearchOpen }) => {
  const [search, setSearch] = useState("");
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  // const router = useRouter();

  useEffect(() => {
    const stored = localStorage.getItem("recentSearches");
    if (stored) {
      setRecentSearches(JSON.parse(stored));
    }
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setSmSearchOpen(false); // Hide when screen size is `lg` or larger
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [setSmSearchOpen]);

  const handleSearch = (term: string) => {
    const updated = [term, ...recentSearches.filter((t) => t !== term)].slice(
      0,
      5
    );
    setRecentSearches(updated);
    localStorage.setItem("recentSearches", JSON.stringify(updated));
    setSmSearchOpen(false);
    // router.push(`/search?q=${term}`);
  };

  const clearRecent = () => {
    setRecentSearches([]);
    localStorage.removeItem("recentSearches");
  };
  return (
    <>
      <motion.div
        initial={{ x: "100%" }} // Start off-screen to the left
        animate={{ x: 0 }} // Animate to visible (x: 0)
        exit={{ x: "100%" }} // Animate out to the left
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className={`     
        lg:hidden  fixed inset-0 z-[999]  pt-4  px-[4vh] sm:px-[8vh]  bg-slate-100   overflow-hidden`}
      >
        <div className="flex items-center mb-6">
          <div className="flex items-center bg-gray-200 rounded-full flex-1 px-4 py-2">
            <Image src="/search.svg" alt="Search" width={16} height={16} />
            <input
              type="text"
              placeholder="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && search.trim()) {
                  handleSearch(search.trim());
                }
              }}
              className="ml-2 bg-transparent outline-none w-full"
            />
          </div>
          <button
            onClick={() => setSmSearchOpen(false)}
            className="ml-4 text-sm text-black"
          >
            Cancel
          </button>
        </div>
        <PopularSearch terms={popularSearchTerms} onSearch={handleSearch} />
        <RecentSearch
          terms={recentSearches}
          onSearch={handleSearch}
          onClear={clearRecent}
        />
      </motion.div>
    </>
  );
};
