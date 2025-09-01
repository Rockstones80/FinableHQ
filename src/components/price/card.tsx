// // components/pricing/PricingCards.tsx
// import { Check, Star, Zap, Crown } from 'lucide-react';
// import { PricingPlan } from '../price/pricing';

// interface PricingCardProps {
//   plan: PricingPlan;
// }

// const PricingCard: React.FC<PricingCardProps> = ({ plan }) => {
//   const colorClasses = {
//     green: {
//       border: 'border-green-200 hover:border-green-300',
//       badge: 'bg-green-100 text-green-800',
//       button: 'bg-green-600 hover:bg-green-700',
//       icon: 'text-green-600',
//       accent: 'text-green-600'
//     },
//     blue: {
//       border: 'border-blue-200 hover:border-blue-300',
//       badge: 'bg-blue-100 text-blue-800',
//       button: 'bg-blue-600 hover:bg-blue-700',
//       icon: 'text-blue-600',
//       accent: 'text-blue-600'
//     },
//     purple: {
//       border: 'border-purple-200 hover:border-purple-300',
//       badge: 'bg-purple-100 text-purple-800',
//       button: 'bg-purple-600 hover:bg-purple-700',
//       icon: 'text-purple-600',
//       accent: 'text-purple-600'
//     }
//   };

//   const colors = colorClasses[plan.color];

//   return (
//     <div className={`relative bg-white rounded-3xl p-8 shadow-lg border-2 ${colors.border} transition-all duration-300 hover:scale-105 glow-effect ${plan.isPopular ? 'ring-2 ring-green-400 ring-opacity-50' : ''}`}>
//       {plan.isPopular && (
//         <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
//           <div className={`${colors.badge} px-6 py-2 rounded-full text-sm font-bold flex items-center gap-2`}>
//             <Star className="w-4 h-4" />
//             {plan.badgeText}
//           </div>
//         </div>
//       )}
      
//       <div className="text-center mb-8">
//         <h3 className="text-2xl font-bold text-black mb-4">{plan.name}</h3>
//         <p className="text-gray-600 mb-6">{plan.description}</p>
        
//         <div className="mb-4">
//           <div className={`text-4xl font-extrabold ${colors.accent} mb-2`}>
//             {plan.fee}
//           </div>
//           <p className="text-sm text-gray-500">Platform Fee</p>
//         </div>
        
//         <div className="bg-gray-50 rounded-xl p-4 mb-6">
//           <p className="text-sm text-gray-600">
//             + <span className="font-semibold">{plan.processingFee}</span> payment processing
//           </p>
//         </div>
//       </div>

//       <ul className="space-y-4 mb-8">
//         {plan.features.map((feature, index) => (
//           <li key={index} className="flex items-start gap-3">
//             <Check className={`w-5 h-5 ${colors.icon} mt-0.5 flex-shrink-0`} />
//             <span className="text-gray-700">{feature}</span>
//           </li>
//         ))}
//       </ul>

//       <button className={`w-full ${colors.button} text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 hover:scale-105 shadow-lg`}>
//         Get Started
//       </button>
//     </div>
//   );
// };

// const PricingCards: React.FC = () => {
//   const pricingPlans: PricingPlan[] = [
//     {
//       name: "Personal",
//       description: "Perfect for individuals and small personal campaigns",
//       fee: "3%",
//       processingFee: "2.9% + ₦50",
//       color: "green",
//       features: [
//         "Unlimited campaign creation",
//         "Social media sharing tools",
//         "Basic analytics dashboard",
//         "Email support",
//         "Mobile-optimized campaigns",
//         "Automatic payout after 7 days",
//         "Campaign customization tools"
//       ]
//     },
//     {
//       name: "Organization",
//       description: "Ideal for NGOs, schools, and community projects",
//       fee: "4.5%",
//       processingFee: "2.9% + ₦50",
//       color: "blue",
//       isPopular: true,
//       badgeText: "Most Popular",
//       features: [
//         "Everything in Personal",
//         "Advanced analytics & insights",
//         "Priority customer support", 
//         "Team collaboration tools",
//         "Custom branding options",
//         "Instant payout options",
//         "Campaign verification badge",
//         "Donor management system",
//         "Tax receipt generation"
//       ]
//     },
//     {
//       name: "Enterprise",
//       description: "For large organizations and corporations",
//       fee: "Custom",
//       processingFee: "Negotiable",
//       color: "purple",
//       badgeText: "Premium",
//       features: [
//         "Everything in Organization",
//         "Dedicated account manager",
//         "Custom integration options",
//         "White-label solutions",
//         "Advanced reporting & compliance",
//         "Custom fee negotiations",
//         "24/7 priority support",
//         "API access",
//         "Custom onboarding",
//         "Volume discounts available"
//       ]
//     }
//   ];

//   return (
//     <section className="py-20 px-4 bg-white">
//       <div className="max-w-7xl mx-auto">
//         <div className="text-center mb-16">
//           <h2 className="text-4xl md:text-5xl font-bold text-black mb-6">
//             Choose Your Plan
//           </h2>
//           <p className="text-xl text-gray-600 max-w-3xl mx-auto">
//             Whether you&apos;re raising funds for education, community projects, or business ventures, 
//             we have a plan that fits your needs.
//           </p>
//         </div>
        
//         <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
//           {pricingPlans.map((plan, index) => (
//             <PricingCard key={index} plan={plan} />
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default PricingCards;