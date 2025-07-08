import React from "react";

interface PlacementCourseCardProps {
  iconSrc: string;
  iconAlt: string;
  title: string;
  price: string;
  duration: string;
  badge?: string;
  rating?: number; // out of 5
}

const defaultBadge = "All level";
const defaultRating = 4;

export const PlacementCourseCard: React.FC<PlacementCourseCardProps> = ({
  iconSrc,
  iconAlt,
  title,
  price,
  duration,
  badge = defaultBadge,
  rating = defaultRating,
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-4 flex flex-col items-center hover:shadow-2xl transition-shadow duration-300 max-w-xs hover:bg-orange-50 hover:shadow-orange-500">
      <div className="w-16 h-16 mb-4 flex items-center justify-center bg-orange-50 rounded-full">
        <img src={iconSrc} alt={iconAlt} className="w-10 h-10" />
      </div>
      <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-semibold mb-2">
        {badge}
      </span>
      <h3 className="text-xl font-bold text-gray-900 mb-2 text-center">{title}</h3>
      <div className="flex items-center mb-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <span key={i} className={i < rating ? "text-yellow-400 text-lg" : "text-gray-300 text-lg"}>
            ★
          </span>
        ))}
      </div>
      <div className="flex justify-between w-full text-sm text-gray-600 border-t pt-4 mt-auto">
        <span>Course Price :</span>
        <span className="font-semibold text-gray-900">{price}</span>
      </div>
      <div className="flex justify-between w-full text-sm text-gray-600 mt-1">
        <span>Duration :</span>
        <span className="font-semibold text-gray-900">{duration}</span>
      </div>
    </div>
  );
};

export default PlacementCourseCard; 