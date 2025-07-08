"use client";

import React, { useState } from 'react';

const AboutUs = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-500 to-purple-600 p-4 sm:p-6 md:p-8">
      <div className="max-w-4xl mx-auto bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-6 sm:p-8 md:p-12">
        {/* Header Section */}
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4 sm:mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Welcome to DataInYourself
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-gray-600 max-w-2xl mx-auto leading-relaxed px-4">
            Your journey to career success starts here! 🚀
          </p>
        </div>

        {/* Mission Section */}
        <div className="bg-gradient-to-r from-pink-400 to-red-500 rounded-2xl p-6 sm:p-8 mb-8 sm:mb-12 text-white text-center">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6">
            Our Mission
          </h2>
          <p className="text-base sm:text-lg md:text-xl leading-relaxed opacity-95">
            We're here to <strong>empower you</strong> with job-ready digital and technical skills that today's employers are looking for. 
            Think of us as your personal career coach, guiding you from learning to earning! 💼
          </p>
        </div>

        {/* What We Offer */}
        <div className="mb-8 sm:mb-12">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-6 sm:mb-8 text-gray-800 text-center">
            What Makes Us Special ✨
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            <div className="bg-blue-50 p-6 sm:p-8 rounded-2xl border-2 border-blue-200">
              <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-blue-700 mb-3 sm:mb-4">
                🎯 Expert-Designed Courses
              </h3>
              <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                Our courses are crafted by industry professionals who know exactly what skills you need to succeed in today's job market.
              </p>
            </div>
            <div className="bg-orange-50 p-6 sm:p-8 rounded-2xl border-2 border-orange-200">
              <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-orange-700 mb-3 sm:mb-4">
                🚀 Career-Focused Learning
              </h3>
              <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                We focus on practical skills that employers actually want, not just theory. Get ready to hit the ground running!
              </p>
            </div>
            <div className="bg-green-50 p-6 sm:p-8 rounded-2xl border-2 border-green-200 sm:col-span-2 lg:col-span-1">
              <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-green-700 mb-3 sm:mb-4">
                🤝 Placement Support
              </h3>
              <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                We don't just teach you skills - we help you land your dream job with comprehensive placement assistance.
              </p>
            </div>
          </div>
        </div>

        {/* Course Catalog */}
        <div className="mb-8 sm:mb-12">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-6 sm:mb-8 text-gray-800 text-center">
            Explore Our Course Catalog 📚
          </h2>
          <p className="text-center text-base sm:text-lg md:text-xl text-gray-600 mb-6 sm:mb-8 max-w-3xl mx-auto px-4">
            From data analysis to web development, we've got courses for every career path. Choose your journey below!
          </p>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4 mb-6 sm:mb-8">
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
                className={`bg-white p-3 sm:p-4 md:p-6 rounded-xl border-2 transition-all duration-300 cursor-pointer text-center transform hover:-translate-y-1 hover:shadow-lg ${
                  hoveredIndex === index 
                    ? 'border-blue-500 shadow-lg' 
                    : 'border-gray-200 hover:border-blue-300'
                }`}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <div className="text-xl sm:text-2xl md:text-3xl mb-2 sm:mb-3">{course.emoji}</div>
                <h4 className="text-xs sm:text-sm md:text-base font-semibold text-gray-800 mb-1 sm:mb-2 leading-tight">
                  {course.name}
                </h4>
                <p className="text-xs sm:text-sm text-gray-600">{course.duration}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Our Story */}
        <div className="bg-gradient-to-r from-cyan-200 to-pink-200 rounded-2xl p-6 sm:p-8 md:p-10 mb-8 sm:mb-12 text-center">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6 text-gray-800">
            Our Story 📖
          </h2>
          <p className="text-base sm:text-lg md:text-xl leading-relaxed text-gray-700 max-w-4xl mx-auto">
            Founded by passionate educators and industry professionals, DataInYourself was born from a simple belief: 
            <strong> everyone deserves access to world-class, career-focused education</strong>. 
            We're not just another online learning platform - we're your partners in success, 
            committed to supporting you at every step of your journey. 🌟
          </p>
        </div>

        {/* Call to Action */}
        <div className="text-center bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-6 sm:p-8 md:p-12 text-white">
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6">
            Ready to Transform Your Career? 🚀
          </h2>
          <p className="text-base sm:text-lg md:text-xl mb-6 sm:mb-8 opacity-90">
            Join thousands of learners who have already taken the first step towards their dream careers!
          </p>
          <button className="bg-white text-blue-600 border-none px-6 sm:px-8 md:px-10 py-3 sm:py-4 rounded-full text-base sm:text-lg md:text-xl font-semibold cursor-pointer transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105">
            Start Your Journey Today! ✨
          </button>
        </div>
      </div>
    </div>
  );
};

export default AboutUs; 