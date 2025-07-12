"use client"
import React, { useState, useEffect, useMemo, useCallback } from "react";
import ExpandableDescriptionField from "./ExpandableDescriptionField";
import ExpandableNameField from "./ExpandableNameField";
import ExpandablePhoneField from "./ExpandablePhoneField";
import ExpandableEmailField from "./ExpandableEmailField";
import ExpandableSubjectField from "./ExpandableSubjectField";
import SearchBar from "./SearchBar";
import ColumnSelector, { ColumnOption } from "./ColumnSelector";
import SortableHeader, { SortDirection } from "./SortableHeader";
import DateRangeFilter from "./DateRangeFilter";
import ConfirmationModal from "./ConfirmationModal";
import { getAuthHeaders } from "../utils/authUtils";

// Interface for inquiry data from backend
interface InquiryData {
  id: string;
  name: string;
  phoneNumber: string;
  emailId: string;
  subject: string;
  description: string;
  called: boolean;
  dateTime: string;
  serialNumber?: number; // Add serial number field for sorting
}

// Column configuration with width classes
const columnOptions: ColumnOption[] = [
  { key: "id", label: "Sr.", defaultVisible: true },
  { key: "name", label: "Name", defaultVisible: true },
  { key: "phone", label: "Phone Number", defaultVisible: true },
  { key: "email", label: "Email", defaultVisible: true },
  { key: "subject", label: "Subject", defaultVisible: true },
  { key: "timestamp", label: "Date & Time", defaultVisible: true },
  { key: "description", label: "Description", defaultVisible: true },
  { key: "called", label: "Called", defaultVisible: true },
  { key: "actions", label: "Actions", defaultVisible: true },
];

// Helper function to format date
const formatDateTime = (dateString: string): string => {
  const date = new Date(dateString);
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
      return "w-40 min-w-[10rem] max-w-[10rem]"; // Increased email width
    case "subject":
      return "w-36 min-w-[9rem] max-w-[9rem]"; // Increased subject width
    case "timestamp":
      return "w-36 min-w-[9rem]"; // Fixed width for timestamp
    case "description":
      return "min-w-[12rem] flex-1"; // Flexible width, takes remaining space
    case "called":
      return "w-16 min-w-[4rem] text-center"; // Fixed width for checkbox
    case "actions":
      return "w-20 min-w-[5rem] text-center"; // Fixed width for actions
    default:
      return "min-w-[8rem]";
  }
};

