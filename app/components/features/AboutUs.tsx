"use client";

import React, { useState } from 'react';
import { useContactNavigation } from '../../utils/contactNavigation';

const AboutUs = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isAdmissionModalOpen, setIsAdmissionModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    course: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const handleContactClick = useContactNavigation();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAdmissionSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError('');
    setSubmitSuccess(false);

    try {
      const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL || "https://server.mukulsharma1602.workers.dev";
      
      // Map form data to backend API structure
      const enquiryData = {
        name: formData.name,
        phoneNumber: formData.phone,
        emailId: formData.email,
        subject: formData.course,
        dateTime: new Date().toISOString()
      };

      const response = await fetch(`${serverUrl}/enquiry`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(enquiryData),
      });

      const result = await response.json();

      if (response.ok) {
        setSubmitSuccess(true);
        setFormData({ name: '', email: '', phone: '', course: '' });
        // Close modal after a short delay to show success message
        setTimeout(() => {
          setIsAdmissionModalOpen(false);
          setSubmitSuccess(false);
        }, 2000);
      } else {
        setSubmitError(result.error || 'Failed to submit enquiry. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting enquiry:', error);
      setSubmitError('Network error. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAdmissionClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setIsAdmissionModalOpen(true);
  };
  
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        
        {/* Hero Section */}
        <div className="text-center mb-16 lg:mb-20">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-orange-50 rounded-full mb-6 border-2 border-orange-100">
            <span className="text-3xl">🚀</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            Welcome to{' '}
            <span className="bg-gradient-to-r from-orange-600 to-orange-500 bg-clip-text text-transparent">
              DataInYourself
            </span>
          </h1>
          <p className="text-xl sm:text-2xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Your gateway to career success through expert-led, industry-focused education
          </p>
        </div>

        {/* Mission Statement */}
        <div className="bg-gradient-to-br from-orange-50 to-white rounded-3xl shadow-lg border border-orange-100 p-8 sm:p-12 lg:p-16 mb-16 lg:mb-20">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-500 rounded-2xl mb-8 shadow-md">
              <span className="text-2xl text-white">💼</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
              Our Mission
            </h2>
            <p className="text-lg sm:text-xl text-gray-700 leading-relaxed max-w-3xl mx-auto">
              We empower individuals with job-ready digital and technical skills that today's employers demand. 
              Think of us as your personal career accelerator, transforming learning into earning through 
              industry-aligned education and comprehensive placement support.
            </p>
          </div>
        </div>

        {/* Core Values */}
        <div className="mb-16 lg:mb-20">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              What Makes Us Special
            </h2>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
              Three pillars that set us apart in the world of career education
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-orange-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 hover:border-orange-200">
              <div className="w-14 h-14 bg-orange-50 rounded-xl flex items-center justify-center mb-6 border border-orange-100">
                <span className="text-2xl">🎯</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Expert-Designed Curriculum
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Our courses are crafted by industry professionals who understand exactly what skills 
                employers are seeking in today's competitive job market.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg border border-orange-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 hover:border-orange-200">
              <div className="w-14 h-14 bg-orange-50 rounded-xl flex items-center justify-center mb-6 border border-orange-100">
                <span className="text-2xl">🚀</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Career-Focused Learning
              </h3>
              <p className="text-gray-700 leading-relaxed">
                We prioritize practical, hands-on skills over theory. Our students are ready to 
                contribute from day one in their new roles.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg border border-orange-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 hover:border-orange-200">
              <div className="w-14 h-14 bg-orange-50 rounded-xl flex items-center justify-center mb-6 border border-orange-100">
                <span className="text-2xl">🤝</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Placement Support
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Beyond education, we provide comprehensive career guidance, resume building, 
                interview preparation, and job placement assistance.
              </p>
            </div>
          </div>
        </div>

        {/* Our Story */}
        <div className="bg-gradient-to-br from-orange-50 to-white rounded-3xl p-8 sm:p-12 lg:p-16 mb-16 lg:mb-20 border border-orange-100">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-500 rounded-2xl mb-8 shadow-md">
              <span className="text-2xl text-white">📖</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
              Our Story
            </h2>
            <p className="text-lg sm:text-xl text-gray-700 leading-relaxed max-w-3xl mx-auto">
              Founded by passionate educators and industry professionals, DataInYourself emerged from a 
              fundamental belief: <strong>everyone deserves access to world-class, career-focused education</strong>. 
              We're not just another online learning platform—we're your dedicated partners in success, 
              committed to supporting your journey from aspiration to achievement.
            </p>
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-3xl p-8 sm:p-12 lg:p-16 text-center text-white shadow-xl">
          <div className="max-w-3xl mx-auto">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-2xl mb-8 backdrop-blur-sm">
              <span className="text-2xl">✨</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
              Ready to Transform Your Career?
            </h2>
            <p className="text-lg sm:text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Join thousands of learners who have already taken the first step towards their dream careers 
              with DataInYourself
            </p>
            <a 
              href="#admission" 
              onClick={handleAdmissionClick}
              className="inline-block bg-white text-orange-600 px-8 py-4 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 border-2 border-white hover:border-orange-50 cursor-pointer"
            >
              Start Your Journey Today
            </a>
          </div>
        </div>
      </div>

      {/* Admission Form Modal */}
      {isAdmissionModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900">Admission Form</h3>
              <button 
                onClick={() => setIsAdmissionModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 text-2xl font-bold"
              >
                ×
              </button>
            </div>
            
            {submitSuccess ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Application Submitted!</h3>
                <p className="text-gray-600">Thank you for your interest! We will contact you soon to discuss your admission.</p>
              </div>
            ) : (
              <form onSubmit={handleAdmissionSubmit} className="space-y-6">
                {submitError && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <div className="flex">
                      <svg className="w-5 h-5 text-red-400 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <p className="ml-3 text-sm text-red-700">{submitError}</p>
                    </div>
                  </div>
                )}

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
                    disabled={isSubmitting}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors disabled:bg-gray-50 disabled:cursor-not-allowed"
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
                    disabled={isSubmitting}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors disabled:bg-gray-50 disabled:cursor-not-allowed"
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
                    disabled={isSubmitting}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors disabled:bg-gray-50 disabled:cursor-not-allowed"
                    placeholder="Enter your phone number"
                  />
                </div>

                <div>
                  <label htmlFor="course" className="block text-sm font-medium text-gray-700 mb-2">
                    Interested Course *
                  </label>
                  <select
                    id="course"
                    name="course"
                    value={formData.course}
                    onChange={handleInputChange}
                    required
                    disabled={isSubmitting}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors bg-white text-gray-800 disabled:bg-gray-50 disabled:cursor-not-allowed"
                  >
                    <option value="" className="text-gray-800">Select a course</option>
                    <option value="Data Analyst" className="text-gray-800">Data Analyst</option>
                    <option value="Business Analyst" className="text-gray-800">Business Analyst</option>
                    <option value="Data Science" className="text-gray-800">Data Science</option>
                    <option value="SQL Analyst" className="text-gray-800">SQL Analyst</option>
                    <option value="Machine Learning" className="text-gray-800">Machine Learning</option>
                    <option value="Python for Beginners" className="text-gray-800">Python for Beginners</option>
                    <option value="Power BI / Tableau" className="text-gray-800">Power BI / Tableau</option>
                    <option value="Digital Marketing" className="text-gray-800">Digital Marketing</option>
                    <option value="Placement Ready" className="text-gray-800">Placement Ready</option>
                    <option value="Web Developer" className="text-gray-800">Web Developer</option>
                    <option value="Cyber Security" className="text-gray-800">Cyber Security</option>
                    <option value="Cloud Engineer" className="text-gray-800">Cloud Engineer</option>
                    <option value="Prompt Engineer" className="text-gray-800">Prompt Engineer</option>
                    <option value="Product Management" className="text-gray-800">Product Management</option>
                    <option value="Finance Analyst" className="text-gray-800">Finance Analyst</option>
                    <option value="AutoCAD AutoDesk" className="text-gray-800">AutoCAD AutoDesk</option>
                    <option value="Autodesk Revit" className="text-gray-800">Autodesk Revit</option>
                    <option value="STAAD Pro" className="text-gray-800">STAAD Pro</option>
                  </select>
                </div>
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-orange-600 hover:to-orange-700 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Submitting...
                    </>
                  ) : (
                    'Submit Application'
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AboutUs; 