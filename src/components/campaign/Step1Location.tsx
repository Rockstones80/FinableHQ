"use client";
import React from "react";
import { MapPin, Compass } from "lucide-react";
import {
  CampaignData,
  CAMPAIGN_CATEGORIES,
  SUPPORTED_COUNTRIES,
  NIGERIAN_STATES,
} from "@/types/campaign";

interface Step1LocationProps {
  data: CampaignData;
  updateData: (updates: Partial<CampaignData>) => void;
  errors: Record<string, string>;
}

const Step1Location: React.FC<Step1LocationProps> = ({
  data,
  updateData,
  errors,
}) => {
  const handleCountryChange = (country: string) => {
    updateData({ country, state: "" }); // Reset state when country changes
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
                  STEP 1 OF 5
                </div>
                <h1 className="text-3xl font-bold text-gray-900">
                  Welcome to Your Fundraising Journey
                </h1>
              </div>
            </div>

            <p className="text-lg text-gray-600">
              We&apos;re excited to support you in creating something impactful.
              Let&apos;s get started!
            </p>

            {/* Location Section */}
            <div className="space-y-6">
              <div className="flex items-center space-x-3">
                <Compass className="w-6 h-6 text-blue-600" />
                <h2 className="text-xl font-semibold text-gray-900">
                  Where are you located?
                </h2>
              </div>
              <p className="text-gray-600">
                Select your country and state to help us localize your campaign.
              </p>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Country
                  </label>
                  <select
                    value={data.country}
                    onChange={(e) => handleCountryChange(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select a country</option>
                    {SUPPORTED_COUNTRIES.map((country) => (
                      <option key={country.code} value={country.name}>
                        {country.name}
                      </option>
                    ))}
                  </select>
                  {errors.country && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.country}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    State
                  </label>
                  <select
                    value={data.state}
                    onChange={(e) => updateData({ state: e.target.value })}
                    disabled={!data.country}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                  >
                    <option value="">Select a state</option>
                    {data.country === "Nigeria" &&
                      NIGERIAN_STATES.map((state) => (
                        <option key={state} value={state}>
                          {state}
                        </option>
                      ))}
                  </select>
                  {errors.state && (
                    <p className="mt-1 text-sm text-red-600">{errors.state}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Category Section */}
            <div className="space-y-6">
              <div className="flex items-center space-x-3">
                <MapPin className="w-6 h-6 text-purple-600" />
                <h2 className="text-xl font-semibold text-gray-900">
                  Choose a category
                </h2>
              </div>
              <p className="text-gray-600">
                Pick from our list of campaign tags, or create a new one that
                best describes your campaign.
              </p>

              <div className="grid grid-cols-2 gap-3">
                {CAMPAIGN_CATEGORIES.map((category) => (
                  <button
                    key={category}
                    onClick={() => updateData({ category })}
                    className={`p-4 text-left border-2 rounded-lg transition-all ${
                      data.category === category
                        ? "border-blue-500 bg-blue-50 text-blue-700"
                        : "border-gray-200 hover:border-gray-300 text-gray-700"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
              {errors.category && (
                <p className="text-sm text-red-600">{errors.category}</p>
              )}
            </div>
          </div>

          {/* Right Panel */}
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Where will the funds go?
              </h2>
              <p className="text-gray-600 mb-6">
                Choose the location where you plan to withdraw your funds.
                Countries we support fundraisers in.
              </p>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Country
                  </label>
                  <div className="relative">
                    <Compass className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <select
                      value={data.country}
                      onChange={(e) => handleCountryChange(e.target.value)}
                      className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select a country</option>
                      {SUPPORTED_COUNTRIES.map((country) => (
                        <option key={country.code} value={country.name}>
                          {country.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    State
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <select
                      value={data.state}
                      onChange={(e) => updateData({ state: e.target.value })}
                      disabled={!data.country}
                      className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                    >
                      <option value="">Select a state</option>
                      {data.country === "Nigeria" &&
                        NIGERIAN_STATES.map((state) => (
                          <option key={state} value={state}>
                            {state}
                          </option>
                        ))}
                    </select>
                  </div>
                </div>
              </div>

              {(!data.country || !data.state) && (
                <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-sm text-red-600">
                    Please select both country and state before continuing.
                  </p>
                </div>
              )}
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                What best describes why you&apos;re fundraising?
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {CAMPAIGN_CATEGORIES.map((category) => (
                  <button
                    key={category}
                    onClick={() => updateData({ category })}
                    className={`p-3 text-sm border rounded-lg transition-all ${
                      data.category === category
                        ? "border-blue-500 bg-blue-50 text-blue-700"
                        : "border-gray-200 hover:border-gray-300 text-gray-700"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step1Location;
