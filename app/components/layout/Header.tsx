'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useRef, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useContactNavigation } from '../../utils/contactNavigation';
import { useTestimonialNavigation } from '../../utils/testimonialNavigation';
import AdBanner from '../ui/AdBanner';
import { 
  MenuIcon, 
  CloseIcon, 
  HomeIcon, 
  UserGroupIcon, 
  PhotoIcon, 
  BuildingOfficeIcon, 
  ChatBubbleLeftRightIcon, 
  PhoneIcon,
  AcademicCapIcon
} from '../ui/Icons';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const handleContactClick = useContactNavigation();
  const handleTestimonialClick = useTestimonialNavigation();

  const navigationLinks = [
    { name: 'Home', href: '/', icon: HomeIcon },
    { name: 'About Us', href: '/about', icon: UserGroupIcon },
    { name: 'Gallery', href: '/gallery', icon: PhotoIcon },
    { name: 'Franchise', href: '/franchise', icon: BuildingOfficeIcon },
    { name: 'Testimonials', href: '#testimonials', icon: ChatBubbleLeftRightIcon },
    { name: 'Contact Us', href: '#contact', icon: PhoneIcon },
  ];

  // Function to check if a link is active
  const isActiveLink = (href: string) => {
    if (href === '/') {
      return pathname === '/';
    }
    if (href.startsWith('#')) {
      return false; // Hash links are never considered active in header
    }
    return pathname === href;
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  // Enhanced contact navigation function
  const handleContactNavigation = (e: React.MouseEvent<HTMLAnchorElement>) => {
    handleContactClick(e);
    closeMobileMenu();
  };

  return (
    <>
      <header 
        className="bg-gradient-to-r from-white via-orange-50 to-white shadow-lg border-b border-orange-100 mobile-header-enhanced mobile-header-gradient animate-gradient-shift"
        style={{
          background: 'linear-gradient(135deg, #ffffff 0%, #fef3c7 25%, #fed7aa 50%, #fef3c7 75%, #ffffff 100%)',
          width: '100%',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
        }}
      >
        <AdBanner />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-18">
            {/* Left Section - Hamburger Menu Button (Mobile Only) */}
            <div className="lg:hidden flex-shrink-0" style={{zIndex: 999999}}>
              <button
                onClick={toggleMobileMenu}
                className={`p-3 rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 hover:scale-105 mobile-touch-target ${
                  isMobileMenuOpen 
                    ? 'text-orange-600 bg-gradient-to-r from-orange-100 to-orange-200 shadow-lg animate-pulse-glow' 
                    : 'text-gray-700 hover:text-orange-500 hover:bg-orange-50'
                }`}
                aria-label="Toggle mobile menu"
                aria-expanded={isMobileMenuOpen}
                suppressHydrationWarning
              >
                <div className="w-6 h-6 sm:w-7 sm:h-7 flex flex-col justify-center items-center relative">
                  <span 
                    className={`block w-5 h-0.5 bg-current transition-all duration-300 ease-in-out rounded-full hamburger-line ${
                      isMobileMenuOpen ? 'rotate-45 translate-y-1.5' : '-translate-y-1'
                    }`}
                  ></span>
                  <span 
                    className={`block w-5 h-0.5 bg-current transition-all duration-300 ease-in-out rounded-full hamburger-line ${
                      isMobileMenuOpen ? 'opacity-0 scale-0' : 'opacity-100 scale-100'
                    }`}
                  ></span>
                  <span 
                    className={`block w-5 h-0.5 bg-current transition-all duration-300 ease-in-out rounded-full hamburger-line ${
                      isMobileMenuOpen ? '-rotate-45 -translate-y-1.5' : 'translate-y-1'
                    }`}
                  ></span>
                </div>
              </button>
            </div>

            {/* Center Section - Logo */}
            <div className="flex-shrink-0 flex-1 flex justify-center lg:justify-start">
              <Link 
                href="/" 
                className="flex items-center hover:opacity-80 transition-all duration-300 p-2 rounded-lg hover:bg-white/50 mobile-touch-target mobile-logo-enhanced"
                aria-label="DataInYourself - Home"
              >
                <Image
                  src="/icon_assets/diy.png"
                  alt="DataInYourself Logo"
                  width={500}
                  height={150}
                  className="h-12 sm:h-14 w-auto drop-shadow-sm"
                  priority
                />
              </Link>
            </div>

            {/* Right Section - Desktop Navigation & Mobile Courses Button */}
            <div className="flex items-center space-x-4">
              {/* Desktop Navigation */}
              <nav className="hidden lg:flex space-x-6 xl:space-x-8" aria-label="Main navigation">
                {navigationLinks.map((link) => {
                  const isActive = isActiveLink(link.href);
                  return (
                    <div key={link.name} className="relative">
                      {link.name === 'Contact Us' ? (
                        <a
                          href={link.href}
                          onClick={handleContactNavigation}
                          className={`px-3 xl:px-4 py-3 text-sm xl:text-base font-medium transition-all duration-300 relative group flex items-center cursor-pointer rounded-lg hover:bg-orange-100/50 ${
                            isActive 
                              ? 'text-orange-600 bg-orange-100/30' 
                              : 'text-gray-700 hover:text-orange-500'
                          }`}
                        >
                          {link.name}
                          <span className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r from-orange-400 to-orange-600 rounded-full transition-all duration-300 ${
                            isActive ? 'w-full' : 'w-0 group-hover:w-full'
                          }`}></span>
                        </a>
                      ) : link.name === 'Testimonials' ? (
                        <a
                          href={link.href}
                          onClick={handleTestimonialClick}
                          className={`px-3 xl:px-4 py-3 text-sm xl:text-base font-medium transition-all duration-300 relative group flex items-center cursor-pointer rounded-lg hover:bg-orange-100/50 ${
                            isActive 
                              ? 'text-orange-600 bg-orange-100/30' 
                              : 'text-gray-700 hover:text-orange-500'
                          }`}
                        >
                          {link.name}
                          <span className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r from-orange-400 to-orange-600 rounded-full transition-all duration-300 ${
                            isActive ? 'w-full' : 'w-0 group-hover:w-full'
                          }`}></span>
                        </a>
                      ) : (
                        <Link
                          href={link.href}
                          className={`px-3 xl:px-4 py-3 text-sm xl:text-base font-medium transition-all duration-300 relative group flex items-center rounded-lg hover:bg-orange-100/50 ${
                            isActive 
                              ? 'text-orange-600 bg-orange-100/30' 
                              : 'text-gray-700 hover:text-orange-500'
                          }`}
                        >
                          {link.name}
                          <span className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r from-orange-400 to-orange-600 rounded-full transition-all duration-300 ${
                            isActive ? 'w-full' : 'w-0 group-hover:w-full'
                          }`}></span>
                        </Link>
                      )}
                    </div>
                  );
                })}
              </nav>

              {/* Mobile Courses Button */}
              <div className="lg:hidden flex-shrink-0">
                <Link
                  href="#courses"
                  className="flex justify-center items-center px-3 py-2 text-sm font-medium text-orange-600 bg-orange-100/50 hover:bg-orange-100 rounded-lg transition-all duration-300 hover:scale-105 mobile-touch-target"
                >
                  <AcademicCapIcon size="sm" className="text-orange-500" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Enhanced Mobile Sidebar Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed bg-black/20 backdrop-blur-sm z-[999999] lg:hidden animate-fade-in"
          style={{
            top: 'calc(var(--ad-banner-height) + var(--header-height))',
            left: 0,
            right: 0,
            bottom: 0
          }}
          onClick={closeMobileMenu}
        ></div>
      )}

      {/* Enhanced Mobile Sidebar - Now slides from left */}
      <div 
        className={`fixed left-0 h-full w-72 sm:w-80 bg-gradient-to-b from-white via-orange-50 to-white shadow-2xl z-[9999999] transform transition-all duration-500 ease-out lg:hidden mobile-menu-enhanced ${
          isMobileMenuOpen ? 'translate-x-0 opacity-100 animate-slide-in-left' : '-translate-x-full opacity-0'
        }`}
        style={{
          top: 'calc(var(--ad-banner-height) + var(--header-height))'
        }}
      >
        <div className="flex flex-col h-full">
          {/* Enhanced Sidebar Header */}
          <div className="px-6 py-6 border-b border-orange-200 bg-gradient-to-r from-orange-100/50 to-orange-50/50 animate-slide-in-top">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-orange-400 to-orange-600 rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-lg">D</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-800">DataInYourself</h3>
                  <p className="text-sm text-gray-600">Your Learning Partner</p>
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Sidebar Navigation */}
          <nav className="flex-1 px-4 py-6" aria-label="Mobile navigation">
            <div className="space-y-3">
              {navigationLinks.map((link, index) => {
                const isActive = isActiveLink(link.href);
                const IconComponent = link.icon;
                return (
                  <div key={link.name} className="animate-fade-in mobile-menu-item" style={{ animationDelay: `${index * 100}ms` }}>
                    {link.name === 'Contact Us' ? (
                      <a
                        href={link.href}
                        onClick={handleContactNavigation}
                        className={`flex items-center px-4 py-4 text-sm font-medium rounded-xl transition-all duration-300 border-2 hover:shadow-lg cursor-pointer group mobile-touch-target ${
                          isActive
                            ? 'text-orange-600 bg-gradient-to-r from-orange-50 to-orange-100 border-orange-300 shadow-md'
                            : 'text-gray-700 hover:text-orange-500 hover:bg-gradient-to-r hover:from-orange-50 hover:to-orange-100 border-orange-100 hover:border-orange-300'
                        }`}
                      >
                        <IconComponent 
                          size="sm" 
                          className={`mr-3 transition-all duration-300 ${
                            isActive ? 'text-orange-500' : 'text-gray-500 group-hover:text-orange-500'
                          }`} 
                        />
                        {link.name}
                        <div className={`ml-auto w-2 h-2 rounded-full transition-all duration-300 ${
                          isActive ? 'bg-orange-500' : 'bg-transparent'
                        }`}></div>
                      </a>
                    ) : link.name === 'Testimonials' ? (
                      <a
                        href={link.href}
                        onClick={(e) => {
                          handleTestimonialClick(e);
                          closeMobileMenu();
                        }}
                        className={`flex items-center px-4 py-4 text-sm font-medium rounded-xl transition-all duration-300 border-2 hover:shadow-lg cursor-pointer group mobile-touch-target ${
                          isActive
                            ? 'text-orange-600 bg-gradient-to-r from-orange-50 to-orange-100 border-orange-300 shadow-md'
                            : 'text-gray-700 hover:text-orange-500 hover:bg-gradient-to-r hover:from-orange-50 hover:to-orange-100 border-orange-100 hover:border-orange-300'
                        }`}
                      >
                        <IconComponent 
                          size="sm" 
                          className={`mr-3 transition-all duration-300 ${
                            isActive ? 'text-orange-500' : 'text-gray-500 group-hover:text-orange-500'
                          }`} 
                        />
                        {link.name}
                        <div className={`ml-auto w-2 h-2 rounded-full transition-all duration-300 ${
                          isActive ? 'bg-orange-500' : 'bg-transparent'
                        }`}></div>
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        onClick={closeMobileMenu}
                        className={`flex items-center px-4 py-4 text-sm font-medium rounded-xl transition-all duration-300 border-2 hover:shadow-lg group mobile-touch-target ${
                          isActive
                            ? 'text-orange-600 bg-gradient-to-r from-orange-50 to-orange-100 border-orange-300 shadow-md'
                            : 'text-gray-700 hover:text-orange-500 hover:bg-gradient-to-r hover:from-orange-50 hover:to-orange-100 border-orange-100 hover:border-orange-300'
                        }`}
                      >
                        <IconComponent 
                          size="sm" 
                          className={`mr-3 transition-all duration-300 ${
                            isActive ? 'text-orange-500' : 'text-gray-500 group-hover:text-orange-500'
                          }`} 
                        />
                        {link.name}
                        <div className={`ml-auto w-2 h-2 rounded-full transition-all duration-300 ${
                          isActive ? 'bg-orange-500' : 'bg-transparent'
                        }`}></div>
                      </Link>
                    )}
                  </div>
                );
              })}
            </div>
          </nav>

          {/* Enhanced Sidebar Footer */}
          <div className="px-4 py-6 border-t border-orange-200 bg-gradient-to-r from-orange-50/50 to-orange-100/50">
            <div className="text-center">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse"></div>
                <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-2 h-2 bg-orange-600 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
              </div>
              <p className="text-sm text-gray-600 font-medium">DataInYourself</p>
              <p className="text-xs text-gray-500 mt-1">© {new Date().getFullYear()} All rights reserved</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
} 