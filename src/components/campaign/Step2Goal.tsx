"use client";
import React, { useState, useEffect } from "react";
// import { DollarSign } from "lucide-react";
import { CampaignData } from "@/types/campaign";

interface Step2GoalProps {
  data: CampaignData;
  updateData: (updates: Partial<CampaignData>) => void;
  errors: Record<string, string>;
}

const Step2Goal: React.FC<Step2GoalProps> = ({ data, updateData, errors }) => {
  const [amount, setAmount] = useState(data.amount || 80000);
  const [decimal, setDecimal] = useState("00");

  useEffect(() => {
    updateData({ amount });
  }, [amount, updateData]);

  const formatNumber = (num: number): string => {
    return new Intl.NumberFormat("en-NG").format(num);
  };

  const numberToWords = (num: number): string => {
    const ones = [
      "",
      "One",
      "Two",
      "Three",
      "Four",
      "Five",
      "Six",
      "Seven",
      "Eight",
      "Nine",
    ];
    const tens = [
      "",
      "",
      "Twenty",
      "Thirty",
      "Forty",
      "Fifty",
      "Sixty",
      "Seventy",
      "Eighty",
      "Ninety",
    ];
    const teens = [
      "Ten",
      "Eleven",
      "Twelve",
      "Thirteen",
      "Fourteen",
      "Fifteen",
      "Sixteen",
      "Seventeen",
      "Eighteen",
      "Nineteen",
    ];

    if (num === 0) return "Zero";
    if (num < 10) return ones[num];
    if (num < 20) return teens[num - 10];
    if (num < 100)
      return (
        tens[Math.floor(num / 10)] + (num % 10 ? " " + ones[num % 10] : "")
      );
    if (num < 1000)
      return (
        ones[Math.floor(num / 100)] +
        " Hundred" +
        (num % 100 ? " " + numberToWords(num % 100) : "")
      );
    if (num < 1000000)
      return (
        numberToWords(Math.floor(num / 1000)) +
        " Thousand" +
        (num % 1000 ? " " + numberToWords(num % 1000) : "")
      );
    if (num < 1000000000)
      return (
        numberToWords(Math.floor(num / 1000000)) +
        " Million" +
        (num % 1000000 ? " " + numberToWords(num % 1000000) : "")
      );
    return "Very Large Number";
  };

  const handleAmountChange = (value: string) => {
    const numericValue = parseInt(value.replace(/,/g, "")) || 0;
    setAmount(numericValue);
  };

  const handleDecimalChange = (value: string) => {
    if (value.length <= 2) {
      setDecimal(value.padEnd(2, "0"));
    }
  };

  const getCurrencySymbol = () => {
    return data.currency === "NGN" ? "₦" : "$";
  };

  const getCurrencyName = () => {
    return data.currency === "NGN" ? "Naira (NGN)" : "USDT";
  };

  const getMinMaxLimits = () => {
    if (data.currency === "NGN") {
      return { min: 1000, max: 50000000 };
    }
    return { min: 10, max: 1000000 };
  };

  const limits = getMinMaxLimits();

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
                  STEP 3 OF 5
                </div>
                <h1 className="text-3xl font-bold text-gray-900">
                  Your Fundraising Goal
                </h1>
              </div>
            </div>

            <p className="text-lg text-gray-600">
              Set a goal that covers your needs and gives you room to grow.
            </p>

            {/* Fundraising Tips */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h3 className="font-semibold text-blue-900 mb-3">
                Fundraising Tips:
              </h3>
              <ul className="space-y-2 text-sm text-blue-800">
                <li>
                  • Set a goal based on your project&apos;s needs. You can
                  update this only 3 times.
                </li>
                <li>
                  • Explain how the funds will be used to encourage donations.
                </li>
                <li>• Meaningful goals tend to receive more support.</li>
              </ul>
            </div>
          </div>

          {/* Right Panel */}
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Your Fundraising Goal
              </h2>

              {/* Currency Selection */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Currency
                </label>
                <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
                  <button
                    onClick={() => updateData({ currency: "NGN" })}
                    className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                      data.currency === "NGN"
                        ? "bg-white text-blue-600 shadow-sm"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    ₦ Naira (NGN)
                  </button>
                  <button
                    onClick={() => updateData({ currency: "USDT" })}
                    className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                      data.currency === "USDT"
                        ? "bg-white text-blue-600 shadow-sm"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    $ USDT
                  </button>
                </div>
              </div>

              {/* Amount Input */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Amount
                </label>
                <div className="flex items-center space-x-2">
                  <div className="flex-1">
                    <input
                      type="text"
                      value={formatNumber(amount)}
                      onChange={(e) => handleAmountChange(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="0"
                    />
                  </div>
                  <div className="w-20">
                    <input
                      type="text"
                      value={decimal}
                      onChange={(e) => handleDecimalChange(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-center"
                      placeholder="00"
                    />
                  </div>
                </div>

                {/* Amount in Words */}
                <div className="mt-2 text-sm text-gray-600">
                  {numberToWords(amount)} {getCurrencyName()}
                </div>
              </div>

              {/* Auto-adjust Goal */}
              <div className="mb-6">
                <label className="flex items-start space-x-3">
                  <input
                    type="checkbox"
                    checked={data.autoAdjustGoal}
                    onChange={(e) =>
                      updateData({ autoAdjustGoal: e.target.checked })
                    }
                    className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <div>
                    <span className="text-sm font-medium text-gray-700">
                      Auto-adjust your goal to cover fees?
                    </span>
                    <p className="text-xs text-gray-500 mt-1">
                      Yes, add a buffer to protect my goal.
                    </p>
                  </div>
                </label>
              </div>

              {/* Limits Note */}
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <p className="text-sm text-yellow-800">
                  <span className="font-medium">Note:</span> Personal accounts
                  have a maximum limit of {getCurrencySymbol()}
                  {formatNumber(limits.max)} {getCurrencyName()} and a minimum
                  of {getCurrencySymbol()}
                  {formatNumber(limits.min)} {getCurrencyName()}.
                </p>
              </div>

              {/* Validation Errors */}
              {errors.amount && (
                <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-sm text-red-600">{errors.amount}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step2Goal;
