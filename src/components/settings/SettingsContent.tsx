import React from 'react';

// Import individual settings pages here as created
// import EditProfile from '@/components/settings/pages/EditProfile';
// import Notifications from '@/components/settings/pages/Notifications';
// import AccountPrivacy from '@/components/settings/pages/AccountPrivacy';
// ... import other pages as needed

// Props interface for the SettingsContent component
interface SettingsContentProps {
  activeSettingsItem: string;
  userData: {
    name: string;
    email: string;
    profilePic: string | null;
  };
}

const SettingsContent: React.FC<SettingsContentProps> = ({ 
  activeSettingsItem, 
  userData 
}) => {
  
  // Function to render the appropriate settings page
  const renderSettingsPage = () => {
   if (activeSettingsItem == 'edit-profile') {
     
        return (
          <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Edit Profile</h1>
            <p className="text-gray-600">Edit profile settings page - coming soon!</p>
            <div className="mt-4 p-4 bg-gray-100 rounded-lg">
              <p><strong>Current User:</strong> {userData.name}</p>
              <p><strong>Email:</strong> {userData.email}</p>
            </div>
          </div>
        );
}
        else{
        return (
          <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Settings</h1>
            <p className="text-gray-600">
              Selected: <span className="font-medium">{activeSettingsItem}</span>
            </p>
            <p className="text-gray-500 mt-2">This settings page is not implemented yet.</p>
          </div>
        );
    }
  };

  return (
    <div className="flex-1 bg-white">
      {renderSettingsPage()}
    </div>
  );
};

export default SettingsContent;