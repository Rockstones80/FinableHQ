"use client";

import React from "react";
import Image from "next/image";
import Button from "../ui/Button";
// import { GraduationCap, Users } from "lucide-react";
import graduating_picture from "../../../public/images/Unlock/graduating_picture.jpg";
// import { useRouter } from "next/navigation";

const Unlock = () => {
  // const router = useRouter();

  // // const navigateToStartCampaign = (): void => {
  // //   router.push("/auth/login");
  // // };

  // // const navigateToDonate = (): void => {
  // //   router.push("/donate");
  // // };
  
  return (
    <div className="bg-gradient-to-br from-green-50 to-white relative overflow-hidden mb-10">
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

        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(5deg);
          }
        }

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

        .progress-bar {
          width: 0%;
          animation: progress 4s linear infinite;
        }

        @keyframes progress {
          0% {
            width: 0%;
          }
          100% {
            width: 100%;
          }
        }

        .tab-active {
          background: linear-gradient(135deg, #10b981, #059669);
          color: white;
        }

        .step-active {
          transform: scale(1.05);
          box-shadow: 0 8px 30px rgba(16, 185, 129, 0.2);
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

      {/* Desktop View - Original Layout */}
      <div className="hidden md:flex justify-center items-center lg:gap-16 gap-8 mt-10 mb-10 lg:px-20 px-12">
        <div className="flex flex-col justify-center gap-8 w-1/2">
          <p className="font-extrabold lg:text-5xl text-4xl">
            Unlock Opportunities: <br /> Benefits for{" "}
            <span className="text-green-600">Students</span> and{" "}
            <span className="text-green-600">Donors</span>
          </p>
          <p className="text-gray-600 font-medium">
            Finable enables students to achieve their educational aspirations by linking them with generous benefactors. Donors not only impact students&apos; lives positively but also have the opportunity to receive tax advantages for their donations.
          </p>
          <div className="flex gap-6 justify-start items-center font-semibold">
            <a href="/auth/login">
              <Button
                title="Learn More"
                type="button"
                className="ring-1 ring-green-600 py-[9px] px-6 cursor-pointer shadow-md rounded-sm transition-transform hover:-translate-y-1 text-gray-600"
              />
            </a>
            <div className="flex justify-center items-end gap-2 cursor-pointer text-sm">
              <a href="">
                <Button title="Sign Up" type="button" className="text-gray-600" />
              </a>
              <div className="animate-pulse"></div>
            </div>
          </div>
        </div>

        <div className="w-1/2 h-1/2 ml-auto">
          <Image
            src={graduating_picture}
            alt="graduating picture"
            className="object-cover rounded-2xl w-full h-96 shadow-xl"
          />
        </div>
      </div>

      {/* Mobile and Tablet View - Responsive Layout */}
      <div className="md:hidden px-6 py-8">
        {/* Content Container */}
        <div className="flex flex-col items-center text-center space-y-8">
          {/* Image Section - Mobile First */}
          <div className="w-full max-w-md md:max-w-lg order-1 md:order-2">
            <Image
              src={graduating_picture}
              alt="graduating picture"
              className="object-cover rounded-2xl w-full h-64 md:h-80 shadow-xl glow-effect"
            />
          </div>

          {/* Text Content */}
          <div className="order-2 md:order-1 space-y-6">
            <h1 className="font-extrabold text-3xl md:text-4xl leading-tight">
              Unlock Opportunities: <br className="hidden sm:block" /> 
              Benefits for{" "}
              <span className="text-green-600">Students</span> and{" "}
              <span className="text-green-600">Donors</span>
            </h1>
            
            <p className="text-gray-600 font-medium text-sm md:text-base leading-relaxed max-w-2xl text-justify">
              Finable enables students to achieve their educational aspirations by linking them with generous benefactors. Donors not only impact students&apos; lives positively but also have the opportunity to receive tax advantages for their donations.
            </p>

            {/* Buttons */}
            <div className="flex flex-row gap-4 sm:gap-6 justify-center items-center font-semibold mt-8">
              <a href="/auth/login" className="w-full sm:w-auto">
                <Button
                  title="Learn More"
                  type="button"
                  className="ring-1 ring-green-600 py-3 px-8 cursor-pointer shadow-md rounded-sm transition-transform hover:-translate-y-1 text-gray-600 w-full sm:w-auto"
                />
              </a>
              
              <a href="" className="w-full sm:w-auto">
                <Button 
                  title="Sign Up" 
                  type="button" 
                  className="bg-green-600 text-white py-3 px-8 rounded-sm shadow-md transition-transform hover:-translate-y-1 w-full sm:w-auto" 
                />
              </a>
            </div>
          </div>
        </div>


      </div>
    </div>
  );
};

export default Unlock;