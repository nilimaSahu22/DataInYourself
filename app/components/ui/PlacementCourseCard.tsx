"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { generateCourseSlug } from "../../utils/courseUtils";
import { StarIcon, ClockIcon } from "./Icons";

interface PlacementCourseCardProps {
  id: number;
  iconSrc: string;
  iconAlt: string;
  title: string;
  duration: string;
  badge?: string;
  rating?: number; // out of 5
  index?: number; // Add index for staggered animation
  animationKey?: number; // Add animation key prop
  shouldAnimate?: boolean; // Control whether animation should play
}

export const PlacementCourseCard: React.FC<PlacementCourseCardProps> = ({
  id,
  iconSrc,
  iconAlt,
  title,
  duration,
  rating = 4,
  index = 0,
  animationKey = 0,
  shouldAnimate = false,
}) => {
  const courseSlug = generateCourseSlug(title);
  const [isVisible, setIsVisible] = useState(false);
  
  // Calculate delay based on index for staggered animation
  const animationDelay = index * 500; // 500ms delay between each card for slower animation

  // Single animation control effect
  useEffect(() => {
    if (shouldAnimate) {
      // Reset visibility first
      setIsVisible(false);
      
      // Then trigger animation after delay
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, animationDelay);
      
      return () => clearTimeout(timer);
    } else {
      // If not animating, show immediately
      setIsVisible(true);
    }
  }, [shouldAnimate, animationDelay]);

  return (
    <Link href={`/courses/${courseSlug}`} className="block w-full h-full group">
      <article 
        className={`relative w-full h-full bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 flex flex-col flip-card-hover ${
          isVisible ? 'animate-flipInRotate' : 'flip-initial'
        }`}
        style={{
          animationDelay: `${animationDelay}ms`,
        }}
      >
        {/* Image Section - Fixed aspect ratio for consistency */}
        <div className="w-full aspect-[4/3] bg-gradient-to-br from-[#0a1a3a] to-[#1a2a4a] flex items-center justify-center p-4 relative overflow-hidden">
          <img
            src={iconSrc}
            alt={iconAlt}
            className="w-full h-full object-cover drop-shadow-lg transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
          {/* Subtle overlay for better text contrast */}
          <div className="absolute inset-0 bg-black/10"></div>
          
          {/* Rating Badge - Top Right Corner */}
          <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm rounded-lg px-2 py-1 shadow-lg">
            <div className="flex items-center space-x-1">
              <span className="text-xs font-semibold text-orange-600">{rating}</span>
              <StarIcon size="xs" color="rgb(251 191 36)" className="flex-shrink-0" />
            </div>
          </div>
        </div>
        
        {/* Content Section - Fixed height for consistency */}
        <div className="flex-1 flex flex-col justify-between p-3 bg-white min-h-[80px]">
          {/* Title Section */}
          <div className="flex-1 flex items-center justify-center mb-2">
            <h3 className="text-xs sm:text-sm md:text-base font-semibold text-center text-[#222] leading-tight line-clamp-2 px-1">
              {title}
            </h3>
          </div>
          
          {/* Course Duration - Fixed position at bottom */}
          <div className="flex items-center justify-center">
            <div className="flex items-center space-x-1 bg-orange-50 rounded-full px-3 py-1">
              <ClockIcon size="sm" color="rgb(249 115 22)" className="flex-shrink-0" />
              <span className="text-xs sm:text-sm font-medium text-orange-700">{duration}</span>
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
};

export default PlacementCourseCard; 