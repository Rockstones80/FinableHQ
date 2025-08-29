'use client'

import HeroStorySection from "@/components/about/Hero"
import MissionVisionSection from "@/components/about/Mission"
import ServicesSection from "@/components/about/service"
import FeaturesSection from "@/components/about/features"
import CTASection from "@/components/about/Reality"


const page = () => {
  return (
    <div>
        <HeroStorySection />
        <MissionVisionSection />
        <ServicesSection />
        <FeaturesSection />
        <CTASection backgroundImage="" />
    </div>
  )
}

export default page
