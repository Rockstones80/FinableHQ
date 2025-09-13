"use client";
import React, { useState } from "react";
import {
  Bell,
  DollarSign,
  Users,
  Target,
  Heart,
  MoreHorizontal,
  Share2,
  Gift,
  Activity,
} from "lucide-react";
import KYCDashboardCards from "@/components/ui/CardCarosel";
import NotificationPanel from "@/components/layout/NotificationPanel";
import { dummyNotifications } from "@/types/notification";

const DashboardOverview = () => {
  // FIX: Initialize with the array, not the length
  const [notifications, setNotifications] = useState(dummyNotifications);
  const [showKYC, setShowKYC] = useState(true);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

  // Now this will work because notifications is an array
  const unreadCount = notifications.filter(n => n.unread).length;

  // Mock data
  const stats = [
    {
      title: "Total Raised",
      value: "₦0",
      change: "+0%",
      trend: "up",
      icon: DollarSign,
      color: "green",
    },
    {
      title: "Active Campaigns",
      value: "0",
      change: "+0",
      trend: "up",
      icon: Target,
      color: "blue",
    },
    {
      title: "Total Donors",
      value: "0",
      change: "+0%",
      trend: "up",
      icon: Users,
      color: "purple",
    },
  ];

  type Campaign = {
    title: string;
    description: string;
    raised: number;
    goal: number;
    donors: number;
  };

  type Donation = {
    donor: string;
    campaign: string;
    amount: number;
    time: string;
  };

  const recentDonations: Donation[] = [];
  const campaigns: Campaign[] = [];

  const quickActions = [
    {
      title: "Share Link",
      description: "Share your campaign with others",
      icon: Share2,
      color: "bg-blue-500",
      action: () => console.log("Share link"),
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 relative">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold text-gray-800">Overview</h1>
          </div>

          <div className="flex items-center space-x-4">
            <div className="relative">
              <button 
                onClick={() => setIsNotificationOpen(!isNotificationOpen)}
                className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer " title="notifications"
              >
                <Bell className="w-5 h-5 text-gray-600" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center animate-pulse">
                    {unreadCount > 9 ? '9+' : unreadCount}
                  </span>
                )}
              </button>
            </div>

            <div className="flex items-center space-x-3 bg-gray-100 rounded-full px-4 py-2">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white font-semibold text-sm">SU</span>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-800">Samuel Uzor</p>
                <p className="text-xs text-gray-500">ID: OWO-SOEBL</p>
              </div>
              <span className="px-2 py-1 bg-green-100 text-green-600 text-xs font-medium rounded-full">
                Verified
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Notification Panel */}
      
      <NotificationPanel 
        isOpen={isNotificationOpen}
        onClose={() => setIsNotificationOpen(false)}
        notifications={notifications}
        setNotifications={setNotifications}
      />

      {/* Main Content */}
      <main className="p-6 ">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-lg bg-${stat.color}-100`}>
                    <IconComponent
                      className={`w-6 h-6 text-${stat.color}-600`}
                    />
                  </div>
                  <span
                    className={`text-sm font-medium px-2 py-1 rounded-full ${
                      stat.trend === "up"
                        ? "text-green-600 bg-green-100"
                        : "text-red-600 bg-red-100"
                    }`}
                  >
                    {stat.change}
                  </span>
                </div>
                <h3 className="text-gray-500 text-sm font-medium mb-1">
                  {stat.title}
                </h3>
                <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
              </div>
            );
          })}

          {quickActions.map((action, index) => {
            const IconComponent = action.icon;
            return (
              <button
                key={index}
                onClick={action.action}
                className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all hover:scale-[1.02] text-left group"
              >
                <div
                  className={`${action.color} w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                >
                  <IconComponent className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">
                  {action.title}
                </h3>
                <p className="text-sm text-gray-500">{action.description}</p>
              </button>
            );
          })}
        </div>

        <div className="pb-6">
          <button 
            className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-red-900 rounded-lg transition-colors cursor-pointer ml-auto" 
            onClick={() => setShowKYC(!showKYC)}
          >
            {showKYC ? "Hide Account Verification" : "Show Account Verification"}
          </button>
        </div>

        {showKYC && (
          <div className="py-4">
            <KYCDashboardCards className="py-4"/>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* My Campaigns Section */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-800">
                  My Campaigns
                </h2>
                <button className="px-4 py-2 text-green-600 border border-green-200 rounded-lg hover:bg-green-50 transition-colors font-medium">
                  See More
                </button>
              </div>
            </div>

            <div className="p-6">
              {campaigns.length === 0 ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Target className="w-8 h-8 text-gray-400" />
                  </div>
                  <p className="text-gray-500 mb-6">
                    You haven&apos;t created any campaigns yet.
                  </p>
                  <button className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium">
                    Create Your First Campaign
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {campaigns.map((campaign, index) => (
                    <div
                      key={index}
                      className="border border-gray-100 rounded-lg p-4 hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-800 mb-1">
                            {campaign.title}
                          </h3>
                          <p className="text-sm text-gray-500 mb-2">
                            {campaign.description}
                          </p>
                          <div className="flex items-center space-x-4 text-sm">
                            <span className="text-green-600 font-medium">
                              ₦{campaign.raised} raised
                            </span>
                            <span className="text-gray-500">
                              of ₦{campaign.goal}
                            </span>
                            <span className="text-gray-500">
                              {campaign.donors} donors
                            </span>
                          </div>
                        </div>
                        <button className="p-2 hover:bg-gray-100 rounded-lg">
                          <MoreHorizontal className="w-4 h-4 text-gray-400" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Recent Donations Section */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-800">
                  Recent Donations
                </h2>
                <button className="px-4 py-2 text-green-600 border border-green-200 rounded-lg hover:bg-green-50 transition-colors font-medium">
                  See More
                </button>
              </div>
            </div>

            <div className="p-6">
              {recentDonations.length === 0 ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Gift className="w-8 h-8 text-gray-400" />
                  </div>
                  <p className="text-gray-500 mb-2">No donations yet</p>
                  <p className="text-sm text-gray-400">
                    Donations will appear here once you start receiving them
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {recentDonations.map((donation, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-4 p-3 hover:bg-gray-50 rounded-lg transition-colors"
                    >
                      <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                        <Heart className="w-5 h-5 text-green-600" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-gray-800">
                          {donation.donor}
                        </p>
                        <p className="text-sm text-gray-500">
                          {donation.campaign}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-green-600">
                          ₦{donation.amount}
                        </p>
                        <p className="text-xs text-gray-400">{donation.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="mt-8 bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-xl font-bold text-gray-800">Recent Activity</h2>
          </div>
          <div className="p-6">
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Activity className="w-8 h-8 text-gray-400" />
              </div>
              <p className="text-gray-500">No recent activity</p>
              <p className="text-sm text-gray-400 mt-1">
                Your campaign activities will appear here
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardOverview;