"use client";

import { useAuth } from "../lib/auth";
import { useEffect, useState } from "react";

export default function SettingsPage() {
  const { isAuthenticated, isLoading, redirectToLogin } = useAuth();
  const [activeTab, setActiveTab] = useState("general");

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

  const tabs = [
    { id: "general", name: "General", icon: "⚙️" },
    { id: "notifications", name: "Notifications", icon: "🔔" },
    { id: "privacy", name: "Privacy", icon: "🔒" },
    { id: "account", name: "Account", icon: "👤" },
  ];

  return (
    <div className="min-h-screen bg-primary pt-20">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="bg-gray-800 rounded-lg shadow-xl overflow-hidden">
          <div className="px-8 py-6 border-b border-gray-700">
            <h1 className="text-3xl font-bold text-white">Settings</h1>
            <p className="text-gray-400 mt-1">Manage your account preferences and settings</p>
          </div>

          <div className="flex">
            {/* Sidebar */}
            <div className="w-64 bg-gray-700 p-6">
              <nav className="space-y-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition ${
                      activeTab === tab.id
                        ? "bg-secondary text-white"
                        : "text-gray-300 hover:bg-gray-600 hover:text-white"
                    }`}
                  >
                    <span className="text-lg">{tab.icon}</span>
                    <span className="font-medium">{tab.name}</span>
                  </button>
                ))}
              </nav>
            </div>

            {/* Content */}
            <div className="flex-1 p-8">
              {activeTab === "general" && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-semibold text-white">General Settings</h2>
                  
                  <div className="bg-gray-700 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-white mb-4">Language & Region</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-gray-400 text-sm mb-2">Language</label>
                        <select className="w-full bg-gray-600 text-white rounded-lg px-3 py-2 border border-gray-500">
                          <option>English</option>
                          <option>Spanish</option>
                          <option>French</option>
                          <option>German</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-gray-400 text-sm mb-2">Time Zone</label>
                        <select className="w-full bg-gray-600 text-white rounded-lg px-3 py-2 border border-gray-500">
                          <option>UTC-8 (Pacific Time)</option>
                          <option>UTC-5 (Eastern Time)</option>
                          <option>UTC+0 (GMT)</option>
                          <option>UTC+1 (Central European Time)</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-700 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-white mb-4">Theme</h3>
                    <div className="space-y-3">
                      <label className="flex items-center space-x-3">
                        <input type="radio" name="theme" value="dark" defaultChecked className="text-secondary" />
                        <span className="text-white">Dark Mode</span>
                      </label>
                      <label className="flex items-center space-x-3">
                        <input type="radio" name="theme" value="light" className="text-secondary" />
                        <span className="text-white">Light Mode (Coming Soon)</span>
                      </label>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "notifications" && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-semibold text-white">Notification Settings</h2>
                  
                  <div className="bg-gray-700 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-white mb-4">Email Notifications</h3>
                    <div className="space-y-4">
                      <label className="flex items-center justify-between">
                        <span className="text-white">New features and updates</span>
                        <input type="checkbox" defaultChecked className="toggle" />
                      </label>
                      <label className="flex items-center justify-between">
                        <span className="text-white">Weekly tactical tips</span>
                        <input type="checkbox" defaultChecked className="toggle" />
                      </label>
                      <label className="flex items-center justify-between">
                        <span className="text-white">Account security alerts</span>
                        <input type="checkbox" defaultChecked className="toggle" />
                      </label>
                    </div>
                  </div>

                  <div className="bg-gray-700 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-white mb-4">Push Notifications</h3>
                    <div className="space-y-4">
                      <label className="flex items-center justify-between">
                        <span className="text-white">Browser notifications</span>
                        <input type="checkbox" className="toggle" />
                      </label>
                      <label className="flex items-center justify-between">
                        <span className="text-white">Chat responses</span>
                        <input type="checkbox" className="toggle" />
                      </label>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "privacy" && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-semibold text-white">Privacy Settings</h2>
                  
                  <div className="bg-gray-700 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-white mb-4">Data & Privacy</h3>
                    <div className="space-y-4">
                      <label className="flex items-center justify-between">
                        <span className="text-white">Save chat history</span>
                        <input type="checkbox" defaultChecked className="toggle" />
                      </label>
                      <label className="flex items-center justify-between">
                        <span className="text-white">Analytics and performance data</span>
                        <input type="checkbox" defaultChecked className="toggle" />
                      </label>
                      <label className="flex items-center justify-between">
                        <span className="text-white">Personalized recommendations</span>
                        <input type="checkbox" defaultChecked className="toggle" />
                      </label>
                    </div>
                  </div>

                  <div className="bg-gray-700 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-white mb-4">Data Management</h3>
                    <div className="space-y-3">
                      <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition">
                        Download My Data
                      </button>
                      <button className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg transition">
                        Delete My Data
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "account" && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-semibold text-white">Account Settings</h2>
                  
                  <div className="bg-gray-700 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-white mb-4">Security</h3>
                    <div className="space-y-4">
                      <button className="bg-secondary hover:bg-secondary-dark text-white font-semibold py-2 px-4 rounded-lg transition">
                        Change Password
                      </button>
                      <button className="bg-gray-600 hover:bg-gray-500 text-white font-semibold py-2 px-4 rounded-lg transition">
                        Enable Two-Factor Authentication
                      </button>
                      <button className="bg-gray-600 hover:bg-gray-500 text-white font-semibold py-2 px-4 rounded-lg transition">
                        View Login History
                      </button>
                    </div>
                  </div>

                  <div className="bg-gray-700 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-white mb-4">Danger Zone</h3>
                    <div className="space-y-3">
                      <button className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg transition">
                        Delete Account
                      </button>
                      <p className="text-gray-400 text-sm">
                        This action cannot be undone. All your data will be permanently deleted.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <div className="mt-8 flex justify-end space-x-4">
                <button className="bg-gray-600 hover:bg-gray-500 text-white font-semibold py-2 px-6 rounded-lg transition">
                  Cancel
                </button>
                <button className="bg-secondary hover:bg-secondary-dark text-white font-semibold py-2 px-6 rounded-lg transition">
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 