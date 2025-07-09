import React from "react";
import Link from "next/link";
import { generateCourseSlug } from "../utils/courseUtils";

interface PlacementCourseCardProps {
  id: number;
  iconSrc: string;
  iconAlt: string;
  title: string;
  duration: string;
  badge?: string;
  rating?: number; // out of 5
}

const defaultBadge = "All level";
const defaultRating = 4;

export const PlacementCourseCard: React.FC<PlacementCourseCardProps> = ({
  id,
  iconSrc,
  iconAlt,
  title,
  duration,
  badge = defaultBadge,
  rating = defaultRating,
}) => {
  const courseSlug = generateCourseSlug(title);
  
  return (
    <Link href={`/courses/${courseSlug}`} className="block">
      <div className="bg-white rounded-2xl shadow-lg p-3 sm:p-4 flex flex-col items-center hover:shadow-2xl transition-all duration-300 max-w-xs hover:bg-orange-50 hover:shadow-orange-500 cursor-pointer transform hover:scale-105">
        <div className="w-14 h-14 sm:w-16 sm:h-16 mb-3 sm:mb-4 flex items-center justify-center bg-orange-50 rounded-full">
          <img src={iconSrc} alt={iconAlt} className="w-8 h-8 sm:w-10 sm:h-10" />
        </div>
        <span className="px-2 sm:px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-semibold mb-2">
          {badge}
        </span>
        <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 text-center leading-tight">{title}</h3>
        <div className="flex items-center mb-3 sm:mb-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <span key={i} className={i < rating ? "text-yellow-400 text-base sm:text-lg" : "text-gray-300 text-base sm:text-lg"}>
              ★
            </span>
          ))}
        </div>
        <div className="flex justify-between w-full text-xs sm:text-sm text-gray-600 border-t pt-3 sm:pt-4 mt-auto">
          <span>Duration :</span>
          <span className="font-semibold text-gray-900">{duration}</span>
        </div>
      </div>
    </Link>
  );
};

export default PlacementCourseCard; 