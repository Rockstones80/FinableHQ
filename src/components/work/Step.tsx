"use client";
import { useState, useEffect } from "react";
import {
  Target,
  Heart,
  UserPlus,
  Edit3,
  CheckCircle,
  Share2,
  Banknote,
  Search,
  CreditCard,
  Bell,
  Star,
  ArrowRight,
  LucideIcon,
} from "lucide-react";
import Button from "../ui/Button";

interface Step {
  icon: LucideIcon;
  title: string;
  description: string;
  duration: string;
  highlight: string;
}

const StepByStepSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"campaigners" | "donors">(
    "campaigners"
  );
  const [currentStep, setCurrentStep] = useState<number>(0);

  const campaignerSteps: Step[] = [
    {
      icon: UserPlus,
      title: "Create Your Account",
      description:
        "Sign up with your email or phone number. Verify your identity with your BVN or student ID for added credibility.",
      duration: "2 minutes",
      highlight: "Free & secure signup",
    },
    {
      icon: Edit3,
      title: "Build Your Campaign",
      description:
        "Choose your category (education, innovation, emergency), set your goal amount, add compelling photos/videos, and tell your story.",
      duration: "10-15 minutes",
      highlight: "Easy drag-and-drop builder",
    },
    {
      icon: CheckCircle,
      title: "Submit for Review",
      description:
        "Our team reviews your campaign for authenticity and quality. We help you optimize it for maximum impact.",
      duration: "24-48 hours",
      highlight: "95% approval rate",
    },
    {
      icon: Share2,
      title: "Share & Promote",
      description:
        "Share your campaign link on WhatsApp, Instagram, Twitter, and Facebook. We provide sharing templates and tips.",
      duration: "Ongoing",
      highlight: "Built-in social tools",
    },
    {
      icon: Banknote,
      title: "Receive Your Funds",
      description:
        "Funds are automatically transferred to your bank account when milestones are reached or campaigns end successfully.",
      duration: "3-5 business days",
      highlight: "Secure instant payouts",
    },
  ];

  const donorSteps: Step[] = [
    {
      icon: Search,
      title: "Discover Campaigns",
      description:
        "Browse by category, location, or search for specific causes. Filter by students in your area or university.",
      duration: "Browse anytime",
      highlight: "Smart recommendations",
    },
    {
      icon: Heart,
      title: "Choose Your Impact",
      description:
        "Select campaigns that resonate with you. Read full stories, see progress updates, and check campaign authenticity.",
      duration: "Take your time",
      highlight: "Verified campaigns only",
    },
    {
      icon: CreditCard,
      title: "Make Your Donation",
      description:
        "Choose your amount and payment method - bank transfer, card, USSD, or mobile money. Donate anonymously or publicly.",
      duration: "30 seconds",
      highlight: "All major payment methods",
    },
    {
      icon: Bell,
      title: "Stay Connected",
      description:
        "Get updates as campaigns progress. Receive thank-you messages and see how your contribution made a difference.",
      duration: "Throughout campaign",
      highlight: "Real-time notifications",
    },
  ];

  useEffect(() => {
    // Reset to step 0 when tab changes
    setCurrentStep(0);
    
    const timer = setInterval(() => {
      setCurrentStep(
        (prev) =>
          (prev + 1) %
          (activeTab === "campaigners"
            ? campaignerSteps.length
            : donorSteps.length)
      );
    }, 4000);

    return () => clearInterval(timer);
  }, [activeTab, campaignerSteps.length, donorSteps.length]);

  const currentSteps =
    activeTab === "campaigners" ? campaignerSteps : donorSteps;

  return (
    <div className="bg-gradient-to-br from-green-50 to-white relative">
      <style jsx>{`
        .floating-animation {
          animation: float 6s ease-in-out infinite;
        }

        .floating-animation:nth-child(2) {
          animation-delay: -2s;
        }

        .floating-animation:nth-child(3) {
          animation-delay: -4s;
        }

        .floating-animation:nth-child(4) {
          animation-delay: -1s;
        }

        .floating-animation:nth-child(5) {
          animation-delay: -3s;
        }

        .floating-animation:nth-child(6) {
          animation-delay: -5s;
        }

        .floating-animation:nth-child(7) {
          animation-delay: -1.5s;
        }

        .floating-animation:nth-child(8) {
          animation-delay: -3.5s;
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(5deg);
          }
        }

        .glow-effect {
          box-shadow: 0 4px 20px rgba(16, 185, 129, 0.08);
          transition: all 0.3s ease;
        }

        .glow-effect:hover {
          box-shadow: 0 8px 30px rgba(16, 185, 129, 0.15);
          transform: translateY(-2px);
        }

        .pulse-animation {
          animation: pulse 2s infinite;
        }

        @keyframes pulse {
          0%,
          100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
        }

        .tab-active {
          background: linear-gradient(135deg, #10b981, #059669);
          color: white;
          box-shadow: 0 8px 25px rgba(16, 185, 129, 0.3);
          border: none;
        }

        .tab-inactive {
          background: white;
          color: #374151;
          border: 2px solid #10b981;
          transition: all 0.3s ease;
        }

        .tab-inactive:hover {
          background: rgba(16, 185, 129, 0.1);
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(16, 185, 129, 0.2);
        }

        .tab-button {
          position: relative;
          overflow: hidden;
          transition: all 0.3s ease;
        }

        .tab-button::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
          transition: left 0.5s ease;
        }

        .tab-button:hover::before {
          left: 100%;
        }

        .step-active {
          transform: scale(1.05);
          box-shadow: 0 8px 30px rgba(16, 185, 129, 0.2);
        }
      `}</style>

      {/* Enhanced floating bubbles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Large bubbles */}
        <div className="floating-animation absolute top-32 left-10 w-20 h-20 bg-green-200 rounded-full opacity-40 blur-sm"></div>
        <div className="floating-animation absolute top-52 right-20 w-16 h-16 bg-green-300 rounded-full opacity-50"></div>
        <div className="floating-animation absolute bottom-32 left-20 w-24 h-24 bg-green-100 rounded-full opacity-35 blur-sm"></div>
        
        {/* Additional smaller bubbles */}
        <div className="floating-animation absolute top-20 right-40 w-12 h-12 bg-green-500 rounded-full opacity-30"></div>
        <div className="floating-animation absolute top-80 left-40 w-14 h-14 bg-green-200 rounded-full opacity-40 blur-sm"></div>
        <div className="floating-animation absolute top-60 left-60 w-8 h-8 bg-green-400 rounded-full opacity-35"></div>
        
        {/* Gradient bubbles */}
        <div className="floating-animation absolute top-40 right-60 w-22 h-22 bg-gradient-to-br from-green-200 to-green-400 rounded-full opacity-30 blur-sm"></div>
        <div className="floating-animation absolute bottom-60 left-32 w-16 h-16 bg-gradient-to-tr from-green-100 to-green-300 rounded-full opacity-40"></div>
      </div>

      <section id="getting-started" className="py-16 px-4">
        <div className="max-w-6xl mx-auto relative z-10">

          {/* Tab Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <button
              type="button"
              onClick={() => setActiveTab("campaigners")}
              className={`px-8 py-4 font-semibold rounded-xl tab-button flex items-center gap-3 ${
                activeTab === "campaigners"
                  ? "tab-active"
                  : "tab-inactive"
              }`}
            >
              <Target className="w-6 h-6" />
              For Campaigners (Raise Funds)
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("donors")}
              className={`px-8 py-4 font-semibold rounded-xl tab-button flex items-center gap-3 ${
                activeTab === "donors" ? "tab-active" : "tab-inactive"
              }`}
            >
              <Heart className="w-6 h-6" />
              For Donors (Support Causes)
            </button>
          </div>

          {/* Steps Display */}
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Left Side - Step List */}
            <div className="space-y-6">
              {currentSteps.map((step, index) => (
                <div
                  key={index}
                  className={`bg-white rounded-2xl p-6 shadow-lg glow-effect transition-all duration-300 ${
                    currentStep === index ? "step-active" : ""
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                        currentStep === index
                          ? "bg-gradient-to-br from-green-400 to-green-600 text-white"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      <step.icon className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-xl font-bold text-black">
                          Step {index + 1}: {step.title}
                        </h3>
                        <span className="bg-green-100 text-green-600 px-2 py-1 rounded-full text-xs font-semibold">
                          {step.duration}
                        </span>
                      </div>
                      <p className="text-gray-600 mb-3">{step.description}</p>
                      <div className="flex items-center gap-2">
                        <Star className="w-4 h-4 text-green-500" />
                        <span className="text-sm text-green-600 font-medium">
                          {step.highlight}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Right Side - Visual/Animation */}
            <div className="lg:sticky lg:top-32">
              <div className="bg-white rounded-3xl p-8 shadow-xl glow-effect">
                <div className="text-center mb-6">
                  <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6 pulse-animation">
                    {activeTab === "campaigners" ? (
                      <Target className="w-12 h-12 text-white" />
                    ) : (
                      <Heart className="w-12 h-12 text-white" />
                    )}
                  </div>
                  <h3 className="text-2xl font-bold text-black mb-2">
                    {activeTab === "campaigners"
                      ? "Launch Your Campaign"
                      : "Make Your Impact"}
                  </h3>
                  <p className="text-gray-600">
                    {activeTab === "campaigners"
                      ? "Turn your dreams into reality with community support"
                      : "Support causes that matter to you and see real impact"}
                  </p>
                </div>

                {/* Progress Indicator */}
                <div className="mb-6">
                  <div className="flex justify-between text-sm text-gray-500 mb-2">
                    <span>Progress</span>
                    <span>
                      Step {currentStep + 1} of {currentSteps.length}
                    </span>
                  </div>
                  <div className="bg-gray-200 rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-green-400 to-green-600 rounded-full h-2 transition-all duration-1000"
                      style={{
                        width: `${Math.min(
                          ((currentStep + 1) / currentSteps.length) * 100,
                          100
                        )}%`,
                      }}
                    ></div>
                  </div>
                </div>
                   <div className=" flex justify-center items-center">
                <Button
                  type="button"
                  title={
                    activeTab === "campaigners"
                      ? "Start My Campaign"
                      : "Browse Campaigns"
                  }
                 className="py-[8px] px-6 text-white bg-green-600 cursor-pointer shadow-md rounded-sm transition-transform hover:-translate-y-1 font-semibold"
                />
                    </div>   
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default StepByStepSection;