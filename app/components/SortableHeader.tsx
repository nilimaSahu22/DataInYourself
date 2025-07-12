"use client";
import { useState } from "react";

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
        <svg
          className="w-4 h-4 text-gray-400 opacity-70 hover:opacity-100 transition-opacity"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"
          />
        </svg>
      );
    }

    if (currentDirection === "asc") {
      return (
        <svg
          className="w-4 h-4 text-orange-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 15l7-7 7 7"
          />
        </svg>
      );
    }

    if (currentDirection === "desc") {
      return (
        <svg
          className="w-4 h-4 text-orange-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      );
    }

    // This case should never be reached, but keeping for safety
    return (
      <svg
        className="w-4 h-4 text-gray-400 opacity-70 hover:opacity-100 transition-opacity"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"
        />
      </svg>
    );
  };

  return (
    <th
      className={`px-3 py-4 font-semibold text-base cursor-pointer hover:bg-gray-600 transition-colors duration-200 select-none ${className}`}
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
      <div className="flex items-center gap-2">
        <span>{label}</span>
        {getSortIcon()}
      </div>
    </th>
  );
} 