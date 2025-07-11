import React from "react";
import Link from "next/link";
import { generateCourseSlug } from "../../utils/courseUtils";

interface PlacementCourseCardProps {
  id: number;
  iconSrc: string;
  iconAlt: string;
  title: string;
  duration: string;
  badge?: string;
  rating?: number; // out of 5
}

const defaultRating = 4;

export const PlacementCourseCard: React.FC<PlacementCourseCardProps> = ({
  id,
  iconSrc,
  iconAlt,
  title,
  duration,
  rating = defaultRating,
}) => {
  const courseSlug = generateCourseSlug(title);
  
  return (
    <Link href={`/courses/${courseSlug}`} className="block w-full h-full group">
      <article className="relative w-full h-full bg-white rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-orange-200">
        {/* Main Image Container */}
        <div className="relative w-full h-64 sm:h-72 md:h-80 lg:h-96 bg-gradient-to-br from-orange-50 via-white to-orange-50 flex items-start justify-center px-6 sm:px-8 pt-6 sm:pt-8 pb-0">
          {/* Image */}
          <div className="relative w-full h-full flex items-center justify-center">
            <img 
              src={iconSrc} 
              alt={iconAlt} 
              className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
              loading="lazy"
            />
          </div>
          
          {/* Rating Badge */}
          <div className="absolute top-4 right-4 sm:top-6 sm:right-6 bg-white/95 backdrop-blur-md rounded-2xl px-4 py-2 shadow-lg border border-white/40">
            <div className="flex items-center space-x-2">
              <span className="text-orange-600 text-lg sm:text-xl font-bold">{rating}</span>
              <div className="flex items-center">
                <span className="text-yellow-500 text-lg sm:text-xl">★</span>
                <span className="text-gray-500 text-xs ml-1 font-medium">/5</span>
              </div>
            </div>
          </div>
          
          {/* Subtle corner accent */}
          <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-orange-400/10 to-transparent rounded-bl-full"></div>
        </div>
        
        {/* Duration Section */}
        <div className="relative p-4 sm:p-5 bg-gradient-to-r from-orange-500 to-orange-600">
          {/* Subtle pattern overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-white/5 via-transparent to-white/5"></div>
          
          <div className="relative flex justify-between items-center text-white">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-white rounded-full"></div>
              <span className="text-sm sm:text-base font-semibold tracking-wide">Duration</span>
            </div>
            <span className="text-sm sm:text-base font-bold bg-white/20 px-3 py-1 rounded-full backdrop-blur-sm">
              {duration}
            </span>
          </div>
          
          {/* Bottom accent line */}
          <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
        </div>
        
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-orange-400/5 via-transparent to-orange-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
      </article>
    </Link>
  );
};

export default PlacementCourseCard; 