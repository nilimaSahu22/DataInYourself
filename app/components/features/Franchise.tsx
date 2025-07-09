"use client";

import React, { useState } from 'react';

const Franchise = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you can add logic to handle form submission
    console.log('Form submitted:', formData);
    alert('Thank you! We will notify you when our franchise program launches.');
    setIsModalOpen(false);
    setFormData({ name: '', email: '', phone: '' });
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

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900">Get Notified</h3>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 text-2xl font-bold"
              >
                ×
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                  placeholder="Enter your full name"
                />
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
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                  placeholder="Enter your email address"
                />
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
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                  placeholder="Enter your phone number"
                />
              </div>
              
              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-orange-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-orange-700 transition-colors duration-300"
                >
                  Submit
                </button>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 bg-gray-200 text-gray-800 py-3 px-6 rounded-lg font-semibold hover:bg-gray-300 transition-colors duration-300"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Franchise; 