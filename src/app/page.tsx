"use client";
import React from "react";
import HeroSection from "@/components/home/HeroSection";
import Discover from "@/components/home/Discover";
import Unlock from "@/components/home/Unlock";
import Fund from "@/components/home/Fund";
import Footer from "@/components/layout/Footer";



const page = () => {
  return (
    <div>
      <HeroSection />
      <Discover/>
      <Unlock />
      <Fund />
      <Footer />
    </div>
  );
};

export default page;
