import React from "react";
import Image from "next/image";

const HeroSection = () => {
  return (
    <section className="w-full relative h-[400px] sm:h-[500px] md:h-[600px] lg:h-[700px] bg-primary flex items-center justify-center pt-16 sm:pt-20">
      <Image
        src="/tactical-bot.png"
        alt="Tactics Board"
        layout="fill"
        objectFit="cover"
        className="opacity-70"
        priority
      />
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-transparent" />
      {/* Main Heading and Button */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-10 px-4 sm:px-6 text-center">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-white mb-4 sm:mb-6 drop-shadow-2xl leading-tight">
          Unlock Football Tactics with
        </h1>
        <p className="text-gray-200 text-center max-w-xs sm:max-w-lg md:max-w-2xl mb-6 sm:mb-8 text-sm sm:text-base md:text-lg lg:text-xl drop-shadow leading-relaxed">
          Dive deep into football strategies with our AI-powered chatbot. Analyze formations, player scenarios to elevate your understanding of the beautiful game.
        </p>
        <a
          href="/chat-with-bot"
          className="bg-gradient-to-r from-secondary to-secondary-dark border-2 border-secondary-dark text-white font-bold py-2 sm:py-3 px-6 sm:px-8 rounded-full shadow-xl text-sm sm:text-base lg:text-lg transition transform hover:scale-110 hover:shadow-2xl hover:from-secondary-dark hover:to-secondary focus:outline-none focus:ring-4 focus:ring-secondary/50 active:scale-100"
        >
          Start Chatting
        </a>
      </div>
    </section>
  );
};

export default HeroSection;