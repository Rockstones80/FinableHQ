'use client'
import React, { useState } from 'react';
import { Check, ChevronDown } from 'lucide-react';

const FeeCalculatorComponent = () => {
  const [amount, setAmount] = useState(100);
  const [transactionType, setTransactionType] = useState('donation');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isTransactionDropdownOpen, setIsTransactionDropdownOpen] = useState(false);

  const calculateFees = () => {
    let feePercent = 0;
    let flatFee = 0;

    if (transactionType === 'donation') {
      feePercent = 5;
      flatFee = 0; // No flat fee for donations, just percentage
    } else if (transactionType === 'payout') {
      if (amount <= 500000) {
        feePercent = 0.5;
        flatFee = 100;
      } else if (amount <= 2000000) {
        feePercent = 1;
        flatFee = 800;
      } else {
        feePercent = 2.5;
        flatFee = 1050;
      }
    }

    const totalFees = (amount * feePercent / 100) + flatFee;
    const settledAmount = Math.max(0, amount - totalFees);

    return {
      totalFees: totalFees.toFixed(2),
      settledAmount: settledAmount.toFixed(2),
      feePercent
    };
  };

  const { totalFees, settledAmount, feePercent } = calculateFees();

  const transactionTypes = [
    { value: 'donation', label: 'Donation (Receiving Funds)' },
    { value: 'payout', label: 'Payout (Withdrawing Funds)' }
  ];

  return (
   
    <div className="max-w-6xl mx-auto p-6 mb-12">
         <style jsx>{`
    .tab-active {
          background: linear-gradient(135deg, #10b981, #059669);
          color: white;
          box-shadow: 0 8px 25px rgba(16, 185, 129, 0.3);
          border: none;
        }
          .tab-inactive {
          background: white;
          color: #374151;
          border: 2px solid #10b981;
          transition: all 0.3s ease;
        }`} 

    </style>
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-extrabold text-gray-900">
          Fee Calculator
        </h1>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Left Panel - Calculator Form */}
        <div className="bg-white rounded-xl border border-gray-200 p-8 tab-inactive">
          <h2 className="text-2xl font-semibold text-green-600 mb-8">
            Calculate Your Fees
          </h2>

          <div className="space-y-6">
            {/* Amount Input */}
            <div>
              <label className="block text-gray-700 font-medium mb-3">
                Amount
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 text-lg">
                  ₦
                </span>
                <input
                  type="text"
                  value={amount === 0 ? '' : amount}
                  onChange={(e) => {
                    const value = e.target.value.replace(/[^0-9]/g, '');
                    setAmount(value === '' ? 0 : Number(value));
                  }}
                  className="w-full pl-8 pr-4 py-4 text-lg border border-gray-300 rounded-lg focus:ring-1 focus:ring-green-600 focus:border-green-600 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  placeholder="100"
                />
              </div>
            </div>

            {/* Currency Dropdown */}
            <div>
              <label className="block text-gray-700 font-medium mb-3">
                Currency
              </label>
              <div className="relative">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="w-full px-4 py-4 text-left border border-gray-300 rounded-lg bg-white flex items-center justify-between focus:ring-1 focus:ring-green-600 focus:border-green-600 outline-none"
                >
                  <span className="text-gray-900">Naira (₦)</span>
                  <ChevronDown className="w-5 h-5 text-gray-400" />
                </button>
              </div>
            </div>

            {/* Transaction Type Dropdown */}
            <div>
              <label className="block text-gray-700 font-medium mb-3">
                Transaction Type
              </label>
              <div className="relative">
                <button
                  onClick={() => setIsTransactionDropdownOpen(!isTransactionDropdownOpen)}
                  className="w-full px-4 py-4 text-left border border-gray-300 rounded-lg bg-white flex items-center justify-between focus:ring-1 focus:ring-green-600 focus:border-green-600 outline-none"
                >
                  <span className="text-gray-900">
                    {transactionTypes.find(t => t.value === transactionType)?.label}
                  </span>
                  <ChevronDown className="w-5 h-5 text-gray-400" />
                </button>
                
                {isTransactionDropdownOpen && (
                  <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg">
                    {transactionTypes.map((type) => (
                      <button
                        key={type.value}
                        onClick={() => {
                          setTransactionType(type.value);
                          setIsTransactionDropdownOpen(false);
                        }}
                        className="w-full px-4 py-3 text-left hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg"
                      >
                        {type.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel - Results */}
        <div className=" rounded-xl p-8 text-white tab-active">
          <div className="mb-8">
            <p className="text-blue-200 text-sm font-medium mb-2">
              IF YOUR CUSTOMER PAYS
            </p>
            <p className="text-4xl font-bold">
              NGN {amount.toLocaleString()}
            </p>
          </div>

          <div className="mb-8">
            <p className="text-blue-200 text-sm font-medium mb-2">
              WE&apos;LL SETTLE YOU
            </p>
            <p className="text-4xl font-bold">
              NGN {Number(settledAmount).toLocaleString()}.00
            </p>
          </div>

          <div className="mb-8">
            <p className="text-blue-200 text-sm font-medium mb-2">
              TOTAL FEES ({feePercent}%)
            </p>
            <p className="text-4xl font-bold">
              NGN {Number(totalFees).toLocaleString()}
            </p>
          </div>

          {/* Feature List */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <Check className="w-5 h-5 text-green-400 flex-shrink-0" />
              <span className="text-blue-100">
                Free, automatic settlement within 24 hours
              </span>
            </div>
            <div className="flex items-center space-x-3">
              <Check className="w-5 h-5 text-green-400 flex-shrink-0" />
              <span className="text-blue-100">
                No hidden fees or charges
              </span>
            </div>
            <div className="flex items-center space-x-3">
              <Check className="w-5 h-5 text-green-400 flex-shrink-0" />
              <span className="text-blue-100">
                Zero Integration fee
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeeCalculatorComponent;