"use client"
import React, { useState, useEffect, useMemo, useCallback } from "react";
import ExpandableDescriptionField from "./ExpandableDescriptionField";
import ExpandableNameField from "./ExpandableNameField";
import SearchBar from "./SearchBar";
import ColumnSelector, { ColumnOption } from "./ColumnSelector";
import SortableHeader, { SortDirection } from "./SortableHeader";
import DateRangeFilter from "./DateRangeFilter";

// Enhanced mock data with timestamps
const mockInquiries = [
  {
    id: 1,
    name: "Johnathan Smith",
    phone: "9876543210",
    email: "john@example.com",
    subject: "Course Inquiry",
    description: "I would like to know more about the data science course. Can you please provide details about the curriculum, duration, and placement assistance?",
    called: false,
    timestamp: new Date("2024-01-15T10:30:00"),
  },
  {
    id: 2,
    name: "Priya Patel",
    phone: "9123456789",
    email: "priya@example.com",
    subject: "Franchise",
    description: "Interested in franchise opportunities. Looking for investment details and territory availability.",
    called: true,
    timestamp: new Date("2024-01-14T14:45:00"),
  },
  {
    id: 3,
    name: "Amit Kumar",
    phone: "9988776655",
    email: "amit@example.com",
    subject: "Placement Assistance",
    description: "How does placement support work? What companies do you partner with?",
    called: false,
    timestamp: new Date("2024-01-13T09:15:00"),
  },
  {
    id: 4,
    name: "Sarah Johnson",
    phone: "9871234560",
    email: "sarah@example.com",
    subject: "Python Course",
    description: "",
    called: false,
    timestamp: new Date("2024-01-12T16:20:00"),
  },
  {
    id: 5,
    name: "Michael Chen",
    phone: "8765432109",
    email: "michael@example.com",
    subject: "Data Analyst Course",
    description: "Interested in the data analyst program. What are the prerequisites and job prospects?",
    called: true,
    timestamp: new Date("2024-01-11T11:30:00"),
  },
  {
    id: 6,
    name: "Emily Davis",
    phone: "7654321098",
    email: "emily@example.com",
    subject: "Web Development",
    description: "Looking for information about the web development course and internship opportunities.",
    called: false,
    timestamp: new Date("2024-01-10T13:45:00"),
  },
];

// Column configuration with width classes
const columnOptions: ColumnOption[] = [
  { key: "id", label: "Serial Number", defaultVisible: true },
  { key: "name", label: "Name", defaultVisible: true },
  { key: "phone", label: "Phone Number", defaultVisible: true },
  { key: "email", label: "Email", defaultVisible: true },
  { key: "subject", label: "Subject", defaultVisible: true },
  { key: "timestamp", label: "Date & Time", defaultVisible: true },
  { key: "description", label: "Description", defaultVisible: true },
  { key: "called", label: "Called", defaultVisible: true },
];

// Helper function to format date
const formatDateTime = (date: Date): string => {
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  const hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const ampm = hours >= 12 ? 'PM' : 'AM';
  const displayHours = hours % 12 || 12;
  
  return `${day}/${month}/${year} - ${displayHours}:${minutes} ${ampm}`;
};

// Get column width class based on column type
const getColumnWidthClass = (columnKey: string): string => {
  switch (columnKey) {
    case "id":
      return "w-16 min-w-[4rem]"; // Fixed width for ID
    case "name":
      return "w-32 min-w-[8rem] max-w-[8rem]"; // Fixed width for name
    case "phone":
      return "w-32 min-w-[8rem]"; // Fixed width for phone
    case "email":
      return "w-40 min-w-[10rem] max-w-[12rem]"; // Flexible email width
    case "subject":
      return "w-36 min-w-[9rem] max-w-[10rem]"; // Fixed width for subject
    case "timestamp":
      return "w-40 min-w-[10rem]"; // Fixed width for timestamp
    case "description":
      return "min-w-[12rem] flex-1"; // Flexible width, takes remaining space
    case "called":
      return "w-16 min-w-[4rem] text-center"; // Fixed width for checkbox
    default:
      return "min-w-[8rem]";
  }
};

