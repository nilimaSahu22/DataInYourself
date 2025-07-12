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

export const PlacementCourseCard: React.FC<PlacementCourseCardProps> = ({
  id,
  iconSrc,
  iconAlt,
  title,
  // duration,
  // rating = 4,
}) => {
  const courseSlug = generateCourseSlug(title);

  return (
    <Link href={`/courses/${courseSlug}`} className="block w-full h-full group">
      <article className="relative w-full h-full bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100">
        {/* Image Section */}
        <div className="w-full h-40 sm:h-48 bg-[#0a1a3a] flex items-center justify-center p-4">
          <img
            src={iconSrc}
            alt={iconAlt}
            className="h-full object-contain drop-shadow-lg"
            loading="lazy"
          />
        </div>
        {/* Title */}
        <div className="px-4 pt-4 pb-2 bg-white">
          <h3 className="text-lg sm:text-2xl text-center text-[#222]  mb-2">
            {title}
          </h3>
          {/* Stars */}
          <div className="flex items-center justify-start mb-2">
            {[...Array(4)].map((_, i) => (
              <svg
                key={i}
                className="w-5 h-5 text-yellow-400 mr-1"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
            {/* 5th star as outline for 4/5 rating */}
            <svg
              className="w-5 h-5 text-gray-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 20 20"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          </div>
        </div>
      </article>
    </Link>
  );
};

export default PlacementCourseCard; 