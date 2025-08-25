"use client";
import React from "react";
import Navigation from "@/components/layout/Navigation";
import HeroSection from "@/components/home/HeroSection";
import Discover from "@/components/home/Discover";
import Unlock from "@/components/home/Unlock";
import Footer from "@/components/layout/Footer";



const page = () => {
  return (
    <div>
      <Navigation />
      <HeroSection />
      <Discover/>
      <Unlock />
      <Footer />
    </div>
  );
};

export default page;
