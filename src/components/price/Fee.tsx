import React from 'react';
import { Check } from 'lucide-react';

const FeeStructure = () => {
  const feeStructure = [
    {
      type: "Donation Fee",
      fee: "5% + ₦150"
    },
    {
      type: "Payouts up to ₦500,000",
      fee: "0.5% + ₦100"
    },
    {
      type: "Payouts ₦500,001 - ₦2,000,000",
      fee: "1% + ₦800"
    },
    {
      type: "Payouts above ₦2,000,000",
      fee: "2.5% + ₦1,050"
    }
  ];

  return (
    <div className="max-w-6xl mx-auto my-12">
      {/* Main Title */}
      <div className="text-center mb-6">
        <h1 className="text-4xl font-extrabold text-gray-900">
          Detailed Fee Structure
        </h1>
      </div>

      {/* Section */}
      <div>

        {/* Fee Structure Container */}
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
          {feeStructure.map((item, index) => (
            <div 
              key={index} 
              className={`px-6 py-6 flex items-center justify-between ${
                index !== feeStructure.length - 1 ? 'border-b border-gray-100' : ''
              }`}
            >
              {/* Left side with checkmark and text */}
              <div className="flex items-center space-x-3">
                <Check className="w-5 h-5 text-green-500" />
                <span className="text-gray-600 font-medium">
                  {item.type}
                </span>
              </div>

              {/* Right side with fee */}
              <div className="text-gray-900 font-semibold">
                {item.fee}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeeStructure;