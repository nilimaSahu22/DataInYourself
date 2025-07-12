"use client";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check authentication on component mount
    const checkAuth = () => {
      const adminLoggedIn = localStorage.getItem("adminLoggedIn");
      const adminUsername = localStorage.getItem("adminUsername");
      
      // Check if user is logged in and has the correct username
      const expectedUsername = process.env.NEXT_PUBLIC_ADMIN_USERNAME || "admin@datainyourself";
      if (adminLoggedIn === "true" && adminUsername === expectedUsername) {
        setIsAuthenticated(true);
      } else {
        // Clear any invalid auth data
        localStorage.removeItem("adminLoggedIn");
        localStorage.removeItem("adminUsername");
        // Redirect to login
        router.push("/login");
      }
      setIsLoading(false);
    };

    checkAuth();
  }, [router]);

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Don't render admin content if not authenticated
  if (!isAuthenticated) {
    return null; // Will redirect to login
  }

  return <>{children}</>;
} 