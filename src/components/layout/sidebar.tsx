"use client";

import React, { useState, createContext, useContext, useEffect } from 'react';
import { 
  LayoutDashboard, 
  Megaphone, 
  FolderOpen, 
  Plus, 
  Heart, 
  DollarSign, 
  Link, 
  Settings,
  Menu,
  X,
  Bell,
  User,
  LogOut,
  UserCircle,
  ChevronUp
} from 'lucide-react';

interface User {
  name: string;
  email: string;
  profilePic: string | null;
}

interface SubmenuItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface MenuItem {
  id: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  section: string;
  hasSubmenu?: boolean;
  submenu?: SubmenuItem[];
  hasNotifications?: boolean;
  notificationCount?: number;
}

interface SidebarContextType {
  isCollapsed: boolean;
  isMobile: boolean;
  toggleSidebar: () => void;
  collapseSidebar: () => void;
  expandSidebar: () => void;
}

// Create the context
const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

// Custom hook to use sidebar context
const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (context === undefined) {
    throw new Error('useSidebar must be used within a SidebarProvider');
  }
  return context;
};

// SidebarProvider Component
export const SidebarProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  // Handle window resize for mobile detection
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const toggleSidebar = () => {
    setIsCollapsed(prev => !prev);
  };

  const collapseSidebar = () => {
    setIsCollapsed(true);
  };

  const expandSidebar = () => {
    setIsCollapsed(false);
  };

  // Keyboard shortcut handler - using useRef to avoid dependency issues
  const toggleSidebarRef = React.useRef(toggleSidebar);
  toggleSidebarRef.current = toggleSidebar;

  useEffect(() => {
    const handleKeyboard = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'b') {
        e.preventDefault();
        toggleSidebarRef.current();
      }
    };

    document.addEventListener('keydown', handleKeyboard);
    return () => document.removeEventListener('keydown', handleKeyboard);
  }, []);

  const contextValue: SidebarContextType = {
    isCollapsed,
    isMobile,
    toggleSidebar,
    collapseSidebar,
    expandSidebar,
  };

  return (
    <SidebarContext.Provider value={contextValue}>
      {children}
    </SidebarContext.Provider>
  );
};

