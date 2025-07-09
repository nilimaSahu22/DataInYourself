'use client';

import { useRouter, usePathname } from 'next/navigation';

export const handleContactNavigation = (e: React.MouseEvent<HTMLAnchorElement>) => {
  e.preventDefault();
  
  // Check if we're on the homepage
  const isHomepage = window.location.pathname === '/';
  
  if (isHomepage) {
    // Smooth scroll to contact section if already on homepage
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  } else {
    // Navigate to homepage with contact anchor if on different page
    window.location.href = '/#contact';
  }
};

// Hook version for components that need router access
export const useContactNavigation = () => {
  const router = useRouter();
  const pathname = usePathname();
  
  const handleContactClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    
    if (pathname === '/') {
      // Smooth scroll to contact section if already on homepage
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        contactSection.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }
    } else {
      // Navigate to homepage with contact anchor if on different page
      router.push('/#contact');
    }
  };
  
  return handleContactClick;
}; 