"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useAuth } from "../lib/auth";

const categories = [
  { id: "attacking", name: "Attacking", color: "bg-green-600" },
  { id: "defending", name: "Defending", color: "bg-red-600" },
  { id: "set-pieces", name: "Set Pieces", color: "bg-secondary" },
  { id: "transitions", name: "Transitions", color: "bg-blue-600" },
  { id: "tactical-analysis", name: "Tactical Analysis", color: "bg-purple-600" }
];

const featuredTactics = [
  {
    id: "1",
    title: "4-3-3 Attacking",
    description: "A dynamic attacking formation focusing on width and quick transitions.",
    image: "/formation.jpeg",
    category: "attacking"
  },
  {
    id: "2", 
    title: "4-4-2 Defensive",
    description: "A solid defensive setup with two banks of four, emphasizing compactness.",
    image: "/formation.jpeg",
    category: "defending"
  },
  {
    id: "3",
    title: "Corner Kick Strategy", 
    description: "A set-piece routine designed to exploit defensive weaknesses.",
    image: "/CoachAndHisBoard.jpg",
    category: "set-pieces"
  },
  {
    id: "4",
    title: "Counter-Attack",
    description: "A strategy to quickly transition from defense to attack, catching opponents off guard.",
    image: "/managerOnPitch.jpg", 
    category: "transitions"
  }
];

const allTactics = [
  {
    id: "5",
    title: "3-5-2 Formation",
    description: "A flexible formation with three central defenders and wing-backs.",
    image: "/formation.jpeg",
    category: "attacking"
  },
  {
    id: "6",
    title: "4-2-3-1 Formation", 
    description: "A versatile formation with two holding midfielders and an attacking midfielder.",
    image: "/formation.jpeg",
    category: "attacking"
  },
  {
    id: "7",
    title: "High Press",
    description: "A tactic to win the ball back high up the pitch.",
    image: "/managerOnPitch.jpg",
    category: "defending"
  },
  {
    id: "8", 
    title: "Low Block",
    description: "A defensive strategy to protect the goal by staying deep.",
    image: "/CoachAndHisBoard.jpg",
    category: "defending"
  },
  {
    id: "9",
    title: "Direct Play",
    description: "A style of play focusing on quick, forward passes.",
    image: "/formation.jpeg",
    category: "transitions"
  },
  {
    id: "10",
    title: "Possession-Based Play",
    description: "A style of play emphasizing ball control and patient build-up.",
    image: "/managerOnPitch.jpg",
    category: "tactical-analysis"
  }
];

export default function TacticsLibraryPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const {isAuthenticated, isLoading, redirectToLogin} = useAuth();

  useEffect(()=>{
    if(!isLoading && !isAuthenticated){
      redirectToLogin()
    }
  }, [isLoading, isAuthenticated, redirectToLogin]);

  if(isLoading){
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  if(!isAuthenticated){
    return null;
  }
  const filteredTactics = selectedCategory === "all" 
    ? allTactics 
    : allTactics.filter(tactic => tactic.category === selectedCategory);

  return (
    <div className="min-h-screen bg-primary">
      {/* Hero Section */}
      <div className="relative h-screen bg-cover bg-center bg-no-repeat" style={{backgroundImage: "url('/tactics-library.png')"}}>
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>
        
        {/* Hero Content */}
        <div className="relative z-10 flex items-center justify-center h-full px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
              ⚽ Tactics Library
            </h1>
            <p className="text-xl sm:text-2xl text-gray-200 mb-8 leading-relaxed">
              Master the beautiful game with our comprehensive collection of football tactics, 
              formations, and strategic insights from the world's best coaches.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {/* <button className="bg-secondary hover:bg-secondary-dark text-white font-bold py-4 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-xl">
                Explore Tactics
              </button>
              <button className="border-2 border-white text-white hover:bg-white hover:text-primary font-bold py-4 px-8 rounded-full transition-all duration-300 transform hover:scale-105">
                Learn More
              </button> */}
            </div>
          </div>
        </div>

        {/* Scroll Down Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white animate-bounce">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
        </div>

      {/* Main Content */}
      <div className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Categories Section */}
        <div>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4 sm:mb-0">Categories</h2>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedCategory("all")}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedCategory === "all"
                    ? "bg-secondary text-white"
                    : "bg-[#181C20] text-gray-300 hover:bg-secondary hover:text-white"
                }`}
              >
                All
              </button>
              {categories.map((category) => (
                <button
                  key={`filter-${category.id}`}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    selectedCategory === category.id
                      ? "bg-secondary text-white"
                      : "bg-[#181C20] text-gray-300 hover:bg-secondary hover:text-white"
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {filteredTactics.map((tactic) => (
              <div
                key={tactic.id}
                className="bg-[#181C20] rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105"
              >
                <div className="relative h-32 sm:h-40">
                  <Image
                    src={tactic.image}
                    alt={tactic.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-base sm:text-lg font-bold text-white mb-2">{tactic.title}</h3>
                  <p className="text-gray-300 text-xs sm:text-sm leading-relaxed">{tactic.description}</p>
                </div>
              </div>
            ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}