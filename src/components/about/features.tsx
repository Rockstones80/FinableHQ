// components/about/FeaturesSection.tsx
import { Shield, Zap, Users, CheckCircle, Globe, Heart } from 'lucide-react';
import { Feature } from '@/types';

interface FeatureCardProps {
  feature: Feature;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ feature }) => {
  return (
    <div className="bg-white rounded-2xl p-8 shadow-lg glow-effect group">
         <style jsx>{`
        .glow-effect {
          box-shadow: 0 2px 20px rgba(16, 185, 129, 0.08);
          transition: all 0.3s ease;
        }
        
        .glow-effect:hover {
          box-shadow: 0 6px 30px rgba(16, 185, 129, 0.15);
          transform: translateY(-2px);
        }
          `}</style>
      <div className="bg-gradient-to-br from-green-400 to-green-600 w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:scale-102 transition-transform duration-300">
        <feature.icon className="w-8 h-8 text-white" />
      </div>
      <h3 className="text-xl font-bold text-black mb-4">{feature.title}</h3>
      <p className="text-gray-600 leading-relaxed font-medium">{feature.description}</p>
    </div>
  );
};

const FeaturesSection: React.FC = () => {
  const features: Feature[] = [
    {
      icon: Shield,
      title: "Secure & Transparent",
      description: "Every transaction is protected with bank-grade security and full transparency."
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Launch your campaign in minutes with our intuitive, streamlined process."
    },
    {
      icon: Users,
      title: "Community First",
      description: "Built by Nigerians, for Nigerians. We understand your unique needs and challenges."
    },
    {
      icon: CheckCircle,
      title: "Verified Campaigns",
      description: "All campaigns go through our verification process to ensure credibility."
    },
    {
      icon: Globe,
      title: "Local Payment Methods",
      description: "Support for all major Nigerian payment methods including mobile money."
    },
    {
      icon: Heart,
      title: "Impact Focused",
      description: "Every campaign is designed to create real, measurable impact in communities."
    }
  ];

  return (
    <section className="py-16 px-4 bg-gradient-to-br from-green-50 to-white relative">
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
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-extrabold text-center text-black mb-10">
          What Makes Us Different
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={index} feature={feature} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;