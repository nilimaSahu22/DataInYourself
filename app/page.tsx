"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import PlacementCourseCard from "./components/ui/PlacementCourseCard";
import VideoBackground from "./components/ui/VideoBackground";
import { coursesData } from "./data/courses";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredCourses, setFilteredCourses] = useState(coursesData);
  const [isClient, setIsClient] = useState(false);
  const [animationKey, setAnimationKey] = useState(0); // Add animation trigger key
  const pathname = usePathname();
  const [hasAnimated, setHasAnimated] = useState(false); // Track if animation has already played
  const [shouldTriggerAnimation, setShouldTriggerAnimation] = useState(false); // Explicit animation trigger
  const [hasNavigatedAway, setHasNavigatedAway] = useState(false); // Track navigation away
  
  // Contact form state
  const [contactForm, setContactForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    course: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');

  // Statistics animation state
  const [statsVisible, setStatsVisible] = useState(false);
  const [animatedStats, setAnimatedStats] = useState({
    studentsLearned: 0,
    certificatesIssued: 0,
    coursesProvided: 0,
    placements: 0
  });

  // Statistics data
  const finalStats = {
    studentsLearned: 5000,
    certificatesIssued: 4800,
    coursesProvided: 20,
    placements: 3200
  };

  // Handle hydration
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Statistics animation effect
  useEffect(() => {
    if (!isClient) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !statsVisible) {
            setStatsVisible(true);
            animateStats();
          }
        });
      },
      { threshold: 0.3 }
    );

    const statsSection = document.getElementById('stats-section');
    if (statsSection) {
      observer.observe(statsSection);
    }

    return () => {
      if (statsSection) {
        observer.unobserve(statsSection);
      }
    };
  }, [isClient, statsVisible]);

  // Animate statistics
  const animateStats = () => {
    const duration = 2000; // 2 seconds
    const steps = 60;
    const stepDuration = duration / steps;

    let currentStep = 0;
    const interval = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;

      setAnimatedStats({
        studentsLearned: Math.floor(finalStats.studentsLearned * progress),
        certificatesIssued: Math.floor(finalStats.certificatesIssued * progress),
        coursesProvided: Math.floor(finalStats.coursesProvided * progress),
        placements: Math.floor(finalStats.placements * progress)
      });

      if (currentStep >= steps) {
        clearInterval(interval);
        setAnimatedStats(finalStats);
      }
    }, stepDuration);
  };

  // Track navigation away from home page
  useEffect(() => {
    if (isClient && pathname !== '/') {
      setHasNavigatedAway(true);
      console.log('User navigated away from home page');
    }
  }, [isClient, pathname]);

  // Animation control - ONLY on first load or refresh
  useEffect(() => {
    if (!isClient || pathname !== '/') return;

    // Check if this is a page refresh or first visit
    const navigationEntry = performance.getEntriesByType('navigation')[0] as any;
    const isRefresh = (navigationEntry && navigationEntry.type === 'reload') ||
                     (performance.navigation && performance.navigation.type === 1);
    
    // Only trigger animation if it's a refresh AND user hasn't navigated away
    if (isRefresh && !hasNavigatedAway) {
      console.log('Triggering flip animation - page refresh detected');
      setShouldTriggerAnimation(true);
      setAnimationKey(0);
      const timer = setTimeout(() => {
        setAnimationKey(prev => prev + 1);
      }, 200);
      setHasAnimated(true);
      return () => clearTimeout(timer);
    } else {
      // Skip animation for navigation back
      console.log('Skipping animation - navigation back or not refresh');
      setShouldTriggerAnimation(false);
      setHasAnimated(true);
      setAnimationKey(0);
    }
  }, [isClient, pathname, hasNavigatedAway]);



  // Cleanup effect to reset animation state when component unmounts
  useEffect(() => {
    return () => {
      // Reset animation state when component unmounts
      setShouldTriggerAnimation(false);
      setHasAnimated(false);
      setAnimationKey(0);
    };
  }, []);

  // Additional safeguard: Reset animation state when navigating away
  useEffect(() => {
    if (isClient && pathname !== '/') {
      setShouldTriggerAnimation(false);
      setHasAnimated(false);
      setAnimationKey(0);
    }
  }, [isClient, pathname]);

  // Force disable animation when user has navigated away
  useEffect(() => {
    if (hasNavigatedAway) {
      setShouldTriggerAnimation(false);
      console.log('Animation disabled - user has navigated away');
    }
  }, [hasNavigatedAway]);

  // Hero text animation state
  const [heroTextVisible, setHeroTextVisible] = useState(false);
  const [heroTextAnimationKey, setHeroTextAnimationKey] = useState(0);

  // Hero text animation effect
  useEffect(() => {
    if (!isClient) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !heroTextVisible) {
            setHeroTextVisible(true);
            setHeroTextAnimationKey(prev => prev + 1);
          }
        });
      },
      { threshold: 0.1 }
    );

    const heroSection = document.getElementById('hero-section');
    if (heroSection) {
      observer.observe(heroSection);
    }

    return () => {
      if (heroSection) {
        observer.unobserve(heroSection);
      }
    };
  }, [isClient, heroTextVisible]);

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

  // Handle contact form input changes
  const handleContactInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setContactForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle contact form submission
  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    if (!contactForm.firstName || !contactForm.lastName || !contactForm.email || !contactForm.phone) {
      setSubmitError('Please fill in all required fields');
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(contactForm.email)) {
      setSubmitError('Please enter a valid email address');
      return;
    }

    // Basic phone validation (10 digits)
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(contactForm.phone)) {
      setSubmitError('Please enter a valid 10-digit phone number');
      return;
    }

    try {
      setIsSubmitting(true);
      setSubmitError('');

      const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL || "https://server.mukulsharma1602.workers.dev";
      const response = await fetch(`${serverUrl}/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(contactForm),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to submit form');
      }

      setSubmitSuccess(true);
      setContactForm({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        course: '',
        message: ''
      });

      // Reset success message after 5 seconds
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 5000);

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred while submitting the form';
      setSubmitError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Company logos data
  const companyLogos = [
    { src: '/icon_assets/accenture.png', alt: 'Accenture logo' },
    { src: '/icon_assets/amazon.png', alt: 'Amazon logo' },
    { src: '/icon_assets/Cognizant.png', alt: 'Cognizant logo' },
    { src: '/icon_assets/ericsson.png', alt: 'Ericsson logo' },
    { src: '/icon_assets/HCL.png', alt: 'HCL logo' },
    { src: '/icon_assets/infosys.png', alt: 'Infosys logo' },
    { src: '/icon_assets/meta.png', alt: 'Meta logo' },
    { src: '/icon_assets/microland.png', alt: 'Microland logo' },
    { src: '/icon_assets/microsoft-80658_1920.png', alt: 'Microsoft logo' },
    { src: '/icon_assets/tcs.png', alt: 'TCS logo' },
    { src: '/icon_assets/tech-mahindra.png', alt: 'Tech Mahindra logo' },
  ];

  // Carousel state for mobile - continuous scrolling
  const [scrollPosition, setScrollPosition] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setScrollPosition((prev) => {
        const logoWidth = 160; // 140px width + 20px gap
        const totalWidth = logoWidth * companyLogos.length;
        const newPosition = prev + 4; // Increased from 1 to 2 for faster scrolling
        // Reset to start when we've scrolled through all logos
        return newPosition >= totalWidth ? 0 : newPosition;
      });
    }, 50); // Reduced from 50ms to 30ms for faster animation
    return () => clearInterval(interval);
  }, [companyLogos.length]);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <VideoBackground
        desktopVideo="/media_assets/hero_laptop.MP4"
        mobileVideo="/media_assets/hero_mob.MP4"
        overlayOpacity={0.5}
        className="pt-20 sm:pt-24 md:pt-28 lg:pt-32 pb-4 sm:pb-6 md:pb-8 lg:pb-10 px-4 sm:px-6 md:px-8 lg:px-8 min-h-screen flex items-center justify-center"
      >
        <div id="hero-section" className="max-w-7xl mx-auto text-center w-full flex flex-col items-center justify-center relative">
          {/* Text shadow overlay for better visibility */}
          <div 
            className={`absolute inset-0 mx-auto w-full max-w-5xl h-48 sm:h-56 md:h-64 lg:h-72 rounded-3xl transform transition-all duration-1000 ease-out ${
              heroTextVisible 
                ? 'opacity-40 scale-100' 
                : 'opacity-0 scale-95'
            }`}
            style={{
              background: 'radial-gradient(ellipse at center, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0.2) 70%, transparent 100%)',
              animationDelay: '0.2s',
              filter: 'blur(2px)'
            }}
          />
          
          {/* Main heading with text animation and improved visibility */}
          <h1 
            className={`relative z-10 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 text-center transform transition-all duration-1000 ease-out drop-shadow-2xl ${
              heroTextVisible 
                ? 'translate-y-0 opacity-100 scale-100' 
                : 'translate-y-12 opacity-0 scale-95'
            }`}
            style={{ animationDelay: '0.4s' }}
          >
            <span 
              className={`inline-block text-white transform transition-all duration-700 ease-out ${
                heroTextVisible ? 'translate-x-0 opacity-100' : '-translate-x-8 opacity-0'
              }`}
              style={{ animationDelay: '0.6s' }}
            >
              Welcome to{' '}
            </span>
            <span 
              className={`relative inline-block bg-gradient-to-r from-orange-600 to-orange-500 bg-clip-text text-transparent transform transition-all duration-700 ease-out drop-shadow-lg ${
                heroTextVisible ? 'translate-x-0 opacity-100 scale-100' : 'translate-x-8 opacity-0 scale-95'
              }`}
              style={{ animationDelay: '0.8s' }}
            >
              DataInYourself
              {/* Animated underline effect */}
              <div 
                className={`absolute bottom-0 left-0 w-full bg-gradient-to-r transform transition-all duration-1500 ease-out ${
                  heroTextVisible ? 'scale-x-100' : 'scale-x-0'
                }`}
                style={{ 
                  animationDelay: '1.2s',
                  height: heroTextVisible ? '3px' : '1px',
                  background: heroTextVisible 
                    ? 'linear-gradient(to right, #fb923c, #fdba74)' 
                    : 'linear-gradient(to right, #ffffff, #ffffff)',
                  transition: 'all 1.5s ease-out, height 1.5s ease-out, background 1.5s ease-out'
                }}
              />
            </span>
          </h1>
          
          {/* Subtitle with staggered animation and improved visibility */}
          <p 
            className={`relative z-10 text-base sm:text-lg text-orange-300 font-semibold mb-3 sm:mb-4 text-center transform transition-all duration-700 ease-out drop-shadow-lg ${
              heroTextVisible 
                ? 'translate-y-0 opacity-100' 
                : 'translate-y-8 opacity-0'
            }`}
            style={{ animationDelay: '1.0s' }}
          >
            by Rudriva Technology
          </p>
          
          {/* Description with final animation and improved visibility */}
          <p 
            className={`relative z-10 text-lg sm:text-xl text-orange-200 mb-6 sm:mb-8 max-w-3xl mx-auto px-4 text-center transform transition-all duration-700 ease-out drop-shadow-lg font-medium ${
              heroTextVisible 
                ? 'translate-y-0 opacity-100' 
                : 'translate-y-8 opacity-0'
            }`}
            style={{ animationDelay: '1.2s' }}
          >
            India's number one computer training platform. Learn from industry experts and advance your career with our comprehensive courses.
          </p>
        </div>
      </VideoBackground>

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
            {filteredCourses.map((course, index) => (
              <PlacementCourseCard
                key={`${course.id}-${animationKey}`}
                id={course.id}
                iconSrc={course.iconSrc}
                iconAlt={course.iconAlt}
                title={course.title}
                duration={course.duration}
                index={index}
                animationKey={animationKey}
                shouldAnimate={shouldTriggerAnimation && !hasNavigatedAway}
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


      {/* Statistics Section */}
      <section id="stats-section" className="py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 md:px-8 lg:px-8 bg-gradient-to-br from-orange-600 to-orange-700">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-white mb-8 sm:mb-12 md:mb-16">
            Our Impact in Numbers
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 lg:gap-12">
            {/* Students Learned */}
            <div className="text-center">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <svg className="w-8 h-8 sm:w-10 sm:h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-2 sm:mb-3">
                {isClient ? animatedStats.studentsLearned.toLocaleString() : '0'}
              </div>
              <p className="text-sm sm:text-base text-orange-100 font-medium">Students Learned</p>
            </div>

            {/* Certificates Issued */}
            <div className="text-center">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <svg className="w-8 h-8 sm:w-10 sm:h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-2 sm:mb-3">
                {isClient ? animatedStats.certificatesIssued.toLocaleString() : '0'}
              </div>
              <p className="text-sm sm:text-base text-orange-100 font-medium">Certificates Issued</p>
            </div>

            {/* Courses Provided */}
            <div className="text-center">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <svg className="w-8 h-8 sm:w-10 sm:h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-2 sm:mb-3">
                {isClient ? animatedStats.coursesProvided : '0'}
              </div>
              <p className="text-sm sm:text-base text-orange-100 font-medium">Courses Provided</p>
            </div>

            {/* Placements */}
            <div className="text-center">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <svg className="w-8 h-8 sm:w-10 sm:h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-2 sm:mb-3">
                {isClient ? animatedStats.placements.toLocaleString() : '0'}
              </div>
              <p className="text-sm sm:text-base text-orange-100 font-medium">Successful Placements</p>
            </div>
          </div>
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

      {/* Company Logos Section */}
      <section className="bg-gradient-to-r from-orange-100 to-orange-200 py-6 sm:py-8 border-t border-b border-orange-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-orange-900 mb-6 sm:mb-8">
            Trusted Partners
          </h2>
          {/* Mobile: Continuous scrolling carousel */}
          <div className="flex justify-center items-center sm:hidden overflow-hidden" style={{ minHeight: 80 }}>
            <div 
              className="flex items-center gap-5 transition-transform duration-1000 ease-linear"
              style={{ 
                transform: `translateX(-${scrollPosition}px)`,
                width: `${companyLogos.length * 160}px` // 140px logo + 20px gap
              }}
            >
              {companyLogos.map((logo, index) => (
                <div key={`${logo.alt}-${index}`} className="relative h-20 w-[140px] flex items-center justify-center flex-shrink-0">
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
              {/* Duplicate logos for seamless loop */}
              {companyLogos.map((logo, index) => (
                <div key={`${logo.alt}-duplicate-${index}`} className="relative h-20 w-[140px] flex items-center justify-center flex-shrink-0">
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
                  sizes="180px"
                  className="object-contain"
                  priority
                />
              </div>
            ))}
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
              <div className="flex flex-col justify-between bg-gradient-to-br from-orange-50 to-white rounded-2xl shadow-lg border border-orange-200 p-6 sm:p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div>
                <div className="flex items-center mb-2 sm:mb-3">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <img src="/images/shubham-data-analyst.png" alt="Review of Our Course by Shubham, who is a data analyst" className="w-10 h-10 sm:w-12 sm:h-12 rounded-full" />
                  </div>
                  <div className="ml-3 sm:ml-4 min-w-0 flex-1">
                    <h4 className="text-sm sm:text-base font-semibold text-orange-900 truncate">Shubham</h4>
                    <p className="text-xs sm:text-sm text-orange-600 truncate">Data Analyst</p>
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
                  "DIY made learning data science simple and practical. The trainers were supportive, and the hands-on projects boosted my confidence. Grateful to Mukul Sharma sir and the entire team for this amazing journey"
                </p>
                </div>
                <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-orange-200">
                  <p className="text-xs sm:text-sm text-orange-600">
                    <span className="font-semibold">Course completed:</span> 2 months ago
                  </p>
                </div>
              </div>

              {/* Review 2 */}
              <div className="flex flex-col justify-between bg-gradient-to-br from-orange-50 to-white rounded-2xl shadow-lg border border-orange-200 p-6 sm:p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="">
                <div className="flex items-center mb-2 sm:mb-3">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <img src="/images/reema-data-analyst.png" alt="Review of Our Course by Reema, who is a data analyst" className="w-10 h-10 sm:w-12 sm:h-12 rounded-full" />
                  </div>
                  <div className="ml-3 sm:ml-4 min-w-0 flex-1">
                    <h4 className="text-sm sm:text-base font-semibold text-orange-900 truncate">Reema</h4>
                      <p className="text-xs sm:text-sm text-orange-600 truncate">Data Analyst</p>
                  </div>
                </div>
                <div className="flex items-center mt-1 mb-3 sm:mb-4">
                  <span className="text-sm sm:text-base font-semibold text-orange-900 mr-1 sm:mr-2">4.9</span>
                  <div className="flex space-x-0.5 sm:space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className={`w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0 ${i < 5 ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
                <p className="text-sm sm:text-base text-orange-700 leading-relaxed">
                  "Hello I'm Reema and working as a sr data analyst and enrolled my self at DIY for data science course for future growth. A great Introductory course by Data in your self to start your career in Data science"
                </p>
                </div>
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
                    <img src="/images/pallavi-data-analyst.png" alt="Review of Our Course by Pallavi, who is a data analyst" className="w-10 h-10 sm:w-12 sm:h-12 rounded-full" />
                  </div>
                  <div className="ml-3 sm:ml-4 min-w-0 flex-1">
                    <h4 className="text-sm sm:text-base font-semibold text-orange-900 truncate">Pallavi</h4>
                    <p className="text-xs sm:text-sm text-orange-600 truncate">Data Analyst</p>
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
                  "Joining Data In Yourself was the best decision I made for my career! The team was incredibly supportive, professional, and truly cared about my learning journey. Every concept was explained clearly, and the hands-on approach made a real difference.

Their commitment to quality and student success is unmatched.

Truly Outstanding!"
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
              <form onSubmit={handleContactSubmit} className="space-y-4 sm:space-y-6">
                {/* Success/Error Messages */}
                {submitSuccess && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <div className="flex">
                      <svg className="w-5 h-5 text-green-400 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <p className="ml-3 text-sm text-green-700">Thank you! Your message has been sent successfully. We'll get back to you soon.</p>
                    </div>
                  </div>
                )}

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

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-orange-900 mb-2">
                      First Name *
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={contactForm.firstName}
                      onChange={handleContactInputChange}
                      required
                      disabled={isSubmitting}
                      className="w-full px-4 py-3 border-2 border-orange-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-orange-500/20 focus:border-orange-500 transition-all duration-300 text-orange-900 placeholder-orange-400 disabled:bg-gray-50 disabled:cursor-not-allowed"
                      placeholder="Enter your first name"
                      suppressHydrationWarning
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-orange-900 mb-2">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={contactForm.lastName}
                      onChange={handleContactInputChange}
                      required
                      disabled={isSubmitting}
                      className="w-full px-4 py-3 border-2 border-orange-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-orange-500/20 focus:border-orange-500 transition-all duration-300 text-orange-900 placeholder-orange-400 disabled:bg-gray-50 disabled:cursor-not-allowed"
                      placeholder="Enter your last name"
                      suppressHydrationWarning
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-orange-900 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={contactForm.email}
                    onChange={handleContactInputChange}
                    required
                    disabled={isSubmitting}
                    className="w-full px-4 py-3 border-2 border-orange-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-orange-500/20 focus:border-orange-500 transition-all duration-300 text-orange-900 placeholder-orange-400 disabled:bg-gray-50 disabled:cursor-not-allowed"
                    placeholder="Enter your email address"
                    suppressHydrationWarning
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-orange-900 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={contactForm.phone}
                    onChange={handleContactInputChange}
                    required
                    disabled={isSubmitting}
                    maxLength={10}
                    className="w-full px-4 py-3 border-2 border-orange-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-orange-500/20 focus:border-orange-500 transition-all duration-300 text-orange-900 placeholder-orange-400 disabled:bg-gray-50 disabled:cursor-not-allowed"
                    placeholder="Enter 10-digit phone number"
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
                    value={contactForm.course}
                    onChange={handleContactInputChange}
                    disabled={isSubmitting}
                    className="w-full px-4 py-3 border-2 border-orange-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-orange-500/20 focus:border-orange-500 transition-all duration-300 text-gray-800 bg-white disabled:bg-gray-50 disabled:cursor-not-allowed"
                    suppressHydrationWarning
                  >
                    <option value="" className="text-gray-800">Select a course</option>
                    <option value="data-analyst" className="text-gray-800">Data Analyst</option>
                    <option value="business-analyst" className="text-gray-800">Business Analyst</option>
                    <option value="data-science" className="text-gray-800">Data Science</option>
                    <option value="sql-analyst" className="text-gray-800">SQL Analyst</option>
                    <option value="machine-learning" className="text-gray-800">Machine Learning</option>
                    <option value="python-beginners" className="text-gray-800">Python for Beginners</option>
                    <option value="power-bi-tableau" className="text-gray-800">Power BI / Tableau Mastery</option>
                    <option value="digital-marketing" className="text-gray-800">Digital Marketing</option>
                    <option value="placement-ready" className="text-gray-800">Placement Ready</option>
                    <option value="web-developer" className="text-gray-800">Web Developer</option>
                    <option value="cyber-security" className="text-gray-800">Cyber Security</option>
                    <option value="cloud-engineer" className="text-gray-800">Cloud Engineer</option>
                    <option value="prompt-engineer" className="text-gray-800">Prompt Engineer</option>
                    <option value="product-management" className="text-gray-800">Product Management</option>
                    <option value="finance-analyst" className="text-gray-800">Finance Analyst</option>
                    <option value="autocad" className="text-gray-800">AutoCAD AutoDesk</option>
                    <option value="revit" className="text-gray-800">Autodesk Revit</option>
                    <option value="staad-pro" className="text-gray-800">STAAD Pro</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-orange-900 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={contactForm.message}
                    onChange={handleContactInputChange}
                    rows={4}
                    disabled={isSubmitting}
                    className="w-full px-4 py-3 border-2 border-orange-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-orange-500/20 focus:border-orange-500 transition-all duration-300 text-orange-900 placeholder-orange-400 resize-none disabled:bg-gray-50 disabled:cursor-not-allowed"
                    placeholder="Tell us about your requirements..."
                    suppressHydrationWarning
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-3 sm:py-4 px-6 rounded-xl font-semibold hover:from-orange-600 hover:to-orange-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                  suppressHydrationWarning
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </>
                  ) : (
                    'Send Message'
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
