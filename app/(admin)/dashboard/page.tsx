"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import AdminTable from "../../components/AdminTable";
import AdCampaignManager from "../../components/AdCampaignManager";
import { clearAuthData } from "../../utils/authUtils";

export default function DashboardPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'enquiries' | 'campaigns'>('enquiries');

  const handleLogout = () => {
    clearAuthData();
    router.push("/");
  };

  const handleReturnHome = () => {
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 px-3 pb-3 sm:px-6 sm:pb-6 -mt-12">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6 sm:mb-8 p-4 sm:p-6 bg-white rounded-xl shadow-lg border border-gray-200">
          <div className="text-center sm:text-left">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-2">Admin Panel</h1>
            <p className="text-gray-600 text-sm sm:text-lg">Manage enquiries and system data</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
            <button
              onClick={handleReturnHome}
              className="px-4 sm:px-6 py-2 sm:py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl flex items-center justify-center text-sm sm:text-base"
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              Return to Home
            </button>
            <button
              onClick={handleLogout}
              className="px-4 sm:px-6 py-2 sm:py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl text-sm sm:text-base"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-3 sm:p-6 mb-6">
          <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
            <button
              onClick={() => setActiveTab('enquiries')}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-200 ${
                activeTab === 'enquiries'
                  ? 'bg-white text-orange-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Enquiries
            </button>
            <button
              onClick={() => setActiveTab('campaigns')}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-200 ${
                activeTab === 'campaigns'
                  ? 'bg-white text-orange-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Ad Campaigns
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-3 sm:p-6">
          {activeTab === 'enquiries' ? (
            <AdminTable />
          ) : (
            <AdCampaignManager />
          )}
        </div>
      </div>
    </div>
  );
} 