"use client";
import { useState, useRef, useEffect } from "react";

interface ExpandableNameFieldProps {
  value: string;
  rowId: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
}

export default function ExpandableNameField({
  value,
  rowId,
  onChange,
  disabled = false
}: ExpandableNameFieldProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [localValue, setLocalValue] = useState(value);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Update local value when prop value changes
  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  const handleClick = () => {
    if (disabled) return;
    if (onChange) {
      setIsEditing(true);
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    } else {
      setIsExpanded(true);
    }
  };

  const handleClose = () => {
    setIsExpanded(false);
    setIsEditing(false);
  };

  const handleSave = () => {
    if (onChange && localValue !== value) {
      onChange(localValue);
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setLocalValue(value);
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      handleCancel();
    } else if (e.key === "Enter") {
      handleSave();
    }
  };

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleClose();
      }
    };

    if (isExpanded || isEditing) {
      document.addEventListener("keydown", handleEscape);
      return () => document.removeEventListener("keydown", handleEscape);
    }
  }, [isExpanded, isEditing]);

  return (
    <div className="relative w-full" ref={containerRef}>
      {/* Truncated name display */}
      <div
        onClick={handleClick}
        className={`truncate transition-colors duration-200 ${
          disabled 
            ? 'cursor-not-allowed text-gray-400' 
            : 'cursor-pointer hover:text-orange-600'
        }`}
        title={onChange ? `Click to edit name: ${value}` : `Click to view full name: ${value}`}
        tabIndex={disabled ? -1 : 0}
        onKeyDown={handleKeyDown}
        role="button"
        aria-label={`${onChange ? 'Edit' : 'View'} name for row ${rowId}`}
      >
        {value}
      </div>

      {/* Editing popup */}
      {isEditing && (
        <div className="absolute top-0 left-0 z-20 bg-white border-2 border-orange-500 rounded-lg shadow-xl min-w-[200px] max-w-[400px]">
          <div className="p-4">
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1">
                <h4 className="text-sm font-semibold text-gray-800 mb-2">Edit Name</h4>
                <input
                  ref={inputRef}
                  type="text"
                  value={localValue}
                  onChange={(e) => setLocalValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-sm"
                  placeholder="Enter name"
                />
              </div>
              <button
                onClick={handleClose}
                className="flex-shrink-0 p-1 text-gray-400 hover:text-gray-600 transition-colors"
                aria-label="Close name editor"
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
            <div className="flex justify-end gap-2 mt-3">
              <button
                onClick={handleCancel}
                className="px-3 py-1 text-xs text-gray-600 hover:text-gray-800 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-3 py-1 text-xs bg-orange-500 text-white rounded hover:bg-orange-600 transition-colors"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* View-only popup */}
      {isExpanded && !isEditing && (
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
      {(isExpanded || isEditing) && (
        <div
          className="fixed inset-0 z-10"
          onClick={handleClose}
        />
      )}
    </div>
  );
} 