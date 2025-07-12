"use client"
import React, { useState } from "react";
import EditPopup from "./EditPopup";

interface ExpandablePhoneFieldProps {
  value: string;
  rowId: string;
  onChange: (newValue: string) => void;
  disabled?: boolean;
}

export default function ExpandablePhoneField({
  value,
  rowId,
  onChange,
  disabled = false
}: ExpandablePhoneFieldProps) {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleDoubleClick = () => {
    if (!disabled) {
      setIsPopupOpen(true);
    }
  };

  const handleSave = (newValue: string) => {
    onChange(newValue);
  };

  return (
    <div className="relative w-full">
      <div
        onDoubleClick={handleDoubleClick}
        className={`cursor-pointer hover:bg-orange-50 px-2 py-1 rounded transition-colors truncate ${
          disabled ? 'cursor-not-allowed opacity-50' : ''
        }`}
        title={disabled ? '' : `Double-click to edit: ${value || 'N/A'}`}
      >
        {value || 'N/A'}
      </div>
      
      {isPopupOpen && (
        <EditPopup
          isOpen={isPopupOpen}
          onClose={() => setIsPopupOpen(false)}
          onSave={handleSave}
          initialValue={value}
          title="Edit Phone Number"
          placeholder="Enter phone number..."
          disabled={disabled}
        />
      )}
    </div>
  );
} 