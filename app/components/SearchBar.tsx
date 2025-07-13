"use client";
import { useState, useEffect } from "react";
import { SearchIcon } from "./ui/Icons";

interface SearchBarProps {
  onSearch: (searchTerm: string) => void;
  placeholder?: string;
}

export default function SearchBar({ onSearch, placeholder = "Search enquiries..." }: SearchBarProps) {
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    onSearch(searchTerm);
  }, [searchTerm, onSearch]);

  return (
    <div className="relative w-full max-w-md">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <SearchIcon 
          size="md" 
          color="rgb(156 163 175)" 
          className="text-gray-400"
        />
      </div>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="block text-black w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-sm"
        placeholder={placeholder}
      />
    </div>
  );
} 