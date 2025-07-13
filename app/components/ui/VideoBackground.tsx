"use client";
import { useEffect, useRef, useState } from 'react';

interface VideoBackgroundProps {
  desktopVideo: string;
  mobileVideo: string;
  fallbackImage?: string;
  className?: string;
  overlayOpacity?: number; // 0 = no overlay, 1 = full overlay
  children: React.ReactNode;
}

export default function VideoBackground({
  desktopVideo,
  mobileVideo,
  fallbackImage,
  className = "",
  overlayOpacity = 0.3, // Default to 30% opacity
  children
}: VideoBackgroundProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [isVideoError, setIsVideoError] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isVideoSupported, setIsVideoSupported] = useState(true);

  useEffect(() => {
    // Check if video is supported
    const video = document.createElement('video');
    const canPlayMP4 = video.canPlayType('video/mp4');
    setIsVideoSupported(!!canPlayMP4);

    // Check if device is mobile
    const checkMobile = () => {
      const isMobileDevice = window.innerWidth < 768;
      setIsMobile(isMobileDevice);
    };

    // Initial check
    checkMobile();
    
    // Add resize listener with debouncing
    let timeoutId: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(checkMobile, 100);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timeoutId);
    };
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleLoadedData = () => {
      setIsVideoLoaded(true);
    };

    const handleCanPlay = () => {
      setIsVideoLoaded(true);
    };

    const handleError = () => {
      console.warn('Video failed to load, falling back to static background');
      setIsVideoError(true);
    };

    const handleLoadStart = () => {
      // Reset states when video starts loading
      setIsVideoLoaded(false);
      setIsVideoError(false);
    };

    video.addEventListener('loadstart', handleLoadStart);
    video.addEventListener('loadeddata', handleLoadedData);
    video.addEventListener('canplay', handleCanPlay);
    video.addEventListener('error', handleError);

    return () => {
      video.removeEventListener('loadstart', handleLoadStart);
      video.removeEventListener('loadeddata', handleLoadedData);
      video.removeEventListener('canplay', handleCanPlay);
      video.removeEventListener('error', handleError);
    };
  }, []);

  const videoSrc = isMobile ? mobileVideo : desktopVideo;

  // Add intersection observer for lazy loading
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            video.load();
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(video);

    return () => {
      observer.unobserve(video);
    };
  }, [videoSrc]);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Loading Background */}
      {!isVideoLoaded && !isVideoError && (
        <div 
          className="absolute inset-0 bg-gradient-to-br from-orange-50 to-white flex items-center justify-center"
          style={{ zIndex: 0 }}
        >
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
            <p className="text-orange-700 text-sm">Loading...</p>
          </div>
        </div>
      )}

      {/* Video Background */}
      {!isVideoError && isVideoSupported && (
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden="true"
          className={`absolute inset-0 w-full h-full object-cover ${
            isVideoLoaded ? 'opacity-100' : 'opacity-0'
          } transition-opacity duration-1000`}
          style={{ zIndex: 0 }}
        >
          <source src={videoSrc} type="video/mp4" />
          {fallbackImage && (
            <img src={fallbackImage} alt="Background" className="w-full h-full object-cover" />
          )}
        </video>
      )}

      {/* Fallback Background */}
      {isVideoError && fallbackImage && (
        <div 
          className="absolute inset-0 w-full h-full bg-cover bg-center"
          style={{ 
            backgroundImage: `url(${fallbackImage})`,
            zIndex: 0 
          }}
        />
      )}

      {/* Dark Overlay for better text readability */}
      {overlayOpacity > 0 && (
        <div 
          className="absolute inset-0 bg-black"
          style={{ 
            zIndex: 1,
            opacity: overlayOpacity
          }}
        />
      )}

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
} 