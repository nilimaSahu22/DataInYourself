import React, { useState } from "react";
import ExpandableDescriptionField from "./ExpandableDescriptionField";

// Mock data for demonstration
const mockInquiries = [
  {
    id: 1,
    name: "Johnathan Smith",
    phone: "9876543210",
    email: "john@example.com",
    subject: "Course Inquiry",
    description: "I would like to know more about the data science course. Can you please provide details about the curriculum, duration, and placement assistance?",
    called: false,
  },
  {
    id: 2,
    name: "Priya Patel",
    phone: "9123456789",
    email: "priya@example.com",
    subject: "Franchise",
    description: "Interested in franchise opportunities. Looking for investment details and territory availability.",
    called: true,
  },
  {
    id: 3,
    name: "Amit Kumar",
    phone: "9988776655",
    email: "amit@example.com",
    subject: "Placement Assistance",
    description: "How does placement support work? What companies do you partner with?",
    called: false,
  },
  {
    id: 4,
    name: "Sarah Johnson",
    phone: "9871234560",
    email: "sarah@example.com",
    subject: "Python Course",
    description: "",
    called: false,
  },
];

export default function AdminTable() {
  const [inquiries, setInquiries] = useState(mockInquiries);

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

  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Inquiry Management</h2>
      <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-lg">
        <table className="min-w-[900px] w-full text-sm text-left">
          <thead className="bg-gradient-to-r from-gray-800 to-gray-700 text-white">
            <tr>
              <th className="px-6 py-4 font-semibold text-base">#</th>
              <th className="px-6 py-4 font-semibold text-base">Name</th>
              <th className="px-6 py-4 font-semibold text-base">Phone Number</th>
              <th className="px-6 py-4 font-semibold text-base">Email</th>
              <th className="px-6 py-4 font-semibold text-base">Subject</th>
              <th className="px-6 py-4 font-semibold text-base">Description</th>
              <th className="px-6 py-4 font-semibold text-base text-center">Called</th>
            </tr>
          </thead>
          <tbody>
            {inquiries.map((inq, idx) => (
              <tr
                key={inq.id}
                className={
                  idx % 2 === 0 
                    ? "bg-white hover:bg-gray-50 transition-colors duration-200" 
                    : "bg-gray-50 hover:bg-gray-100 transition-colors duration-200"
                }
              >
                <td className="px-6 py-4 font-semibold text-gray-800">{idx + 1}</td>
                <td className="px-6 py-4 max-w-[140px] truncate font-medium text-gray-700" title={inq.name}>
                  {inq.name.length > 20 ? inq.name.slice(0, 20) + "..." : inq.name}
                </td>
                <td className="px-6 py-4 font-mono text-gray-800 font-medium">{inq.phone}</td>
                <td className="px-6 py-4 text-gray-700 font-medium">{inq.email}</td>
                <td className="px-6 py-4 text-gray-700 font-medium">{inq.subject}</td>
                <td className="px-6 py-4">
                  <ExpandableDescriptionField
                    value={inq.description}
                    onChange={(newDescription) => handleDescriptionChange(inq.id, newDescription)}
                    rowId={inq.id}
                    placeholder="Enter description..."
                  />
                </td>
                <td className="px-6 py-4 text-center">
                  <input
                    type="checkbox"
                    checked={inq.called}
                    onChange={() => handleCalledChange(inq.id)}
                    className="accent-orange-500 w-5 h-5 cursor-pointer"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
} 