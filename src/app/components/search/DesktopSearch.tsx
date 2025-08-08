"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { PopularSearch } from "./PopularSearch";
import { RecentSearch } from "./RecentSearch";

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

export const DesktopSearch = () => {
  const [search, setSearch] = useState("");
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Load recent searches from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("recentSearches");
    if (stored) {
      setRecentSearches(JSON.parse(stored));
    }
  }, []);

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = (term: string) => {
    const updated = [term, ...recentSearches.filter((t) => t !== term)].slice(
      0,
      5
    );
    setRecentSearches(updated);
    localStorage.setItem("recentSearches", JSON.stringify(updated));
    setIsDropdownOpen(false);
    // router.push(`/search?q=${term}`);
  };

  const clearRecent = () => {
    setRecentSearches([]);
    localStorage.removeItem("recentSearches");
  };

  return (
    <div ref={wrapperRef} className="relative w-full max-w-md">
      {/* Search Input */}
      <div className="flex items-center bg-gray-100 rounded-full px-4 py-2">
        <Image src="/search.svg" alt="Search" width={16} height={16} />
        <input
          type="text"
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onFocus={() => setIsDropdownOpen(true)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && search.trim()) {
              handleSearch(search.trim());
            }
          }}
          className="ml-2 bg-transparent outline-none w-full"
        />
      </div>

      {/* Dropdown */}
      {isDropdownOpen && (
        <div className="absolute left-0 right-0 mt-2 bg-white shadow-lg rounded-lg p-4 z-50">
          <PopularSearch terms={popularSearchTerms} onSearch={handleSearch} />
          <RecentSearch
            terms={recentSearches}
            onSearch={handleSearch}
            onClear={clearRecent}
          />
        </div>
      )}
    </div>
  );
};
