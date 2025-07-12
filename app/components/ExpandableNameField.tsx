"use client";
import { useState, useRef, useEffect } from "react";

interface ExpandableNameFieldProps {
  value: string;
  rowId: number;
}

export default function ExpandableNameField({
  value,
  rowId
}: ExpandableNameFieldProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleClick = () => {
    setIsExpanded(true);
  };

  const handleClose = () => {
    setIsExpanded(false);
  };

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsExpanded(false);
      }
    };

    if (isExpanded) {
      document.addEventListener("keydown", handleEscape);
      return () => document.removeEventListener("keydown", handleEscape);
    }
  }, [isExpanded]);

  return (
    <div className="relative w-full" ref={containerRef}>
      {/* Truncated name display */}
      <div
        onClick={handleClick}
        className="truncate cursor-pointer hover:text-orange-600 transition-colors duration-200"
        title={`Click to view full name: ${value}`}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            handleClick();
          }
        }}
        role="button"
        aria-label={`View full name for row ${rowId}`}
      >
        {value}
      </div>

      {/* Expanded name popup */}
      {isExpanded && (
        <div className="absolute top-0 left-0 z-20 bg-white border-2 border-orange-500 rounded-lg shadow-xl min-w-[200px] max-w-[400px]">
          <div className="p-4">
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1">
                <h4 className="text-sm font-semibold text-gray-800 mb-1">Full Name</h4>
                <p className="text-sm text-gray-700 break-words">{value}</p>
              </div>
              <button
                onClick={handleClose}
                className="flex-shrink-0 p-1 text-gray-400 hover:text-gray-600 transition-colors"
                aria-label="Close name view"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Backdrop to close popup */}
      {isExpanded && (
        <div
          className="fixed inset-0 z-10"
          onClick={handleClose}
        />
      )}
    </div>
  );
} 