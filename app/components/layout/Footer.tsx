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
      <div className=" flex flex-col justify-between sm:flex-row gap-6 sm:gap-8">
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
              <div className="flex space-x-4">
                {/* WhatsApp Icon */}
                <a 
                  href="https://wa.me/918839381619"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-green-500 transition-colors duration-200 group"
                  aria-label="WhatsApp"
                >
                  <svg className="w-6 h-6 sm:w-7 sm:h-7" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                  </svg>
                </a>
                
                {/* Instagram Icon */}
                <a 
                  href="https://www.instagram.com/datainyourself?igsh=MTBubW1mZDJ0ZmVrdw%3D%3D&utm_source=qr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-pink-500 transition-colors duration-200 group"
                  aria-label="Instagram"
                >
                  <svg className="w-6 h-6 sm:w-7 sm:h-7" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
              </div>
              
              
            </div>
          </div>

          
          <div>
            <h4 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-orange-400">Company</h4>
            <ul className="space-y-1 sm:space-y-2">
              <li><Link href="/about" className="text-gray-300 hover:text-white transition-colors duration-200 text-sm sm:text-base">About Us</Link></li>
              <li><a href="#contact" onClick={handleContactClick} className="text-gray-300 hover:text-white transition-colors duration-200 text-sm sm:text-base cursor-pointer">Contact Us</a></li>
              {/* <li><Link href="/career" className="text-gray-300 hover:text-white transition-colors duration-200 text-sm sm:text-base">Career</Link></li> */}
              <li><button onClick={() => router.push('/login')} className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600" suppressHydrationWarning>Login for admin</button></li>
              
            </ul>
          </div>

         

          {/* Column 5 - Contact */}
          <div>
            <h4 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-orange-400">Contact</h4>
            <ul className="space-y-1 sm:space-y-2">
              <li className="text-gray-300 text-sm sm:text-base"><a href="tel:9558092200">Phone: 9558092200,</a><a href="tel:8839381619"> 8839381619</a></li>
              <li className="text-gray-300 text-sm sm:text-base"><a href="mailto:info@datainyourself.com">Email: info@datainyourself.com</a></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Horizontal Line */}
      <hr className="border-gray-700" />

      {/* Section 2 - Copyright and Legal */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="flex flex-col sm:flex-row justify-between items-center space-y-3 sm:space-y-0">
          {/* Left - Copyright */}
          <div className="text-gray-400 text-xs sm:text-sm text-center sm:text-left">
            Copyright ©{new Date().getFullYear()} DATAINYOURSELF E-LEARNING PVT LTD. All rights Reserved
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