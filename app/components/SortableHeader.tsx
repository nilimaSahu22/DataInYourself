"use client";
import { useState } from "react";
import { SortIcon, ChevronUpIcon, ChevronDownIcon } from "./ui/Icons";

export type SortDirection = "asc" | "desc" | null;

interface SortableHeaderProps {
  label: string;
  columnKey: string;
  currentSort: { column: string; direction: SortDirection };
  onSort: (column: string, direction: SortDirection) => void;
  className?: string;
}

export default function SortableHeader({
  label,
  columnKey,
  currentSort,
  onSort,
  className = ""
}: SortableHeaderProps) {
  const isCurrentSort = currentSort.column === columnKey;
  const currentDirection = isCurrentSort ? currentSort.direction : null;

  const handleClick = () => {
    let newDirection: SortDirection;
    
    if (!isCurrentSort) {
      // First click on this column - sort ascending
      newDirection = "asc";
    } else if (currentDirection === "asc") {
      // Second click - sort descending
      newDirection = "desc";
    } else {
      // Third click - remove sorting
      newDirection = null;
    }
    
    // If removing sort, also clear the column
    if (newDirection === null) {
      onSort("", null);
    } else {
      onSort(columnKey, newDirection);
    }
  };

  const getSortIcon = () => {
    if (!isCurrentSort) {
      return (
        <SortIcon
          size="sm"
          color="rgb(156 163 175)"
          className="opacity-70 hover:opacity-100 transition-opacity flex-shrink-0"
        />
      );
    }

    if (currentDirection === "asc") {
      return (
        <ChevronUpIcon
          size="sm"
          color="rgb(249 115 22)"
          className="text-orange-500 flex-shrink-0"
        />
      );
    }

    if (currentDirection === "desc") {
      return (
        <ChevronDownIcon
          size="sm"
          color="rgb(249 115 22)"
          className="text-orange-500 flex-shrink-0"
        />
      );
    }

    // This case should never be reached, but keeping for safety
    return (
      <SortIcon
        size="sm"
        color="rgb(156 163 175)"
        className="opacity-70 hover:opacity-100 transition-opacity flex-shrink-0"
      />
    );
  };

  return (
    <th
      className={`px-2 sm:px-3 py-3 sm:py-4 font-semibold text-xs sm:text-base cursor-pointer hover:bg-gray-600 transition-colors duration-200 select-none ${className}`}
      onClick={handleClick}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleClick();
        }
      }}
      role="button"
      aria-label={`Sort by ${label} ${currentDirection === "asc" ? "descending" : currentDirection === "desc" ? "remove sort" : "ascending"}`}
    >
      <div className="flex items-center gap-1 sm:gap-2">
        <span className="whitespace-nowrap">{label}</span>
        {getSortIcon()}
      </div>
    </th>
  );
} 