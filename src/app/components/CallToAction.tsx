import React from "react";

const CallToAction = () => {
  return (
    <section className="w-full bg-primary py-12 sm:py-16 md:py-20 px-4 sm:px-6 flex flex-col items-center justify-center">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-6 sm:mb-8 text-center leading-tight">
        Ready to Elevate Your Football IQ?
      </h2>
      <a
        href="/chat-with-bot"
        className="bg-gradient-to-r from-secondary to-secondary-dark border-2 border-secondary-dark text-white font-bold py-3 sm:py-4 px-8 sm:px-10 rounded-full shadow-xl text-base sm:text-lg lg:text-xl transition transform hover:scale-110 hover:shadow-2xl hover:from-secondary-dark hover:to-secondary focus:outline-none focus:ring-4 focus:ring-secondary/50 active:scale-100"
      >
        Start Chatting
      </a>
    </section>
  );
};

export default CallToAction; 