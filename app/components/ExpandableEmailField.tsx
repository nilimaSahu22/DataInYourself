"use client"
import React, { useState, useRef, useEffect } from 'react';

interface ExpandableEmailFieldProps {
  value: string;
  rowId: string;
  onChange: (newValue: string) => void;
  disabled?: boolean;
  placeholder?: string;
}

export default function ExpandableEmailField({
  value,
  rowId,
  onChange,
  disabled = false,
  placeholder = "Enter email address..."
}: ExpandableEmailFieldProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(value);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setEditValue(value);
  }, [value]);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  const handleDoubleClick = () => {
    if (!disabled) {
      setIsEditing(true);
    }
  };

  const handleBlur = () => {
    setIsEditing(false);
    if (editValue.trim() !== value) {
      onChange(editValue.trim());
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      setIsEditing(false);
      if (editValue.trim() !== value) {
        onChange(editValue.trim());
      }
    } else if (e.key === 'Escape') {
      setIsEditing(false);
      setEditValue(value);
    }
  };

  if (isEditing) {
    return (
      <input
        ref={inputRef}
        type="email"
        value={editValue}
        onChange={(e) => setEditValue(e.target.value)}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        className="w-full px-2 py-1 border border-orange-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-sm"
        placeholder={placeholder}
      />
    );
  }

  return (
    <div
      onDoubleClick={handleDoubleClick}
      className={`cursor-pointer hover:bg-orange-50 px-2 py-1 rounded transition-colors ${
        disabled ? 'cursor-not-allowed opacity-50' : ''
      }`}
      title={disabled ? '' : 'Double-click to edit'}
    >
      {value || <span className="text-gray-400 italic">{placeholder}</span>}
    </div>
  );
} 