"use client";
import HeroSection from "../../components/work/Hero";
import StepByStepSection from "../../components/work/Step";
import SecuritySection from "../../components/work/Security";


const HowItWorks: React.FC = () => {
  const scrollToSection = (sectionId: string): void => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen">
      <div className="relative z-10">
        <HeroSection scrollToSection={scrollToSection} />
        <StepByStepSection />
        <SecuritySection />
      </div>
    </div>
  );
};

export default HowItWorks;
