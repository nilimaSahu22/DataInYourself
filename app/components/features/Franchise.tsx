"use client";

import React, { useState } from 'react';

const Franchise = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  });
  const [validationErrors, setValidationErrors] = useState({
    name: '',
    email: '',
    phone: ''
  });

  // Email validation function
  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Phone validation function
  const isValidPhone = (phone: string) => {
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(phone);
  };

  const validateField = (name: string, value: string) => {
    let error = '';
    
    switch (name) {
      case 'name':
        if (!value.trim()) {
          error = 'Name is required';
        } else if (value.trim().length < 2) {
          error = 'Name must be at least 2 characters';
        }
        break;
      case 'email':
        if (!value.trim()) {
          error = 'Email is required';
        } else if (!isValidEmail(value)) {
          error = 'Please enter a valid email address';
        }
        break;
      case 'phone':
        if (!value.trim()) {
          error = 'Phone number is required';
        } else if (!isValidPhone(value)) {
          error = 'Please enter a valid phone number';
        }
        break;
    }
    
    return error;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    // For phone number, only allow digits
    if (name === 'phone') {
      const numericValue = value.replace(/\D/g, '');
      // Limit to 10 digits
      const limitedValue = numericValue.slice(0, 10);
      
      setFormData(prev => ({
        ...prev,
        [name]: limitedValue
      }));
      
      // Validate the field
      const fieldError = validateField(name, limitedValue);
      setValidationErrors(prev => ({
        ...prev,
        [name]: fieldError
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
      
      // Validate the field
      const fieldError = validateField(name, value);
      setValidationErrors(prev => ({
        ...prev,
        [name]: fieldError
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate all fields
    const nameError = validateField('name', formData.name);
    const emailError = validateField('email', formData.email);
    const phoneError = validateField('phone', formData.phone);
    
    setValidationErrors({
      name: nameError,
      email: emailError,
      phone: phoneError
    });
    
    // Check if there are any validation errors
    if (nameError || emailError || phoneError) {
      return;
    }
    
    setIsLoading(true);
    setError(null);

    try {
      const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL || "https://server.mukulsharma1602.workers.dev";
      const response = await fetch(`${serverUrl}/enquiry`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          phoneNumber: formData.phone,
          emailId: formData.email,
          subject: 'Franchise Enquiry',
          dateTime: new Date().toISOString()
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to submit form');
      }

      // Close the form modal and show success modal
      setIsModalOpen(false);
      setIsSuccessModalOpen(true);
      
      // Reset form data and validation errors
      setFormData({ name: '', email: '', phone: '' });
      setValidationErrors({ name: '', email: '', phone: '' });
      
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const closeSuccessModal = () => {
    setIsSuccessModalOpen(false);
  };
  
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        
        {/* Hero Section */}
        <div className="text-center mb-16 lg:mb-20">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-orange-50 rounded-full mb-6 border-2 border-orange-100">
            <span className="text-3xl">🏢</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            Join the{' '}
            <span className="bg-gradient-to-r from-orange-600 to-orange-500 bg-clip-text text-transparent">
              DataInYourself
            </span>{' '}
            Family
          </h1>
          <p className="text-xl sm:text-2xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Become a franchise partner and help shape the future of career education in your community
          </p>
        </div>

        {/* Franchise Opportunity */}
        <div className="bg-gradient-to-br from-orange-50 to-white rounded-3xl shadow-lg border border-orange-100 p-8 sm:p-12 lg:p-16 mb-16 lg:mb-20">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
              Why Choose DataInYourself Franchise?
            </h2>
            <p className="text-lg sm:text-xl text-gray-700 leading-relaxed max-w-3xl mx-auto">
              Join a proven business model that combines education excellence with entrepreneurial success. 
              Our franchise program offers comprehensive support, proven curriculum, and a growing market 
              demand for career-focused education.
            </p>
          </div>
        </div>

        {/* Coming Soon Section */}
        <div className="text-center mb-16 lg:mb-20">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-orange-100 rounded-full mb-6 border-2 border-orange-200">
            <span className="text-3xl">🚧</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Coming Soon!
          </h2>
          <p className="text-lg sm:text-xl text-gray-700 max-w-2xl mx-auto leading-relaxed">
            Our franchise program is currently under development. We're working hard to bring you the best 
            franchise opportunity in the education sector. Stay tuned for updates!
          </p>
          <div className="mt-8">
            <button 
              onClick={() => setIsModalOpen(true)}
              className="bg-orange-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-orange-700 transition-colors duration-300 shadow-lg hover:shadow-xl"
            >
              Get Notified
            </button>
          </div>
        </div>

      </div>

      {/* Form Modal */}
      {isModalOpen && (
        <div className="fixed text-black inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900">Get Notified</h3>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 text-2xl font-bold"
                disabled={isLoading}
              >
                ×
              </button>
            </div>
            
            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-600 text-sm">{error}</p>
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-black text-sm font-medium text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  disabled={isLoading}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors disabled:bg-gray-50 disabled:cursor-not-allowed ${
                    validationErrors.name ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="Enter your full name"
                />
                {validationErrors.name && (
                  <p className="mt-1 text-sm text-red-600">{validationErrors.name}</p>
                )}
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  disabled={isLoading}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors disabled:bg-gray-50 disabled:cursor-not-allowed ${
                    validationErrors.email ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="Enter your email address"
                />
                {validationErrors.email && (
                  <p className="mt-1 text-sm text-red-600">{validationErrors.email}</p>
                )}
              </div>
              
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  disabled={isLoading}
                  maxLength={10}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors disabled:bg-gray-50 disabled:cursor-not-allowed ${
                    validationErrors.phone ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="Enter 10-digit phone number"
                />
                {validationErrors.phone && (
                  <p className="mt-1 text-sm text-red-600">{validationErrors.phone}</p>
                )}

              </div>
              
              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex-1 bg-orange-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-orange-700 transition-colors duration-300 disabled:bg-orange-400 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {isLoading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Submitting...
                    </>
                  ) : (
                    'Submit'
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  disabled={isLoading}
                  className="flex-1 bg-gray-200 text-gray-800 py-3 px-6 rounded-lg font-semibold hover:bg-gray-300 transition-colors duration-300 disabled:bg-gray-100 disabled:cursor-not-allowed"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {isSuccessModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl text-center">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
            </div>
            
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Thank You!
            </h3>
            
            <p className="text-gray-700 mb-6 leading-relaxed">
              Your franchise enquiry has been successfully submitted. We'll notify you as soon as our franchise program launches with exclusive early access opportunities.
            </p>
            
            <button
              onClick={closeSuccessModal}
              className="w-full bg-orange-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-orange-700 transition-colors duration-300"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Franchise; 