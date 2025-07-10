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
  const handleContactClick = useContactNavigation();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAdmissionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you can add logic to handle form submission
    console.log('Admission form submitted:', formData);
    alert('Thank you for your interest! We will contact you soon to discuss your admission.');
    setIsAdmissionModalOpen(false);
    setFormData({ name: '', email: '', phone: '', course: '' });
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

        {/* Course Catalog */}
        <div className="mb-16 lg:mb-20">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Explore Our Course Catalog
            </h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              From data analysis to web development, we offer comprehensive programs designed 
              to launch your career in the most in-demand fields
            </p>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 lg:gap-6">
            {[
              { name: 'Data Analyst', duration: '3-4 months', emoji: '📊' },
              { name: 'Business Analyst', duration: '3-4 months', emoji: '💼' },
              { name: 'Data Science', duration: '4-5 months', emoji: '🔬' },
              { name: 'SQL Analyst', duration: '1 month', emoji: '🗄️' },
              { name: 'Machine Learning', duration: '1 month', emoji: '🤖' },
              { name: 'Python for Beginners', duration: '1 month', emoji: '🐍' },
              { name: 'Power BI / Tableau', duration: '1 month', emoji: '📈' },
              { name: 'Digital Marketing', duration: '2-3 months', emoji: '📱' },
              { name: 'Placement Ready', duration: '1 month', emoji: '🎯' },
              { name: 'Web Developer', duration: '3 months', emoji: '💻' },
              { name: 'Cyber Security', duration: '3 months', emoji: '🔒' },
              { name: 'Cloud Engineer', duration: '2 months', emoji: '☁️' },
              { name: 'Prompt Engineer', duration: '3 months', emoji: '🤖' },
              { name: 'Product Management', duration: '3 months', emoji: '📋' },
              { name: 'Finance Analyst', duration: '3 months', emoji: '💰' },
              { name: 'AutoCAD AutoDesk', duration: '1-2 months', emoji: '🏗️' },
              { name: 'Autodesk Revit', duration: '1-2 months', emoji: '🏢' },
              { name: 'STAAD Pro', duration: '1-2 months', emoji: '⚡' }
            ].map((course, index) => (
              <div 
                key={index} 
                className={`bg-white rounded-xl p-4 lg:p-6 border-2 transition-all duration-300 cursor-pointer text-center group ${
                  hoveredIndex === index 
                    ? 'border-orange-500 shadow-lg shadow-orange-100 transform -translate-y-1' 
                    : 'border-orange-100 hover:border-orange-300 hover:shadow-md'
                }`}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <div className="text-2xl lg:text-3xl mb-3 group-hover:scale-110 transition-transform duration-300">
                  {course.emoji}
                </div>
                <h4 className="text-sm lg:text-base font-semibold text-gray-900 mb-2 leading-tight">
                  {course.name}
                </h4>
                <p className="text-xs lg:text-sm text-gray-600">{course.duration}</p>
              </div>
            ))}
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
            
            <form onSubmit={handleAdmissionSubmit} className="space-y-6">
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
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors bg-white"
                >
                  <option value="">Select a course</option>
                  <option value="Data Analyst">Data Analyst</option>
                  <option value="Business Analyst">Business Analyst</option>
                  <option value="Data Science">Data Science</option>
                  <option value="SQL Analyst">SQL Analyst</option>
                  <option value="Machine Learning">Machine Learning</option>
                  <option value="Python for Beginners">Python for Beginners</option>
                  <option value="Power BI / Tableau">Power BI / Tableau</option>
                  <option value="Digital Marketing">Digital Marketing</option>
                  <option value="Placement Ready">Placement Ready</option>
                  <option value="Web Developer">Web Developer</option>
                  <option value="Cyber Security">Cyber Security</option>
                  <option value="Cloud Engineer">Cloud Engineer</option>
                  <option value="Prompt Engineer">Prompt Engineer</option>
                  <option value="Product Management">Product Management</option>
                  <option value="Finance Analyst">Finance Analyst</option>
                  <option value="AutoCAD AutoDesk">AutoCAD AutoDesk</option>
                  <option value="Autodesk Revit">Autodesk Revit</option>
                  <option value="STAAD Pro">STAAD Pro</option>
                </select>
              </div>
              
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-orange-600 hover:to-orange-700 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Submit Application
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AboutUs; 