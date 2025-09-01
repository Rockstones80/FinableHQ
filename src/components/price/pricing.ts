// types/pricing.ts
export interface PricingPlan {
    name: string;
    description: string;
    fee: string;
    processingFee: string;
    features: string[];
    isPopular?: boolean;
    badgeText?: string;
    color: 'green' | 'blue' | 'purple';
  }
  
  export interface FAQItem {
    question: string;
    answer: string;
  }
  
  export interface FeeBenefit {
    icon: string;
    title: string;
    description: string;
  }