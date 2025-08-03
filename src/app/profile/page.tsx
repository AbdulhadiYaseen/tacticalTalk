"use client";

import { useAuth } from "../lib/auth";
import { useEffect } from "react";

export default function ProfilePage() {
  const { isAuthenticated, isLoading, redirectToLogin } = useAuth();

  // Handle authentication
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      redirectToLogin();
    }
  }, [isAuthenticated, isLoading, redirectToLogin]);

  // Show loading while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-primary">
        <div className="text-xl text-white">Loading...</div>
      </div>
    );
  }

  // Don't render the page if not authenticated
  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-primary pt-20">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-gray-800 rounded-lg shadow-xl p-8">
          <h1 className="text-3xl font-bold text-white mb-6">My Profile</h1>
          
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gradient-to-r from-secondary to-secondary-dark rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <h2 className="text-xl font-semibold text-white">Football Tactician</h2>
                <p className="text-gray-400">⚽ Tactical Talk Member</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gray-700 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Account Information</h3>
                <div className="space-y-3">
                  <div>
                    <label className="block text-gray-400 text-sm">Name</label>
                    <p className="text-white">Coming Soon</p>
                  </div>
                  <div>
                    <label className="block text-gray-400 text-sm">Email</label>
                    <p className="text-white">Coming Soon</p>
                  </div>
                  <div>
                    <label className="block text-gray-400 text-sm">Member Since</label>
                    <p className="text-white">Coming Soon</p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-700 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Activity Stats</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Chat Sessions</span>
                    <span className="text-white">Coming Soon</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Tactics Viewed</span>
                    <span className="text-white">Coming Soon</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Favorite Formation</span>
                    <span className="text-white">Coming Soon</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-700 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
              <div className="grid md:grid-cols-3 gap-4">
                <button className="bg-secondary hover:bg-secondary-dark text-white font-semibold py-2 px-4 rounded-lg transition">
                  Edit Profile
                </button>
                <button className="bg-gray-600 hover:bg-gray-500 text-white font-semibold py-2 px-4 rounded-lg transition">
                  Change Password
                </button>
                <button className="bg-gray-600 hover:bg-gray-500 text-white font-semibold py-2 px-4 rounded-lg transition">
                  Export Data
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 