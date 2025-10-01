"use client";
import React from "react";
import { Edit3, Calendar, Tag } from "lucide-react";
import { CampaignData } from "@/types/campaign";

interface Step4ReviewProps {
  data: CampaignData;
  onEditStep: (step: number) => void;
}

const Step4Review: React.FC<Step4ReviewProps> = ({ data, onEditStep }) => {
  const formatNumber = (num: number): string => {
    return new Intl.NumberFormat("en-NG").format(num);
  };

  const getCurrencySymbol = () => {
    return data.currency === "NGN" ? "₦" : "$";
  };

  const getImagePreview = () => {
    if (data.coverPhoto instanceof File) {
      return URL.createObjectURL(data.coverPhoto);
    }
    return data.coverPhoto;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Panel */}
          <div className="space-y-8">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                <div className="w-6 h-6 bg-white rounded-full"></div>
              </div>
              <div>
                <div className="text-sm font-medium text-blue-600">
                  STEP 5 OF 5
                </div>
                <h1 className="text-3xl font-bold text-gray-900">
                  Review & Launch
                </h1>
              </div>
            </div>

            <p className="text-lg text-gray-600">
              Review your campaign details before launching. You can always edit
              these later.
            </p>

            {/* Launch Tips */}
            <div className="bg-green-50 border border-green-200 rounded-lg p-6">
              <h3 className="font-semibold text-green-900 mb-3">
                Ready to Launch?
              </h3>
              <ul className="space-y-2 text-sm text-green-800">
                <li>• Double-check all information for accuracy</li>
                <li>• Make sure your story is compelling and clear</li>
                <li>• Verify your goal amount is realistic</li>
                <li>• Share your campaign on social media once launched</li>
              </ul>
            </div>
          </div>

          {/* Right Panel - Campaign Preview */}
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Campaign Preview
              </h2>

              {/* Campaign Card Preview */}
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
                {/* Cover Image */}
                {data.coverPhoto && (
                  <div className="h-48 bg-gray-200 relative">
                    <img
                      src={getImagePreview() || ""}
                      alt="Campaign cover"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                {/* Campaign Details */}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-xl font-bold text-gray-900 flex-1">
                      {data.title || "Your Campaign Title"}
                    </h3>
                    <button
                      onClick={() => onEditStep(3)}
                      className="p-2 text-gray-400 hover:text-gray-600"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                  </div>

                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {data.story || "Your campaign story will appear here..."}
                  </p>

                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <span className="flex items-center">
                      <Tag className="w-4 h-4 mr-1" />
                      {data.category || "Category"}
                    </span>
                    <span className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {data.country}, {data.state}
                    </span>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Goal</span>
                      <span className="font-semibold text-gray-900">
                        {getCurrencySymbol()}
                        {formatNumber(data.amount || 0)}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{ width: "0%" }}
                      ></div>
                    </div>
                    <div className="text-center text-sm text-gray-500">
                      0% funded • 0 donations
                    </div>
                  </div>
                </div>
              </div>

              {/* Campaign Details Summary */}
              <div className="mt-8 space-y-6">
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                  <h3 className="font-semibold text-gray-900 mb-4">
                    Campaign Details
                  </h3>

                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Category</span>
                      <div className="flex items-center">
                        <span className="text-gray-900">
                          {data.category || "Not selected"}
                        </span>
                        <button
                          onClick={() => onEditStep(1)}
                          className="ml-2 p-1 text-gray-400 hover:text-gray-600"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Location</span>
                      <div className="flex items-center">
                        <span className="text-gray-900">
                          {data.country && data.state
                            ? `${data.country}, ${data.state}`
                            : "Not selected"}
                        </span>
                        <button
                          onClick={() => onEditStep(1)}
                          className="ml-2 p-1 text-gray-400 hover:text-gray-600"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Goal Amount</span>
                      <div className="flex items-center">
                        <span className="text-gray-900">
                          {getCurrencySymbol()}
                          {formatNumber(data.amount || 0)} {data.currency}
                        </span>
                        <button
                          onClick={() => onEditStep(2)}
                          className="ml-2 p-1 text-gray-400 hover:text-gray-600"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Auto-adjust Goal</span>
                      <div className="flex items-center">
                        <span className="text-gray-900">
                          {data.autoAdjustGoal ? "Yes" : "No"}
                        </span>
                        <button
                          onClick={() => onEditStep(2)}
                          className="ml-2 p-1 text-gray-400 hover:text-gray-600"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step4Review;
