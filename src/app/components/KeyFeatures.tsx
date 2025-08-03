import React from "react";
import Image from "next/image";

const features = [
  {
    title: "Formation Analysis",
    description:
      "Analyze various football formations, including 4-3-3, 4-4-2, and 3-5-2, with detailed explanations of player roles and responsibilities.",
    image: "/formation.png",
  },
  {
    title: "Scenario Simulations",
    description:
      "Simulate different game scenarios to understand how tactical changes can affect the outcome of a match.",
    image: "/simulate-scenarios.png",
  },
  {
    title: "Real-Time Updates",
    description:
      "Stay updated with the latest tactical trends and insights from professional football leagues around the world.",
    image: "/real-time-updates.png",
  },
];

const KeyFeatures = () => {
  return (
    <section className="w-full bg-primary py-8 sm:py-12 md:py-16 px-4 sm:px-6 flex flex-col items-center">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 sm:mb-4 text-center">Key Features</h2>
      <p className="text-gray-300 text-center max-w-xs sm:max-w-lg md:max-w-2xl mb-4 sm:mb-6 text-sm sm:text-base leading-relaxed">
        Explore the core functionalities that make our chatbot a valuable tool for football enthusiasts:
      </p>
      <a
        href="#"
        className="bg-gradient-to-r from-secondary to-secondary-dark border-2 border-secondary-dark text-white font-bold py-2 sm:py-3 px-6 sm:px-8 rounded-full shadow-xl text-sm sm:text-base lg:text-lg transition transform hover:scale-110 hover:shadow-2xl hover:from-secondary-dark hover:to-secondary focus:outline-none focus:ring-4 focus:ring-secondary/50 active:scale-100 mb-8 sm:mb-10"
      >
        Learn More
      </a>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 w-full max-w-xs sm:max-w-2xl lg:max-w-5xl">
        {features.map((feature, idx) => (
          <div
            key={idx}
            className="bg-[#181C20] rounded-xl p-0 flex flex-col items-center shadow-lg transition duration-300 transform hover:scale-105 hover:shadow-2xl hover:z-10"
          >
            <div className="w-full h-32 sm:h-40 md:h-48 relative rounded-t-xl overflow-hidden">
              <Image
                src={feature.image}
                alt={feature.title}
                layout="fill"
                objectFit="cover"
                className=""
                priority={idx === 0}
              />
            </div>
            <div className="p-4 sm:p-6 flex flex-col items-center">
              <h3 className="text-lg sm:text-xl font-semibold text-white mb-2 text-center">{feature.title}</h3>
              <p className="text-gray-400 text-center text-xs sm:text-sm leading-relaxed">{feature.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default KeyFeatures; 