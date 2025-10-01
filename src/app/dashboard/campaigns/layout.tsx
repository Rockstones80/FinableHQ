import React from "react";

interface CampaignsLayoutProps {
  children: React.ReactNode;
}

const CampaignsLayout: React.FC<CampaignsLayoutProps> = ({ children }) => {
  return <div className="min-h-screen bg-gray-50">{children}</div>;
};

export default CampaignsLayout;
