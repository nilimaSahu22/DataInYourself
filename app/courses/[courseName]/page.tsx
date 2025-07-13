"use client";
export const runtime = 'edge';
import { useParams } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { coursesData } from "../../data/courses";
import { findCourseBySlug } from "../../utils/courseUtils";
import { BriefcaseIcon, CheckIcon, ExclamationIcon, SpinnerIcon, ChevronLeftIcon, DownloadIcon } from "../../components/ui/Icons";

// Utility function to detect mobile devices with improved detection
const isMobileDevice = () => {
  if (typeof window === 'undefined') return false;
  
  // Check for touch capability (more reliable than user agent)
  const hasTouchScreen = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  
  // Check screen size
  const isSmallScreen = window.innerWidth <= 768;
  
  // Check user agent as fallback
  const isMobileUserAgent = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  
  // Check if it's iOS Safari (which has specific download behavior)
  const isIOSSafari = /iPad|iPhone|iPod/.test(navigator.userAgent) && /Safari/.test(navigator.userAgent) && !/CriOS|FxiOS|OPiOS|mercury/.test(navigator.userAgent);
  
  return hasTouchScreen && (isSmallScreen || isMobileUserAgent || isIOSSafari);
};

  // Enhanced download function with progress tracking and multiple fallback methods
  const downloadPDF = async (
    pdfSrc: string, 
    fileName: string,
    onProgress?: (progress: number) => void
  ): Promise<{ success: boolean; message: string; method: string }> => {
    try {
      // Method 1: Standard fetch with progress tracking
      const downloadWithProgress = async (): Promise<{ success: boolean; message: string; method: string }> => {
        try {
          const response = await fetch(pdfSrc);
          if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
          }
          
          const contentLength = response.headers.get('content-length');
          const total = contentLength ? parseInt(contentLength, 10) : 0;
          let loaded = 0;
          
          const reader = response.body?.getReader();
          if (!reader) {
            throw new Error('Response body not readable');
          }
          
          const chunks: Uint8Array[] = [];
          
          while (true) {
            const { done, value } = await reader.read();
            
            if (done) break;
            
            chunks.push(value);
            loaded += value.length;
            
            if (total > 0 && onProgress) {
              const progress = Math.round((loaded / total) * 100);
              onProgress(progress);
            }
          }
          
          const blob = new Blob(chunks, { type: 'application/pdf' });
          const url = URL.createObjectURL(blob);
          
          // Create download link and trigger download
          const link = document.createElement('a');
          link.href = url;
          link.download = fileName;
          link.style.display = 'none';
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          
          // Clean up the blob URL
          setTimeout(() => URL.revokeObjectURL(url), 100);
          
          return { success: true, message: 'Download completed successfully', method: 'Direct Download' };
        } catch (error) {
          throw error;
        }
      };

    // Method 2: Direct link for mobile devices
    const downloadForMobile = async (): Promise<{ success: boolean; message: string; method: string }> => {
      const isIOSSafari = /iPad|iPhone|iPod/.test(navigator.userAgent) && /Safari/.test(navigator.userAgent) && !/CriOS|FxiOS|OPiOS|mercury/.test(navigator.userAgent);
      
      if (isIOSSafari) {
        const link = document.createElement('a');
        link.href = pdfSrc;
        link.download = fileName;
        link.target = '_blank';
        link.style.display = 'none';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        return { success: true, message: 'Download initiated for iOS device', method: 'iOS Safari Download' };
      } else {
        const newWindow = window.open(pdfSrc, '_blank');
        if (newWindow) {
          return { success: true, message: 'PDF opened in new tab for mobile device', method: 'Mobile Tab Open' };
        } else {
          const link = document.createElement('a');
          link.href = pdfSrc;
          link.target = '_blank';
          link.rel = 'noopener noreferrer';
          link.style.display = 'none';
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          return { success: true, message: 'PDF opened in new tab for mobile device', method: 'Mobile Link Click' };
        }
      }
    };

    // Method 3: Simple window.open fallback
    const downloadWithWindowOpen = async (): Promise<{ success: boolean; message: string; method: string }> => {
      try {
        window.open(pdfSrc, '_blank');
        return { success: true, message: 'PDF opened in new tab', method: 'Window Open' };
      } catch (error) {
        throw new Error('Window open failed');
      }
    };

    // Try methods in order of preference
    if (isMobileDevice()) {
      try {
        return await downloadForMobile();
      } catch (error) {
        console.warn('Mobile download failed, trying window.open:', error);
        return await downloadWithWindowOpen();
      }
    } else {
      try {
        return await downloadWithProgress();
      } catch (error) {
        console.warn('Standard download failed, trying window.open:', error);
        return await downloadWithWindowOpen();
      }
    }
    
  } catch (error) {
    console.error('All download methods failed:', error);
    
    // Provide specific error messages based on error type
    if (error instanceof Error) {
      if (error.message.includes('HTTP 404')) {
        return { success: false, message: 'PDF file not found. Please contact support.', method: 'Failed' };
      } else if (error.message.includes('HTTP 403')) {
        return { success: false, message: 'Access denied to PDF file. Please contact support.', method: 'Failed' };
      } else if (error.message.includes('HTTP 500')) {
        return { success: false, message: 'Server error. Please try again later.', method: 'Failed' };
      } else if (error.message.includes('NetworkError') || error.message.includes('fetch')) {
        return { success: false, message: 'Network error. Please check your internet connection and try again.', method: 'Failed' };
      } else if (error.message.includes('CORS')) {
        return { success: false, message: 'Cross-origin error. Please try the alternative download method.', method: 'Failed' };
      }
    }
    
    return { success: false, message: 'Download failed. Please try the alternative method or contact support.', method: 'Failed' };
  }
};

export default function CourseDetail() {
  const params = useParams();
  const [course, setCourse] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmissionModalOpen, setIsAdmissionModalOpen] = useState(false);
  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  });
  const [downloadFormData, setDownloadFormData] = useState({
    name: '',
    email: '',
    phone: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [isDownloadSubmitting, setIsDownloadSubmitting] = useState(false);
  const [downloadError, setDownloadError] = useState('');
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [downloadMethod, setDownloadMethod] = useState('');
  const [showAlternativeDownload, setShowAlternativeDownload] = useState(false);
  
  // Validation states for enrollment form
  const [validationErrors, setValidationErrors] = useState({
    name: '',
    email: '',
    phone: ''
  });
  
  // Validation states for download form
  const [downloadValidationErrors, setDownloadValidationErrors] = useState({
    name: '',
    email: '',
    phone: ''
  });

  // Email validation function
  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Phone validation function
  const isValidPhone = (phone: string) => {
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(phone);
  };

  const validateField = (name: string, value: string) => {
    let error = '';
    
    switch (name) {
      case 'name':
        if (!value.trim()) {
          error = 'Name is required';
        } else if (value.trim().length < 2) {
          error = 'Name must be at least 2 characters';
        }
        break;
      case 'email':
        if (!value.trim()) {
          error = 'Email is required';
        } else if (!isValidEmail(value)) {
          error = 'Please enter a valid email address';
        }
        break;
      case 'phone':
        if (!value.trim()) {
          error = 'Phone number is required';
        } else if (!isValidPhone(value)) {
          error = 'Please enter a valid phone number';
        }
        break;
    }
    
    return error;
  };

  useEffect(() => {
    const courseSlug = decodeURIComponent(params.courseName as string);
    
    const foundCourse = findCourseBySlug(courseSlug, coursesData);
    
    if (!foundCourse) {
      coursesData.forEach(c => {
        const slug = c.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
      });
    }
    
    setCourse(foundCourse);
    setLoading(false);
  }, [params.courseName]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear validation error when user starts typing
    if (validationErrors[name as keyof typeof validationErrors]) {
      setValidationErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleDownloadInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDownloadFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear validation error when user starts typing
    if (downloadValidationErrors[name as keyof typeof downloadValidationErrors]) {
      setDownloadValidationErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  // Enhanced admission submit with better error handling
  const handleAdmissionSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate all fields
    const nameError = validateField('name', formData.name);
    const emailError = validateField('email', formData.email);
    const phoneError = validateField('phone', formData.phone);
    
    setValidationErrors({
      name: nameError,
      email: emailError,
      phone: phoneError
    });
    
    // Check if there are any validation errors
    if (nameError || emailError || phoneError) {
      return;
    }
    
    setIsSubmitting(true);
    setSubmitError('');
    setSubmitSuccess(false);

    try {
      const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL || "https://server.mukulsharma1602.workers.dev";
      const enquiryData = {
        name: formData.name,
        phoneNumber: formData.phone,
        emailId: formData.email,
        subject: course.title,
        dateTime: new Date().toISOString()
      };
      const response = await fetch(`${serverUrl}/enquiry`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(enquiryData),
      });
      const result = await response.json();
      if (response.ok) {
        setSubmitSuccess(true);
        setFormData({ name: '', email: '', phone: '' });
        setValidationErrors({ name: '', email: '', phone: '' });
        setTimeout(() => {
          setIsAdmissionModalOpen(false);
          setSubmitSuccess(false);
        }, 2000);
      } else {
        // Enhanced error handling
        if (response.status === 400) {
          setSubmitError('Invalid data provided. Please check your information and try again.');
        } else if (response.status === 429) {
          setSubmitError('Too many requests. Please wait a moment and try again.');
        } else if (response.status >= 500) {
          setSubmitError('Server error. Please try again later or contact support.');
        } else {
          setSubmitError(result.error || 'Failed to submit enrollment. Please try again.');
        }
      }
    } catch (error) {
      console.error('Enrollment submission error:', error);
      if (error instanceof TypeError && error.message.includes('fetch')) {
        setSubmitError('Network error. Please check your internet connection and try again.');
      } else {
        setSubmitError('An unexpected error occurred. Please try again or contact support.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // Enhanced download submit with faster trigger and better error handling
  const handleDownloadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate all fields
    const nameError = validateField('name', downloadFormData.name);
    const emailError = validateField('email', downloadFormData.email);
    const phoneError = validateField('phone', downloadFormData.phone);
    
    setDownloadValidationErrors({
      name: nameError,
      email: emailError,
      phone: phoneError
    });
    
    // Check if there are any validation errors
    if (nameError || emailError || phoneError) {
      return;
    }
    
    setIsDownloadSubmitting(true);
    setDownloadError('');
    setDownloadSuccess(false);
    setDownloadProgress(0);
    setDownloadMethod('');
    setShowAlternativeDownload(false);

    try {
      // IMPROVEMENT 1: Trigger download immediately after validation
      if (course?.pdfSrc) {
        setIsDownloading(true);
        console.log('Starting download for:', course.pdfSrc);
        
        const downloadResult = await downloadPDF(
          course.pdfSrc, 
          `${course.title} Syllabus.pdf`,
          (progress) => setDownloadProgress(progress)
        );
        
        setDownloadMethod(downloadResult.method);
        console.log('Download result:', downloadResult);
        
        if (downloadResult.success) {
          setDownloadSuccess(true);
          setDownloadError('');
        } else {
          setDownloadError(downloadResult.message);
          setShowAlternativeDownload(true);
        }
      } else {
        setDownloadError('Syllabus PDF not available for this course.');
        setShowAlternativeDownload(true);
      }
      
      // Send form data to backend (non-blocking)
      const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL || "https://server.mukulsharma1602.workers.dev";
      const enquiryData = {
        name: downloadFormData.name,
        phoneNumber: downloadFormData.phone,
        emailId: downloadFormData.email,
        subject: `${course.title} - Syllabus Download`,
        dateTime: new Date().toISOString()
      };

      // Fire and forget - don't block the UI
      fetch(`${serverUrl}/enquiry`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(enquiryData),
      }).catch(error => {
        console.error('Background form submission failed:', error);
        // Don't show error to user since download already worked
      });

      // Clear form data
      setDownloadFormData({ name: '', email: '', phone: '' });
      setDownloadValidationErrors({ name: '', email: '', phone: '' });
      
      // Close modal after delay
      const delay = isMobileDevice() ? 5000 : 3000;
      setTimeout(() => {
        setIsDownloadModalOpen(false);
        setDownloadSuccess(false);
        setDownloadProgress(0);
        setDownloadMethod('');
        setShowAlternativeDownload(false);
      }, delay);
      
    } catch (error) {
      console.error('Download error in handleDownloadSubmit:', error);
      setDownloadError('An unexpected error occurred. Please try the alternative method.');
      setShowAlternativeDownload(true);
    } finally {
      setIsDownloadSubmitting(false);
      setIsDownloading(false);
    }
  };

  // Alternative download method
  const handleAlternativeDownload = async () => {
    if (!course?.pdfSrc) return;
    
    setDownloadError('');
    setDownloadProgress(0);
    
    try {
      const downloadResult = await downloadPDF(
        course.pdfSrc, 
        `${course.title} Syllabus.pdf`,
        (progress) => setDownloadProgress(progress)
      );
      
      if (downloadResult.success) {
        setDownloadSuccess(true);
        setDownloadMethod(downloadResult.method);
      } else {
        setDownloadError(downloadResult.message);
      }
    } catch (error) {
      setDownloadError('Alternative download method also failed. Please contact support.');
    }
  };

  const handleEnrollClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsAdmissionModalOpen(true);
  };

  const handleDownloadClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsDownloadModalOpen(true);
  };

  // Load course data on component mount
  useEffect(() => {
    const loadCourse = async () => {
      try {
        const courseSlug = params.courseName as string;
        const foundCourse = findCourseBySlug(courseSlug, coursesData);
        
        if (foundCourse) {
          setCourse(foundCourse);
        } else {
          console.error('Course not found:', courseSlug);
        }
      } catch (error) {
        console.error('Error loading course:', error);
      } finally {
        setLoading(false);
      }
    };

    if (params.courseName) {
      loadCourse();
    }
  }, [params.courseName]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p className="text-orange-700">Loading course details...</p>
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-orange-900 mb-4">Course Not Found</h1>
          <p className="text-orange-700 mb-6">The course you're looking for doesn't exist.</p>
          <Link 
            href="/"
            className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-orange-600 hover:to-orange-700 transition-all duration-300"
          >
            Back to Courses
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-white">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-orange-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link 
            href="/"
            className="inline-flex items-center text-orange-600 hover:text-orange-700 transition-colors duration-200"
          >
            <ChevronLeftIcon size="md" color="currentColor" className="mr-2" />
            Back to Courses
          </Link>
        </div>
      </div>

      {/* Course Hero Section */}
      <section className="py-8 sm:py-12 lg:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 lg:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
              {/* Course Info */}
              <div className="lg:col-span-2">
                <div className="mb-6">
                  <h1 className="text-3xl sm:text-4xl font-bold text-orange-900 mb-2">{course.title}</h1>
                  <p className="text-orange-600 font-medium">{course.level}</p>
                </div>
                
                <p className="text-lg text-orange-700 mb-6 leading-relaxed">
                  {course.description}
                </p>

                {/* Course Stats */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                  <div className="text-center p-4 bg-orange-50 rounded-xl">
                    <div className="text-2xl font-bold text-orange-600">{course.duration}</div>
                    <div className="text-sm text-orange-700">Duration</div>
                  </div>
                  <div className="text-center p-4 bg-orange-50 rounded-xl">
                    {course.pdfSrc ? (
                      <button 
                        onClick={handleDownloadClick}
                        className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-3 px-6 rounded-xl font-semibold hover:from-orange-600 hover:to-orange-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 inline-block text-center"
                      >
                        Download Syllabus
                      </button>
                    ) : (
                      <button className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-3 px-6 rounded-xl font-semibold hover:from-orange-600 hover:to-orange-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105">
                        Download Syllabus
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Course Card */}
              <div className="lg:col-span-1">
                <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl p-6 text-white">
                  <h3 className="text-xl font-bold mb-4">Course Details</h3>
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between">
                      <span>Duration:</span>
                      <span className="font-semibold">{course.duration}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Level:</span>
                      <span className="font-semibold">{course.level}</span>
                    </div>
                  </div>
                  <button 
                    onClick={handleEnrollClick}
                    className="w-full bg-white text-orange-600 py-3 px-6 rounded-xl font-semibold hover:bg-orange-50 transition-all duration-300"
                  >
                    Request Info
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Career Outcomes */}
      <section className="py-8 sm:py-12 lg:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
            <h2 className="text-2xl font-bold text-orange-900 mb-6 text-center">Career Outcomes</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {course.careerOutcomes.map((career: string, index: number) => (
                <div key={index} className="text-center p-4 bg-orange-50 rounded-xl">
                  <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-3">
                    <BriefcaseIcon size="lg" color="white" />
                  </div>
                  <h3 className="font-semibold text-orange-900">{career}</h3>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-8 sm:py-12 lg:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl p-6 sm:p-8 text-white text-center">
            <h2 className="text-2xl font-bold mb-4">Ready to Start Your Journey?</h2>
            <p className="text-lg mb-6 opacity-90">
              Contact us today to get started with the {course.title} course and take the first step towards your career goals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="tel:+919558092200"
                className="bg-white text-orange-600 px-6 py-3 rounded-xl font-semibold hover:bg-orange-50 transition-all duration-300"
              >
                Call +91 9558092200
              </a>
              <a 
                href="mailto:mukulsharma1602@gmail.com"
                className="bg-white text-orange-600 px-6 py-3 rounded-xl font-semibold hover:bg-orange-50 transition-all duration-300"
              >
                Send Email
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Admission Form Modal */}
      {isAdmissionModalOpen && (
        <div className="fixed text-black inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900">Know more about {course.title} course</h3>
              <button 
                onClick={() => setIsAdmissionModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 text-2xl font-bold"
              >
                ×
              </button>
            </div>
            
            {submitSuccess ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckIcon size="xl" color="rgb(22 163 74)" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Enrollment Submitted!</h3>
                <p className="text-gray-600">Thank you for your interest in the {course.title} course! We will contact you soon to discuss your admission.</p>
              </div>
            ) : (
              <form onSubmit={handleAdmissionSubmit} className="space-y-6">
                {submitError && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <div className="flex">
                      <ExclamationIcon size="md" color="rgb(248 113 113)" className="mt-0.5" />
                      <p className="ml-3 text-sm text-red-700">{submitError}</p>
                    </div>
                  </div>
                )}

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
                    disabled={isSubmitting}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors disabled:bg-gray-50 disabled:cursor-not-allowed ${
                      validationErrors.name ? 'border-red-300' : 'border-gray-300'
                    }`}
                    placeholder="Enter your full name"
                  />
                  {validationErrors.name && (
                    <p className="mt-1 text-sm text-red-600">{validationErrors.name}</p>
                  )}
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
                    disabled={isSubmitting}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors disabled:bg-gray-50 disabled:cursor-not-allowed ${
                      validationErrors.email ? 'border-red-300' : 'border-gray-300'
                    }`}
                    placeholder="Enter your email address"
                  />
                  {validationErrors.email && (
                    <p className="mt-1 text-sm text-red-600">{validationErrors.email}</p>
                  )}
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
                    disabled={isSubmitting}
                    maxLength={10}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors disabled:bg-gray-50 disabled:cursor-not-allowed ${
                      validationErrors.phone ? 'border-red-300' : 'border-gray-300'
                    }`}
                    placeholder="Enter 10-digit phone number"
                  />
                  {validationErrors.phone && (
                    <p className="mt-1 text-sm text-red-600">{validationErrors.phone}</p>
                  )}
                </div>
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-orange-600 hover:to-orange-700 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {isSubmitting ? (
                    <>
                      <SpinnerIcon size="md" color="white" className="-ml-1 mr-3" />
                      Submitting...
                    </>
                  ) : (
                    'Submit Enrollment'
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Download Form Modal */}
      {isDownloadModalOpen && (
        <div className="fixed text-black inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900">Download Syllabus for {course.title}</h3>
              <button 
                onClick={() => setIsDownloadModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 text-2xl font-bold"
              >
                ×
              </button>
            </div>
            
            {downloadSuccess ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckIcon size="xl" color="rgb(22 163 74)" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Download Started!</h3>
                <p className="text-gray-600 mb-4">
                  {isMobileDevice() 
                    ? (() => {
                        const isIOSSafari = /iPad|iPhone|iPod/.test(navigator.userAgent) && /Safari/.test(navigator.userAgent) && !/CriOS|FxiOS|OPiOS|mercury/.test(navigator.userAgent);
                        if (isIOSSafari) {
                          return "Your syllabus download has been initiated. Check your Downloads folder or Files app. If not found, the PDF may have opened in a new tab - tap the share button and select 'Save to Files'.";
                        } else {
                          return "Your syllabus has been opened in a new tab. To save the PDF: 1) Tap the share button in your browser, 2) Select 'Save to Files' or 'Download', 3) Choose your preferred location.";
                        }
                      })()
                    : "Your syllabus has been downloaded directly to your device! Check your Downloads folder for the PDF file."
                  }
                </p>
                {downloadMethod && (
                  <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                    <p className="text-sm text-blue-700 mb-1">Download method: {downloadMethod}</p>
                  </div>
                )}
                {isMobileDevice() && course?.pdfSrc && (
                  <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                    <p className="text-sm text-blue-700 mb-2">If the download didn't work, try this direct link:</p>
                    <a 
                      href={course.pdfSrc} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 underline text-sm"
                    >
                      Open PDF directly
                    </a>
                  </div>
                )}
              </div>
            ) : (
              <form onSubmit={handleDownloadSubmit} className="space-y-6">
                {downloadError && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <div className="flex">
                      <ExclamationIcon size="md" color="rgb(248 113 113)" className="mt-0.5" />
                      <div className="ml-3">
                        <p className="text-sm text-red-700">{downloadError}</p>
                        {showAlternativeDownload && course?.pdfSrc && (
                          <div className="mt-3">
                            <button
                              type="button"
                              onClick={handleAlternativeDownload}
                              className="text-sm bg-red-100 hover:bg-red-200 text-red-700 px-3 py-1 rounded-md transition-colors"
                            >
                              Try Alternative Download
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* Progress Indicator */}
                {isDownloading && downloadProgress > 0 && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-blue-700">Downloading...</span>
                      <span className="text-sm text-blue-600">{downloadProgress}%</span>
                    </div>
                    <div className="w-full bg-blue-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${downloadProgress}%` }}
                      ></div>
                    </div>
                  </div>
                )}

                <div>
                  <label htmlFor="downloadName" className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="downloadName"
                    name="name"
                    value={downloadFormData.name}
                    onChange={handleDownloadInputChange}
                    required
                    disabled={isDownloadSubmitting || isDownloading}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors disabled:bg-gray-50 disabled:cursor-not-allowed ${
                      downloadValidationErrors.name ? 'border-red-300' : 'border-gray-300'
                    }`}
                    placeholder="Enter your full name"
                  />
                  {downloadValidationErrors.name && (
                    <p className="mt-1 text-sm text-red-600">{downloadValidationErrors.name}</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="downloadEmail" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="downloadEmail"
                    name="email"
                    value={downloadFormData.email}
                    onChange={handleDownloadInputChange}
                    required
                    disabled={isDownloadSubmitting || isDownloading}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors disabled:bg-gray-50 disabled:cursor-not-allowed ${
                      downloadValidationErrors.email ? 'border-red-300' : 'border-gray-300'
                    }`}
                    placeholder="Enter your email address"
                  />
                  {downloadValidationErrors.email && (
                    <p className="mt-1 text-sm text-red-600">{downloadValidationErrors.email}</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="downloadPhone" className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    id="downloadPhone"
                    name="phone"
                    value={downloadFormData.phone}
                    onChange={handleDownloadInputChange}
                    required
                    disabled={isDownloadSubmitting || isDownloading}
                    maxLength={10}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors disabled:bg-gray-50 disabled:cursor-not-allowed ${
                      downloadValidationErrors.phone ? 'border-red-300' : 'border-gray-300'
                    }`}
                    placeholder="Enter 10-digit phone number"
                  />
                  {downloadValidationErrors.phone && (
                    <p className="mt-1 text-sm text-red-600">{downloadValidationErrors.phone}</p>
                  )}
                </div>
                
                <button
                  type="submit"
                  disabled={isDownloadSubmitting || isDownloading}
                  className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-orange-600 hover:to-orange-700 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {isDownloadSubmitting || isDownloading ? (
                    <>
                      <SpinnerIcon size="md" color="white" className="-ml-1 mr-3" />
                      {isDownloading ? `Downloading... ${downloadProgress}%` : 'Processing...'}
                    </>
                  ) : (
                    <>
                      <DownloadIcon size="md" color="white" className="-ml-1 mr-2" />
                      Download Syllabus
                    </>
                  )}
                </button>

                {/* Alternative Download Options */}
                {showAlternativeDownload && course?.pdfSrc && (
                  <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                    <h4 className="text-sm font-medium text-gray-700 mb-3">Alternative Download Methods:</h4>
                    <div className="space-y-2">
                      <button
                        type="button"
                        onClick={handleAlternativeDownload}
                        className="w-full text-left p-2 text-sm text-blue-600 hover:bg-blue-50 rounded transition-colors"
                      >
                        🔄 Try Different Download Method
                      </button>
                      <a
                        href={course.pdfSrc}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block w-full text-left p-2 text-sm text-green-600 hover:bg-green-50 rounded transition-colors"
                      >
                        🔗 Open PDF in New Tab
                      </a>
                      <button
                        type="button"
                        onClick={() => {
                          const link = document.createElement('a');
                          link.href = course.pdfSrc;
                          link.download = `${course.title} Syllabus.pdf`;
                          link.click();
                        }}
                        className="w-full text-left p-2 text-sm text-purple-600 hover:bg-purple-50 rounded transition-colors"
                      >
                        💾 Force Download
                      </button>
                    </div>
                  </div>
                )}
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
} 