// app/page.tsx
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import HowItWorks from "./components/HowItWorks";
import KeyFeatures from "./components/KeyFeatures";
import CallToAction from "./components/CallToAction";
import Footer from "./components/Footer";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <HowItWorks />
      <KeyFeatures />
      <CallToAction />
      <Footer />
    </>
  );
}
