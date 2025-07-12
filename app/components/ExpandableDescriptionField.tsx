"use client";
import { useState, useRef, useEffect } from "react";

interface ExpandableDescriptionFieldProps {
  value: string;
  onChange: (value: string) => void;
  rowId: number;
  placeholder?: string;
}

export default function ExpandableDescriptionField({
  value,
  onChange,
  rowId,
  placeholder = "Enter description..."
}: ExpandableDescriptionFieldProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [localValue, setLocalValue] = useState(value);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Update local value when prop value changes
  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  const handleFocus = () => {
    setIsExpanded(true);
    // Focus the textarea after expansion
    setTimeout(() => {
      textareaRef.current?.focus();
    }, 100);
  };

  const handleBlur = () => {
    setIsExpanded(false);
    // Save the value when collapsing
    if (localValue !== value) {
      onChange(localValue);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      // Cancel changes and collapse
      setLocalValue(value);
      setIsExpanded(false);
    } else if (e.key === "Enter" && e.ctrlKey) {
      // Save on Ctrl+Enter
      onChange(localValue);
      setIsExpanded(false);
    }
  };

  const getPreviewText = () => {
    if (!localValue.trim()) {
      return placeholder;
    }
    return localValue.length > 50 ? `${localValue.slice(0, 50)}...` : localValue;
  };

  return (
    <div className="relative">
      {!isExpanded ? (
        // Collapsed state - preview
        <div
          onClick={handleFocus}
          className="min-h-[40px] px-3 py-2 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-orange-300 transition-all duration-200 text-sm bg-gray-50 hover:bg-white"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              handleFocus();
            }
          }}
          role="textbox"
          aria-label={`Description for row ${rowId}. Click to edit.`}
        >
          <div className="overflow-hidden text-ellipsis whitespace-nowrap text-gray-700">
            {getPreviewText()}
          </div>
        </div>
      ) : (
        // Expanded state - textarea
        <div className="absolute top-0 left-0 right-0 z-20 bg-white border-2 border-orange-500 rounded-lg shadow-xl">
          <textarea
            ref={textareaRef}
            value={localValue}
            onChange={(e) => setLocalValue(e.target.value)}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            className="w-full min-h-[80px] p-3 text-sm text-gray-800 bg-white rounded-lg resize-none focus:outline-none"
            placeholder={placeholder}
            rows={3}
            aria-label={`Editing description for row ${rowId}. Press Ctrl+Enter to save, Escape to cancel.`}
          />
          <div className="flex justify-end gap-2 p-2 bg-gray-50 border-t border-gray-200 rounded-b-lg">
            <button
              onClick={() => {
                setLocalValue(value);
                setIsExpanded(false);
              }}
              className="px-3 py-1 text-xs text-gray-600 hover:text-gray-800 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                onChange(localValue);
                setIsExpanded(false);
              }}
              className="px-3 py-1 text-xs bg-orange-500 text-white rounded hover:bg-orange-600 transition-colors"
            >
              Save
            </button>
          </div>
        </div>
      )}
    </div>
  );
} 