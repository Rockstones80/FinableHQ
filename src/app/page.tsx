"use client";
import React from "react";
import HeroSection from "@/components/home/HeroSection";
import Discover from "@/components/home/Discover";
import Unlock from "@/components/home/Unlock";
import CTASection from "@/components/about/Reality"



const page = () => {
  return (
    <div>
      <HeroSection />
      <Discover/>
      <Unlock />

      <CTASection backgroundImage="" />
  
    </div>
  );
};

export default page;
