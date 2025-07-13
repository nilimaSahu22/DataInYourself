import React from 'react';

interface IconProps {
  className?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  color?: string;
  strokeWidth?: number;
}

const sizeClasses = {
  xs: 'w-3 h-3',
  sm: 'w-4 h-4',
  md: 'w-5 h-5',
  lg: 'w-6 h-6',
  xl: 'w-8 h-8',
  '2xl': 'w-10 h-10'
};

export const CheckIcon: React.FC<IconProps> = ({ 
  className = '', 
  size = 'md', 
  color = 'currentColor',
  strokeWidth = 2 
}) => (
  <svg 
    className={`${sizeClasses[size]} ${className}`}
    fill="none" 
    stroke={color} 
    viewBox="0 0 24 24"
    aria-hidden="true"
    role="img"
  >
    <path 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      strokeWidth={strokeWidth} 
      d="M5 13l4 4L19 7" 
    />
  </svg>
);

export const XIcon: React.FC<IconProps> = ({ 
  className = '', 
  size = 'md', 
  color = 'currentColor',
  strokeWidth = 2 
}) => (
  <svg 
    className={`${sizeClasses[size]} ${className}`}
    fill="none" 
    stroke={color} 
    viewBox="0 0 24 24"
    aria-hidden="true"
    role="img"
  >
    <path 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      strokeWidth={strokeWidth} 
      d="M6 18L18 6M6 6l12 12" 
    />
  </svg>
);

export const ExclamationIcon: React.FC<IconProps> = ({ 
  className = '', 
  size = 'md', 
  color = 'currentColor',
  strokeWidth = 2 
}) => (
  <svg 
    className={`${sizeClasses[size]} ${className}`}
    fill="none" 
    stroke={color} 
    viewBox="0 0 24 24"
    aria-hidden="true"
    role="img"
  >
    <path 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      strokeWidth={strokeWidth} 
      d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
    />
  </svg>
);

export const SearchIcon: React.FC<IconProps> = ({ 
  className = '', 
  size = 'md', 
  color = 'currentColor',
  strokeWidth = 2 
}) => (
  <svg 
    className={`${sizeClasses[size]} ${className}`}
    fill="none" 
    stroke={color} 
    viewBox="0 0 24 24"
    aria-hidden="true"
    role="img"
  >
    <path 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      strokeWidth={strokeWidth} 
      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
    />
  </svg>
);

export const SortIcon: React.FC<IconProps> = ({ 
  className = '', 
  size = 'md', 
  color = 'currentColor',
  strokeWidth = 2 
}) => (
  <svg 
    className={`${sizeClasses[size]} ${className}`}
    fill="none" 
    stroke={color} 
    viewBox="0 0 24 24"
    aria-hidden="true"
    role="img"
  >
    <path 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      strokeWidth={strokeWidth} 
      d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" 
    />
  </svg>
);

export const ChevronUpIcon: React.FC<IconProps> = ({ 
  className = '', 
  size = 'md', 
  color = 'currentColor',
  strokeWidth = 2 
}) => (
  <svg 
    className={`${sizeClasses[size]} ${className}`}
    fill="none" 
    stroke={color} 
    viewBox="0 0 24 24"
    aria-hidden="true"
    role="img"
  >
    <path 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      strokeWidth={strokeWidth} 
      d="M5 15l7-7 7 7" 
    />
  </svg>
);

export const ChevronDownIcon: React.FC<IconProps> = ({ 
  className = '', 
  size = 'md', 
  color = 'currentColor',
  strokeWidth = 2 
}) => (
  <svg 
    className={`${sizeClasses[size]} ${className}`}
    fill="none" 
    stroke={color} 
    viewBox="0 0 24 24"
    aria-hidden="true"
    role="img"
  >
    <path 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      strokeWidth={strokeWidth} 
      d="M19 9l-7 7-7-7" 
    />
  </svg>
);

