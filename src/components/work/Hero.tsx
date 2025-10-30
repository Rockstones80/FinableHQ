"use client";


interface HeroSectionProps {
  scrollToSection: (sectionId: string) => void;
}

const HeroSection: React.FC<HeroSectionProps> = () => {
  return (
    <>
      <style jsx>{`
        .slide-in-up {
          animation: slideInUp 0.8s ease-out forwards;
        }

        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .bounce-arrow {
          animation: bounce 2s infinite;
        }

        @keyframes bounce {
          0%,
          20%,
          53%,
          80%,
          100% {
            transform: translateY(0);
          }
          40%,
          43% {
            transform: translateY(-10px);
          }
          70% {
            transform: translateY(-5px);
          }
        }
      `}</style>

      <section className="pb-16 px-20 py-7 mt-32">
        <div className="max-w-6xl mx-auto text-center">
          <div className="slide-in-up">
            <h1 className="text-6xl font-extrabold text-black">
              How <span className="text-green-600">Finable</span> Works
            </h1>
            <p className="font-medium text-xl  text-gray-600 mb-2 max-w-4xl mx-auto leading-relaxed">
              <strong className="text-green-600">
                Raise funds. Support dreams. Make an impact.
              </strong>
            </p>
              <p className="font-medium text-gray-600">Learn how Finable connects changemakers with supporters like you <br />
              in just a few simple steps.</p>
        
          </div>
        </div>
      </section>
    </>
  );
};

export default HeroSection;
