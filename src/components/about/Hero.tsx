// components/about/HeroStorySection.tsx
import { Lightbulb } from 'lucide-react';

const HeroStorySection: React.FC = () => {

  return (
    <div className='bg-gradient-to-br from-green-50 to-white relative'>
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
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <div className="slide-in-up">
            <h1 className="text-6xl font-extrabold text-black mb-2">
              Our <span className="text-green-600">Story</span>
            </h1>
            <p className="font-medium text-gray-600 max-w-[735px] mx-auto">
              Bridging the gap between dreams and reality. We&apos;re a crowdfunding platform built to empower 
              Nigerians to raise funds for what matters from education to innovation.
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="pb-10 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-5xl font-extrabold text-black mb-4">Our Story</h2>
              <div className="space-y-4 text-lg font-medium text-justify text-gray-600 leading-relaxed">
                <p>
                  In Nigeria, great ideas often die in silence — not because they lack value, but because they lack funding. 
                  We saw brilliant students struggling to pay fees, innovative projects unable to launch, and communities 
                  in need without access to support.
                </p>
                <p>
                  <strong className="text-green-600">Finable was born out of necessity.</strong> We created a platform where 
                  dreams meet resources, where transparency builds trust, and where community support transforms lives.
                </p>
                <p>
                  Today, we&apos;re proud to be Nigeria&apos;s fastest-growing crowdfunding platform, helping thousands turn their 
                  aspirations into achievements.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="bg-white rounded-3xl shadow-2xl p-10 glow-effect">
                <div className="text-center mb-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6 pulse-animation">
                    <Lightbulb className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-extrabold text-black mb-4">The Spark</h3>
                </div>
                <p className="text-gray-600 text-center text-lg italic font-medium">
                  &quot;Every great achievement starts with someone who believed it was possible, 
                  even when others couldn&apos;t see it yet.&quot;
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HeroStorySection;