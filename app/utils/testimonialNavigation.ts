'use client';

import { useRouter } from 'next/navigation';

export const useTestimonialNavigation = () => {
  const router = useRouter();

  const handleTestimonialClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    
    // Check if we're on the homepage
    if (window.location.pathname === '/') {
      // Smooth scroll to testimonials section
      const testimonialsSection = document.getElementById('testimonials');
      if (testimonialsSection) {
        testimonialsSection.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    } else {
      // Navigate to homepage and then scroll to testimonials
      router.push('/#testimonials');
      
      // Wait for navigation to complete, then scroll
      setTimeout(() => {
        const testimonialsSection = document.getElementById('testimonials');
        if (testimonialsSection) {
          testimonialsSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }, 100);
    }
  };

  return handleTestimonialClick;
}; 