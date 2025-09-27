"use client";

import React, { useState } from 'react';
import { SidebarProvider } from '@/components/layout/sidebar';
import SettingsSidebar from '@/components/layout/settingsSidebar';
import SettingsContent from '@/components/settings/SettingsContent';

// Type definition for settings item IDs based on your sidebar menu
type SettingsItemId = 
  | "personal-details"
  | "password-security" 
  | "edit-profile"
  | "notifications"
  | "account-privacy"
  | "hide-story"
  | "messages-replies"
  | "tags-mentions"
  | "comments"
  | "sharing-reuse"
  | "restricted-accounts"
  | "hidden-words"
  | "muted-accounts"
  | "content-preferences"
  | "like-share-counts"
  | "archiving-downloading"
  | "accessibility"
  | "language"
  | "website-permissions"
  | "supervision-teen"
  | "account-type-tools"
  | "meta-verified"
  | "help"
  | "privacy-centre"
  | "account-status";

// User data - consider moving to context or fetching from API
const userData = {
  name: "John Doe",
  email: "john.doe@example.com",
  profilePic: null,
};

const SettingsPage: React.FC = () => {
  const [activeSettingsItem, setActiveSettingsItem] = useState<SettingsItemId>("edit-profile");

  const handleSettingsItemClick = (itemId: string): void => {
    setActiveSettingsItem(itemId as SettingsItemId);
  };

  return (
    <SidebarProvider>
      <div className="flex h-screen bg-gray-50">

        <div className="flex flex-1">

          <SettingsSidebar
            activeSettingsItem={activeSettingsItem}
            onSettingsItemClick={handleSettingsItemClick}
          />
          
          {/* Settings Content - Passes active item and user data */}
          <SettingsContent 
            activeSettingsItem={activeSettingsItem}
            userData={userData}
          />
        </div>
      </div>
    </SidebarProvider>
  );
};

export default SettingsPage;