export const BriefcaseIcon: React.FC<IconProps> = ({ 
  className = '', 
  size = 'md', 
  color = 'currentColor',
  strokeWidth = 2 
}) => (
  <svg 
    className={`${sizeClasses[size]} ${className}`}
    fill="none" 
    stroke={color} 
    viewBox="0 0 24 24"
    aria-hidden="true"
    role="img"
  >
    <path 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      strokeWidth={strokeWidth} 
      d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" 
    />
  </svg>
);

export const StarIcon: React.FC<IconProps> = ({ 
  className = '', 
  size = 'md', 
  color = 'currentColor',
  strokeWidth = 2 
}) => (
  <svg 
    className={`${sizeClasses[size]} ${className}`}
    fill={color} 
    viewBox="0 0 20 20"
    aria-hidden="true"
    role="img"
  >
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
);


export const PhoneIcon: React.FC<IconProps> = ({ 
  className = '', 
  size = 'md', 
  color = 'currentColor',
  strokeWidth = 2 
}) => (
  <svg 
    className={`${sizeClasses[size]} ${className}`}
    fill="none" 
    stroke={color} 
    viewBox="0 0 24 24"
    aria-hidden="true"
    role="img"
  >
    <path 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      strokeWidth={strokeWidth} 
      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" 
    />
  </svg>
);

export const MailIcon: React.FC<IconProps> = ({ 
  className = '', 
  size = 'md', 
  color = 'currentColor',
  strokeWidth = 2 
}) => (
  <svg 
    className={`${sizeClasses[size]} ${className}`}
    fill="none" 
    stroke={color} 
    viewBox="0 0 24 24"
    aria-hidden="true"
    role="img"
  >
    <path 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      strokeWidth={strokeWidth} 
      d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" 
    />
  </svg>
);

export const DownloadIcon: React.FC<IconProps> = ({ 
  className = '', 
  size = 'md', 
  color = 'currentColor',
  strokeWidth = 2 
}) => (
  <svg 
    className={`${sizeClasses[size]} ${className}`}
    fill="none" 
    stroke={color} 
    viewBox="0 0 24 24"
    aria-hidden="true"
    role="img"
  >
    <path 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      strokeWidth={strokeWidth} 
      d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" 
    />
  </svg>
);

export const EditIcon: React.FC<IconProps> = ({ 
  className = '', 
  size = 'md', 
  color = 'currentColor',
  strokeWidth = 2 
}) => (
  <svg 
    className={`${sizeClasses[size]} ${className}`}
    fill="none" 
    stroke={color} 
    viewBox="0 0 24 24"
    aria-hidden="true"
    role="img"
  >
    <path 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      strokeWidth={strokeWidth} 
      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" 
    />
  </svg>
);

export const TrashIcon: React.FC<IconProps> = ({ 
  className = '', 
  size = 'md', 
  color = 'currentColor',
  strokeWidth = 2 
}) => (
  <svg 
    className={`${sizeClasses[size]} ${className}`}
    fill="none" 
    stroke={color} 
    viewBox="0 0 24 24"
    aria-hidden="true"
    role="img"
  >
    <path 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      strokeWidth={strokeWidth} 
      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" 
    />
  </svg>
);

export const EyeIcon: React.FC<IconProps> = ({ 
  className = '', 
  size = 'md', 
  color = 'currentColor',
  strokeWidth = 2 
}) => (
  <svg 
    className={`${sizeClasses[size]} ${className}`}
    fill="none" 
    stroke={color} 
    viewBox="0 0 24 24"
    aria-hidden="true"
    role="img"
  >
    <path 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      strokeWidth={strokeWidth} 
      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" 
    />
    <path 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      strokeWidth={strokeWidth} 
      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" 
    />
  </svg>
);

export const SpinnerIcon: React.FC<IconProps> = ({ 
  className = '', 
  size = 'md', 
  color = 'currentColor',
  strokeWidth = 2 
}) => (
  <svg 
    className={`${sizeClasses[size]} animate-spin ${className}`}
    fill="none" 
    stroke={color} 
    viewBox="0 0 24 24"
    aria-hidden="true"
    role="img"
  >
    <circle 
      className="opacity-25" 
      cx="12" 
      cy="12" 
      r="10" 
      stroke="currentColor" 
      strokeWidth="4"
    />
    <path 
      className="opacity-75" 
      fill="currentColor" 
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    />
  </svg>
);