// Enhanced Sidebar Component
const Sidebar: React.FC = () => {
  const { isCollapsed, isMobile, toggleSidebar } = useSidebar();
  const [activeItem, setActiveItem] = useState<string>('dashboard');
  const [expandedMenus, setExpandedMenus] = useState<string[]>(['campaigns']);
  const [showProfileMenu, setShowProfileMenu] = useState<boolean>(false);
  
  // Mock user data
  const user: User = {
    name: "John Doe",
    email: "john.doe@example.com",
    profilePic: null
  };

  const menuItems: MenuItem[] = [
    {
      id: 'dashboard',
      icon: LayoutDashboard,
      label: 'Dashboard',
      section: 'main'
    },
    {
      id: 'campaigns',
      icon: Megaphone,
      label: 'Campaigns',
      section: 'campaigns',
      hasSubmenu: true,
      submenu: [
        { id: 'my-campaigns', label: 'My Campaigns', icon: FolderOpen },
        { id: 'create-campaign', label: 'Create Campaign', icon: Plus }
      ]
    },
    {
      id: 'notifications',
      icon: Bell,
      label: 'Notifications',
      section: 'main',
      hasNotifications: true,
      notificationCount: 3
    },
    {
      id: 'donations',
      icon: Heart,
      label: 'Donations',
      section: 'main'
    },
    {
      id: 'earnings',
      icon: DollarSign,
      label: 'Earnings',
      section: 'main'
    },
    {
      id: 'payment-links',
      icon: Link,
      label: 'Payment Links',
      section: 'main'
    },
  ];

  const toggleSubmenu = (itemId: string): void => {
    setExpandedMenus(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const handleItemClick = (itemId: string): void => {
    setActiveItem(itemId);
    // Close profile menu when navigating to other items
    if (itemId !== 'profile') {
      setShowProfileMenu(false);
    }
  };

  const handleProfileClick = (): void => {
    setShowProfileMenu(prev => !prev);
    setActiveItem('profile');
  };

  const handleLogout = (): void => {
    console.log('Logging out...');
    setShowProfileMenu(false);
  };

  const handleViewProfile = (): void => {
    console.log('Viewing profile...');
    setShowProfileMenu(false);
  };

  // Handle overlay click on mobile
  const handleOverlayClick = () => {
    if (isMobile && !isCollapsed) {
      toggleSidebar();
    }
    // Close profile menu when clicking overlay
    setShowProfileMenu(false);
  };

  // Close profile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (showProfileMenu && !target.closest('.profile-section')) {
        setShowProfileMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showProfileMenu]);

  return (
    <>
      {/* Mobile overlay */}
      {isMobile && !isCollapsed && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={handleOverlayClick}
        />
      )}
      
      <div className={`
        bg-white border-r border-gray-100 shadow-xl transition-all duration-300 ease-in-out 
        relative h-screen flex flex-col z-50
        ${isMobile ? 'fixed' : 'relative'}
        ${isCollapsed ? (isMobile ? '-translate-x-full' : 'w-20') : 'w-70'}
        ${isMobile && !isCollapsed ? 'translate-x-0' : ''}
      `}>

        {/* Header */}
        <div className="p-6 border-b border-gray-50">
          <div className="flex items-center justify-between">
            {!isCollapsed && (
              <div className="flex items-center space-x-3">
                <div>
                  <h1 className="text-xl font-bold text-green-600">Finable</h1>
                </div>
              </div>
            )}
            <button 
              onClick={toggleSidebar}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
              title={`${isCollapsed ? 'Expand' : 'Collapse'} sidebar (⌘/Ctrl + B)`}
            >
              {isCollapsed ? <Menu className="w-5 h-5 text-gray-600" /> : <X className="w-5 h-5 text-gray-600" />}
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeItem === item.id;
            const isExpanded = expandedMenus.includes(item.id);
            
            return (
              <div key={item.id} className="space-y-1">
                <button
                  onClick={() => {
                    handleItemClick(item.id);
                    if (item.hasSubmenu) {
                      toggleSubmenu(item.id);
                    }
                  }}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-left transition-all duration-200 group relative overflow-hidden ${
                    isActive 
                      ? 'bg-green-600 text-white shadow-lg s transform scale-[1.02]' 
                      : 'text-gray-600 hover:bg-green-50 hover:text-gray-600 hover:transform hover:scale-[1.01]'
                  }`}
                >
                  {/* Animated background */}
                  <div className={`absolute inset-0 bg-gradient-to-r from-emerald-500 to-green-600 transform transition-transform duration-300 ${
                    isActive ? '-translate-x-0' : 'translate-x-full '
                  }`} />
                  
                  <div className="flex items-center space-x-3 relative z-10">
                    <div className="relative">
                      <Icon className={`w-5 h-5 transition-all duration-200 ${
                        isActive ? 'text-white' : 'text-gray-600 group-hover:text-gray-600'
                      }`} />
                      {/* Notification badge for icons */}
                      {item.hasNotifications && item.notificationCount && isCollapsed && (
                        <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                          {item.notificationCount > 9 ? '9+' : item.notificationCount}
                        </div>
                      )}
                    </div>
                    {!isCollapsed && (
                      <span className={`font-medium transition-colors duration-200 ${
                        isActive ? 'text-white' : 'group-hover:text-green-700'
                      }`}>
                        {item.label}
                      </span>
                    )}
                  </div>
                  
                  <div className="flex items-center space-x-2 relative z-10">
                    {/* Notification badge for expanded state */}
                    {!isCollapsed && item.hasNotifications && item.notificationCount && (
                      <div className="w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                        {item.notificationCount > 9 ? '9+' : item.notificationCount}
                      </div>
                    )}
                    
                    {!isCollapsed && item.hasSubmenu && (
                      <div className={`transition-transform duration-200 ${
                        isExpanded ? 'rotate-180' : 'rotate-0'
                      }`}>
                        <svg className={`w-4 h-4 ${isActive ? 'text-white' : 'text-gray-400 group-hover:text-green-600'}`} fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </div>
                    )}
                  </div>
                </button>

                {/* Submenu */}
                {!isCollapsed && item.hasSubmenu && item.submenu && (
                  <div className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    isExpanded ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
                  }`}>
                    <div className="ml-6 mt-2 space-y-1 border-l-2 border-gray-100 pl-4">
                      {item.submenu.map((subItem) => {
                        const SubIcon = subItem.icon;
                        const isSubActive = activeItem === subItem.id;
                        
                        return (
                          <button
                            key={subItem.id}
                            onClick={() => handleItemClick(subItem.id)}
                            className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-all duration-200 group ${
                              isSubActive
                                ? 'bg-green-100 text-green-700 font-medium'
                                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-800'
                            }`}
                          >
                            <SubIcon className={`w-4 h-4 transition-colors duration-200 ${
                              isSubActive ? 'text-green-600' : 'text-gray-400 group-hover:text-gray-600'
                            }`} />
                            <span className="text-sm">{subItem.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* User Profile Section */}
        <div className="p-4 border-t border-gray-50 mt-auto relative profile-section">
            
          {!isCollapsed && showProfileMenu && (
            <div className="absolute bottom-full left-4 right-4 mb-2 bg-white border border-gray-200 rounded-xl shadow-lg py-2 z-50">
              <button
                onClick={handleViewProfile}
                className="w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-gray-50 transition-colors duration-200"
              >
                <UserCircle className="w-4 h-4 text-gray-500" />
                <span className="text-sm text-gray-700">View Profile</span>
              </button>
              <button
                onClick={() => handleItemClick('settings')}
                className="w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-gray-50 transition-colors duration-200"
              >
                <Settings className="w-4 h-4 text-gray-500" />
                <span className="text-sm text-gray-700">Settings</span>
              </button>
              <hr className="my-2 mx-2 border-gray-100" />
              <button
                onClick={handleLogout}
                className="w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-red-50 transition-colors duration-200 text-red-600"
              >
                <LogOut className="w-4 h-4" />
                <span className="text-sm font-medium">Sign Out</span>
              </button>
            </div>
          )}


          {isCollapsed && showProfileMenu && (
            <div className="absolute bottom-4 left-full ml-4 bg-white border border-gray-200 rounded-xl shadow-lg py-2 z-50 min-w-48">
              {/* User info header in collapsed menu */}
              <div className="px-4 py-3 border-b border-gray-100">
                <div className="flex items-center space-x-3">
                  <div className="flex-shrink-0">
                    {user.profilePic ? (
                      <img 
                        src={user.profilePic} 
                        alt="Profile" 
                        className="w-8 h-8 rounded-full object-cover border-2 border-green-200"
                      />
                    ) : (
                      <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-green-700 rounded-full flex items-center justify-center">
                        <span className="text-white font-semibold text-xs">
                          {user.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-gray-800 truncate">
                      {user.name}
                    </p>
                    <p className="text-xs text-gray-500 truncate">
                      {user.email}
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Menu items */}
              <button
                onClick={handleViewProfile}
                className="w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-gray-50 transition-colors duration-200"
              >
                <UserCircle className="w-4 h-4 text-gray-500" />
                <span className="text-sm text-gray-700">View Profile</span>
              </button>
              <button
                onClick={() => handleItemClick('settings')}
                className="w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-gray-50 transition-colors duration-200"
              >
                <Settings className="w-4 h-4 text-gray-500" />
                <span className="text-sm text-gray-700">Settings</span>
              </button>
              <hr className="my-2 mx-2 border-gray-100" />
              <button
                onClick={handleLogout}
                className="w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-red-50 transition-colors duration-200 text-red-600"
              >
                <LogOut className="w-4 h-4" />
                <span className="text-sm font-medium">Sign Out</span>
              </button>
            </div>
          )}

          <button
            onClick={handleProfileClick}
            className={`w-full flex items-center ${isCollapsed ? 'justify-center' : 'justify-between space-x-3'} p-3 rounded-xl transition-all duration-200 group hover:bg-gray-50 ${
              activeItem === 'profile' ? 'bg-green-50 border border-green-200' : ''
            }`}
          >
            {isCollapsed ? (
              <div className="flex-shrink-0">
                {user.profilePic ? (
                  <img 
                    src={user.profilePic} 
                    alt="Profile" 
                    className="w-10 h-10 rounded-full object-cover border-2 border-green-200"
                  />
                ) : (
                  <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-700 rounded-full flex items-center justify-center">
                    <span className="text-white font-semibold text-sm">
                      {user.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                    </span>
                  </div>
                )}
              </div>
            ) : (
              // profile layout for expanded state
              <>
                <div className="flex items-center space-x-3 flex-1 min-w-0">
                  <div className="flex-shrink-0">
                    {user.profilePic ? (
                      <img 
                        src={user.profilePic} 
                        alt="Profile" 
                        className="w-10 h-10 rounded-full object-cover border-2 border-green-200"
                      />
                    ) : (
                      <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-700 rounded-full flex items-center justify-center">
                        <span className="text-white font-semibold text-sm">
                          {user.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0 text-left">
                    <p className="text-sm font-semibold text-gray-800 truncate group-hover:text-green-700">
                      {user.name}
                    </p>
                    <p className="text-xs text-gray-500 truncate">
                      {user.email}
                    </p>
                  </div>
                </div>
                <div className={`transition-transform duration-200 ${
                  showProfileMenu ? 'rotate-180' : 'rotate-0'
                }`}>
                  <ChevronUp className="w-4 h-4 text-gray-400 group-hover:text-green-600" />
                </div>
              </>
            )}
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;