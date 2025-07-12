"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Fake login logic - replace with real authentication later
    if (email === "admin@example.com" && password === "admin123") {
      // Set some session state (you can use localStorage or cookies)
      localStorage.setItem("adminLoggedIn", "true");
      router.push("/dashboard");
    } else {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center px-4 py-8">
      <div className="max-w-md w-full bg-white rounded-xl shadow-2xl p-8 border border-gray-200">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-3">Admin Login</h1>
          <p className="text-gray-600 text-base leading-relaxed">Enter your credentials to access the admin panel</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-3">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 text-gray-800 placeholder-gray-500"
              placeholder="admin@example.com"
              required
              suppressHydrationWarning
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-3">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 text-gray-800 placeholder-gray-500"
              placeholder="Enter your password"
              required
              suppressHydrationWarning
            />
          </div>

          {error && (
            <div className="text-red-700 text-sm text-center bg-red-100 border border-red-200 p-4 rounded-lg font-medium">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-orange-500 text-white py-3 px-6 rounded-lg hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 transition-all duration-200 font-semibold text-base shadow-lg hover:shadow-xl"
            suppressHydrationWarning
          >
            Sign In
          </button>
        </form>

        <div className="mt-8 text-center p-4 bg-gray-50 rounded-lg border border-gray-200">
          <p className="text-sm text-gray-700 font-medium">
            Demo credentials: <span className="text-orange-600">admin@example.com</span> / <span className="text-orange-600">admin123</span>
          </p>
        </div>
      </div>
    </div>
  );
} 