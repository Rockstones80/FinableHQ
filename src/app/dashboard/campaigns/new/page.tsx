"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  ChevronDown,
  Wallet,
  Megaphone,
  Image as ImageIcon,
  Bell,
  MapPin,
  Compass,
  GraduationCap,
} from "lucide-react";
import {
  CampaignData,
  CAMPAIGN_CATEGORIES,
  NIGERIAN_STATES,
  NIGERIAN_SCHOOLS,
} from "@/types/campaign";

const CreateCampaignPage = () => {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3 | 4>(1);
  const [campaignData, setCampaignData] = useState<CampaignData>({
    country: "Nigeria",
    state: "",
    school: "",
    category: "",
    currency: "NGN",
    amount: 50000,
    autoAdjustGoal: false,
    title: "Help Nicholas go back to college",
    story: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const updateData = (updates: Partial<CampaignData>) => {
    setCampaignData((prev) => ({ ...prev, ...updates }));
    // Clear related errors when data is updated
    const newErrors = { ...errors };
    Object.keys(updates).forEach((key) => {
      delete newErrors[key];
    });
    setErrors(newErrors);
  };

  const formatNumber = (num: number): string => {
    return new Intl.NumberFormat("en-NG").format(num);
  };

  const handleAmountChange = (value: string) => {
    const numericValue = parseInt(value.replace(/,/g, "")) || 0;
    updateData({ amount: numericValue });
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!campaignData.state) newErrors.state = "Please select a state";
    if (!campaignData.school) newErrors.school = "Please select a school";
    if (!campaignData.category) newErrors.category = "Please select a category";
    if (!campaignData.amount || campaignData.amount <= 0)
      newErrors.amount = "Please enter a valid amount";
    if (!campaignData.title.trim())
      newErrors.title = "Please enter a campaign title";
    if (!campaignData.story.trim())
      newErrors.story = "Please enter your campaign story";

    // Validate amount limits
    if (campaignData.amount > 0) {
      const limits =
        campaignData.currency === "NGN"
          ? { min: 1000, max: 50000000 }
          : { min: 10, max: 1000000 };
      if (campaignData.amount < limits.min) {
        newErrors.amount = `Minimum amount is ${campaignData.currency === "NGN" ? "₦" : "$"}${formatNumber(limits.min)}`;
      } else if (campaignData.amount > limits.max) {
        newErrors.amount = `Maximum amount is ${campaignData.currency === "NGN" ? "₦" : "$"}${formatNumber(limits.max)}`;
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep((prev) => (prev + 1) as 1 | 2 | 3 | 4);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => (prev - 1) as 1 | 2 | 3 | 4);
    } else {
      router.push("/dashboard/campaigns");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      // Handle form submission
      console.log("Campaign data:", campaignData);
      // Redirect to campaigns page or show success message
      router.push("/dashboard/campaigns");
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold text-gray-800">
              Create campaign
            </h1>
          </div>

          <div className="flex items-center space-x-4">
            <div className="relative">
              <button
                className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
                title="notifications"
              >
                <Bell className="w-5 h-5 text-gray-600" />
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                  6
                </span>
              </button>
            </div>

            <div className="flex items-center space-x-3 bg-gray-100 rounded-full px-4 py-2">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-medium text-sm">
                SU
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-medium text-gray-900">
                  Samuel Uzor
                </span>
                <span className="text-xs text-gray-500">OWO-SOEBL</span>
              </div>
              <div className="bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded-full">
                Verified
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Progress Indicator */}
      <div className="bg-white px-6 py-8">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-center space-x-8">
            {/* Location */}
            <div className="flex flex-col items-center space-y-2">
              <div
                className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                  currentStep >= 1 ? "bg-green-600" : "bg-gray-200"
                }`}
              >
                <MapPin
                  className={`w-6 h-6 ${currentStep >= 1 ? "text-white" : "text-gray-400"}`}
                />
              </div>
              <span
                className={`text-sm font-medium ${currentStep >= 1 ? "text-green-600" : "text-gray-400"}`}
              >
                Location
              </span>
            </div>

            {/* Connecting line */}
            <div
              className={`w-12 h-0.5 ${currentStep >= 2 ? "bg-green-600" : "bg-gray-300"}`}
            ></div>

            {/* Funding goal */}
            <div className="flex flex-col items-center space-y-2">
              <div
                className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                  currentStep >= 2 ? "bg-green-600" : "bg-gray-200"
                }`}
              >
                <Wallet
                  className={`w-6 h-6 ${currentStep >= 2 ? "text-white" : "text-gray-400"}`}
                />
              </div>
              <span
                className={`text-sm font-medium ${currentStep >= 2 ? "text-green-600" : "text-gray-400"}`}
              >
                Funding goal
              </span>
            </div>

            {/* Connecting line */}
            <div
              className={`w-12 h-0.5 ${currentStep >= 3 ? "bg-green-600" : "bg-gray-300"}`}
            ></div>

            {/* Campaign details */}
            <div className="flex flex-col items-center space-y-2">
              <div
                className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                  currentStep >= 3 ? "bg-green-600" : "bg-gray-200"
                }`}
              >
                <Megaphone
                  className={`w-6 h-6 ${currentStep >= 3 ? "text-white" : "text-gray-400"}`}
                />
              </div>
              <span
                className={`text-sm font-medium ${currentStep >= 3 ? "text-green-600" : "text-gray-400"}`}
              >
                Campaign details
              </span>
            </div>

            {/* Connecting line */}
            <div
              className={`w-12 h-0.5 ${currentStep >= 4 ? "bg-green-600" : "bg-gray-300"}`}
            ></div>

            {/* Campaign Images */}
            <div className="flex flex-col items-center space-y-2">
              <div
                className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                  currentStep >= 4 ? "bg-green-600" : "bg-gray-200"
                }`}
              >
                <ImageIcon
                  className={`w-6 h-6 ${currentStep >= 4 ? "text-white" : "text-gray-400"}`}
                />
              </div>
              <span
                className={`text-sm font-medium ${currentStep >= 4 ? "text-green-600" : "text-gray-400"}`}
              >
                Campaign Images
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 py-8">
        {currentStep === 1 && (
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Location
              </h2>
            </div>

            <div className="space-y-8">
              <div className="flex items-start justify-between">
                <div className="flex-1 pr-8">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Country
                  </label>
                  <p className="text-sm text-gray-500">
                    Select your country of residence.
                  </p>
                </div>
                <div className="w-[500px]">
                  <div className="relative">
                    <Compass className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <select
                      value={campaignData.country}
                      onChange={(e) => updateData({ country: e.target.value })}
                      className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent appearance-none bg-white"
                    >
                      <option value="Nigeria">Nigeria</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                  </div>
                </div>
              </div>

              <div className="flex items-start justify-between">
                <div className="flex-1 pr-8">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    State
                  </label>
                  <p className="text-sm text-gray-500">
                    Select your state of residence.
                  </p>
                </div>
                <div className="w-[500px]">
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <select
                      value={campaignData.state}
                      onChange={(e) => updateData({ state: e.target.value })}
                      className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent appearance-none bg-white"
                    >
                      <option value="">Select a state</option>
                      {NIGERIAN_STATES.map((state) => (
                        <option key={state} value={state}>
                          {state}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                  </div>
                  {errors.state && (
                    <p className="mt-1 text-sm text-red-600">{errors.state}</p>
                  )}
                </div>
              </div>

              <div className="flex items-start justify-between">
                <div className="flex-1 pr-8">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    School
                  </label>
                  <p className="text-sm text-gray-500">
                    Select your school or institution.
                  </p>
                </div>
                <div className="w-[500px]">
                  <div className="relative">
                    <GraduationCap className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <select
                      value={campaignData.school}
                      onChange={(e) => updateData({ school: e.target.value })}
                      className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent appearance-none bg-white"
                    >
                      <option value="">Select a school</option>
                      {NIGERIAN_SCHOOLS.map((school) => (
                        <option key={school} value={school}>
                          {school}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                  </div>
                  {errors.school && (
                    <p className="mt-1 text-sm text-red-600">{errors.school}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Funding goal
              </h2>
            </div>

            <div className="space-y-8">
              <div className="flex items-start justify-between">
                <div className="flex-1 pr-8">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Currency
                  </label>
                  <p className="text-sm text-gray-500">
                    Select the currency type for the fundraiser.
                  </p>
                </div>
                <div className="w-[500px]">
                  <select
                    value={campaignData.currency}
                    onChange={(e) =>
                      updateData({ currency: e.target.value as "NGN" | "USDT" })
                    }
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent appearance-none bg-white"
                  >
                    <option value="NGN">Naira (₦)</option>
                    <option value="USDT">USDT ($)</option>
                  </select>
                </div>
              </div>

              <div className="flex items-start justify-between">
                <div className="flex-1 pr-8">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Set Your Funding Goal
                  </label>
                  <p className="text-sm text-gray-500">
                    You can always adjust your goal as your campaign progresses.
                  </p>
                </div>
                <div className="w-[500px]">
                  <input
                    type="text"
                    value={
                      campaignData.amount
                        ? formatNumber(campaignData.amount)
                        : ""
                    }
                    onChange={(e) => handleAmountChange(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Enter amount"
                  />
                  {errors.amount && (
                    <p className="mt-1 text-sm text-red-600">{errors.amount}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {currentStep === 3 && (
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Campaign details
              </h2>
            </div>

            {/* Writing Prompts Banner */}
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <p className="text-sm text-green-800">
                We&apos;ve provided{" "}
                <span className="underline cursor-pointer">
                  writing prompts
                </span>{" "}
                and guides to help you along the way.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Title
                  </label>
                  <p className="text-sm text-gray-500 mb-3">
                    Make sure it&apos;s brief and eye-catching!
                  </p>
                  <input
                    type="text"
                    value={campaignData.title}
                    onChange={(e) => updateData({ title: e.target.value })}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Enter your campaign title"
                  />
                  {errors.title && (
                    <p className="mt-1 text-sm text-red-600">{errors.title}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category
                  </label>
                  <p className="text-sm text-gray-500 mb-3">
                    Choose a category that best represents your campaign.
                  </p>
                  <div className="relative">
                    <select
                      value={campaignData.category}
                      onChange={(e) => updateData({ category: e.target.value })}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent appearance-none bg-white"
                    >
                      <option value="">Select a category...</option>
                      {CAMPAIGN_CATEGORIES.map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                  </div>
                  {errors.category && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.category}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Choose a Campaign Duration
                  </label>
                  <p className="text-sm text-gray-500 mb-3">
                    This is how long you want the campaign to run. You can edit
                    this later.
                  </p>
                  <input
                    type="text"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Enter duration (e.g., 30 days)"
                  />
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tell Your Story
                  </label>
                  <p className="text-sm text-gray-500 mb-3">
                    Three words: Details, details, details!
                  </p>
                  <textarea
                    value={campaignData.story}
                    onChange={(e) => updateData({ story: e.target.value })}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
                    rows={8}
                    placeholder="Tell your story here..."
                  />
                  {errors.story && (
                    <p className="mt-1 text-sm text-red-600">{errors.story}</p>
                  )}
                  {campaignData.story.length > 0 &&
                    campaignData.story.length < 60 && (
                      <p className="mt-1 text-sm text-gray-500">
                        Story must be at least 60 characters
                      </p>
                    )}
                </div>

                {/* Tips Section */}
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-start space-x-2">
                    <span className="text-green-600 text-lg">💡</span>
                    <div>
                      <h4 className="text-sm font-medium text-green-800 mb-2">
                        TIPS:
                      </h4>
                      <p className="text-sm text-green-700 mb-2">
                        Some ideas to help you start writing:
                      </p>
                      <ul className="text-sm text-green-700 space-y-1">
                        <li>• Start with a short introduction of yourself</li>
                        <li>• Why this campaign is important to you</li>
                        <li>• and</li>
                        <li>• Your plans for the funds.</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {currentStep === 4 && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Upload Engaging Media
                </h2>
                <p className="text-gray-600">
                  Did you know that campaigns with high-quality visuals are 2x
                  more likely to receive donations?
                </p>
              </div>

              <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <ImageIcon className="w-8 h-8 text-gray-400" />
                </div>
                <p className="text-gray-600 mb-2">
                  Click to upload or drag and drop
                </p>
                <p className="text-sm text-gray-500">
                  SVG, PNG, JPG or GIF (max. 800x400px)
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center mt-12 pt-8 border-t border-gray-200">
          <button
            onClick={handleBack}
            className="flex items-center space-x-2 text-green-600 hover:text-green-700"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to previous page</span>
          </button>

          <div className="flex space-x-4">
            {currentStep === 4 && (
              <button className="px-6 py-2 border border-green-600 text-green-600 rounded-lg hover:bg-green-50">
                Preview Campaign
              </button>
            )}
            <button
              onClick={currentStep === 4 ? handleSubmit : handleNext}
              className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              {currentStep === 4 ? "Launch campaign" : "Continue"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateCampaignPage;
