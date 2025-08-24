"use client";
import { useState, useEffect } from "react";
import { IAdCampaign } from "../../server/src/db/model/AdCampaign.model";
import { getAuthToken, makeAuthenticatedRequest } from "../utils/authUtils";
import ConfirmationModal from "./ConfirmationModal";
import EditCampaignModal from "./EditCampaignModal";

interface AdCampaignFormData {
  text: string;
  startDate: string;
  endDate: string;
  backgroundColor: string;
  textColor: string;
  priority: number;
}

export default function AdCampaignManager() {
  const [campaigns, setCampaigns] = useState<IAdCampaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingCampaign, setEditingCampaign] = useState<IAdCampaign | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [campaignToDelete, setCampaignToDelete] = useState<IAdCampaign | null>(null);
  const [formData, setFormData] = useState<AdCampaignFormData>({
    text: "",
    startDate: "",
    endDate: "",
    backgroundColor: "#ff6b35",
    textColor: "#ffffff",
    priority: 1,
  });

  const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL || "https://server.mukulsharma1602.workers.dev";

  // Clear notifications after 5 seconds
  useEffect(() => {
    if (success || error) {
      const timer = setTimeout(() => {
        setSuccess("");
        setError("");
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [success, error]);

  // Fetch campaigns
  const fetchCampaigns = async () => {
    try {
      setLoading(true);
      const token = getAuthToken();
      if (!token) {
        setError("Authentication required");
        return;
      }

      const response = await makeAuthenticatedRequest(`${serverUrl}/admin/ad-campaigns`);

      if (!response.ok) {
        if (response.status === 404) {
          setError("Ad campaign endpoints are not available on the server yet. Please deploy the server with the latest changes.");
          setCampaigns([]);
          return;
        }
        throw new Error("Failed to fetch campaigns");
      }

      const data = await response.json();
      setCampaigns(data.campaigns || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch campaigns");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCampaigns();
  }, []);

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === "priority" ? parseInt(value) || 1 : value,
    }));
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      text: "",
      startDate: "",
      endDate: "",
      backgroundColor: "#ff6b35",
      textColor: "#ffffff",
      priority: 1,
    });
    setEditingCampaign(null);
    setShowCreateForm(false);
    setSubmitting(false);
  };

  // Create campaign
  const handleCreateCampaign = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      setError("");
      const token = getAuthToken();
      if (!token) {
        setError("Authentication required");
        return;
      }

      const response = await makeAuthenticatedRequest(`${serverUrl}/admin/ad-campaigns`, {
        method: "POST",
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error("Ad campaign endpoints are not available on the server yet. Please deploy the server with the latest changes.");
        }
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to create campaign");
      }

      // Get the created campaign data from response
      const createdCampaign = await response.json();
      
      // Update local state immediately for instant UI feedback
      setCampaigns(prevCampaigns => {
        const newCampaign = {
          ...createdCampaign.campaign,
          id: createdCampaign.campaign.id || createdCampaign.campaign._id,
          createdAt: createdCampaign.campaign.createdAt || new Date().toISOString(),
          isActive: createdCampaign.campaign.isActive ?? true,
        };
        return [newCampaign, ...prevCampaigns];
      });

      setSuccess("Campaign created successfully!");
      resetForm();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create campaign");
    } finally {
      setSubmitting(false);
    }
  };



  // Delete campaign
  const handleDeleteCampaign = async (id: string) => {
    try {
      setError("");
      const token = getAuthToken();
      if (!token) {
        setError("Authentication required");
        return;
      }

      const response = await makeAuthenticatedRequest(`${serverUrl}/admin/ad-campaigns/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to delete campaign");
      }

      // Update local state immediately for instant UI feedback
      setCampaigns(prevCampaigns => 
        prevCampaigns.filter(campaign => campaign.id !== id)
      );

      setSuccess("Campaign deleted successfully!");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete campaign");
    }
  };

  // Show delete confirmation modal
  const showDeleteConfirmation = (campaign: IAdCampaign) => {
    setCampaignToDelete(campaign);
    setShowDeleteModal(true);
  };

  // Handle delete confirmation
  const handleDeleteConfirmation = () => {
    if (campaignToDelete) {
      handleDeleteCampaign(campaignToDelete.id);
    }
    setShowDeleteModal(false);
    setCampaignToDelete(null);
  };

  // Toggle campaign status
  const handleToggleStatus = async (campaign: IAdCampaign) => {
    try {
      setError("");
      const token = getAuthToken();
      if (!token) {
        setError("Authentication required");
        return;
      }

      const response = await makeAuthenticatedRequest(`${serverUrl}/admin/ad-campaigns/${campaign.id}`, {
        method: "PATCH",
        body: JSON.stringify({ isActive: !campaign.isActive }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to update campaign");
      }

      // Update local state immediately for instant UI feedback
      setCampaigns(prevCampaigns => 
        prevCampaigns.map(c => 
          c.id === campaign.id 
            ? { ...c, isActive: !c.isActive }
            : c
        )
      );

      setSuccess(`Campaign ${campaign.isActive ? 'deactivated' : 'activated'} successfully!`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update campaign");
    }
  };

  // Edit campaign
  const handleEditCampaign = (campaign: IAdCampaign) => {
    setEditingCampaign(campaign);
    setShowEditModal(true);
  };

  // Handle edit save
  const handleEditSave = async (formData: AdCampaignFormData) => {
    if (!editingCampaign) return;

    try {
      setSubmitting(true);
      setError("");
      const token = getAuthToken();
      if (!token) {
        setError("Authentication required");
        return;
      }

      const response = await makeAuthenticatedRequest(`${serverUrl}/admin/ad-campaigns/${editingCampaign.id}`, {
        method: "PATCH",
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to update campaign");
      }

      // Get the updated campaign data from response
      const updatedCampaign = await response.json();
      
      // Update local state immediately for instant UI feedback
      setCampaigns(prevCampaigns => 
        prevCampaigns.map(campaign => 
          campaign.id === editingCampaign.id 
            ? { ...campaign, ...updatedCampaign.campaign }
            : campaign
        )
      );

      setSuccess("Campaign updated successfully!");
      setShowEditModal(false);
      setEditingCampaign(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update campaign");
    } finally {
      setSubmitting(false);
    }
  };

  // Format date for display
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Check if campaign is currently active
  const isCurrentlyActive = (campaign: IAdCampaign) => {
    const now = new Date();
    const startDate = new Date(campaign.startDate);
    const endDate = new Date(campaign.endDate);
    return campaign.isActive && now >= startDate && now <= endDate;
  };

  // Sort campaigns by priority and creation date
  const sortedCampaigns = [...campaigns].sort((a, b) => {
    if (a.priority !== b.priority) {
      return b.priority - a.priority; // Higher priority first
    }
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(); // Newer first
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
          <p className="text-gray-600">Loading campaigns...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800">Ad Campaigns</h2>
          <p className="text-gray-600 text-sm sm:text-base">Manage promotional banners and announcements</p>
        </div>
        <button
          onClick={() => setShowCreateForm(true)}
          className="px-6 py-3 bg-orange-500 text-white rounded-xl hover:bg-orange-600 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl flex items-center justify-center text-sm sm:text-base transform hover:scale-105"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Create Campaign
        </button>
      </div>

      {/* Success Message */}
      {success && (
        <div className="bg-green-50 border border-green-200 rounded-xl p-4 animate-fade-in">
          <div className="flex items-center">
            <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="ml-3 text-sm text-green-700 font-medium">{success}</p>
          </div>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 animate-fade-in">
          <div className="flex items-center">
            <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="ml-3 text-sm text-red-700 font-medium">{error}</p>
          </div>
        </div>
      )}

      {/* Create/Edit Form */}
      {showCreateForm && (
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 animate-fade-in">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold text-gray-800">
              Create New Campaign
            </h3>
            <button
              onClick={resetForm}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <form onSubmit={handleCreateCampaign} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Campaign Text *
              </label>
              <textarea
                name="text"
                value={formData.text}
                onChange={handleInputChange}
                required
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                placeholder="Enter your campaign message..."
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Start Date *
                </label>
                <input
                  type="date"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  End Date *
                </label>
                <input
                  type="date"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Priority
                </label>
                <input
                  type="number"
                  name="priority"
                  value={formData.priority}
                  onChange={handleInputChange}
                  min="1"
                  max="10"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Background Color
                </label>
                <input
                  type="color"
                  name="backgroundColor"
                  value={formData.backgroundColor}
                  onChange={handleInputChange}
                  className="w-full h-12 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 cursor-pointer"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Text Color
                </label>
                <input
                  type="color"
                  name="textColor"
                  value={formData.textColor}
                  onChange={handleInputChange}
                  className="w-full h-12 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 cursor-pointer"
                />
              </div>
            </div>

            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                disabled={submitting}
                className="px-6 py-3 bg-orange-500 text-white rounded-xl hover:bg-orange-600 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
              >
                {submitting && (
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                )}
                Create Campaign
              </button>
              <button
                type="button"
                onClick={resetForm}
                disabled={submitting}
                className="px-6 py-3 bg-gray-500 text-white rounded-xl hover:bg-gray-600 transition-all duration-200 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Campaigns List */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-gray-100">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold text-gray-800">Campaigns ({sortedCampaigns.length})</h3>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span>Live</span>
              <div className="w-3 h-3 bg-blue-500 rounded-full ml-3"></div>
              <span>Active</span>
            </div>
          </div>
        </div>
        
        {sortedCampaigns.length === 0 ? (
          <div className="p-12 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m-9 0h10m-10 0a2 2 0 00-2 2v14a2 2 0 002 2h10a2 2 0 002-2V6a2 2 0 00-2-2" />
              </svg>
            </div>
            <h4 className="text-lg font-medium text-gray-900 mb-2">No campaigns yet</h4>
            <p className="text-gray-500 mb-4">Create your first campaign to start promoting your content.</p>
            <button
              onClick={() => setShowCreateForm(true)}
              className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
            >
              Create Campaign
            </button>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {sortedCampaigns.map((campaign, index) => (
              <div key={campaign.id} className={`p-6 hover:bg-gray-50 transition-colors duration-200 ${index === 0 ? 'bg-gradient-to-r from-orange-50 to-yellow-50' : ''}`}>
                <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-6">
                  <div className="flex-1 space-y-4">
                    {/* Header with status badges */}
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                      <div className="flex-1">
                        <h4 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">{campaign.text}</h4>
                        <div className="flex flex-wrap gap-2">
                          {isCurrentlyActive(campaign) && (
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                              Live Now
                            </span>
                          )}
                          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                            campaign.isActive 
                              ? "bg-blue-100 text-blue-800" 
                              : "bg-gray-100 text-gray-800"
                          }`}>
                            {campaign.isActive ? "Active" : "Inactive"}
                          </span>
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                            Priority {campaign.priority}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Campaign details */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="bg-gray-50 rounded-lg p-3">
                        <div className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Start Date</div>
                        <div className="text-sm font-semibold text-gray-800">{formatDate(campaign.startDate)}</div>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-3">
                        <div className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">End Date</div>
                        <div className="text-sm font-semibold text-gray-800">{formatDate(campaign.endDate)}</div>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-3">
                        <div className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Created</div>
                        <div className="text-sm font-semibold text-gray-800">{formatDate(campaign.createdAt)}</div>
                      </div>
                    </div>

                    {/* Preview */}
                    <div>
                      <div className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">Preview</div>
                      <div 
                        className="px-6 py-4 rounded-xl text-center font-medium shadow-sm border"
                        style={{
                          backgroundColor: campaign.backgroundColor,
                          color: campaign.textColor,
                        }}
                      >
                        {campaign.text}
                      </div>
                    </div>
                  </div>

                  {/* Action buttons */}
                  <div className="flex flex-col sm:flex-row gap-2 lg:flex-col">
                    <button
                      onClick={() => handleEditCampaign(campaign)}
                      className="inline-flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all duration-200 font-medium text-sm shadow-sm hover:shadow-md"
                    >
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                      Edit
                    </button>
                    <button
                      onClick={() => handleToggleStatus(campaign)}
                      className={`inline-flex items-center px-4 py-2 rounded-lg transition-all duration-200 font-medium text-sm shadow-sm hover:shadow-md ${
                        campaign.isActive
                          ? "bg-yellow-500 text-white hover:bg-yellow-600"
                          : "bg-green-500 text-white hover:bg-green-600"
                      }`}
                    >
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={campaign.isActive ? "M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728L5.636 5.636m12.728 12.728L18.364 5.636M5.636 18.364l12.728-12.728" : "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"} />
                      </svg>
                      {campaign.isActive ? "Deactivate" : "Activate"}
                    </button>
                    <button
                      onClick={() => showDeleteConfirmation(campaign)}
                      className="inline-flex items-center px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all duration-200 font-medium text-sm shadow-sm hover:shadow-md"
                    >
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      <ConfirmationModal
        isOpen={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false);
          setCampaignToDelete(null);
        }}
        onConfirm={handleDeleteConfirmation}
        title="Delete Campaign"
        message={`Are you sure you want to delete the campaign "${campaignToDelete?.text}"? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        confirmButtonClass="bg-red-500 hover:bg-red-600"
      />

      {/* Edit Campaign Modal */}
      <EditCampaignModal
        isOpen={showEditModal}
        onClose={() => {
          setShowEditModal(false);
          setEditingCampaign(null);
        }}
        onSave={handleEditSave}
        campaign={editingCampaign}
        submitting={submitting}
      />
    </div>
  );
} 