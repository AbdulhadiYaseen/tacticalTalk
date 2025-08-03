"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "../lib/auth";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { isAuthenticated, isLoading, user } = useAuth();
  const router = useRouter();
  const profileRef = useRef<HTMLDivElement>(null);

  // Close profile dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
      });
      
      router.push("/");
      // Force reload to clear any cached data
      window.location.reload();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <nav className="w-full fixed top-0 left-0 z-20 bg-primary/80 backdrop-blur-md border-b border-secondary-dark shadow-lg">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4">
        {/* Logo/Brand */}
        <a href="#" className="flex items-center space-x-2 hover:opacity-80 transition">
          <Image src="/logo.png" alt="Logo" width={52} height={52} />
          <span className="text-white font-bold text-xl sm:text-2xl">⚽ Tactical Talk</span>
        </a>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center space-x-10">
          <a href="/" className="text-gray-100 hover:text-secondary transition font-medium">Home</a>
          <a href="#" className="text-gray-100 hover:text-secondary transition font-medium">Features</a>
          <a href="/tactics-library" className="text-gray-100 hover:text-secondary transition font-medium">Tactics Library</a>
          <a href="/chat-with-bot" className="text-gray-100 hover:text-secondary transition font-medium">Chat</a>
          <a href="#" className="text-gray-100 hover:text-secondary transition font-medium">Pricing</a>
        </div>

        {/* Desktop Auth Section */}
        {isLoading ? (
          <div className="hidden md:flex items-center">
            <div className="animate-pulse bg-gray-700 h-10 w-20 rounded"></div>
          </div>
        ) : !isAuthenticated ? (
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/login" className="border border-secondary-dark text-secondary px-4 py-2 rounded-lg font-semibold hover:bg-secondary hover:text-white transition">Login</Link>
            <Link href="/signup" className="bg-gradient-to-r from-secondary to-secondary-dark border-2 border-secondary-dark text-white font-semibold px-4 py-2 rounded-lg shadow transition hover:scale-105">Sign Up</Link>
          </div>
        ) : (
          <div className="hidden md:flex items-center space-x-4" ref={profileRef}>
            
            
            {/* Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center space-x-2 bg-secondary/20 hover:bg-secondary/30 border border-secondary-dark rounded-lg px-3 py-2 transition duration-200"
              >
                <div className="w-8 h-8 bg-gradient-to-r from-secondary to-secondary-dark rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-gray-100 font-medium">
                  {user?.name || "Profile"}
                </span>
                <svg className={`w-4 h-4 text-gray-100 transition-transform ${isProfileOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Dropdown Menu */}
              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-lg shadow-xl border border-gray-700 py-2 z-50">
                  <Link href="/profile" className="block px-4 py-2 text-gray-100 hover:bg-gray-700 transition flex items-center space-x-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <span>My Profile</span>
                  </Link>
                  <Link href="/settings" className="block px-4 py-2 text-gray-100 hover:bg-gray-700 transition flex items-center space-x-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span>Settings</span>
                  </Link>
                  <div className="border-t border-gray-700 my-1"></div>
            <button 
              onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-red-400 hover:bg-gray-700 transition flex items-center space-x-2"
            >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    <span>Logout</span>
            </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white p-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-primary/95 backdrop-blur-md border-t border-secondary-dark">
          <div className="px-4 py-2 space-y-2">
            <a href="/" className="block text-gray-100 hover:text-secondary transition font-medium py-2">Home</a>
            <a href="#" className="block text-gray-100 hover:text-secondary transition font-medium py-2">Features</a>
            <a href="/tactics-library" className="block text-gray-100 hover:text-secondary transition font-medium py-2">Tactics Library</a>
            <a href="/chat-with-bot" className="block text-gray-100 hover:text-secondary transition font-medium py-2">Chat</a>
            <a href="#" className="block text-gray-100 hover:text-secondary transition font-medium py-2">Pricing</a>
            {isLoading ? (
              <div className="animate-pulse bg-gray-700 h-10 w-full rounded mb-2"></div>
            ) : !isAuthenticated ? (
              <>
                <Link href="/login" className="block border border-secondary-dark text-secondary px-4 py-2 rounded-lg font-semibold hover:bg-secondary hover:text-white transition text-center">Login</Link>
                <Link href="/signup" className="block bg-gradient-to-r from-secondary to-secondary-dark border-2 border-secondary-dark text-white font-semibold px-4 py-2 rounded-lg shadow transition hover:scale-105 text-center">Sign Up</Link>
              </>
            ) : (
              <>
                
                <Link href="/profile" className="block text-gray-100 hover:text-secondary transition font-medium py-2">My Profile</Link>
                <Link href="/settings" className="block text-gray-100 hover:text-secondary transition font-medium py-2">Settings</Link>
                <button 
                  onClick={handleLogout}
                  className="block w-full border border-red-600 text-red-400 px-4 py-2 rounded-lg font-semibold hover:bg-red-600 hover:text-white transition text-center"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;