// Sorting function
const sortInquiries = (inquiries: InquiryData[], sortColumn: string, sortDirection: SortDirection) => {
  if (!sortDirection) return inquiries;

  return [...inquiries].sort((a, b) => {
    let aValue: any;
    let bValue: any;

    switch (sortColumn) {
      case "id":
        aValue = a.serialNumber || 0;
        bValue = b.serialNumber || 0;
        break;
      case "name":
        aValue = a.name.toLowerCase();
        bValue = b.name.toLowerCase();
        break;
      case "phone":
        aValue = a.phoneNumber;
        bValue = b.phoneNumber;
        break;
      case "email":
        aValue = a.emailId.toLowerCase();
        bValue = b.emailId.toLowerCase();
        break;
      case "subject":
        aValue = a.subject.toLowerCase();
        bValue = b.subject.toLowerCase();
        break;
      case "timestamp":
        aValue = new Date(a.dateTime).getTime();
        bValue = new Date(b.dateTime).getTime();
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

// Function to convert data to CSV and download as Excel
const downloadAsExcel = (inquiries: InquiryData[]) => {
  // Define headers for the CSV
  const headers = [
    'Sr.',
    'Name',
    'Phone Number',
    'Email',
    'Subject',
    'Date & Time',
    'Description',
    'Called'
  ];

  // Convert data to CSV format
  const csvContent = [
    headers.join(','),
    ...inquiries.map((inq, index) => [
      index + 1, // Serial number
      `"${inq.name.replace(/"/g, '""')}"`, // Escape quotes in name
      inq.phoneNumber,
      inq.emailId,
      `"${inq.subject.replace(/"/g, '""')}"`, // Escape quotes in subject
      formatDateTime(inq.dateTime),
      `"${inq.description.replace(/"/g, '""')}"`, // Escape quotes in description
      inq.called ? 'Yes' : 'No'
    ].join(','))
  ].join('\n');

  // Create blob and download
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  link.setAttribute('href', url);
  link.setAttribute('download', `inquiries_${new Date().toISOString().split('T')[0]}.csv`);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export default function AdminTable() {
  const [inquiries, setInquiries] = useState<InquiryData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
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
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [inquiryToDelete, setInquiryToDelete] = useState<InquiryData | null>(null);

  // Fetch inquiries from backend
  const fetchInquiries = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL || "https://server.mukulsharma1602.workers.dev";
      const response = await fetch(`${serverUrl}/admin/getall`, {
        method: 'GET',
        headers: getAuthHeaders(),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch inquiries');
      }

      const data = await response.json();
      setInquiries(data.inquiries || []);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred while fetching inquiries';
      setError(errorMessage);
      console.error('Error fetching inquiries:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Update inquiry in backend
  const updateInquiry = useCallback(async (id: string, updateFields: Partial<InquiryData>) => {
    try {
      setUpdatingId(id);
      
      const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL || "https://server.mukulsharma1602.workers.dev";
      const response = await fetch(`${serverUrl}/admin/update/${id}`, {
        method: 'PATCH',
        headers: getAuthHeaders(),
        body: JSON.stringify(updateFields),
      });

      if (!response.ok) {
        throw new Error('Failed to update inquiry');
      }

      const data = await response.json();
      
      // Update local state with the updated inquiry
      setInquiries(prev => 
        prev.map(inq => 
          inq.id === id ? { ...inq, ...updateFields } : inq
        )
      );

      return data;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred while updating inquiry';
      console.error('Error updating inquiry:', err);
      throw new Error(errorMessage);
    } finally {
      setUpdatingId(null);
    }
  }, []);

  // Load inquiries on component mount
  useEffect(() => {
    fetchInquiries();
  }, [fetchInquiries]);

  // Filter and sort inquiries
  const processedInquiries = useMemo(() => {
    // First filter by search term
    let filtered = inquiries;
    if (searchTerm.trim()) {
      const searchLower = searchTerm.toLowerCase();
      filtered = inquiries.filter((inq) => {
        return (
          inq.id.toLowerCase().includes(searchLower) ||
          inq.name.toLowerCase().includes(searchLower) ||
          inq.phoneNumber.includes(searchLower) ||
          inq.emailId.toLowerCase().includes(searchLower) ||
          inq.subject.toLowerCase().includes(searchLower) ||
          inq.description.toLowerCase().includes(searchLower) ||
          formatDateTime(inq.dateTime).toLowerCase().includes(searchLower) ||
          (searchLower === 'true' && inq.called) ||
          (searchLower === 'false' && !inq.called)
        );
      });
    }

    // Then filter by date range
    if (dateRange.from || dateRange.to) {
      filtered = filtered.filter((inq) => {
        const inquiryDate = new Date(inq.dateTime);
        
        if (dateRange.from && inquiryDate < dateRange.from) {
          return false;
        }
        
        if (dateRange.to && inquiryDate > dateRange.to) {
          return false;
        }
        
        return true;
      });
    }

    // Add serial numbers to filtered data
    const withSerialNumbers = filtered.map((inq, index) => ({
      ...inq,
      serialNumber: index + 1
    }));

    // Then sort
    return sortInquiries(withSerialNumbers, sortConfig.column, sortConfig.direction);
  }, [inquiries, searchTerm, dateRange, sortConfig]);

  const handleCalledChange = async (id: string) => {
    try {
      const inquiry = inquiries.find(inq => inq.id === id);
      if (!inquiry) return;

      const newCalledValue = !inquiry.called;
      await updateInquiry(id, { called: newCalledValue });
    } catch (err) {
      console.error('Error updating called status:', err);
      // Optionally show error message to user
    }
  };

  const handleDescriptionChange = async (id: string, newDescription: string) => {
    try {
      await updateInquiry(id, { description: newDescription });
    } catch (err) {
      console.error('Error updating description:', err);
      // Optionally show error message to user
    }
  };

  const handleNameChange = async (id: string, newName: string) => {
    try {
      await updateInquiry(id, { name: newName });
    } catch (err) {
      console.error('Error updating name:', err);
      // Optionally show error message to user
    }
  };

  const handlePhoneChange = async (id: string, newPhone: string) => {
    try {
      await updateInquiry(id, { phoneNumber: newPhone });
    } catch (err) {
      console.error('Error updating phone:', err);
      // Optionally show error message to user
    }
  };

  const handleEmailChange = async (id: string, newEmail: string) => {
    try {
      await updateInquiry(id, { emailId: newEmail });
    } catch (err) {
      console.error('Error updating email:', err);
      // Optionally show error message to user
    }
  };

  const handleSubjectChange = async (id: string, newSubject: string) => {
    try {
      await updateInquiry(id, { subject: newSubject });
    } catch (err) {
      console.error('Error updating subject:', err);
      // Optionally show error message to user
    }
  };

  const handleDeleteInquiry = async (id: string) => {
    try {
      const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL || "https://server.mukulsharma1602.workers.dev";
      const response = await fetch(`${serverUrl}/admin/delete/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders(),
      });

      if (!response.ok) {
        throw new Error('Failed to delete inquiry');
      }

      // Remove the inquiry from local state
      setInquiries(prev => prev.filter(inq => inq.id !== id));
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred while deleting inquiry';
      console.error('Error deleting inquiry:', err);
      // Optionally show error message to user
    }
  };

  const openDeleteModal = (inquiry: InquiryData) => {
    setInquiryToDelete(inquiry);
    setDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setDeleteModalOpen(false);
    setInquiryToDelete(null);
  };

  const confirmDelete = () => {
    if (inquiryToDelete) {
      handleDeleteInquiry(inquiryToDelete.id);
    }
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
  const renderCell = (inq: InquiryData, columnKey: string, idx: number) => {
    const widthClass = getColumnWidthClass(columnKey);
    const isUpdating = updatingId === inq.id;
    
    switch (columnKey) {
      case "id":
        return (
          <td key={columnKey} className={`px-3 py-4 font-semibold text-gray-800 ${widthClass}`}>
            {inq.serialNumber || 1}
          </td>
        );
      case "name":
        return (
          <td key={columnKey} className={`px-3 py-4 font-medium text-gray-700 ${widthClass}`}>
            <ExpandableNameField
              value={inq.name}
              rowId={inq.id}
              onChange={(newName) => handleNameChange(inq.id, newName)}
              disabled={isUpdating}
            />
          </td>
        );
      case "phone":
        return (
          <td key={columnKey} className={`px-3 py-4 font-mono text-gray-800 font-medium ${widthClass}`}>
            <ExpandablePhoneField
              value={inq.phoneNumber}
              rowId={inq.id}
              onChange={(newPhone) => handlePhoneChange(inq.id, newPhone)}
              disabled={isUpdating}
            />
          </td>
        );
      case "email":
        return (
          <td key={columnKey} className={`px-3 py-4 text-gray-700 font-medium ${widthClass}`}>
            <ExpandableEmailField
              value={inq.emailId}
              rowId={inq.id}
              onChange={(newEmail) => handleEmailChange(inq.id, newEmail)}
              disabled={isUpdating}
            />
          </td>
        );
      case "subject":
        return (
          <td key={columnKey} className={`px-3 py-4 text-gray-700 font-medium ${widthClass}`}>
            <ExpandableSubjectField
              value={inq.subject}
              rowId={inq.id}
              onChange={(newSubject) => handleSubjectChange(inq.id, newSubject)}
              disabled={isUpdating}
            />
          </td>
        );
      case "timestamp":
        return (
          <td key={columnKey} className={`px-3 py-4 text-gray-700 font-medium font-mono text-xs ${widthClass}`}>
            {formatDateTime(inq.dateTime)}
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
              disabled={isUpdating}
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
              disabled={isUpdating}
              className="accent-orange-500 w-5 h-5 cursor-pointer disabled:cursor-not-allowed"
            />
          </td>
        );
      case "actions":
        return (
          <td key={columnKey} className={`px-3 py-4 text-center ${widthClass}`}>
            <button
              onClick={() => openDeleteModal(inq)}
              disabled={isUpdating}
              className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-50"
              title="Delete inquiry"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </td>
        );
      default:
        return null;
    }
  };

  // Show loading state
  if (loading) {
    return (
      <div className="w-full">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Inquiry Management</h2>
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading inquiries...</p>
          </div>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="w-full">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Inquiry Management</h2>
        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <div className="flex items-center">
            <svg className="w-6 h-6 text-red-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <h3 className="text-lg font-semibold text-red-800">Error Loading Inquiries</h3>
              <p className="text-red-700 mt-1">{error}</p>
              <button
                onClick={fetchInquiries}
                className="mt-3 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Inquiry Management</h2>
        <div className="flex gap-3">
          <button
            onClick={() => downloadAsExcel(processedInquiries)}
            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors flex items-center"
            title="Download as Excel"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Export as Excel sheet
          </button>
          <button
            onClick={fetchInquiries}
            className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors flex items-center"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Refresh
          </button>
        </div>
      </div>
      
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

      {/* Delete Confirmation Modal */}
      <ConfirmationModal
        isOpen={deleteModalOpen}
        onClose={closeDeleteModal}
        onConfirm={confirmDelete}
        title="Delete Inquiry"
        message={`Are you sure you want to delete the inquiry from "${inquiryToDelete?.name}"? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        confirmButtonClass="bg-red-500 hover:bg-red-600"
      />
    </div>
  );
} 