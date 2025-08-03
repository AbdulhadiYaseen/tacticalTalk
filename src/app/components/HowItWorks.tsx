import React from "react";

const features = [
  {
    title: "In-Depth Analysis",
    description: "Get detailed breakdowns of formations, player movements, and tactical approaches used by top teams.",
    icon: (
      <svg className="w-6 h-6 sm:w-8 sm:h-8 text-secondary" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path d="M12 20l9-5-9-5-9 5 9 5z" />
        <path d="M12 12V4" />
      </svg>
    ),
  },
  {
    title: "Strategic Insights",
    description: "Understand the strengths and weaknesses of different strategies and how they impact game outcomes.",
    icon: (
      <svg className="w-6 h-6 sm:w-8 sm:h-8 text-secondary" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 6v6l4 2" />
      </svg>
    ),
  },
  {
    title: "Interactive Learning",
    description: "Engage in interactive conversations to explore various tactical scenarios and improve your knowledge.",
    icon: (
      <svg className="w-6 h-6 sm:w-8 sm:h-8 text-secondary" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <rect x="2" y="7" width="20" height="14" rx="2" />
        <path d="M16 3v4" />
        <path d="M8 3v4" />
      </svg>
    ),
  },
];

const HowItWorks = () => {
  return (
    <section className="w-full bg-primary py-8 sm:py-12 md:py-16 px-4 sm:px-6 flex flex-col items-center">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 sm:mb-4 text-center">How It Works</h2>
      <p className="text-gray-300 text-center max-w-xs sm:max-w-lg md:max-w-2xl mb-4 sm:mb-6 text-sm sm:text-base leading-relaxed">
        Our chatbot uses advanced AI to provide insights into football tactics. Here's how you can benefit:
      </p>
      <a
        href="#"
        className="bg-gradient-to-r from-secondary to-secondary-dark border-2 border-secondary-dark text-white font-bold py-2 sm:py-3 px-6 sm:px-8 rounded-full shadow-xl text-sm sm:text-base lg:text-lg transition transform hover:scale-110 hover:shadow-2xl hover:from-secondary-dark hover:to-secondary focus:outline-none focus:ring-4 focus:ring-secondary/50 active:scale-100 mb-8 sm:mb-10"
      >
        Explore Features
      </a>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8 w-full max-w-xs sm:max-w-2xl md:max-w-5xl">
        {features.map((feature, idx) => (
          <div
            key={idx}
            className="bg-[#181C20] rounded-xl p-4 sm:p-6 md:p-8 flex flex-col items-center shadow-lg transition duration-300 transform hover:scale-105 hover:shadow-2xl hover:z-10"
          >
            <div className="mb-3 sm:mb-4">{feature.icon}</div>
            <h3 className="text-lg sm:text-xl font-semibold text-white mb-2 text-center">{feature.title}</h3>
            <p className="text-gray-400 text-center text-xs sm:text-sm leading-relaxed">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;