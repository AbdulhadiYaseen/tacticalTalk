"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import AuthLayout from "../components/AuthLayout";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    if (!name || !email || !password || !confirm) {
      setError("Please fill in all fields.");
      setIsLoading(false);
      return;
    }
    if (password !== confirm) {
      setError("Passwords do not match.");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        
        router.push("/login");
      } else {
        setError(data.error || "Signup failed");
      }
    } catch (error) {
      setError("Network error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout>
      <form
        onSubmit={handleSubmit}
        className="bg-[#181C20] p-8 rounded-xl shadow-lg w-full flex flex-col space-y-6"
      >
        <h1 className="text-2xl font-bold text-white text-center mb-2">Sign Up</h1>
        {error && (
          <div className="bg-red-600 text-white text-sm rounded p-2 text-center">{error}</div>
        )}
        <div>
          <label className="block text-gray-300 mb-1" htmlFor="name">
            Name
          </label>
          <input
            id="name"
            type="text"
            className="w-full px-4 py-2 rounded-lg bg-primary border border-secondary-dark text-white focus:outline-none focus:ring-2 focus:ring-secondary"
            value={name}
            onChange={e => setName(e.target.value)}
            autoComplete="name"
            disabled={isLoading}
          />
        </div>
        <div>
          <label className="block text-gray-300 mb-1" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            type="email"
            className="w-full px-4 py-2 rounded-lg bg-primary border border-secondary-dark text-white focus:outline-none focus:ring-2 focus:ring-secondary"
            value={email}
            onChange={e => setEmail(e.target.value)}
            autoComplete="email"
            disabled={isLoading}
          />
        </div>
        <div>
          <label className="block text-gray-300 mb-1" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            type="password"
            className="w-full px-4 py-2 rounded-lg bg-primary border border-secondary-dark text-white focus:outline-none focus:ring-2 focus:ring-secondary"
            value={password}
            onChange={e => setPassword(e.target.value)}
            autoComplete="new-password"
            disabled={isLoading}
          />
        </div>
        <div>
          <label className="block text-gray-300 mb-1" htmlFor="confirm">
            Confirm Password
          </label>
          <input
            id="confirm"
            type="password"
            className="w-full px-4 py-2 rounded-lg bg-primary border border-secondary-dark text-white focus:outline-none focus:ring-2 focus:ring-secondary"
            value={confirm}
            onChange={e => setConfirm(e.target.value)}
            autoComplete="new-password"
            disabled={isLoading}
          />
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="bg-gradient-to-r from-secondary to-secondary-dark border-2 border-secondary-dark text-white font-bold py-2 rounded-full shadow-xl text-base transition transform hover:scale-105 hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-secondary/50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? "Creating account..." : "Sign Up"}
        </button>
        <div className="text-center text-gray-400 text-sm">
          Already have an account?{" "}
          <Link href="/login" className="text-secondary hover:underline">
            Log in
          </Link>
        </div>
      </form>
    </AuthLayout>
  );
}