'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useRef, useEffect } from 'react';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileOpenDropdown, setMobileOpenDropdown] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const navigationLinks = [
    { name: 'Home', href: '/' },
    { 
      name: 'About Us', 
      href: '/about',
      submenu: [
        { name: 'About Datainyourself', href: '/about/datainyourself' },
        { name: 'Direct Message', href: '/about/contact' }
      ]
    },
    { 
      name: 'Courses', 
      href: '/courses',
      submenu: [
        { name: 'Placement Courses', href: '/courses/placement' },
        { name: 'Certification Courses', href: '/courses/certification' },
        { name: 'Trending Courses', href: '/courses/trending' }
      ]
    },
    { name: 'Student Zone', href: '/student-zone' },
    { 
      name: 'Franchise', 
      href: '/franchise',
      submenu: [
        { name: 'Get Franchise', href: '/franchise/get-franchise' }
      ]
    },
    { 
      name: 'Gallery', 
      href: '/gallery',
      submenu: [
        { name: 'Photo', href: '/gallery/photo' },
        { name: 'Videos', href: '/gallery/videos' }
      ]
    },
    { name: 'Contact Us', href: '/contact' },
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    // Close mobile dropdowns when closing mobile menu
    if (isMobileMenuOpen) {
      setMobileOpenDropdown(null);
    }
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    setMobileOpenDropdown(null);
  };

  const toggleDropdown = (menuName: string) => {
    setOpenDropdown(openDropdown === menuName ? null : menuName);
  };

  const toggleMobileDropdown = (menuName: string) => {
    setMobileOpenDropdown(mobileOpenDropdown === menuName ? null : menuName);
  };

  const closeDropdown = () => {
    setOpenDropdown(null);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        closeDropdown();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <>
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-24">
            {/* Left Section - Logo */}
            <div className="flex-shrink-0">
              <Link 
                href="/" 
                className="flex items-center hover:opacity-80 transition-opacity duration-200 p-2"
                aria-label="DataInYourself - Home"
              >
                <Image
                  src="/logo.png"
                  alt="DataInYourself Logo"
                  width={500}
                  height={150}
                  className="h-20 w-auto"
                  priority
                />
              </Link>
            </div>

            {/* Center Section - Navigation */}
            <nav className="hidden md:flex space-x-10" aria-label="Main navigation" ref={dropdownRef}>
              {navigationLinks.map((link) => (
                <div key={link.name} className="relative">
                  {link.submenu ? (
                    // Dropdown menu item
                    <div className="relative">
                      <button
                        onClick={() => toggleDropdown(link.name)}
                        onMouseEnter={() => setOpenDropdown(link.name)}
                        className="text-gray-700 hover:text-orange-500 px-4 py-3 text-base font-medium transition-colors duration-200 relative group flex items-center"
                      >
                        {link.name}
                        <svg 
                          className={`ml-1 w-4 h-4 transition-transform duration-200 ${openDropdown === link.name ? 'rotate-180' : ''}`}
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                        <span className="absolute bottom-0 left-0 w-0 h-1 bg-orange-500 transition-all duration-200 group-hover:w-full"></span>
                      </button>
                      
                      {/* Dropdown Menu */}
                      <div 
                        className={`absolute top-full left-0 mt-1 w-48 bg-white rounded-md shadow-lg border border-gray-200 transition-all duration-200 ${
                          openDropdown === link.name 
                            ? 'opacity-100 visible translate-y-0' 
                            : 'opacity-0 invisible -translate-y-2'
                        }`}
                        onMouseLeave={() => closeDropdown()}
                      >
                        <div className="py-2">
                          {link.submenu.map((subItem) => (
                            <Link
                              key={subItem.name}
                              href={subItem.href}
                              className="block px-4 py-2 text-sm text-gray-700 hover:text-orange-500 hover:bg-orange-50 transition-colors duration-200"
                              onClick={closeDropdown}
                            >
                              {subItem.name}
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  ) : (
                    // Regular menu item
                    <Link
                      href={link.href}
                      className="text-gray-700 hover:text-orange-500 px-4 py-3 text-base font-medium transition-colors duration-200 relative group flex items-center"
                    >
                      {link.name}
                      <span className="absolute bottom-0 left-0 w-0 h-1 bg-orange-500 transition-all duration-200 group-hover:w-full"></span>
                    </Link>
                  )}
                </div>
              ))}
            </nav>

            {/* Right Section - Hamburger Menu Button */}
            <div className="md:hidden flex-shrink-0">
              <button
                onClick={toggleMobileMenu}
                className="text-gray-700 hover:text-orange-500 p-3 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
                aria-label="Toggle mobile menu"
                aria-expanded={isMobileMenuOpen}
              >
                <div className="w-7 h-7 flex flex-col justify-center items-center">
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
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={closeMobileMenu}
        ></div>
      )}

      {/* Mobile Sidebar */}
      <div 
        className={`fixed top-0 right-0 h-full w-64 bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out md:hidden ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Sidebar Header */}
          <div className="flex items-center justify-between py-2 px-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800">Menu</h2>
            <button
              onClick={closeMobileMenu}
              className="text-gray-500 hover:text-gray-700 p-2 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
              aria-label="Close mobile menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Sidebar Navigation */}
          <nav className="flex-1 px-4 py-2 overflow-y-auto" aria-label="Mobile navigation">
            {navigationLinks.map((link) => (
              <div key={link.name} className="mb-1">
                {link.submenu ? (
                  // Mobile dropdown menu item
                  <div className="border border-gray-100 rounded-lg overflow-hidden">
                    <button
                      onClick={() => toggleMobileDropdown(link.name)}
                      className="w-full text-left text-gray-700 hover:text-orange-500 hover:bg-orange-50 px-4 py-3 text-base font-medium transition-all duration-200 flex items-center justify-between bg-gray-50"
                      aria-expanded={mobileOpenDropdown === link.name}
                    >
                      {link.name}
                      <svg 
                        className={`w-4 h-4 transition-transform duration-200 ${mobileOpenDropdown === link.name ? 'rotate-180' : ''}`}
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    
                    {/* Mobile Submenu */}
                    <div className={`overflow-hidden transition-all duration-300 ease-in-out ${
                      mobileOpenDropdown === link.name ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                    }`}>
                      <div className="bg-white border-t border-gray-100">
                        {link.submenu.map((subItem) => (
                          <Link
                            key={subItem.name}
                            href={subItem.href}
                            onClick={closeMobileMenu}
                            className="block px-6 py-3 text-sm text-gray-600 hover:text-orange-500 hover:bg-orange-50 transition-all duration-200 border-b border-gray-50 last:border-b-0"
                          >
                            {subItem.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  // Regular mobile menu item
                  <Link
                    href={link.href}
                    onClick={closeMobileMenu}
                    className="text-gray-700 hover:text-orange-500 hover:bg-orange-50 block px-4 py-3 text-base font-medium rounded-md transition-all duration-200 border border-gray-100"
                  >
                    {link.name}
                  </Link>
                )}
              </div>
            ))}
          </nav>

          {/* Sidebar Footer */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex justify-center p-3">
              <Image
                src="/logo.png"
                alt="DataInYourself Logo"
                width={180}
                height={40}
                className="h-16 w-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
} 