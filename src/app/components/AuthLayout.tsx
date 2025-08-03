import React from "react";
import Image from "next/image";

export default function AuthLayout({
  children,
  title = "Tactical Talk",
}: {
  children: React.ReactNode;
  title?: string;
}) {
  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-primary">
      {/* Left: Logo and Features */}
      <div className="hidden md:flex flex-col items-center justify-center w-1/2 bg-[#181C20] relative px-8 py-12">
        <div className="flex flex-col items-center z-10 w-full">
          {/* Logo */}
          <div className="mb-4">
            <Image src="/favicon.ico" alt="Logo" width={64} height={64} />
          </div>
          {/* Website Name */}
          <h1 className="text-3xl font-extrabold text-secondary mb-2 tracking-wide">
            {title}
          </h1>
          <p className="text-gray-400 mb-8 text-center max-w-xs">
            Unlock football tactics with AI-powered chat.
          </p>
          {/* Features List */}
          <ul className="space-y-5 w-full max-w-xs">
            <li className="flex items-start space-x-3">
              <span className="text-secondary text-xl mt-1">💬</span>
              <span className="text-gray-200">Chat with an AI football coach about tactics, strategies, and player roles.</span>
            </li>
            <li className="flex items-start space-x-3">
              <span className="text-secondary text-xl mt-1">🔍</span>
              <span className="text-gray-200">Search for detailed breakdowns of football formations and tactical systems.</span>
            </li>
            <li className="flex items-start space-x-3">
              <span className="text-secondary text-xl mt-1">⚡</span>
              <span className="text-gray-200">Get instant answers to your football questions, from set pieces to pressing.</span>
            </li>
            <li className="flex items-start space-x-3">
              <span className="text-secondary text-xl mt-1">📊</span>
              <span className="text-gray-200">Learn about scenario simulations and real-time tactical trends.</span>
            </li>
          </ul>
        </div>
      </div>
      {/* Right: Form */}
      <div className="flex-1 flex items-center justify-center bg-primary">
        <div className="w-full max-w-md p-6 sm:p-8">{children}</div>
      </div>
    </div>
  );
}