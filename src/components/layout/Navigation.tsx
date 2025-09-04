"use client";

import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { CiMenuFries } from "react-icons/ci";
import { TfiClose } from "react-icons/tfi";
import {
  User,
  ChevronDown,
  LogOut,
  Settings,
  Heart,
  CreditCard,
  Bell,
} from "lucide-react";

type DropdownType = "students" | "donors" | "userMenu" | null;

type NavbarProps = object;

const Navbar: React.FC<NavbarProps> = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [activeDropdown, setActiveDropdown] = useState<DropdownType>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false); // Toggle this to test logged in state

  // Check if we're on the homepage
  const isHomepage = pathname === '/';
  
  // Define text colors based on current page
  const navTextColor = isHomepage ? 'text-white' : 'text-gray-600';
  const logoTextColor = isHomepage ? 'text-white' : 'text-gray-900';
  const mobileIconColor = isHomepage ? 'text-white' : 'text-gray-600';
  const hoverLineColor = isHomepage ? 'after:bg-white' : 'after:bg-gray-600';

  const toggleNavbar = (): void => {
    setIsOpen(!isOpen);
    setActiveDropdown(null);
  };

  const closeMenu = (): void => {
    setIsOpen(false);
  };

  const toggleDropdown = (dropdown: DropdownType): void => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };

  const closeDropdowns = (): void => {
    setActiveDropdown(null);
  };

  const handleLogin = (): void => {
    router.push("/auth/login");
    closeDropdowns();
    closeMenu();
  };

  const handleSignup = (): void => {
    router.push("/auth/signup");
    closeDropdowns();
    closeMenu();
  };

  const handleLogout = (): void => {
    setIsLoggedIn(false);
    closeDropdowns();
  };

  return (
    <div className="lg:px-20 px-6 md:px-10 py-5 absolute top-0 left-0 w-full z-30">
      <div className="flex justify-between items-center">
        {/* Logo - Center */}
        <Link
          className={`font-extrabold text-3xl ${logoTextColor}`}
          href="/"
        >
          Finable
        </Link>

        {/* Desktop Navigation Links - Left */}
        <ul className={`lg:flex gap-10 font-semibold text-sm hidden font-Nunito ${navTextColor}`}>
          <Link
            href="/browse"
            className={`relative after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-0 ${hoverLineColor} after:transition-all after:duration-500 hover:after:w-full`}
          >
            Browse Campaigns
          </Link>
          <Link
            href="/how-it-works"
            className={`relative after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-0 ${hoverLineColor} after:transition-all after:duration-500 hover:after:w-full`}
          >
            How It Works
          </Link>
          <Link
            href="/pricing"
            className={`relative after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-0 ${hoverLineColor} after:transition-all after:duration-500 hover:after:w-full`}
          >
            Pricing
          </Link>
          <Link
            href="/about"
            className={`relative after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-0 ${hoverLineColor} after:transition-all after:duration-500 hover:after:w-full`}
          >
            About Us
          </Link>
        </ul>

        {/* Desktop Auth Buttons - Right */}
        <div className="lg:flex gap-6 justify-center items-center hidden font-semibold">
          {!isLoggedIn ? (
            <>
              <button
                onClick={handleLogin}
                className={`cursor-pointer relative after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-0 ${hoverLineColor} after:transition-all after:duration-500 hover:after:w-full ${navTextColor}`}
              >
                Login
              </button>
              <div>
                <button
                  onClick={handleSignup}
                  className="bg-primary py-[7px] px-6 text-white bg-green-600 cursor-pointer shadow-md rounded-3xl transition-transform hover:-translate-y-1"
                >
                  Sign up
                </button>
              </div>
            </>
          ) : (
            <div className="relative">
              <button
                onClick={() => toggleDropdown("userMenu")}
                className={`flex items-center gap-2 ${navTextColor} hover:text-gray-900 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors duration-200`}
              >
                <div className="w-7 h-7 bg-green-500 rounded-full flex items-center justify-center text-white font-medium text-sm">
                  J
                </div>
                <span className="text-sm font-medium">John Doe</span>
                <ChevronDown className="w-3 h-3" />
              </button>

              {activeDropdown === "userMenu" && (
                <div className="absolute top-full right-0 mt-1 w-56 bg-white rounded-lg shadow-lg border border-gray-100 py-1 z-50">
                  <div className="px-4 py-3 border-b border-gray-100">
                    <p className="text-sm font-medium text-gray-900">
                      John Doe
                    </p>
                    <p className="text-xs text-gray-500">john@example.com</p>
                  </div>
                  <Link
                    href="/profile"
                    className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-green-50 hover:text-green-600 transition-colors"
                  >
                    <User className="w-4 h-4" />
                    My Profile
                  </Link>
                  <Link
                    href="/campaigns"
                    className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-green-50 hover:text-green-600 transition-colors"
                  >
                    <Heart className="w-4 h-4" />
                    My Campaigns
                  </Link>
                  <Link
                    href="/donations"
                    className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-green-50 hover:text-green-600 transition-colors"
                  >
                    <CreditCard className="w-4 h-4" />
                    Donation History
                  </Link>
                  <Link
                    href="/notifications"
                    className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-green-50 hover:text-green-600 transition-colors"
                  >
                    <Bell className="w-4 h-4" />
                    Notifications
                  </Link>
                  <Link
                    href="/settings"
                    className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-green-50 hover:text-green-600 transition-colors"
                  >
                    <Settings className="w-4 h-4" />
                    Account Settings
                  </Link>
                  <div className="border-t border-gray-100 mt-1 pt-1">
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 w-full text-left transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <div
          className="inline-block lg:hidden cursor-pointer"
          onClick={toggleNavbar}
        >
          {isOpen ? (
            <TfiClose
              size={25}
              className={`transition-transform transform rotate-180 ${mobileIconColor}`}
            />
          ) : (
            <CiMenuFries
              size={28}
              className={`transition-transform transform rotate-0 ${mobileIconColor}`}
            />
          )}
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="lg:hidden block bg-white absolute top-full left-0 w-full h-screen pt-10 text-gray-600 z-[55] border-t border-gray-100">
            {/* Mobile Navigation Links */}
            <ul className="flex flex-col items-center gap-6 py-3 pb-10">
              <Link
                href="/browse"
                className="text-[16px] font-medium text-dark"
                onClick={closeMenu}
              >
                Browse Campaigns
              </Link>
              <Link
                href="/how-it-works"
                className="text-[16px] font-medium text-dark"
                onClick={closeMenu}
              >
                How It Works
              </Link>
              <Link
                href="/pricing"
                className="text-[16px] font-medium text-dark"
                onClick={closeMenu}
              >
                Pricing
              </Link>
              <Link
                href="/about"
                className="text-[16px] font-medium text-dark"
                onClick={closeMenu}
              >
                About Us
              </Link>
            </ul>

            {/* Mobile Auth Section */}
            {!isLoggedIn ? (
              <div className="flex flex-col items-center gap-6 mt-9 py-6 text-primary font-semibold text-[16px]">
                <button onClick={handleLogin} className="">
                  Login
                </button>
                <div>
                  <button
                    type="button"
                    onClick={handleSignup}
                    className="bg-primary py-[7px] px-6 text-white bg-green-600 cursor-pointer shadow-md rounded-sm transition-transform hover:-translate-y-1"
                  >
                    Sign up
                  </button>
                </div>
              </div>
            ) : (
              <div className="px-6 mt-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-medium text-sm">
                    J
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      John Doe
                    </p>
                    <p className="text-xs text-gray-500">john@example.com</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <Link
                    href="/profile"
                    className="flex items-center gap-3 text-gray-600 text-sm"
                    onClick={closeMenu}
                  >
                    <User className="w-4 h-4" />
                    My Profile
                  </Link>
                  <Link
                    href="/campaigns"
                    className="flex items-center gap-3 text-gray-600 text-sm"
                    onClick={closeMenu}
                  >
                    <Heart className="w-4 h-4" />
                    My Campaigns
                  </Link>
                  <Link
                    href="/donations"
                    className="flex items-center gap-3 text-gray-600 text-sm"
                    onClick={closeMenu}
                  >
                    <CreditCard className="w-4 h-4" />
                    Donation History
                  </Link>
                  <Link
                    href="/settings"
                    className="flex items-center gap-3 text-gray-600 text-sm"
                    onClick={closeMenu}
                  >
                    <Settings className="w-4 h-4" />
                    Account Settings
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      closeMenu();
                    }}
                    className="flex items-center gap-3 text-red-600 text-sm w-full text-left"
                  >
                    <LogOut className="w-4 h-4" />
                    Sign Out
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Click outside to close dropdowns */}
        {activeDropdown && (
          <div className="fixed inset-0 z-40" onClick={closeDropdowns} />
        )}
      </div>
    </div>
  );
};

export default Navbar;