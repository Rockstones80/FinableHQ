"use client";
import React, { useState } from "react";
import {
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  Eye,
  Edit,
  Share2,
  Target,
} from "lucide-react";
import { useRouter } from "next/navigation";

interface Campaign {
  id: string;
  title: string;
  description: string;
  goal: number;
  raised: number;
  donors: number;
  category: string;
  status: "draft" | "active" | "paused" | "completed";
  createdAt: string;
  coverImage?: string;
  currency: "NGN" | "USDT";
}

const CampaignsPage = () => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("newest");

  // Mock data - in a real app, this would come from your API
  const [campaigns] = useState<Campaign[]>([
    {
      id: "1",
      title: "Help Sarah Get Through Medical School",
      description:
        "Supporting Sarah's dream to become a doctor and help her community.",
      goal: 500000,
      raised: 125000,
      donors: 23,
      category: "Education",
      status: "active",
      createdAt: "2024-01-15",
      currency: "NGN",
    },
    {
      id: "2",
      title: "Community Clean Water Project",
      description: "Building a clean water system for our local community.",
      goal: 200000,
      raised: 45000,
      donors: 12,
      category: "Community",
      status: "active",
      createdAt: "2024-01-10",
      currency: "NGN",
    },
    {
      id: "3",
      title: "Emergency Relief Fund",
      description: "Supporting families affected by recent flooding.",
      goal: 100000,
      raised: 100000,
      donors: 45,
      category: "Disaster Relief",
      status: "completed",
      createdAt: "2024-01-05",
      currency: "NGN",
    },
  ]);

  const filteredCampaigns = campaigns.filter((campaign) => {
    const matchesSearch =
      campaign.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      campaign.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter =
      filterStatus === "all" || campaign.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "draft":
        return "bg-gray-100 text-gray-800";
      case "paused":
        return "bg-yellow-100 text-yellow-800";
      case "completed":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getProgressPercentage = (raised: number, goal: number) => {
    return Math.min((raised / goal) * 100, 100);
  };

  const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: currency === "NGN" ? "NGN" : "USD",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">My Campaigns</h1>
              <p className="text-gray-600 mt-1">
                Manage and track your fundraising campaigns
              </p>
            </div>
            <button
              onClick={() => router.push("/dashboard/campaigns/new")}
              className="flex items-center space-x-2 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
            >
              <Plus className="w-5 h-5" />
              <span>Create Campaign</span>
            </button>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search campaigns..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Status Filter */}
            <div className="flex items-center space-x-2">
              <Filter className="w-5 h-5 text-gray-400" />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="all">All Status</option>
                <option value="draft">Draft</option>
                <option value="active">Active</option>
                <option value="paused">Paused</option>
                <option value="completed">Completed</option>
              </select>
            </div>

            {/* Sort */}
            <div className="flex items-center space-x-2">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="most-raised">Most Raised</option>
                <option value="least-raised">Least Raised</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Campaigns Grid */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {filteredCampaigns.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Target className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No campaigns found
            </h3>
            <p className="text-gray-500 mb-6">
              {searchTerm || filterStatus !== "all"
                ? "Try adjusting your search or filter criteria."
                : "Get started by creating your first campaign."}
            </p>
            {!searchTerm && filterStatus === "all" && (
              <button
                onClick={() => router.push("/dashboard/campaigns/new")}
                className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
              >
                Create Your First Campaign
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCampaigns.map((campaign) => (
              <div
                key={campaign.id}
                className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
              >
                {/* Cover Image */}
                <div className="h-48 bg-gradient-to-br from-green-400 to-green-600 relative">
                  {campaign.coverImage ? (
                    <img
                      src={campaign.coverImage}
                      alt={campaign.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Target className="w-12 h-12 text-white opacity-50" />
                    </div>
                  )}
                  <div className="absolute top-4 right-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(campaign.status)}`}
                    >
                      {campaign.status.charAt(0).toUpperCase() +
                        campaign.status.slice(1)}
                    </span>
                  </div>
                </div>

                {/* Campaign Details */}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
                      {campaign.title}
                    </h3>
                    <button className="p-1 hover:bg-gray-100 rounded-lg">
                      <MoreHorizontal className="w-5 h-5 text-gray-400" />
                    </button>
                  </div>

                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {campaign.description}
                  </p>

                  {/* Progress Bar */}
                  <div className="mb-4">
                    <div className="flex justify-between text-sm text-gray-600 mb-1">
                      <span>Progress</span>
                      <span>
                        {Math.round(
                          getProgressPercentage(campaign.raised, campaign.goal)
                        )}
                        %
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-green-600 h-2 rounded-full transition-all duration-300"
                        style={{
                          width: `${getProgressPercentage(campaign.raised, campaign.goal)}%`,
                        }}
                      ></div>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="text-center">
                      <div className="text-lg font-semibold text-gray-900">
                        {formatCurrency(campaign.raised, campaign.currency)}
                      </div>
                      <div className="text-xs text-gray-500">Raised</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-semibold text-gray-900">
                        {campaign.donors}
                      </div>
                      <div className="text-xs text-gray-500">Donors</div>
                    </div>
                  </div>

                  {/* Goal */}
                  <div className="text-center text-sm text-gray-600 mb-4">
                    Goal: {formatCurrency(campaign.goal, campaign.currency)}
                  </div>

                  {/* Actions */}
                  <div className="flex space-x-2">
                    <button className="flex-1 flex items-center justify-center space-x-2 py-2 px-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                      <Eye className="w-4 h-4" />
                      <span>View</span>
                    </button>
                    <button className="flex-1 flex items-center justify-center space-x-2 py-2 px-3 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors">
                      <Share2 className="w-4 h-4" />
                      <span>Share</span>
                    </button>
                    <button className="p-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                      <Edit className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CampaignsPage;
