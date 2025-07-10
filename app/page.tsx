"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import PlacementCourseCard from "./components/ui/PlacementCourseCard";
import { coursesData } from "./data/courses";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredCourses, setFilteredCourses] = useState(coursesData);
  const [isClient, setIsClient] = useState(false);

  // Handle hydration
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Handle hash navigation for testimonials
  useEffect(() => {
    if (typeof window !== 'undefined' && window.location.hash === '#testimonials') {
      const testimonialsSection = document.getElementById('testimonials');
      if (testimonialsSection) {
        setTimeout(() => {
          testimonialsSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }, 500);
      }
    }
  }, []);

  // Search function
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    
    if (query.trim() === "") {
      setFilteredCourses(coursesData);
    } else {
      const filtered = coursesData.filter(course =>
        course.title.toLowerCase().includes(query.toLowerCase()) ||
        course.iconAlt.toLowerCase().includes(query.toLowerCase()) ||
        course.duration.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredCourses(filtered);
    }
  };

  // Handle search button click
  const handleSearchClick = () => {
    handleSearch(searchQuery);
  };

  // Handle Enter key press
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearchClick();
    }
  };

  // Company logos data
  const companyLogos = [
    { src: '/icon_assets/accenture.png', alt: 'Accenture' },
    { src: '/icon_assets/amazon.png', alt: 'Amazon' },
    { src: '/icon_assets/Cognizant.png', alt: 'Cognizant' },
    { src: '/icon_assets/ericsson.png', alt: 'Ericsson' },
    { src: '/icon_assets/HCL.png', alt: 'HCL' },
    { src: '/icon_assets/infosys.png', alt: 'Infosys' },
    { src: '/icon_assets/microland.png', alt: 'Microland' },
    { src: '/icon_assets/microsoft-80658_1920.png', alt: 'Microsoft' },
    { src: '/icon_assets/tcs.png', alt: 'TCS' },
    { src: '/icon_assets/tech-mahindra.png', alt: 'Tech Mahindra' },
  ];

  // Carousel state for mobile
  const [currentLogo, setCurrentLogo] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentLogo((prev) => (prev + 1) % companyLogos.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [companyLogos.length]);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="pt-20 sm:pt-24 md:pt-28 lg:pt-32 pb-4 sm:pb-6 md:pb-8 lg:pb-10 px-4 sm:px-6 md:px-8 lg:px-8 bg-gradient-to-br from-orange-50 to-white">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-orange-900 mb-4 sm:mb-6">
            Welcome to <span className="bg-gradient-to-r from-orange-600 to-orange-500 bg-clip-text text-transparent">DataInYourself</span>
          </h1>
          <p className="text-base sm:text-lg text-orange-600 font-medium mb-3 sm:mb-4">
            by Rudriva Technology
          </p>
          <p className="text-lg sm:text-xl text-orange-800 mb-6 sm:mb-8 max-w-3xl mx-auto px-4">
            India's number one computer training platform. Learn from industry experts and advance your career with our comprehensive courses.
          </p>
        </div>
      </section>

      {/* Placement Courses Section */}
      <section className="py-4 sm:py-6 md:py-8 lg:py-12 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-orange-900 mb-6 sm:mb-8 md:mb-12">Placement Courses</h2>
          
          {/* Search Bar */}
          <div className="mb-8 sm:mb-12 md:mb-16">
            <div className="max-w-2xl mx-auto px-2 sm:px-0">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search courses..."
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="w-full px-4 py-3 sm:py-4 md:py-3 pl-12 pr-20 sm:pr-16 md:pr-16 text-orange-900 bg-white border-2 border-orange-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-orange-500/20 focus:border-orange-500 shadow-lg text-sm sm:text-base md:text-sm transition-all duration-300 placeholder-orange-400"
                  suppressHydrationWarning
                />
                <div className="absolute inset-y-0 left-0 pl-4 sm:pl-3 md:pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <button 
                  onClick={handleSearchClick}
                  className="absolute inset-y-0 right-0 px-3 sm:px-4 md:px-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-r-2xl hover:from-orange-600 hover:to-orange-700 transition-all duration-300 font-medium text-sm sm:text-sm md:text-sm min-w-[70px] sm:min-w-[80px] md:min-w-0 shadow-lg"
                  suppressHydrationWarning
                >
                  Search
                </button>
              </div>
            </div>
          </div>
          
          {/* Search Results Info */}
          {isClient && searchQuery && (
            <div className="text-center mb-6 sm:mb-8 md:mb-12">
              <p className="text-orange-700 text-sm sm:text-base">
                {filteredCourses.length === 0 
                  ? `No courses found for "${searchQuery}"`
                  : `Found ${filteredCourses.length} course${filteredCourses.length === 1 ? '' : 's'} for "${searchQuery}"`
                }
              </p>
              {searchQuery && (
                <button 
                  onClick={() => handleSearch("")}
                  className="mt-2 text-orange-500 hover:text-orange-600 underline text-sm transition-colors duration-300"
                  suppressHydrationWarning
                >
                  Clear search
                </button>
              )}
            </div>
          )}
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 md:gap-6 lg:gap-8">
            {filteredCourses.map((course) => (
              <PlacementCourseCard
                key={course.id}
                id={course.id}
                iconSrc={course.iconSrc}
                iconAlt={course.iconAlt}
                title={course.title}
                duration={course.duration}
              />
            ))}
          </div>
          
          {/* No results message */}
          {isClient && filteredCourses.length === 0 && searchQuery && (
            <div className="text-center py-12 sm:py-16 md:py-20">
              <div className="w-20 h-20 sm:w-24 sm:h-24 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <svg className="w-10 h-10 sm:w-12 sm:h-12 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-orange-900 mb-2 sm:mb-3">No courses found</h3>
              <p className="text-orange-700 mb-4 sm:mb-6">Try searching with different keywords</p>
              <button 
                onClick={() => handleSearch("")}
                className="px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-full hover:from-orange-600 hover:to-orange-700 transition-all duration-300 text-sm sm:text-base shadow-lg hover:shadow-xl hover:scale-105"
                suppressHydrationWarning
              >
                View all courses
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 md:px-8 lg:px-8 bg-gradient-to-br from-orange-50 to-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-orange-900 mb-8 sm:mb-12 md:mb-16">
            Why Choose DataInYourself?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 md:gap-8 lg:gap-12">
            <div className="text-center p-4 sm:p-6 md:p-8 bg-white rounded-2xl shadow-lg border border-orange-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-orange-100 rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4 md:mb-6">
                <svg className="w-7 h-7 sm:w-8 sm:h-8 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3 text-orange-900">Expert Instructors</h3>
              <p className="text-orange-700 text-sm sm:text-base">Learn from industry professionals with years of experience.</p>
            </div>
            <div className="text-center p-4 sm:p-6 md:p-8 bg-white rounded-2xl shadow-lg border border-orange-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-orange-100 rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4 md:mb-6">
                <svg className="w-7 h-7 sm:w-8 sm:h-8 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3 text-orange-900">Certified Courses</h3>
              <p className="text-orange-700 text-sm sm:text-base">Get industry-recognized certificates upon completion.</p>
            </div>
            <div className="text-center p-4 sm:p-6 md:p-8 bg-white rounded-2xl shadow-lg border border-orange-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 sm:col-span-2 md:col-span-1">
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-orange-100 rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4 md:mb-6">
                <svg className="w-7 h-7 sm:w-8 sm:h-8 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3 text-orange-900">Flexible Learning</h3>
              <p className="text-orange-700 text-sm sm:text-base">Learn at your own pace with 24/7 access to courses.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Company Logos Section - just above the footer */}
      <section className="bg-gradient-to-r from-orange-100 to-orange-200 py-6 sm:py-8 border-t border-b border-orange-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-8">
          {/* Mobile: Carousel, show one logo at a time */}
          <div className="flex justify-center items-center sm:hidden" style={{ minHeight: 80 }}>
            <div className="relative h-20 w-[140px] flex items-center justify-center">
              <Image
                key={companyLogos[currentLogo].alt}
                src={companyLogos[currentLogo].src}
                alt={companyLogos[currentLogo].alt}
                fill
                sizes="140px"
                className="object-contain"
                priority
              />
            </div>
          </div>
          {/* Tablet: Show 3-4 logos in a row */}
          <div className="hidden sm:flex md:hidden flex-wrap items-center justify-center gap-4 mb-0 overflow-x-auto">
            {companyLogos.slice(0, 4).map((logo) => (
              <div key={logo.alt} className="relative h-20 w-[140px] flex items-center justify-center">
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  fill
                  sizes="140px"
                  className="object-contain"
                  priority
                />
              </div>
            ))}
          </div>
          {/* Desktop: All logos in a row */}
          <div className="hidden md:flex flex-wrap items-center justify-center gap-6 mb-0 overflow-x-auto">
            {companyLogos.map((logo) => (
              <div key={logo.alt} className="relative h-20 w-[140px] flex items-center justify-center">
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  fill
                  sizes="140px"
                  className="object-contain"
                  priority
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Us Section */}
      <section id="contact" className="py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 md:px-8 lg:px-8 bg-gradient-to-br from-orange-50 to-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-orange-900 mb-8 sm:mb-12 md:mb-16">
            Contact Us
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 lg:gap-16">
            {/* Contact Information */}
            <div className="space-y-6 sm:space-y-8">
              <div>
                <h3 className="text-xl sm:text-2xl font-semibold text-orange-900 mb-4 sm:mb-6">
                  Get in Touch
                </h3>
                <p className="text-orange-700 text-sm sm:text-base mb-6 sm:mb-8">
                  Ready to start your journey with DataInYourself? Contact us today and let's discuss how we can help you achieve your career goals.
                </p>
              </div>
              
              <div className="space-y-4 sm:space-y-6">
                {/* Phone Numbers */}
                <div className="flex items-start space-x-3 sm:space-x-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 sm:w-6 sm:h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-sm sm:text-base font-semibold text-orange-900 mb-1 sm:mb-2">Phone Numbers</h4>
                    <div className="space-y-1 sm:space-y-2">
                      <a 
                        href="tel:+919558092200" 
                        className="block text-orange-700 hover:text-orange-600 text-sm sm:text-base transition-colors duration-200"
                      >
                        +91 9558092200
                      </a>
                      <a 
                        href="tel:+918839381619" 
                        className="block text-orange-700 hover:text-orange-600 text-sm sm:text-base transition-colors duration-200"
                      >
                        +91 8839381619
                      </a>
                    </div>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start space-x-3 sm:space-x-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 sm:w-6 sm:h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-sm sm:text-base font-semibold text-orange-900 mb-1 sm:mb-2">Email</h4>
                    <a 
                      href="mailto:mukulsharma1602@gmail.com" 
                      className="text-orange-700 hover:text-orange-600 text-sm sm:text-base transition-colors duration-200"
                    >
                      mukulsharma1602@gmail.com
                    </a>
                  </div>
                </div>

                {/* Address */}
                <div className="flex items-start space-x-3 sm:space-x-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 sm:w-6 sm:h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-sm sm:text-base font-semibold text-orange-900 mb-1 sm:mb-2">Address</h4>
                    <div className="space-y-2 sm:space-y-3">
                      <div>
                        <p className="text-orange-700 text-sm sm:text-base font-medium">Surat</p>
                        <p className="text-orange-700 text-sm sm:text-base">
                          Rudriva Technology<br />
                          India's Premier Computer Training Institute
                        </p>
                      </div>
                      <div>
                        <p className="text-orange-700 text-sm sm:text-base font-medium">Pune</p>
                        <p className="text-orange-700 text-sm sm:text-base">
                          Rudriva Technology<br />
                          India's Premier Computer Training Institute
                        </p>
                      </div>
                      <div>
                        <p className="text-orange-700 text-sm sm:text-base font-medium">Raipur</p>
                        <p className="text-orange-700 text-sm sm:text-base">
                          Rudriva Technology<br />
                          India's Premier Computer Training Institute
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white rounded-2xl shadow-lg border border-orange-100 p-6 sm:p-8">
              <h3 className="text-xl sm:text-2xl font-semibold text-orange-900 mb-6 sm:mb-8">
                Send us a Message
              </h3>
              <form className="space-y-4 sm:space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-orange-900 mb-2">
                      First Name
                    </label>
                                      <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    className="w-full px-4 py-3 border-2 border-orange-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-orange-500/20 focus:border-orange-500 transition-all duration-300 text-orange-900 placeholder-orange-400"
                    placeholder="Enter your first name"
                    suppressHydrationWarning
                  />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-orange-900 mb-2">
                      Last Name
                    </label>
                                      <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    className="w-full px-4 py-3 border-2 border-orange-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-orange-500/20 focus:border-orange-500 transition-all duration-300 text-orange-900 placeholder-orange-400"
                    placeholder="Enter your last name"
                    suppressHydrationWarning
                  />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-orange-900 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="w-full px-4 py-3 border-2 border-orange-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-orange-500/20 focus:border-orange-500 transition-all duration-300 text-orange-900 placeholder-orange-400"
                    placeholder="Enter your email address"
                    suppressHydrationWarning
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-orange-900 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    className="w-full px-4 py-3 border-2 border-orange-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-orange-500/20 focus:border-orange-500 transition-all duration-300 text-orange-900 placeholder-orange-400"
                    placeholder="Enter your phone number"
                    suppressHydrationWarning
                  />
                </div>

                <div>
                  <label htmlFor="course" className="block text-sm font-medium text-orange-900 mb-2">
                    Interested Course
                  </label>
                  <select
                    id="course"
                    name="course"
                    className="w-full px-4 py-3 border-2 border-orange-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-orange-500/20 focus:border-orange-500 transition-all duration-300 text-orange-900 bg-white"
                    suppressHydrationWarning
                  >
                    <option value="">Select a course</option>
                    <option value="data-analyst">Data Analyst</option>
                    <option value="business-analyst">Business Analyst</option>
                    <option value="data-science">Data Science</option>
                    <option value="sql-analyst">SQL Analyst</option>
                    <option value="machine-learning">Machine Learning</option>
                    <option value="python-beginners">Python for Beginners</option>
                    <option value="power-bi-tableau">Power BI / Tableau Mastery</option>
                    <option value="digital-marketing">Digital Marketing</option>
                    <option value="placement-ready">Placement Ready</option>
                    <option value="web-developer">Web Developer</option>
                    <option value="cyber-security">Cyber Security</option>
                    <option value="cloud-engineer">Cloud Engineer</option>
                    <option value="prompt-engineer">Prompt Engineer</option>
                    <option value="product-management">Product Management</option>
                    <option value="finance-analyst">Finance Analyst</option>
                    <option value="autocad">AutoCAD AutoDesk</option>
                    <option value="revit">Autodesk Revit</option>
                    <option value="staad-pro">STAAD Pro</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-orange-900 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    className="w-full px-4 py-3 border-2 border-orange-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-orange-500/20 focus:border-orange-500 transition-all duration-300 text-orange-900 placeholder-orange-400 resize-none"
                    placeholder="Tell us about your requirements..."
                    suppressHydrationWarning
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-3 sm:py-4 px-6 rounded-xl font-semibold hover:from-orange-600 hover:to-orange-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 text-sm sm:text-base"
                  suppressHydrationWarning
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials and Reviews Section */}
      <section id="testimonials" className="py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 md:px-8 lg:px-8 bg-gradient-to-br from-white to-orange-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-orange-900 mb-8 sm:mb-12 md:mb-16">
            What Our Students Say
          </h2>
          
          {/* Testimonials */}
          <div className="mb-12 sm:mb-16 md:mb-20">
            <h3 className="text-xl sm:text-2xl font-semibold text-center text-orange-800 mb-8 sm:mb-12">
              Student Testimonials
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
              {/* Testimonial 1 */}
              <div className="bg-gradient-to-br from-orange-50 to-white rounded-2xl shadow-lg border border-orange-200 p-6 sm:p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="flex items-center mb-2 sm:mb-3">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center text-white font-bold text-lg sm:text-xl">
                    RP
                  </div>
                  <div className="ml-4 min-w-0 flex-1">
                    <h4 className="text-base sm:text-lg font-semibold text-orange-900 truncate">Rahul Patel</h4>
                    <p className="text-sm sm:text-base text-orange-600 truncate">Data Analyst Course</p>
                  </div>
                </div>
                <div className="flex items-center mt-1 mb-3 sm:mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-sm sm:text-base text-orange-700 leading-relaxed">
                  "DataInYourself transformed my career! The Data Analyst course was comprehensive and practical. 
                  I landed a job at a top IT company within 3 months of completing the course. The instructors are 
                  industry experts who really know their stuff."
                </p>
              </div>

              {/* Testimonial 2 */}
              <div className="bg-gradient-to-br from-orange-50 to-white rounded-2xl shadow-lg border border-orange-200 p-6 sm:p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="flex items-center mb-2 sm:mb-3">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center text-white font-bold text-lg sm:text-xl">
                    SM
                  </div>
                  <div className="ml-4 min-w-0 flex-1">
                    <h4 className="text-base sm:text-lg font-semibold text-orange-900 truncate">Sneha Mehta</h4>
                    <p className="text-sm sm:text-base text-orange-600 truncate">Business Analyst Course</p>
                  </div>
                </div>
                <div className="flex items-center mt-1 mb-3 sm:mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-sm sm:text-base text-orange-700 leading-relaxed">
                  "The Business Analyst course exceeded my expectations. The practical projects and real-world 
                  case studies helped me understand the industry better. Now I'm working as a Senior Business 
                  Analyst at a leading consulting firm. Thank you, DataInYourself!"
                </p>
              </div>

              {/* Testimonial 3 */}
              <div className="bg-gradient-to-br from-orange-50 to-white rounded-2xl shadow-lg border border-orange-200 p-6 sm:p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="flex items-center mb-2 sm:mb-3">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center text-white font-bold text-lg sm:text-xl">
                    AK
                  </div>
                  <div className="ml-4 min-w-0 flex-1">
                    <h4 className="text-base sm:text-lg font-semibold text-orange-900 truncate">Amit Kumar</h4>
                    <p className="text-sm sm:text-base text-orange-600 truncate">Machine Learning Course</p>
                  </div>
                </div>
                <div className="flex items-center mt-1 mb-3 sm:mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-sm sm:text-base text-orange-700 leading-relaxed">
                  "I was skeptical about online learning, but DataInYourself proved me wrong. The Machine Learning 
                  course was hands-on and the support team was always available. I got placed at a startup with 
                  a great salary package. Highly recommended!"
                </p>
              </div>
            </div>
          </div>

          {/* Reviews */}
          <div>
            <h3 className="text-xl sm:text-2xl font-semibold text-center text-orange-800 mb-8 sm:mb-12">
              Student Reviews
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
              {/* Review 1 */}
              <div className="bg-gradient-to-br from-orange-50 to-white rounded-2xl shadow-lg border border-orange-200 p-6 sm:p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="flex items-center mb-2 sm:mb-3">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 sm:w-6 sm:h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <div className="ml-3 sm:ml-4 min-w-0 flex-1">
                    <h4 className="text-sm sm:text-base font-semibold text-orange-900 truncate">Priya Sharma</h4>
                    <p className="text-xs sm:text-sm text-orange-600 truncate">Python Course</p>
                  </div>
                </div>
                <div className="flex items-center mt-1 mb-3 sm:mb-4">
                  <span className="text-sm sm:text-base font-semibold text-orange-900 mr-1 sm:mr-2">5.0</span>
                  <div className="flex space-x-0.5 sm:space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
                <p className="text-sm sm:text-base text-orange-700 leading-relaxed">
                  "Excellent course structure and content. The Python course helped me build a strong foundation. 
                  The instructors are very knowledgeable and supportive. Great value for money!"
                </p>
                <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-orange-200">
                  <p className="text-xs sm:text-sm text-orange-600">
                    <span className="font-semibold">Course completed:</span> 2 months ago
                  </p>
                </div>
              </div>

              {/* Review 2 */}
              <div className="bg-gradient-to-br from-orange-50 to-white rounded-2xl shadow-lg border border-orange-200 p-6 sm:p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="flex items-center mb-2 sm:mb-3">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 sm:w-6 sm:h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <div className="ml-3 sm:ml-4 min-w-0 flex-1">
                    <h4 className="text-sm sm:text-base font-semibold text-orange-900 truncate">Vikram Singh</h4>
                    <p className="text-xs sm:text-sm text-orange-600 truncate">Digital Marketing</p>
                  </div>
                </div>
                <div className="flex items-center mt-1 mb-3 sm:mb-4">
                  <span className="text-sm sm:text-base font-semibold text-orange-900 mr-1 sm:mr-2">4.9</span>
                  <div className="flex space-x-0.5 sm:space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className={`w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0 ${i < 4 ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
                <p className="text-sm sm:text-base text-orange-700 leading-relaxed">
                  "The Digital Marketing course is comprehensive and up-to-date with current industry trends. 
                  I learned practical skills that I'm already using in my freelance work. Highly recommend!"
                </p>
                <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-orange-200">
                  <p className="text-xs sm:text-sm text-orange-600">
                    <span className="font-semibold">Course completed:</span> 1 month ago
                  </p>
                </div>
              </div>

              {/* Review 3 */}
              <div className="bg-gradient-to-br from-orange-50 to-white rounded-2xl shadow-lg border border-orange-200 p-6 sm:p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="flex items-center mb-2 sm:mb-3">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 sm:w-6 sm:h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <div className="ml-3 sm:ml-4 min-w-0 flex-1">
                    <h4 className="text-sm sm:text-base font-semibold text-orange-900 truncate">Neha Gupta</h4>
                    <p className="text-xs sm:text-sm text-orange-600 truncate">Web Development</p>
                  </div>
                </div>
                <div className="flex items-center mt-1 mb-3 sm:mb-4">
                  <span className="text-sm sm:text-base font-semibold text-orange-900 mr-1 sm:mr-2">5.0</span>
                  <div className="flex space-x-0.5 sm:space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
                <p className="text-sm sm:text-base text-orange-700 leading-relaxed">
                  "Amazing learning experience! The Web Development course covers everything from basics to advanced 
                  concepts. I built a portfolio website during the course and got hired as a junior developer."
                </p>
                <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-orange-200">
                  <p className="text-xs sm:text-sm text-orange-600">
                    <span className="font-semibold">Course completed:</span> 3 weeks ago
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
