"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isCheckingAuth, setIsCheckingAuth] = useState(false);
  const router = useRouter();

  // Check for existing valid token on component mount
  useEffect(() => {
    const checkExistingAuth = async () => {
      const adminToken = localStorage.getItem("adminToken");
      const adminLoggedIn = localStorage.getItem("adminLoggedIn");
      const adminUsername = localStorage.getItem("adminUsername");
      
      if (!adminToken || adminLoggedIn !== "true" || !adminUsername) {
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
          // Token is valid, redirect to dashboard
          router.push("/dashboard");
        } else {
          // Token is invalid, clear auth data
          localStorage.removeItem("adminLoggedIn");
          localStorage.removeItem("adminUsername");
          localStorage.removeItem("adminToken");
          localStorage.removeItem("adminData");
        }
      } catch (error) {
        // Network error, clear auth data
        localStorage.removeItem("adminLoggedIn");
        localStorage.removeItem("adminUsername");
        localStorage.removeItem("adminToken");
        localStorage.removeItem("adminData");
      }
      
      setIsLoading(false);
    };

    checkExistingAuth();
  }, [router]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsCheckingAuth(true);
    
    const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL || "https://server.mukulsharma1602.workers.dev";
    console.log(serverUrl);
    fetch(`${serverUrl}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          setError(data.error);
        } else {
          // Store JWT token and admin data
          localStorage.setItem("adminLoggedIn", "true");
          localStorage.setItem("adminUsername", data.admin.username);
          localStorage.setItem("adminToken", data.token);
          localStorage.setItem("adminData", JSON.stringify(data.admin));
          router.push("/dashboard");
        }
      })
      .catch((err) => setError("An error occurred"))
      .finally(() => setIsCheckingAuth(false));
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center px-4 py-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Checking authentication...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center px-4 py-8">
      <div className="max-w-md w-full bg-white rounded-xl shadow-2xl p-8 border border-gray-200">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-3">Admin Login</h1>
          <p className="text-gray-600 text-base leading-relaxed">Enter your credentials to access the admin panel</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label htmlFor="username" className="block text-sm font-semibold text-gray-700 mb-3">
              Username
            </label>
            <input
              type="username"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 text-gray-800 placeholder-gray-500"
              placeholder="admin"
              required
              disabled={isCheckingAuth}
              suppressHydrationWarning
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-3">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 pr-12 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 text-gray-800 placeholder-gray-500 disabled:bg-gray-50 disabled:cursor-not-allowed"
                placeholder="Enter your password"
                required
                disabled={isCheckingAuth}
                suppressHydrationWarning
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none focus:text-gray-700 transition-colors duration-200 disabled:cursor-not-allowed"
                disabled={isCheckingAuth}
                suppressHydrationWarning
              >
                {showPassword ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {error && (
            <div className="text-red-700 text-sm text-center bg-red-100 border border-red-200 p-4 rounded-lg font-medium">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isCheckingAuth}
            className="w-full bg-orange-500 text-white py-3 px-6 rounded-lg hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 transition-all duration-200 font-semibold text-base shadow-lg hover:shadow-xl disabled:bg-orange-400 disabled:cursor-not-allowed flex items-center justify-center"
            suppressHydrationWarning
          >
            {isCheckingAuth ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Signing In...
              </>
            ) : (
              'Sign In'
            )}
          </button>
        </form>
      </div>
    </div>
  );
} 