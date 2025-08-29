"use client";

import { motion } from "framer-motion";
import { useEffect } from "react";

import Navigation from "@/components/layout/Navigation";
import HeroSection from "@/components/home/HeroSection";
import Discover from "@/components/home/Discover";
import Unlock from "@/components/home/Unlock";
import Footer from "@/components/layout/Footer";

const Page = () => {
  // Handle hash navigation when coming from other pages
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const targetId = hash.substring(1);
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        // Small delay to ensure the page is fully loaded
        setTimeout(() => {
          targetElement.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }, 100);
      }
    }
  }, []);

  return (
    <div className="flex min-h-screen w-full flex-col overflow-hidden">
      {/* Navigation */}
      <div className="relative w-full">
        <Navigation />
      </div>

      {/* Main Content */}
      <main className="flex-1">
        {/* Hero Section */}
        <section id="home">
          <HeroSection />
        </section>

        {/* Discover Section */}
        <motion.section
          id="discover"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8 }}
        >
          <Discover />
        </motion.section>

        {/* Unlock Section */}
        <motion.section
          id="unlock"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8 }}
        >
          <Unlock />
        </motion.section>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8 }}
        >
          <Footer />
        </motion.div>
      </main>
    </div>
  );
};

export default Page;