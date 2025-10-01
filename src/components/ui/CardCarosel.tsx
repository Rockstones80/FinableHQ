import { useState } from "react";
import { X, ChevronRight } from "lucide-react";

type ColorType = 'green' | 'indigo' | 'emerald' | 'violet';

interface KYCStep {
  id: string;
  title: string;
  description: string;
  buttonText: string;
  color: ColorType;
}

interface KYCDashboardCardsProps {
  className?: string;
}

export default function KYCDashboardCards({ className }: KYCDashboardCardsProps) {
  const [completedSteps, setCompletedSteps] = useState<Set<string>>(new Set());
  
  const kycSteps: KYCStep[] = [
    {
      id: 'personal',
      title: 'Personal Information',
      description: 'Complete your basic profile details',
      buttonText: 'Complete Profile',
      color: 'green'
    },
    {
      id: 'identity',
      title: 'Identity Verification',
      description: 'Upload your government ID and photo',
      buttonText: 'Upload Documents',
      color: 'indigo'
    },
    {
      id: 'address',
      title: 'Address Verification',
      description: 'Verify your residential address',
      buttonText: 'Verify Address',
      color: 'emerald'
    },
    {
      id: 'financial',
      title: 'Financial Information',
      description: 'Add your banking details securely',
      buttonText: 'Add Bank Details',
      color: 'violet'
    }
  ];

  const handleComplete = (stepId: string): void => {
    setCompletedSteps(prev => new Set([...prev, stepId]));
  };

  const handleStartKYC = (stepId: string): void => {
    console.log(`Starting KYC for: ${stepId}`);
    setTimeout(() => {
      handleComplete(stepId);
    }, 1000);
  };

  const visibleSteps = kycSteps.filter(step => !completedSteps.has(step.id));

  const getAbstractShapes = (color: ColorType, index: number): React.ReactElement => {
    const shapes: React.ReactElement[] = [
      // Personal - flowing curves
      <div key="personal-shapes" className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-8 -right-8 w-24 h-24 bg-blue-100 opacity-40 rounded-full"></div>
        <div className="absolute top-12 right-16 w-16 h-16 bg-blue-200 opacity-30 rounded-full"></div>
        <div className="absolute bottom-8 left-8 w-20 h-20 bg-blue-150 opacity-25 rounded-full blur-sm"></div>
        <div className="absolute top-1/3 left-1/2 w-12 h-12 bg-blue-100 opacity-20 rounded-full"></div>
        <svg className="absolute bottom-0 right-0 w-32 h-32 opacity-10" viewBox="0 0 100 100">
          <path d="M20,80 Q50,20 80,80" stroke="rgb(59, 130, 246)" strokeWidth="2" fill="none"/>
          <path d="M10,70 Q40,30 70,70" stroke="rgb(59, 130, 246)" strokeWidth="1" fill="none"/>
        </svg>
      </div>,

      // Identity - geometric patterns  
      <div key="identity-shapes" className="absolute inset-0 overflow-hidden">
        <div className="absolute top-4 right-4 w-8 h-20 bg-indigo-100 opacity-30 rounded-full transform rotate-45"></div>
        <div className="absolute top-12 right-12 w-6 h-16 bg-indigo-200 opacity-25 rounded-full transform -rotate-12"></div>
        <div className="absolute bottom-16 left-12 w-16 h-4 bg-indigo-150 opacity-35 rounded-full transform rotate-12"></div>
        <div className="absolute bottom-8 left-4 w-12 h-6 bg-indigo-100 opacity-20 rounded-full transform -rotate-45"></div>
        <svg className="absolute top-1/4 left-1/4 w-16 h-16 opacity-15" viewBox="0 0 50 50">
          <rect x="10" y="10" width="30" height="30" fill="rgb(99, 102, 241)" rx="4"/>
          <rect x="15" y="15" width="20" height="20" fill="none" stroke="rgb(99, 102, 241)" strokeWidth="1" rx="2"/>
        </svg>
      </div>,

      // Address - house-like organic shapes
      <div key="address-shapes" className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-4 left-1/3 w-18 h-18 bg-emerald-100 opacity-35 transform rotate-45" style={{clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)'}}></div>
        <div className="absolute top-8 right-8 w-14 h-14 bg-emerald-200 opacity-25 rounded-lg transform rotate-12"></div>
        <div className="absolute bottom-12 left-8 w-20 h-8 bg-emerald-150 opacity-30 rounded-full"></div>
        <div className="absolute bottom-4 right-12 w-6 h-16 bg-emerald-100 opacity-20 rounded-full"></div>
        <svg className="absolute bottom-4 left-4 w-12 h-12 opacity-20" viewBox="0 0 40 40">
          <polygon points="20,5 35,30 5,30" fill="rgb(16, 185, 129)"/>
          <rect x="15" y="20" width="10" height="10" fill="rgb(16, 185, 129)"/>
        </svg>
      </div>,

      // Financial - flowing money-inspired curves
      <div key="financial-shapes" className="absolute inset-0 overflow-hidden">
        <div className="absolute top-6 right-6 w-16 h-16 bg-violet-100 opacity-30 rounded-full"></div>
        <div className="absolute top-16 right-20 w-12 h-12 bg-violet-200 opacity-25 rounded-full"></div>
        <div className="absolute bottom-20 left-6 w-20 h-6 bg-violet-150 opacity-35 rounded-full transform rotate-15"></div>
        <div className="absolute bottom-8 left-16 w-14 h-14 bg-violet-100 opacity-20 rounded-full"></div>
        <svg className="absolute top-1/2 left-1/2 w-20 h-20 opacity-15 transform -translate-x-1/2 -translate-y-1/2" viewBox="0 0 60 60">
          <circle cx="30" cy="30" r="25" fill="none" stroke="rgb(139, 92, 246)" strokeWidth="2" strokeDasharray="4,4"/>
          <text x="30" y="35" textAnchor="middle" fontSize="16" fill="rgb(139, 92, 246)">$</text>
        </svg>
      </div>
    ];
    return shapes[index] || shapes[0];
  };

  const getColorClasses = (color: ColorType): { bg: string; button: string; accent: string } => {
    const colors: Record<ColorType, { bg: string; button: string; accent: string }> = {
      green: {
        bg: 'from-green-50/80 to-green-100/60',
        button: 'from-green-600 to-green-700 hover:from-green-700 hover:to-green-800',
        accent: 'bg-blue-200'
      },
      indigo: {
        bg: 'from-indigo-50/80 to-indigo-100/60',
        button: 'from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800',
        accent: 'bg-blue-200'
      },
      emerald: {
        bg: 'from-emerald-50/80 to-emerald-100/60',
        button: 'from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800',
        accent: 'bg-blue-200'
      },
      violet: {
        bg: 'from-violet-50/80 to-violet-100/60',
        button: 'from-violet-600 to-violet-700 hover:from-violet-700 hover:to-violet-800',
        accent: 'bg-blue-200'
      }
    };
    return colors[color];
  };

  if (visibleSteps.length === 0) {
    return (
      <div className="relative bg-gradient-to-br from-green-50 to-emerald-100 rounded-3xl p-8 border border-emerald-200 overflow-hidden">
        <div className="absolute -top-8 -right-8 w-24 h-24 bg-emerald-200 opacity-30 rounded-full"></div>
        <div className="absolute bottom-0 left-0 w-32 h-16 bg-green-200 opacity-20 rounded-full transform -translate-x-8 translate-y-8"></div>
        
        <div className="relative flex items-center space-x-4">
          <div className="w-14 h-14 bg-gradient-to-br from-emerald-600 to-green-700 rounded-2xl flex items-center justify-center shadow-lg">
            <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-900">Verification Complete</h3>
            <p className="text-gray-600">All KYC requirements have been fulfilled successfully</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`space-y-4 ${className || ''}`}>
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Account Verification</h2>
          <p className="text-gray-600 mt-1">Complete the following steps to begin your campaign</p>
        </div>
        <div className="text-right">
          <div className="text-sm font-medium text-gray-700">
            {kycSteps.length - visibleSteps.length} of {kycSteps.length} completed
          </div>
          <div className="w-24 h-2 bg-gray-200 rounded-full mt-2">
            <div 
              className="h-2 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full transition-all duration-500"
              style={{ width: `${((kycSteps.length - visibleSteps.length) / kycSteps.length) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Horizontal scrolling container */}
      <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide">
        {visibleSteps.map((step, index) => {
          const colors = getColorClasses(step.color);
          
          return (
            <div 
              key={step.id}
              className={`relative flex-shrink-0 w-80 bg-gradient-to-br ${colors.bg} backdrop-blur-sm rounded-3xl border border-white/60 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group`}
            >
              {/* Creative abstract shapes */}
              {getAbstractShapes(step.color, index)}
              
              {/* Close button */}
              <button
                onClick={() => handleComplete(step.id)}
                className="absolute top-4 right-4 w-8 h-8 bg-white/80 hover:bg-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 z-10 backdrop-blur-sm"
                title="Mark as completed"
              >
                <X className="w-4 h-4 text-gray-600" />
              </button>

              <div className="relative p-7">
                {/* Content */}
                <div className="mb-7">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    {step.title}
                  </h3>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Action button */}
                <button
                  onClick={() => handleStartKYC(step.id)}
                  className={`w-full bg-gradient-to-r ${colors.button} text-white font-medium py-3.5 px-6 rounded-2xl transition-all duration-200 flex items-center justify-between hover:shadow-lg backdrop-blur-sm`}
                >
                  <span>{step.buttonText}</span>
                  <ChevronRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-200" />
                </button>
              </div>

              {/* Bottom accent line */}
              <div className={`h-1 ${colors.accent} opacity-50`}></div>
            </div>
          );
        })}
      </div>

      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}