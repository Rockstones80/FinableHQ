"use client";
import React from "react";
import HeroSection from "@/components/home/HeroSection";
import Discover from "@/components/home/Discover";
import Unlock from "@/components/home/Unlock";
// import Fund from "@/components/home/Fund";
import Footer from "@/components/layout/Footer";
import CTASection from "@/components/about/Reality"



const page = () => {
  return (
    <div>
      <HeroSection />
      <Discover/>
      <Unlock />
      {/* <Fund /> */}
      <CTASection backgroundImage="" />
      <Footer />
    </div>
  );
};

export default page;