export const MenuIcon: React.FC<IconProps> = ({ 
  className = '', 
  size = 'md', 
  color = 'currentColor',
  strokeWidth = 2 
}) => (
  <svg 
    className={`${sizeClasses[size]} ${className}`}
    fill="none" 
    stroke={color} 
    viewBox="0 0 24 24"
    aria-hidden="true"
    role="img"
  >
    <path 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      strokeWidth={strokeWidth} 
      d="M4 6h16M4 12h16M4 18h16" 
    />
  </svg>
);

export const CloseIcon: React.FC<IconProps> = ({ 
  className = '', 
  size = 'md', 
  color = 'currentColor',
  strokeWidth = 2 
}) => (
  <svg 
    className={`${sizeClasses[size]} ${className}`}
    fill="none" 
    stroke={color} 
    viewBox="0 0 24 24"
    aria-hidden="true"
    role="img"
  >
    <path 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      strokeWidth={strokeWidth} 
      d="M6 18L18 6M6 6l12 12" 
    />
  </svg>
);

// Social Media Icons
export const FacebookIcon: React.FC<IconProps> = ({ 
  className = '', 
  size = 'md', 
  color = 'currentColor' 
}) => (
  <svg 
    className={`${sizeClasses[size]} ${className}`}
    fill={color} 
    viewBox="0 0 24 24"
    aria-hidden="true"
    role="img"
  >
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

export const TwitterIcon: React.FC<IconProps> = ({ 
  className = '', 
  size = 'md', 
  color = 'currentColor' 
}) => (
  <svg 
    className={`${sizeClasses[size]} ${className}`}
    fill={color} 
    viewBox="0 0 24 24"
    aria-hidden="true"
    role="img"
  >
    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
  </svg>
);

export const InstagramIcon: React.FC<IconProps> = ({ 
  className = '', 
  size = 'md', 
  color = 'currentColor' 
}) => (
  <svg 
    className={`${sizeClasses[size]} ${className}`}
    fill={color} 
    viewBox="0 0 24 24"
    aria-hidden="true"
    role="img"
  >
    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987 6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297C4.198 14.895 3.708 13.744 3.708 12.447s.49-2.448 1.418-3.323c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.928.875 1.418 2.026 1.418 3.323s-.49 2.448-1.418 3.244c-.875.807-2.026 1.297-3.323 1.297zm7.83-9.781c-.49 0-.928-.175-1.297-.49-.368-.315-.49-.753-.49-1.243 0-.49.122-.928.49-1.243.369-.315.807-.49 1.297-.49s.928.175 1.297.49c.368.315.49.753.49 1.243 0 .49-.122.928-.49 1.243-.369.315-.807.49-1.297.49z"/>
  </svg>
);

export const LinkedInIcon: React.FC<IconProps> = ({ 
  className = '', 
  size = 'md', 
  color = 'currentColor' 
}) => (
  <svg 
    className={`${sizeClasses[size]} ${className}`}
    fill={color} 
    viewBox="0 0 24 24"
    aria-hidden="true"
    role="img"
  >
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

export const ClockIcon: React.FC<IconProps> = ({ 
  className = '', 
  size = 'md', 
  color = 'currentColor',
  strokeWidth = 2 
}) => (
  <svg 
    className={`${sizeClasses[size]} ${className}`}
    fill="none" 
    stroke={color} 
    viewBox="0 0 24 24"
    aria-hidden="true"
    role="img"
  >
    <path 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      strokeWidth={strokeWidth} 
      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" 
    />
  </svg>
);

export const RefreshIcon: React.FC<IconProps> = ({ 
  className = '', 
  size = 'md', 
  color = 'currentColor',
  strokeWidth = 2 
}) => (
  <svg 
    className={`${sizeClasses[size]} ${className}`}
    fill="none" 
    stroke={color} 
    viewBox="0 0 24 24"
    aria-hidden="true"
    role="img"
  >
    <path 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      strokeWidth={strokeWidth} 
      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" 
    />
  </svg>
);

export const ChevronLeftIcon: React.FC<IconProps> = ({ 
  className = '', 
  size = 'md', 
  color = 'currentColor',
  strokeWidth = 2 
}) => (
  <svg 
    className={`${sizeClasses[size]} ${className}`}
    fill="none" 
    stroke={color} 
    viewBox="0 0 24 24"
    aria-hidden="true"
    role="img"
  >
    <path 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      strokeWidth={strokeWidth} 
      d="M15 19l-7-7 7-7" 
    />
  </svg>
);

export const ChevronRightIcon: React.FC<IconProps> = ({ 
  className = '', 
  size = 'md', 
  color = 'currentColor',
  strokeWidth = 2 
}) => (
  <svg 
    className={`${sizeClasses[size]} ${className}`}
    fill="none" 
    stroke={color} 
    viewBox="0 0 24 24"
    aria-hidden="true"
    role="img"
  >
    <path 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      strokeWidth={strokeWidth} 
      d="M9 5l7 7-7 7" 
    />
  </svg>
);

export const ArrowRightIcon: React.FC<IconProps> = ({ 
  className = '', 
  size = 'md', 
  color = 'currentColor',
  strokeWidth = 2 
}) => (
  <svg 
    className={`${sizeClasses[size]} ${className}`}
    fill="none" 
    stroke={color} 
    viewBox="0 0 24 24"
    aria-hidden="true"
    role="img"
  >
    <path 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      strokeWidth={strokeWidth} 
      d="M17 8l4 4m0 0l-4 4m4-4H3" 
    />
  </svg>
);

export const UserIcon: React.FC<IconProps> = ({ 
  className = '', 
  size = 'md', 
  color = 'currentColor',
  strokeWidth = 2 
}) => (
  <svg 
    className={`${sizeClasses[size]} ${className}`}
    fill="none" 
    stroke={color} 
    viewBox="0 0 24 24"
    aria-hidden="true"
    role="img"
  >
    <path 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      strokeWidth={strokeWidth} 
      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" 
    />
  </svg>
);

export const AcademicCapIcon: React.FC<IconProps> = ({ 
  className = '', 
  size = 'md', 
  color = 'currentColor',
  strokeWidth = 2 
}) => (
  <svg 
    className={`${sizeClasses[size]} ${className}`}
    fill="none" 
    stroke={color} 
    viewBox="0 0 24 24"
    aria-hidden="true"
    role="img"
  >
    <path 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      strokeWidth={strokeWidth} 
      d="M12 14l9-5-9-5-9 5 9 5z" 
    />
    <path 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      strokeWidth={strokeWidth} 
      d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" 
    />
    <path 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      strokeWidth={strokeWidth} 
      d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" 
    />
  </svg>
);

export const TrophyIcon: React.FC<IconProps> = ({ 
  className = '', 
  size = 'md', 
  color = 'currentColor',
  strokeWidth = 2 
}) => (
  <svg 
    className={`${sizeClasses[size]} ${className}`}
    fill="none" 
    stroke={color} 
    viewBox="0 0 24 24"
    aria-hidden="true"
    role="img"
  >
    <path 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      strokeWidth={strokeWidth} 
      d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" 
    />
  </svg>
);

export const HeartIcon: React.FC<IconProps> = ({ 
  className = '', 
  size = 'md', 
  color = 'currentColor',
  strokeWidth = 2 
}) => (
  <svg 
    className={`${sizeClasses[size]} ${className}`}
    fill="none" 
    stroke={color} 
    viewBox="0 0 24 24"
    aria-hidden="true"
    role="img"
  >
    <path 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      strokeWidth={strokeWidth} 
      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" 
    />
  </svg>
); 