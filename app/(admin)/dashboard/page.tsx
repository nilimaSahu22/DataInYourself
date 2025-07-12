"use client";
import { useRouter } from "next/navigation";
import AdminTable from "../../components/AdminTable";
import { clearAuthData } from "../../utils/authUtils";

export default function DashboardPage() {
  const router = useRouter();

  const handleLogout = () => {
    clearAuthData();
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8 p-6 bg-white rounded-xl shadow-lg border border-gray-200">
          <div>
            <h1 className="text-4xl font-bold text-gray-800 mb-2">Admin Panel</h1>
            <p className="text-gray-600 text-lg">Manage inquiries and system data</p>
          </div>
          <button
            onClick={handleLogout}
            className="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl"
          >
            Logout
          </button>
        </div>

        {/* Admin Table */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
          <AdminTable />
        </div>
      </div>
    </div>
  );
} 