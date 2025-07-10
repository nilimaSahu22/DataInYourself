'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useRef, useEffect } from 'react';
import { useContactNavigation } from '../../utils/contactNavigation';
import { useTestimonialNavigation } from '../../utils/testimonialNavigation';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const handleContactClick = useContactNavigation();
  const handleTestimonialClick = useTestimonialNavigation();

  const navigationLinks = [
    { name: 'Home', href: '/' },
    { name: 'About Us', href: '/about' },
    { name: 'Gallery', href: '/gallery' },
    { name: 'Franchise', href: '/franchise' },
    { name: 'Testimonials', href: '#testimonials' },
    { name: 'Contact Us', href: '#contact' },
  ];

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
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-12 sm:h-16">
            {/* Left Section - Logo */}
            <div className="flex-shrink-0">
              <Link 
                href="/" 
                className="flex items-center hover:opacity-80 transition-opacity duration-200 p-2"
                aria-label="DataInYourself - Home"
              >
                <Image
                  src="/icon_assets/logo.png"
                  alt="DataInYourself Logo"
                  width={500}
                  height={150}
                  className="h-8 sm:h-12 w-auto"
                  priority
                />
              </Link>
            </div>

            {/* Center Section - Navigation */}
            <nav className="hidden lg:flex space-x-6 xl:space-x-8" aria-label="Main navigation">
              {navigationLinks.map((link) => (
                <div key={link.name} className="relative">
                  {link.name === 'Contact Us' ? (
                    <a
                      href={link.href}
                      onClick={handleContactNavigation}
                      className="text-gray-700 hover:text-orange-500 px-3 xl:px-4 py-3 text-sm xl:text-base font-medium transition-colors duration-200 relative group flex items-center cursor-pointer"
                    >
                      {link.name}
                      <span className="absolute bottom-0 left-0 w-0 h-1 bg-orange-500 transition-all duration-200 group-hover:w-full"></span>
                    </a>
                  ) : link.name === 'Testimonials' ? (
                    <a
                      href={link.href}
                      onClick={handleTestimonialClick}
                      className="text-gray-700 hover:text-orange-500 px-3 xl:px-4 py-3 text-sm xl:text-base font-medium transition-colors duration-200 relative group flex items-center cursor-pointer"
                    >
                      {link.name}
                      <span className="absolute bottom-0 left-0 w-0 h-1 bg-orange-500 transition-all duration-200 group-hover:w-full"></span>
                    </a>
                  ) : (
                    <Link
                      href={link.href}
                      className="text-gray-700 hover:text-orange-500 px-3 xl:px-4 py-3 text-sm xl:text-base font-medium transition-colors duration-200 relative group flex items-center"
                    >
                      {link.name}
                      <span className="absolute bottom-0 left-0 w-0 h-1 bg-orange-500 transition-all duration-200 group-hover:w-full"></span>
                    </Link>
                  )}
                </div>
              ))}
            </nav>

            {/* Right Section - Hamburger Menu Button */}
            <div className="lg:hidden flex-shrink-0">
              <button
                onClick={toggleMobileMenu}
                className={`p-2 sm:p-3 rounded-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 ${
                  isMobileMenuOpen 
                    ? 'text-orange-600 bg-orange-50 hover:bg-orange-100' 
                    : 'text-gray-700 hover:text-orange-500'
                }`}
                aria-label="Toggle mobile menu"
                aria-expanded={isMobileMenuOpen}
                suppressHydrationWarning
              >
                <div className="w-6 h-6 sm:w-7 sm:h-7 flex flex-col justify-center items-center">
                  <span 
                    className={`block w-5 h-0.5 bg-current transition-all duration-300 ${
                      isMobileMenuOpen ? 'rotate-45 translate-y-1' : '-translate-y-1'
                    }`}
                  ></span>
                  <span 
                    className={`block w-5 h-0.5 bg-current transition-all duration-300 ${
                      isMobileMenuOpen ? 'opacity-0' : 'opacity-100'
                    }`}
                  ></span>
                  <span 
                    className={`block w-5 h-0.5 bg-current transition-all duration-300 ${
                      isMobileMenuOpen ? '-rotate-45 -translate-y-1' : 'translate-y-1'
                    }`}
                  ></span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Sidebar Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0  bg-opacity-30 z-40 lg:hidden"
          onClick={closeMobileMenu}
        ></div>
      )}

      {/* Mobile Sidebar */}
      <div 
        className={`fixed top-0 right-0 max-h-screen w-64 sm:w-72 bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out lg:hidden ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col">
          {/* Sidebar Header */}
          <div className="flex items-center justify-between py-3 px-4 border-b border-gray-200 bg-orange-50">
            <h2 className="text-base sm:text-lg font-semibold text-gray-800">Menu</h2>
            <button
              onClick={closeMobileMenu}
              className="text-orange-600 hover:text-orange-700 hover:bg-orange-100 p-2 rounded-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
              aria-label="Close mobile menu"
              suppressHydrationWarning
            >
              <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Sidebar Navigation */}
          <nav className="px-4 py-4" aria-label="Mobile navigation">
            <div className="space-y-2">
              {navigationLinks.map((link) => (
                <div key={link.name}>
                  {link.name === 'Contact Us' ? (
                    <a
                      href={link.href}
                      onClick={handleContactNavigation}
                      className="text-gray-700 hover:text-orange-500 hover:bg-orange-50 block px-3 py-3 text-sm font-medium rounded-md transition-all duration-200 border border-gray-100 hover:border-orange-200 hover:shadow-sm cursor-pointer"
                    >
                      {link.name}
                    </a>
                  ) : link.name === 'Testimonials' ? (
                    <a
                      href={link.href}
                      onClick={(e) => {
                        handleTestimonialClick(e);
                        closeMobileMenu();
                      }}
                      className="text-gray-700 hover:text-orange-500 hover:bg-orange-50 block px-3 py-3 text-sm font-medium rounded-md transition-all duration-200 border border-gray-100 hover:border-orange-200 hover:shadow-sm cursor-pointer"
                    >
                      {link.name}
                    </a>
                  ) : (
                    <Link
                      href={link.href}
                      onClick={closeMobileMenu}
                      className="text-gray-700 hover:text-orange-500 hover:bg-orange-50 block px-3 py-3 text-sm font-medium rounded-md transition-all duration-200 border border-gray-100 hover:border-orange-200 hover:shadow-sm"
                    >
                      {link.name}
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </nav>

          {/* Sidebar Footer */}
          <div className="py-3 px-4 border-t border-gray-200 bg-orange-50">
            <div className="text-center">
              <p className="text-sm text-gray-500">DataInYourself</p>
              <p className="text-xs text-gray-400 mt-1">© 2024 All rights reserved</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
} 