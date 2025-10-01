import {
  User,
  Shield,
  Bell,
  Lock,
  MessageCircle,
  AtSign,
  MessageSquare,
  Share2,
  UserX,
  Type,
  Volume2,
  Image,
  Heart,
  Download,
  Accessibility,
  Globe,
  Monitor,
  HelpCircle,
  FileText,
  UserCheck,
  LucideIcon,
} from "lucide-react";

interface SettingsMenuItem {
  id: string;
  icon: LucideIcon;
  label: string;
}

interface SettingsSection {
  section: string;
  description?: string;
  items: SettingsMenuItem[];
  viewMore?: string;
}

interface SettingsSidebarProps {
  activeSettingsItem: string;
  onSettingsItemClick: (itemId: string) => void;
}

const settingsMenuItems: SettingsSection[] = [
  {
    section: "Accounts Centre",
    items: [
      { id: "personal-details", icon: User, label: "Personal details" },
      { id: "password-security", icon: Shield, label: "Password and security" },
    ],
  },
  {
    section: "How you use Finable",
    items: [
      { id: "edit-profile", icon: User, label: "Edit Profile" },
      { id: "notifications", icon: Bell, label: "Notifications" },
    ],
  },
  {
    section: "Who can see your content",
    items: [
      { id: "account-privacy", icon: Lock, label: "Account privacy" },
      { id: "blocked", icon: UserX, label: "Blocked" },
    ],
  },
  {
    section: "How others can interact with you",
    items: [
      {
        id: "messages-replies",
        icon: MessageCircle,
        label: "Messages and story replies",
      },
      { id: "tags-mentions", icon: AtSign, label: "Tags and mentions" },
      { id: "comments", icon: MessageSquare, label: "Comments" },
      { id: "sharing-reuse", icon: Share2, label: "Sharing and reuse" },
      { id: "restricted-accounts", icon: UserX, label: "Restricted accounts" },
      { id: "hidden-words", icon: Type, label: "Hidden words" },
    ],
  },
  {
    section: "What you see",
    items: [
      { id: "muted-accounts", icon: Volume2, label: "Muted accounts" },
      { id: "content-preferences", icon: Image, label: "Content preferences" },
      { id: "like-share-counts", icon: Heart, label: "Like and share counts" },
    ],
  },
  {
    section: "Your app and media",
    items: [
      {
        id: "archiving-downloading",
        icon: Download,
        label: "Archiving and downloading",
      },
      { id: "accessibility", icon: Accessibility, label: "Accessibility" },
      { id: "language", icon: Globe, label: "Language" },
      {
        id: "website-permissions",
        icon: Monitor,
        label: "Website permissions",
      },
    ],
  },
  {
    section: "Family Centre",
    items: [
      {
        id: "supervision-teen",
        icon: UserCheck,
        label: "Supervision for Teen Accounts",
      },
    ],
  },

  {
    section: "More info and support",
    items: [
      { id: "help", icon: HelpCircle, label: "Help" },
      { id: "privacy-centre", icon: FileText, label: "Privacy Centre" },
      { id: "account-status", icon: UserCheck, label: "Account Status" },
    ],
  },
];

const SettingsSidebar: React.FC<SettingsSidebarProps> = ({
  activeSettingsItem,
  onSettingsItemClick,
}) => {
  return (
    <div className="w-80 bg-white border-r border-gray-200 overflow-y-auto h-full">
      <div className="p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Settings</h2>

        <div className="space-y-6">
          {settingsMenuItems.map((section, sectionIndex) => (
            <div key={sectionIndex} className="space-y-3">
              <h4 className="font-medium text-gray-500 text-sm">
                {section.section}
              </h4>

              {/* Menu Items */}
              <div className="space-y-1">
                {section.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeSettingsItem === item.id;

                  return (
                    <button
                      key={item.id}
                      onClick={() => onSettingsItemClick(item.id)}
                      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all duration-200 group ${
                        isActive
                          ? "bg-gray-100 border border-gray-200"
                          : "hover:bg-gray-50"
                      }`}
                    >
                      <Icon className="w-5 h-5 text-gray-600" />
                      <span className="text-gray-900 font-medium">
                        {item.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SettingsSidebar;
