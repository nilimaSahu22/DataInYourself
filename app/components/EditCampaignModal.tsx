"use client";
import React, { useState, useEffect } from "react";
import { IAdCampaign } from "../../server/src/db/model/AdCampaign.model";
import AdBanner from "./ui/AdBanner";

interface AdCampaignFormData {
  text: string;
  startDate: string;
  endDate: string;
  backgroundColor: string;
  textColor: string;
  priority: number;
}

interface EditCampaignModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (formData: AdCampaignFormData) => void;
  campaign: IAdCampaign | null;
  submitting?: boolean;
}

export default function EditCampaignModal({
  isOpen,
  onClose,
  onSave,
  campaign,
  submitting = false
}: EditCampaignModalProps) {
  const [formData, setFormData] = useState<AdCampaignFormData>({
    text: "",
    startDate: "",
    endDate: "",
    backgroundColor: "#ff6b35",
    textColor: "#ffffff",
    priority: 1,
  });

  // Update form data when campaign changes
  useEffect(() => {
    if (campaign) {
      setFormData({
        text: campaign.text,
        startDate: campaign.startDate.split("T")[0],
        endDate: campaign.endDate.split("T")[0],
        backgroundColor: campaign.backgroundColor || "#ff6b35",
        textColor: campaign.textColor || "#ffffff",
        priority: campaign.priority,
      });
    }
  }, [campaign]);

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === "priority" ? parseInt(value) || 1 : value,
    }));
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Validate dates: end date must be after start date (not same day)
    const start = new Date(formData.startDate);
    const end = new Date(formData.endDate);
    if (!isNaN(start.getTime()) && !isNaN(end.getTime())) {
      const startDay = new Date(start.getFullYear(), start.getMonth(), start.getDate());
      const endDay = new Date(end.getFullYear(), end.getMonth(), end.getDate());
      if (endDay.getTime() === startDay.getTime()) {
        alert("End date must be after start date. They cannot be the same day.");
        return;
      }
      if (endDay.getTime() < startDay.getTime()) {
        alert("End date cannot be before start date.");
        return;
      }
    }
    onSave(formData);
  };

  // Handle close
  const handleClose = () => {
    if (!submitting) {
      onClose();
    }
  };

  if (!isOpen || !campaign) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={handleClose}
      />
      
      {/* Modal */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative themed-form rounded-xl shadow-2xl max-w-2xl w-full mx-4 transform transition-all">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b themed-border">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </div>
              <h3 className="ml-3 text-lg font-semibold themed-label">
                Edit Campaign
              </h3>
            </div>
            <button
              onClick={handleClose}
              disabled={submitting}
              className="text-gray-400 hover:text-gray-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Body */}
          <div className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium themed-label mb-2">
                  Campaign Text *
                </label>
                <textarea
                  name="text"
                  value={formData.text}
                  onChange={handleInputChange}
                  required
                  rows={3}
                  disabled={submitting}
                  className="w-full px-4 py-3 rounded-xl themed-textarea disabled:opacity-50 disabled:cursor-not-allowed"
                  placeholder="Enter your campaign message..."
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium themed-label mb-2">
                    Start Date *
                  </label>
                  <input
                    type="date"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleInputChange}
                    required
                    disabled={submitting}
                    className="w-full px-4 py-3 rounded-xl themed-input disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium themed-label mb-2">
                    End Date *
                  </label>
                  <input
                    type="date"
                    name="endDate"
                    value={formData.endDate}
                    onChange={handleInputChange}
                    required
                    disabled={submitting}
                    className="w-full px-4 py-3 rounded-xl themed-input disabled:opacity-50 disabled:cursor-not-allowed"
                    min={formData.startDate ? new Date(new Date(formData.startDate).getTime() + 24 * 60 * 60 * 1000).toISOString().split('T')[0] : undefined}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium themed-label mb-2">
                    Priority
                  </label>
                  <input
                    type="number"
                    name="priority"
                    value={formData.priority}
                    onChange={handleInputChange}
                    min="1"
                    max="10"
                    disabled={submitting}
                    className="w-full px-4 py-3 rounded-xl themed-input disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium themed-label mb-2">
                    Background Color
                  </label>
                  <input
                    type="color"
                    name="backgroundColor"
                    value={formData.backgroundColor}
                    onChange={handleInputChange}
                    disabled={submitting}
                    className="w-full h-12 rounded-xl themed-color-input cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium themed-label mb-2">
                    Text Color
                  </label>
                  <input
                    type="color"
                    name="textColor"
                    value={formData.textColor}
                    onChange={handleInputChange}
                    disabled={submitting}
                    className="w-full h-12 rounded-xl themed-color-input cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                </div>
              </div>

              {/* Preview */}
              <div>
                <label className="block text-sm font-medium themed-label mb-2">
                  Preview
                </label>
                <AdBanner campaign={{
                  text: formData.text || "",
                  backgroundColor: formData.backgroundColor,
                  textColor: formData.textColor,
                }} />
              </div>
            </form>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end gap-3 p-6 border-t themed-border">
            <button
              onClick={handleClose}
              disabled={submitting}
              className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={submitting}
              className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
            >
              {submitting && (
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              )}
              Update Campaign
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
