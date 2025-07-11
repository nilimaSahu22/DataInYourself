'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useContactNavigation } from '../../utils/contactNavigation';
import { useRouter } from 'next/navigation';


export default function Footer() {
  const handleContactClick = useContactNavigation();
  const router = useRouter();
  
  return (
    <footer className="bg-gray-900 text-white">
      {/* Section 1 - Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 sm:gap-8">
          {/* Column 1 - Company Info */}
          <div className="sm:col-span-2 md:col-span-1 lg:col-span-1">
            <div className="space-y-3 sm:space-y-4">
              {/* Row 1: Company Logo */}
              <div className="flex items-center p-2 sm:p-3 mb-2">
                <Image
                  src="/icon_assets/diy.png"
                  alt="DataInYourself Logo"
                  width={300}
                  height={100}
                  className="h-16 sm:h-20 w-auto"
                />
              </div>
              
              {/* Row 2: Tagline */}
              <p className="text-gray-300 text-sm sm:text-base">India's number one computer training</p>
              
              {/* Row 3: Social Media Icons */}
              <div className="flex space-x-3 sm:space-x-4">
                <Link 
                  href="#" 
                  className="text-gray-400 hover:text-orange-400 transition-colors duration-200"
                  aria-label="Facebook"
                >
                  <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </Link>
                <Link 
                  href="#" 
                  className="text-gray-400 hover:text-orange-400 transition-colors duration-200"
                  aria-label="Twitter"
                >
                  <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                </Link>
                <Link 
                  href="#" 
                  className="text-gray-400 hover:text-orange-400 transition-colors duration-200"
                  aria-label="Instagram"
                >
                  <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987 6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297C4.198 14.895 3.708 13.744 3.708 12.447s.49-2.448 1.418-3.323c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.928.875 1.418 2.026 1.418 3.323s-.49 2.448-1.418 3.244c-.875.807-2.026 1.297-3.323 1.297zm7.83-9.781c-.49 0-.928-.175-1.297-.49-.368-.315-.49-.753-.49-1.243 0-.49.122-.928.49-1.243.369-.315.807-.49 1.297-.49s.928.175 1.297.49c.368.315.49.753.49 1.243 0 .49-.122.928-.49 1.243-.369.315-.807.49-1.297.49z"/>
                  </svg>
                </Link>
                <Link 
                  href="#" 
                  className="text-gray-400 hover:text-orange-400 transition-colors duration-200"
                  aria-label="LinkedIn"
                >
                  <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </Link>
              </div>
              
              
            </div>
          </div>

          {/* Column 2 - Company */}
          <div>
            <h4 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-orange-400">Company</h4>
            <ul className="space-y-1 sm:space-y-2">
              <li><Link href="/about" className="text-gray-300 hover:text-white transition-colors duration-200 text-sm sm:text-base">About Us</Link></li>
              <li><a href="#contact" onClick={handleContactClick} className="text-gray-300 hover:text-white transition-colors duration-200 text-sm sm:text-base cursor-pointer">Contact Us</a></li>
              <li><Link href="/career" className="text-gray-300 hover:text-white transition-colors duration-200 text-sm sm:text-base">Career</Link></li>
                              <li><button onClick={() => router.push('/login')} className="ml-4 px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600" suppressHydrationWarning>Login for admin</button></li>
            </ul>
          </div>

          {/* Column 3 - Work With Us */}
          <div>
            <h4 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-orange-400">Work With Us</h4>
            <ul className="space-y-1 sm:space-y-2">
              <li><Link href="/become-instructor" className="text-gray-300 hover:text-white transition-colors duration-200 text-sm sm:text-base">Become Instructor</Link></li>
              <li><Link href="/blog-guest" className="text-gray-300 hover:text-white transition-colors duration-200 text-sm sm:text-base">Blog as Guest</Link></li>
              <li><Link href="/hire" className="text-gray-300 hover:text-white transition-colors duration-200 text-sm sm:text-base">Hire from DataInYourself</Link></li>
            </ul>
          </div>

          {/* Column 4 - For Business */}
          <div>
            <h4 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-orange-400">For Business</h4>
            <ul className="space-y-1 sm:space-y-2">
              <li><Link href="/corporate-training" className="text-gray-300 hover:text-white transition-colors duration-200 text-sm sm:text-base">Corporate Training</Link></li>
              <li><Link href="/reviews" className="text-gray-300 hover:text-white transition-colors duration-200 text-sm sm:text-base">Reviews</Link></li>
              <li><Link href="/partners" className="text-gray-300 hover:text-white transition-colors duration-200 text-sm sm:text-base">Partners</Link></li>
              <li><Link href="/colleges" className="text-gray-300 hover:text-white transition-colors duration-200 text-sm sm:text-base">Colleges</Link></li>
              <li><Link href="/schools" className="text-gray-300 hover:text-white transition-colors duration-200 text-sm sm:text-base">Schools</Link></li>
            </ul>
          </div>

          {/* Column 5 - Contact */}
          <div>
            <h4 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-orange-400">Contact</h4>
            <ul className="space-y-1 sm:space-y-2">
              <li className="text-gray-300 text-sm sm:text-base">Toll Free: 9558092200, 8839381619</li>
              <li className="text-gray-300 text-sm sm:text-base">Email: mukulsharma1602@gmail.com</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Horizontal Line */}
      <hr className="border-gray-700" />

      {/* Section 2 - Copyright and Legal */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        <div className="flex flex-col sm:flex-row justify-between items-center space-y-3 sm:space-y-0">
          {/* Left - Copyright */}
          <div className="text-gray-400 text-xs sm:text-sm text-center sm:text-left">
            Copyright ©2024 DATAINYOURSELF E-LEARNING (OPC) PVT LTD. All rights Reserved
          </div>
          
          {/* Right - Legal Links */}
          <div className="flex space-x-4 sm:space-x-6">
            <Link 
              href="/terms" 
              className="text-gray-400 hover:text-white transition-colors duration-200 text-xs sm:text-sm"
            >
              Terms and Conditions
            </Link>
            <Link 
              href="/privacy" 
              className="text-gray-400 hover:text-white transition-colors duration-200 text-xs sm:text-sm"
            >
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
} 