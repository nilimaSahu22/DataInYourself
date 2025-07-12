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

  const handleReturnHome = () => {
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
          <div className="flex gap-3">
            <button
              onClick={handleReturnHome}
              className="px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl flex items-center"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              Return to Home
            </button>
            <button
              onClick={handleLogout}
              className="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Admin Table */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
          <AdminTable />
        </div>
      </div>
    </div>
  );
} 