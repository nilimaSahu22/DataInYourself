"use client";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { clearAuthData } from "../utils/authUtils";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check authentication on component mount
    const checkAuth = async () => {
      const adminToken = localStorage.getItem("adminToken");
      const adminLoggedIn = localStorage.getItem("adminLoggedIn");
      const adminUsername = localStorage.getItem("adminUsername");
      
      if (!adminToken || adminLoggedIn !== "true" || !adminUsername) {
        // Clear any invalid auth data
        clearAuthData();
        router.push("/login");
        setIsLoading(false);
        return;
      }

      // Validate JWT token with backend
      try {
        const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL || "https://server.mukulsharma1602.workers.dev";
        const response = await fetch(`${serverUrl}/verify-token`, {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${adminToken}`
          }
        });

        if (response.ok) {
          setIsAuthenticated(true);
        } else {
          // Token is invalid, clear auth data and redirect
          clearAuthData();
          router.push("/login");
        }
      } catch (error) {
        // Network error or other issues, clear auth data and redirect
        clearAuthData();
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