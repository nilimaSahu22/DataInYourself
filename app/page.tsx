"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import PlacementCourseCard from "./components/PlacementCourseCard";

// Course data array
const coursesData = [
  {
    id: 1,
    iconSrc: "/file.svg",
    iconAlt: "Data Analyst",
    title: "Data Analyst",
    price: "₹ 57,820.00",
    duration: "3-4 months",
  },
  {
    id: 2,
    iconSrc: "/globe.svg",
    iconAlt: "Business Analyst",
    title: "Business Analyst",
    price: "₹ 57,820.00",
    duration: "3-4 months",
  },
  {
    id: 3,
    iconSrc: "/window.svg",
    iconAlt: "Data Science",
    title: "Data Science",
    price: "₹ 57,820.00",
    duration: "4-5 months",
  },
  {
    id: 4,
    iconSrc: "/next.svg",
    iconAlt: "SQL Analyst",
    title: "SQL Analyst",
    price: "₹ 57,820.00",
    duration: "1 month",
  },
  {
    id: 5,
    iconSrc: "/vercel.svg",
    iconAlt: "Machine Learning",
    title: "Machine Learning",
    price: "₹ 57,820.00",
    duration: "1 month",
  },
  {
    id: 6,
    iconSrc: "/file.svg",
    iconAlt: "Python for Beginners",
    title: "Python for Beginners",
    price: "₹ 57,820.00",
    duration: "1 month",
  },
  {
    id: 7,
    iconSrc: "/globe.svg",
    iconAlt: "Power BI / Tableau Mastery",
    title: "Power BI / Tableau Mastery",
    price: "₹ 57,820.00",
    duration: "1 month",
  },
  {
    id: 8,
    iconSrc: "/window.svg",
    iconAlt: "Digital Marketing",
    title: "Digital Marketing",
    price: "₹ 57,820.00",
    duration: "2-3 months",
  },
  {
    id: 9,
    iconSrc: "/next.svg",
    iconAlt: "Placement Ready",
    title: "Placement Ready",
    price: "₹ 57,820.00",
    duration: "1 month",
  },
  {
    id: 10,
    iconSrc: "/vercel.svg",
    iconAlt: "Web Developer",
    title: "Web Developer",
    price: "₹ 57,820.00",
    duration: "3 months",
  },
  {
    id: 11,
    iconSrc: "/file.svg",
    iconAlt: "Cyber Security",
    title: "Cyber Security",
    price: "₹ 57,820.00",
    duration: "3 months",
  },
  {
    id: 12,
    iconSrc: "/globe.svg",
    iconAlt: "Cloud Engineer",
    title: "Cloud Engineer",
    price: "₹ 57,820.00",
    duration: "2 months",
  },
  {
    id: 13,
    iconSrc: "/window.svg",
    iconAlt: "Prompt Engineer",
    title: "Prompt Engineer",
    price: "₹ 57,820.00",
    duration: "3 months",
  },
  {
    id: 14,
    iconSrc: "/next.svg",
    iconAlt: "Product Management",
    title: "Product Management",
    price: "₹ 57,820.00",
    duration: "3 months",
  },
  {
    id: 15,
    iconSrc: "/vercel.svg",
    iconAlt: "Finance Analyst",
    title: "Finance Analyst",
    price: "₹ 57,820.00",
    duration: "3 months",
  },
  {
    id: 16,
    iconSrc: "/file.svg",
    iconAlt: "AutoCAD AutoDesk",
    title: "AutoCAD AutoDesk",
    price: "₹ 57,820.00",
    duration: "1-2 months",
  },
  {
    id: 17,
    iconSrc: "/globe.svg",
    iconAlt: "Autodesk Revit",
    title: "Autodesk Revit",
    price: "₹ 57,820.00",
    duration: "1-2 months",
  },
  {
    id: 18,
    iconSrc: "/window.svg",
    iconAlt: "STAAD Pro",
    title: "STAAD Pro",
    price: "₹ 57,820.00",
    duration: "1-2 months",
  },
];

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredCourses, setFilteredCourses] = useState(coursesData);
  const [isClient, setIsClient] = useState(false);

  // Handle hydration
  useEffect(() => {
    setIsClient(true);
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
    { src: '/accenture.png', alt: 'Accenture' },
    { src: '/amazon-6536326_1920.png', alt: 'Amazon' },
    { src: '/Cognizant.png', alt: 'Cognizant' },
    { src: '/ericsson.png', alt: 'Ericsson' },
    { src: '/HCL.png', alt: 'HCL' },
    { src: '/infosys-logo-png.png', alt: 'Infosys' },
    { src: '/microland.png', alt: 'Microland' },
    { src: '/microsoft-80658_1920.png', alt: 'Microsoft' },
    { src: '/tcs.png', alt: 'TCS' },
    { src: '/tech-mahindra.png', alt: 'Tech Mahindra' },
  ];

  // Carousel state for mobile
  const [currentLogo, setCurrentLogo] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentLogo((prev) => (prev + 1) % companyLogos.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [companyLogos.length]);

  // Remove firstRow and secondRow

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Welcome to <span className="text-orange-500">DataInYourself</span>
          </h1>
          <p className="text-lg text-orange-600 font-medium mb-4">
            by Rudriva Technology
          </p>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            India's number one computer training platform. Learn from industry experts and advance your career with our comprehensive courses.
          </p>
        </div>
      </section>

      {/* Placement Courses Section */}
      <section className="py-12 sm:py-16 lg:py-20 px-6 sm:px-8 lg:px-12 xl:px-16">
        <div className="max-w-7xl mx-auto px-6 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8 sm:mb-12">Placement Courses</h2>
          
          {/* Search Bar */}
          <div className="mb-12 sm:mb-16">
            <div className="max-w-2xl mx-auto px-2 sm:px-0">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search courses..."
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="w-full px-4 py-4 sm:py-3 pl-12 pr-20 sm:pr-16 text-gray-900 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent shadow-sm text-base sm:text-sm"
                  suppressHydrationWarning
                />
                <div className="absolute inset-y-0 left-0 pl-4 sm:pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <button 
                  onClick={handleSearchClick}
                  className="absolute inset-y-0 right-0 px-4 sm:px-4 bg-orange-500 text-white rounded-r-lg hover:bg-orange-600 transition-colors duration-200 font-medium text-sm sm:text-sm min-w-[80px] sm:min-w-0"
                  suppressHydrationWarning
                >
                  Search
                </button>
              </div>
            </div>
          </div>
          
          {/* Search Results Info */}
          {isClient && searchQuery && (
            <div className="text-center mb-8 sm:mb-12">
              <p className="text-gray-600">
                {filteredCourses.length === 0 
                  ? `No courses found for "${searchQuery}"`
                  : `Found ${filteredCourses.length} course${filteredCourses.length === 1 ? '' : 's'} for "${searchQuery}"`
                }
              </p>
              {searchQuery && (
                <button 
                  onClick={() => handleSearch("")}
                  className="mt-2 text-orange-500 hover:text-orange-600 underline text-sm"
                  suppressHydrationWarning
                >
                  Clear search
                </button>
              )}
            </div>
          )}
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8">
            {filteredCourses.map((course) => (
              <PlacementCourseCard
                key={course.id}
                iconSrc={course.iconSrc}
                iconAlt={course.iconAlt}
                title={course.title}
                price={course.price}
                duration={course.duration}
              />
            ))}
          </div>
          
          {/* No results message */}
          {isClient && filteredCourses.length === 0 && searchQuery && (
            <div className="text-center py-16 sm:py-20">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2 sm:mb-3">No courses found</h3>
              <p className="text-gray-600 mb-4 sm:mb-6">Try searching with different keywords</p>
              <button 
                onClick={() => handleSearch("")}
                className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors duration-200"
                suppressHydrationWarning
              >
                View all courses
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12 sm:mb-16">
            Why Choose DataInYourself?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            <div className="text-center p-6 sm:p-8">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <svg className="w-8 h-8 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 sm:mb-3">Expert Instructors</h3>
              <p className="text-gray-600">Learn from industry professionals with years of experience.</p>
            </div>
            <div className="text-center p-6 sm:p-8">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <svg className="w-8 h-8 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 sm:mb-3">Certified Courses</h3>
              <p className="text-gray-600">Get industry-recognized certificates upon completion.</p>
            </div>
            <div className="text-center p-6 sm:p-8">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <svg className="w-8 h-8 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 sm:mb-3">Flexible Learning</h3>
              <p className="text-gray-600">Learn at your own pace with 24/7 access to courses.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Company Logos Section - just above the footer */}
      <section className="bg-white py-8 border-t border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Mobile: Carousel, show one logo at a time */}
          <div className="flex justify-center items-center sm:hidden" style={{ minHeight: 90 }}>
            <Image
              key={companyLogos[currentLogo].alt}
              src={companyLogos[currentLogo].src}
              alt={companyLogos[currentLogo].alt}
              width={companyLogos[currentLogo].alt === 'Amazon' || companyLogos[currentLogo].alt === 'Infosys' ? 120 : 150}
              height={companyLogos[currentLogo].alt === 'Amazon' || companyLogos[currentLogo].alt === 'Infosys' ? 60 : 80}
              className={`object-contain ${companyLogos[currentLogo].alt === 'Amazon' || companyLogos[currentLogo].alt === 'Infosys' ? 'w-[120px] h-[60px]' : 'w-[150px] h-[80px]'}`}
              priority
            />
          </div>
          {/* Desktop: All logos in a row */}
          <div className="hidden sm:flex flex-wrap items-center justify-center gap-4 mb-0 overflow-x-auto">
            {companyLogos.map((logo) => {
              // Reduce size for Amazon and Infosys
              const isAmazon = logo.alt === 'Amazon';
              const isInfosys = logo.alt === 'Infosys';
              const width = isAmazon || isInfosys ? 120 : 150;
              const height = isAmazon || isInfosys ? 60 : 80;
              const sizeClass = isAmazon || isInfosys ? 'w-[120px] h-[60px]' : 'w-[150px] h-[80px]';
              return (
                <Image
                  key={logo.alt}
                  src={logo.src}
                  alt={logo.alt}
                  width={width}
                  height={height}
                  className={`object-contain ${sizeClass}`}
                  priority
                />
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