// Sorting function
const sortInquiries = (inquiries: any[], sortColumn: string, sortDirection: SortDirection) => {
  if (!sortDirection) return inquiries;

  return [...inquiries].sort((a, b) => {
    let aValue: any;
    let bValue: any;

    switch (sortColumn) {
      case "id":
        aValue = a.id;
        bValue = b.id;
        break;
      case "name":
        aValue = a.name.toLowerCase();
        bValue = b.name.toLowerCase();
        break;
      case "phone":
        aValue = a.phone;
        bValue = b.phone;
        break;
      case "email":
        aValue = a.email.toLowerCase();
        bValue = b.email.toLowerCase();
        break;
      case "subject":
        aValue = a.subject.toLowerCase();
        bValue = b.subject.toLowerCase();
        break;
      case "timestamp":
        aValue = a.timestamp.getTime();
        bValue = b.timestamp.getTime();
        break;
      case "description":
        aValue = a.description.toLowerCase();
        bValue = b.description.toLowerCase();
        break;
      case "called":
        aValue = a.called ? 1 : 0;
        bValue = b.called ? 1 : 0;
        break;
      default:
        return 0;
    }

    if (aValue < bValue) {
      return sortDirection === "asc" ? -1 : 1;
    }
    if (aValue > bValue) {
      return sortDirection === "asc" ? 1 : -1;
    }
    return 0;
  });
};

