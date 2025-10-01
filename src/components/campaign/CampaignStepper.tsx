"use client";
import React from "react";
import { CheckCircle } from "lucide-react";

interface CampaignStepperProps {
  currentStep: number;
  stepTitles: string[];
}

const CampaignStepper: React.FC<CampaignStepperProps> = ({
  currentStep,
  stepTitles,
}) => {
  return (
    <div className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between">
          {stepTitles.map((title, index) => {
            const stepNumber = index + 1;
            const isCompleted = stepNumber < currentStep;
            const isCurrent = stepNumber === currentStep;
            // const isUpcoming = stepNumber > currentStep;

            return (
              <div key={stepNumber} className="flex items-center">
                <div className="flex items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                      isCompleted
                        ? "bg-green-500 text-white"
                        : isCurrent
                          ? "bg-blue-600 text-white"
                          : "bg-gray-200 text-gray-500"
                    }`}
                  >
                    {isCompleted ? (
                      <CheckCircle className="w-5 h-5" />
                    ) : (
                      stepNumber
                    )}
                  </div>
                  <div className="ml-3">
                    <p
                      className={`text-sm font-medium ${
                        isCurrent
                          ? "text-blue-600"
                          : isCompleted
                            ? "text-green-600"
                            : "text-gray-500"
                      }`}
                    >
                      {title}
                    </p>
                  </div>
                </div>
                {index < stepTitles.length - 1 && (
                  <div
                    className={`w-12 h-0.5 mx-4 ${
                      isCompleted ? "bg-green-500" : "bg-gray-200"
                    }`}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CampaignStepper;
