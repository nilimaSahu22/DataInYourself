// App-wide constants
export const APP_NAME = "DataInYourself"
export const APP_DESCRIPTION = "India's number one computer training platform"
export const COMPANY_NAME = "Rudriva Technology"

// API endpoints
export const API_ENDPOINTS = {
  COURSES: '/api/courses',
  CONTACT: '/api/contact',
  FRANCHISE: '/api/franchise',
} as const

// Routes
export const ROUTES = {
  HOME: '/',
  ABOUT: '/about',
  COURSES: '/courses',
  FRANCHISE: '/franchise',
} as const

// Social media links
export const SOCIAL_LINKS = {
  FACEBOOK: 'https://facebook.com/datainyourself',
  TWITTER: 'https://twitter.com/datainyourself',
  LINKEDIN: 'https://linkedin.com/company/datainyourself',
  INSTAGRAM: 'https://instagram.com/datainyourself',
} as const

// Contact information
export const CONTACT_INFO = {
  EMAIL: 'info@datainyourself.com',
  PHONE: '+91-XXXXXXXXXX',
  ADDRESS: 'Your Address Here',
} as const

// Course categories
export const COURSE_CATEGORIES = {
  PROGRAMMING: 'Programming',
  DATA_SCIENCE: 'Data Science',
  WEB_DEVELOPMENT: 'Web Development',
  MOBILE_DEVELOPMENT: 'Mobile Development',
  DATABASE: 'Database',
  CLOUD_COMPUTING: 'Cloud Computing',
} as const 