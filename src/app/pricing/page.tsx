import React from 'react'
import PricingHero from '@/components/price/hero'
// import PricingCards from '@/components/price/card'
import FeeStructure from '@/components/price/Fee'
import FeeCalculatorComponent from '@/components/price/Calculator'

const page = () => {
  return (
    <div>
      <PricingHero />
      {/* <PricingCards /> */}
      <FeeStructure />
      <FeeCalculatorComponent />
      
    </div>
  )
}

export default page
