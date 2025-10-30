'use client'
// components/pricing/PricingHero.tsx
import { Shield, Zap } from 'lucide-react';

const PricingHero: React.FC = () => {
  return (
    <section className="pt-32 pb-16 px-4 bg-gradient-to-br from-green-50 to-white">
        <style jsx>{`
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

            `}

        </style>
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
      <div className="max-w-4xl mx-auto text-center mt-16">
        <div className="slide-in-up">
          <h1 className="text-6xl font-extrabold text-black mb-4">
            Simple, <span className="text-green-600">Transparent</span> Pricing
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-4xl mx-auto leading-relaxed font-medium">
          Each donation has a small processing fee automatically deducted. Every other penny goes directly to your cause, where it belongs. Here’s how:
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 text-lg text-gray-600 mb-12">
            <div className="tab-active px-8 py-3 font-semibold rounded-xl tab-button flex items-center gap-3">
              <Shield className="w-6 h-6 text-white" />
              <span className="font-medium">100% Secure</span>
            </div>
            <div className="tab-inactive px-8 py-3 font-semibold rounded-xl tab-button flex items-center gap-3">
              <Zap className="w-6 h-6 text-green-60" />
              <span className="font-medium">Instant Payouts</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingHero;