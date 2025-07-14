"use client";
import { useState, useEffect } from "react";

interface DateRangeFilterProps {
  onDateRangeChange: (fromDate: Date | null, toDate: Date | null) => void;
  currentFromDate?: Date | null;
  currentToDate?: Date | null;
}

export default function DateRangeFilter({ onDateRangeChange, currentFromDate = null, currentToDate = null }: DateRangeFilterProps) {
  const [fromDate, setFromDate] = useState<string>("");
  const [toDate, setToDate] = useState<string>("");
  const [isExpanded, setIsExpanded] = useState(false);

  // Get today's date in YYYY-MM-DD format for max attribute
  const today = new Date().toISOString().split('T')[0];

  // Initialize local state with current filter values when opening modal
  const openModal = () => {
    setFromDate(currentFromDate ? currentFromDate.toISOString().split('T')[0] : "");
    setToDate(currentToDate ? currentToDate.toISOString().split('T')[0] : "");
    setIsExpanded(true);
  };

  const handleClear = () => {
    setFromDate("");
    setToDate("");
  };

  const handleApply = () => {
    const from = fromDate ? new Date(fromDate) : null;
    const to = toDate ? new Date(toDate) : null;
    if (to) {
      to.setHours(23, 59, 59, 999);
    }
    onDateRangeChange(from, to);
    setIsExpanded(false);
  };

  const getDisplayText = () => {
    if (!fromDate && !toDate) {
      return "Filter by Date";
    }
    if (fromDate && toDate) {
      return `${fromDate} to ${toDate}`;
    }
    if (fromDate) {
      return `From ${fromDate}`;
    }
    if (toDate) {
      return `To ${toDate}`;
    }
    return "Filter by Date";
  };

  return (
    <div className="relative text-black">
      {/* Toggle Button */}
      <button
        onClick={openModal}
        className={`flex items-center gap-2 px-4 py-2 border rounded-lg transition-all duration-200 ${
          fromDate || toDate
            ? "bg-orange-50 border-orange-300 text-orange-700 hover:bg-orange-100"
            : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
        } focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500`}
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
        <span className="text-sm font-medium">{getDisplayText()}</span>
        <svg
          className={`w-4 h-4 transition-transform duration-200 ${
            isExpanded ? 'rotate-180' : ''
          }`}
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
      </button>

      {/* Dropdown Menu */}
      {isExpanded && (
        <div className="absolute top-full left-0 mt-2 w-80 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
          <div className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-gray-800">Date Range Filter</h3>
              {(fromDate || toDate) && (
                <button
                  onClick={handleClear}
                  className="text-xs text-gray-500 hover:text-gray-700 transition-colors"
                >
                  Clear
                </button>
              )}
            </div>
            
            <div className="space-y-4">
              {/* From Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  From Date
                </label>
                <input
                  type="date"
                  value={fromDate}
                  onChange={(e) => setFromDate(e.target.value)}
                  max={toDate || today}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-sm"
                />
              </div>

              {/* To Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  To Date
                </label>
                <input
                  type="date"
                  value={toDate}
                  onChange={(e) => setToDate(e.target.value)}
                  min={fromDate}
                  max={today}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-sm"
                />
              </div>
            </div>

            {/* Quick Date Presets */}
            <div className="mt-4 pt-4 border-t border-gray-200">
              <h4 className="text-xs font-medium text-gray-600 mb-2">Quick Filters</h4>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => {
                    const today = new Date();
                    setFromDate(today.toISOString().split('T')[0]);
                    setToDate(today.toISOString().split('T')[0]);
                  }}
                  className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors"
                >
                  Today
                </button>
                <button
                  onClick={() => {
                    const today = new Date();
                    const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
                    setFromDate(weekAgo.toISOString().split('T')[0]);
                    setToDate(today.toISOString().split('T')[0]);
                  }}
                  className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors"
                >
                  Last 7 days
                </button>
                <button
                  onClick={() => {
                    const today = new Date();
                    const monthAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);
                    setFromDate(monthAgo.toISOString().split('T')[0]);
                    setToDate(today.toISOString().split('T')[0]);
                  }}
                  className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors"
                >
                  Last 30 days
                </button>
                <button
                  onClick={() => {
                    const today = new Date();
                    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
                    setFromDate(startOfMonth.toISOString().split('T')[0]);
                    setToDate(today.toISOString().split('T')[0]);
                  }}
                  className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors"
                >
                  This month
                </button>
                <button
                  onClick={() => {
                    const today = new Date();
                    const startOfYear = new Date(today.getFullYear(), 0, 1);
                    setFromDate(startOfYear.toISOString().split('T')[0]);
                    setToDate(today.toISOString().split('T')[0]);
                  }}
                  className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors"
                >
                  This year
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-4 pt-4 border-t border-gray-200 flex justify-end gap-2">
              <button
                onClick={() => setIsExpanded(false)}
                className="px-3 py-1 text-xs text-gray-600 hover:text-gray-800 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleApply}
                className="px-3 py-1 text-xs bg-orange-500 text-white rounded hover:bg-orange-600 transition-colors"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Backdrop to close dropdown */}
      {isExpanded && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsExpanded(false)}
        />
      )}
    </div>
  );
} 