export default function AdminTable() {
  const [inquiries, setInquiries] = useState(mockInquiries);
  const [searchTerm, setSearchTerm] = useState("");
  const [visibleColumns, setVisibleColumns] = useState<string[]>(
    columnOptions.filter(col => col.defaultVisible).map(col => col.key)
  );
  const [sortConfig, setSortConfig] = useState<{ column: string; direction: SortDirection }>({
    column: "",
    direction: null
  });
  const [dateRange, setDateRange] = useState<{ from: Date | null; to: Date | null }>({
    from: null,
    to: null
  });

  // Filter and sort inquiries
  const processedInquiries = useMemo(() => {
    // First filter by search term
    let filtered = inquiries;
    if (searchTerm.trim()) {
      const searchLower = searchTerm.toLowerCase();
      filtered = inquiries.filter((inq) => {
        return (
          inq.id.toString().includes(searchLower) ||
          inq.name.toLowerCase().includes(searchLower) ||
          inq.phone.includes(searchLower) ||
          inq.email.toLowerCase().includes(searchLower) ||
          inq.subject.toLowerCase().includes(searchLower) ||
          inq.description.toLowerCase().includes(searchLower) ||
          formatDateTime(inq.timestamp).toLowerCase().includes(searchLower) ||
          (searchLower === 'true' && inq.called) ||
          (searchLower === 'false' && !inq.called)
        );
      });
    }

    // Then filter by date range
    if (dateRange.from || dateRange.to) {
      filtered = filtered.filter((inq) => {
        const inquiryDate = inq.timestamp;
        
        if (dateRange.from && inquiryDate < dateRange.from) {
          return false;
        }
        
        if (dateRange.to && inquiryDate > dateRange.to) {
          return false;
        }
        
        return true;
      });
    }

    // Then sort
    return sortInquiries(filtered, sortConfig.column, sortConfig.direction);
  }, [inquiries, searchTerm, dateRange, sortConfig]);

  const handleCalledChange = (id: number) => {
    setInquiries((prev) =>
      prev.map((inq) =>
        inq.id === id ? { ...inq, called: !inq.called } : inq
      )
    );
  };

  const handleDescriptionChange = (id: number, newDescription: string) => {
    setInquiries((prev) =>
      prev.map((inq) =>
        inq.id === id ? { ...inq, description: newDescription } : inq
      )
    );
  };

  const handleColumnsChange = useCallback((newVisibleColumns: string[]) => {
    setVisibleColumns(newVisibleColumns);
  }, []);

  const handleSort = useCallback((column: string, direction: SortDirection) => {
    setSortConfig({ column, direction });
  }, []);

  const handleDateRangeChange = useCallback((fromDate: Date | null, toDate: Date | null) => {
    setDateRange({ from: fromDate, to: toDate });
  }, []);

  // Render table cell based on column key
  const renderCell = (inq: any, columnKey: string, idx: number) => {
    const widthClass = getColumnWidthClass(columnKey);
    
    switch (columnKey) {
      case "id":
        return (
          <td key={columnKey} className={`px-3 py-4 font-semibold text-gray-800 ${widthClass}`}>
            {inq.id}
          </td>
        );
      case "name":
        return (
          <td key={columnKey} className={`px-3 py-4 font-medium text-gray-700 ${widthClass}`}>
            <ExpandableNameField
              value={inq.name}
              rowId={inq.id}
            />
          </td>
        );
      case "phone":
        return (
          <td key={columnKey} className={`px-3 py-4 font-mono text-gray-800 font-medium ${widthClass}`}>
            {inq.phone}
          </td>
        );
      case "email":
        return (
          <td key={columnKey} className={`px-3 py-4 text-gray-700 font-medium ${widthClass}`} title={inq.email}>
            <div className="truncate">
              {inq.email}
            </div>
          </td>
        );
      case "subject":
        return (
          <td key={columnKey} className={`px-3 py-4 text-gray-700 font-medium ${widthClass}`} title={inq.subject}>
            <div className="truncate">
              {inq.subject}
            </div>
          </td>
        );
      case "timestamp":
        return (
          <td key={columnKey} className={`px-3 py-4 text-gray-700 font-medium font-mono text-xs ${widthClass}`}>
            {formatDateTime(inq.timestamp)}
          </td>
        );
      case "description":
        return (
          <td key={columnKey} className={`px-3 py-4 ${widthClass}`}>
            <ExpandableDescriptionField
              value={inq.description}
              onChange={(newDescription) => handleDescriptionChange(inq.id, newDescription)}
              rowId={inq.id}
              placeholder="Enter description..."
            />
          </td>
        );
      case "called":
        return (
          <td key={columnKey} className={`px-3 py-4 text-center ${widthClass}`}>
            <input
              type="checkbox"
              checked={inq.called}
              onChange={() => handleCalledChange(inq.id)}
              className="accent-orange-500 w-5 h-5 cursor-pointer"
            />
          </td>
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Inquiry Management</h2>
      
      {/* Search, Count, and Filters Section */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
        <div className="flex items-center gap-4">
          <span className="text-lg font-semibold text-gray-700">
            Total Inquiries: {processedInquiries.length}
          </span>
          <ColumnSelector
            columns={columnOptions}
            visibleColumns={visibleColumns}
            onColumnsChange={handleColumnsChange}
          />
          <DateRangeFilter onDateRangeChange={handleDateRangeChange} />
        </div>
        <SearchBar onSearch={setSearchTerm} />
      </div>

      {/* Table Container */}
      <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-lg">
        <table className="w-full text-sm text-left table-fixed">
          <thead className="bg-gradient-to-r from-gray-800 to-gray-700 text-white">
            <tr>
              {columnOptions.map((column) => 
                visibleColumns.includes(column.key) && (
                  <SortableHeader
                    key={column.key}
                    label={column.label}
                    columnKey={column.key}
                    currentSort={sortConfig}
                    onSort={handleSort}
                    className={getColumnWidthClass(column.key)}
                  />
                )
              )}
            </tr>
          </thead>
          <tbody>
            {processedInquiries.map((inq, idx) => (
              <tr
                key={inq.id}
                className={
                  idx % 2 === 0 
                    ? "bg-white hover:bg-gray-50 transition-colors duration-200" 
                    : "bg-gray-50 hover:bg-gray-100 transition-colors duration-200"
                }
              >
                {columnOptions.map((column) => 
                  visibleColumns.includes(column.key) && renderCell(inq, column.key, idx)
                )}
              </tr>
            ))}
          </tbody>
        </table>
        
        {/* No results message */}
        {processedInquiries.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <p className="text-lg">No inquiries found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
} 