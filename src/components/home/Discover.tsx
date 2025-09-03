"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import easy_setup from "../../../public/images/Discover/easy_setup.jpeg";
import secure_payment from "../../../public/images/Discover/secure_payment.jpeg";
import transparent_donation from "../../../public/images/Discover/transparent_donation.jpeg";

const features = [
  {
    image: easy_setup,
    name: "Easy campaign setup",
    description:
      "Start your campaign in just a few minutes with our intuitive setup process",
  },
  {
    image: transparent_donation,
    name: "Transparent donation tracking",
    description:
      "Track every donation with real-time reporting and complete transparency",
  },
  {
    image: secure_payment,
    name: "Secure payment system",
    description:
      "Experience peace of mind with our robust, encrypted payment system",
  },
];

const Discover: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isClient, setIsClient] = useState(false);

  // Ensure we're on the client side
  useEffect(() => {
    setIsClient(true);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % features.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + features.length) % features.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <div className="lg:px-20 md:px-10 px-6 flex flex-col justify-center items-center my-16">
      <style jsx>{`
        .glow-effect {
          box-shadow: 0 2px 20px rgba(16, 185, 129, 0.08);
          transition: all 0.3s ease;
        }
        
        .glow-effect:hover {
          box-shadow: 0 6px 30px rgba(16, 185, 129, 0.15);
          transform: translateY(-2px);
        }

        .carousel-container {
          overflow: hidden;
          position: relative;
        }

        .carousel-track {
          display: flex;
          transition: transform 0.3s ease-in-out;
        }

        .carousel-slide {
          min-width: 100%;
          flex-shrink: 0;
        }

        .carousel-slide-mobile {
          transform: translateX(-${currentSlide * 100}%);
        }

        .carousel-slide-tablet {
          transform: translateX(-${currentSlide * 50}%);
        }

        @media (min-width: 768px) and (max-width: 1023px) {
          .carousel-slide {
            min-width: 50%;
          }
        }
      `}</style>
      
      <div className="text-center">
        <p className="lg:text-5xl md:text-4xl text-4xl font-extrabold mb-4">
          Discover the Features of{" "}
          <span className="text-green-600">Finable</span>
        </p>
        <p className="font-medium text-gray-600 mb-16 lg:text-base md:text-sm text-sm">
          Finable offers innovative solutions to help students secure funding
          for their education. Our <br className="hidden md:block" /> platform is designed to make the
          fundraising process seamless and effective.
        </p>
      </div>

      {/* Desktop View - Original Layout */}
      <div className="hidden lg:flex justify-between gap-12">
        <ul className="flex justify-between gap-12">
          {features.map((feature, index) => {
            return (
              <li key={index}>
                <div className="py-4 px-2 h-full w-full max-w-80 bg-white rounded-lg glow-effect shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 pb-10">
                  <div className="h-52 mb-8 rounded-t-lg">
                    <Image
                      src={feature.image}
                      alt={feature.name}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <h3 className="font-extrabold text-2xl text-center pb-2 text-gray-800">
                    {feature.name}
                  </h3>
                  <p className="text-sm text-center text-gray-600 leading-relaxed font-medium px-5">
                    {feature.description}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Mobile and Tablet View - Carousel */}
      {isClient && (
        <div className="lg:hidden w-full max-w-4xl">
          <div className="carousel-container relative">
            {/* Mobile Carousel (< 768px) */}
            <div className="md:hidden">
              <div 
                className="carousel-track"
                style={{ 
                  transform: `translateX(-${currentSlide * 100}%)` 
                }}
              >
                {features.map((feature, index) => (
                  <div key={index} className="carousel-slide px-3">
                    <div className="py-4 px-2 h-full bg-white rounded-lg glow-effect shadow-lg transition-all duration-300 pb-10 mx-auto max-w-80">
                      <div className="h-52 mb-8 rounded-t-lg">
                        <Image
                          src={feature.image}
                          alt={feature.name}
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <h3 className="font-extrabold text-xl text-center pb-2 text-gray-800">
                        {feature.name}
                      </h3>
                      <p className="text-sm text-center text-gray-600 leading-relaxed font-medium px-5">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Tablet Carousel (768px - 1023px) */}
            <div className="hidden md:block lg:hidden">
              <div 
                className="carousel-track"
                style={{ 
                  transform: `translateX(-${currentSlide * 50}%)` 
                }}
              >
                {features.map((feature, index) => (
                  <div key={index} className="carousel-slide px-3">
                    <div className="py-4 px-2 h-full bg-white rounded-lg glow-effect shadow-lg transition-all duration-300 pb-10 mx-auto max-w-80">
                      <div className="h-52 mb-8 rounded-t-lg">
                        <Image
                          src={feature.image}
                          alt={feature.name}
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <h3 className="font-extrabold text-2xl text-center pb-2 text-gray-800">
                        {feature.name}
                      </h3>
                      <p className="text-sm text-center text-gray-600 leading-relaxed font-medium px-5">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={prevSlide}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-600 hover:text-gray-800 p-2 rounded-full shadow-lg transition-all duration-200 z-10"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            
            <button
              onClick={nextSlide}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-600 hover:text-gray-800 p-2 rounded-full shadow-lg transition-all duration-200 z-10"
              aria-label="Next slide"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-6 gap-2">
            {features.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-200 ${
                  currentSlide === index
                    ? "bg-green-600 scale-110"
                    : "bg-gray-300 hover:bg-gray-400"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Discover;