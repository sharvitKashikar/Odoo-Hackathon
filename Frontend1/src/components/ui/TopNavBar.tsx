// TopNavBar - Main navigation with profile dropdown and notifications
// TODO: Connect to backend for user authentication and navigation

import React, { useState } from 'react';
import { Search, MessageSquare, User, LogOut, Settings, HelpCircle, Menu, X } from 'lucide-react';
import { NotificationDropdown } from './NotificationDropdown';

interface User {
  id: string;
  name: string;
  email: string;
  reputation: number;
  avatar?: string;
}

interface TopNavBarProps {
  user?: User | null;
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
  onLogin?: () => void;
  onLogout?: () => void;
  onNavigate?: (path: string) => void;
}

export function TopNavBar({ 
  user, 
  searchQuery = '', 
  onSearchChange, 
  onLogin, 
  onLogout, 
  onNavigate 
}: TopNavBarProps) {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const navItems = [
    { label: 'Questions', path: '/' },
    { label: 'Tags', path: '/tags' },
    { label: 'Users', path: '/users' },
    { label: 'Jobs', path: '/jobs' },
  ];

  const handleNavigation = (path: string) => {
    // TODO: Connect to router
    onNavigate?.(path);
    setShowMobileMenu(false);
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Brand */}
          <div className="flex items-center space-x-4">
            <button
              onClick={() => handleNavigation('/')}
              className="flex items-center space-x-2 hover:bg-gray-100 px-3 py-2 rounded-lg transition-colors"
            >
              <MessageSquare className="h-6 w-6 text-orange-500" />
              <span className="font-bold text-xl text-gray-800">
                stack<span className="text-orange-500">overflow</span>
              </span>
            </button>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-1">
              {navItems.map((item) => (
                <button
                  key={item.path}
                  onClick={() => handleNavigation(item.path)}
                  className="text-gray-600 hover:text-gray-900 hover:bg-gray-100 px-3 py-2 text-sm font-medium rounded-lg transition-colors"
                >
                  {item.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-2xl mx-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search questions, tags, users..."
                value={searchQuery}
                onChange={(e) => onSearchChange?.(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
              />
            </div>
          </div>

          {/* Right Side - User Menu */}
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                {/* Notifications */}
                <NotificationDropdown />

                {/* Profile Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setShowProfileMenu(!showProfileMenu)}
                    className="flex items-center space-x-2 bg-gray-100 hover:bg-gray-200 px-3 py-2 rounded-xl text-sm transition-colors"
                  >
                    {user.avatar ? (
                      <img 
                        src={user.avatar} 
                        alt={user.name}
                        className="w-6 h-6 rounded-full"
                      />
                    ) : (
                      <div className="w-6 h-6 bg-blue-500 rounded-full text-white text-xs flex items-center justify-center font-semibold">
                        {user.name.charAt(0).toUpperCase()}
                      </div>
                    )}
                    <span className="hidden sm:block font-medium">{user.name}</span>
                    <span className="hidden md:block text-xs text-gray-600">{user.reputation}</span>
                  </button>

                  {showProfileMenu && (
                    <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-xl shadow-lg z-50">
                      <div className="p-3 border-b border-gray-100">
                        <div className="font-medium text-gray-900">{user.name}</div>
                        <div className="text-sm text-gray-500">{user.email}</div>
                        <div className="text-xs text-gray-400">{user.reputation} reputation</div>
                      </div>
                      
                      <div className="py-1">
                        <button
                          onClick={() => {
                            handleNavigation('/profile');
                            setShowProfileMenu(false);
                          }}
                          className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                        >
                          <User className="h-4 w-4" />
                          <span>Profile</span>
                        </button>
                        
                        <button
                          onClick={() => {
                            handleNavigation('/settings');
                            setShowProfileMenu(false);
                          }}
                          className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                        >
                          <Settings className="h-4 w-4" />
                          <span>Settings</span>
                        </button>
                        
                        <button
                          onClick={() => {
                            handleNavigation('/help');
                            setShowProfileMenu(false);
                          }}
                          className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                        >
                          <HelpCircle className="h-4 w-4" />
                          <span>Help</span>
                        </button>
                      </div>
                      
                      <div className="border-t border-gray-100 py-1">
                        <button
                          onClick={() => {
                            onLogout?.();
                            setShowProfileMenu(false);
                          }}
                          className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                        >
                          <LogOut className="h-4 w-4" />
                          <span>Sign out</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <button
                onClick={onLogin}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl text-sm font-medium transition-colors"
              >
                Log in
              </button>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="md:hidden p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
            >
              {showMobileMenu ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {showMobileMenu && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <nav className="space-y-2">
              {navItems.map((item) => (
                <button
                  key={item.path}
                  onClick={() => handleNavigation(item.path)}
                  className="block w-full text-left text-gray-600 hover:text-gray-900 hover:bg-gray-100 px-3 py-2 text-sm font-medium rounded-lg transition-colors"
                >
                  {item.label}
                </button>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}