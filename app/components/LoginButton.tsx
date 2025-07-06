"use client";

import { useState } from 'react';

export default function LoginButton() {
  const [isHovered, setIsHovered] = useState(false);

  const handleLogin = () => {
    // TODO: Implement login functionality
    console.log('Login button clicked');
  };

  return (
    <button
      onClick={handleLogin}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`
        px-6 py-2 rounded-lg font-medium transition-all duration-200
        ${isHovered 
          ? 'bg-blue-600 text-white shadow-lg transform scale-105' 
          : 'bg-blue-500 text-white hover:bg-blue-600'
        }
        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
      `}
      aria-label="Login to your account"
    >
      Login
    </button>
  );
} 