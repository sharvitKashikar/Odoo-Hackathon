import React, { useState } from 'react';
import { Search, MessageSquare, Trophy, Inbox, LogOut, LogIn, Bell, HelpCircle, Sparkles, Zap, Star } from 'lucide-react';
import { User as UserType } from '../types';

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onNavigate: (view: 'home' | 'questions' | 'question' | 'ask' | 'tags' | 'users' | 'profile') => void;
  currentUser: UserType | null;
  onLogin: () => void;
  onLogout: () => void;
}

export function Header({ searchQuery, onSearchChange, onNavigate, currentUser, onLogin, onLogout }: HeaderProps) {
  const [showInbox, setShowInbox] = useState(false);
  const [showAchievements, setShowAchievements] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const handleInboxClick = () => {
    setShowInbox(!showInbox);
  };

  const handleAchievementsClick = () => {
    setShowAchievements(!showAchievements);
  };

  const handleNotificationClick = () => {
    setShowNotifications(!showNotifications);
  };

  const handleProfileClick = () => {
    setShowProfile(!showProfile);
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <button 
              onClick={() => onNavigate('home')}
              className="flex items-center space-x-3 hover:bg-gray-50 px-4 py-2 rounded-lg transition-colors group"
            >
              <div className="relative">
                <MessageSquare className="h-8 w-8 text-blue-600 transition-colors" />
              </div>
              <div className="flex flex-col items-start">
                <span className="font-bold text-2xl text-gray-900">
                  StackIt
                </span>
                <span className="text-xs text-gray-500 -mt-1">Developer Q&A</span>
              </div>
            </button>
            
            <nav className="hidden md:flex space-x-2">
              <button 
                onClick={() => onNavigate('questions')}
                className="text-gray-700 hover:text-blue-600 hover:bg-gray-50 px-4 py-2 text-sm font-medium rounded-lg transition-colors"
              >
                Questions
              </button>
              <button 
                onClick={() => onNavigate('tags')}
                className="text-gray-700 hover:text-blue-600 hover:bg-gray-50 px-4 py-2 text-sm font-medium rounded-lg transition-colors"
              >
                Tags
              </button>
              <button 
                onClick={() => onNavigate('users')}
                className="text-gray-700 hover:text-blue-600 hover:bg-gray-50 px-4 py-2 text-sm font-medium rounded-lg transition-colors"
              >
                Users
              </button>
            </nav>
          </div>

          <div className="flex-1 max-w-2xl mx-8">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search questions, tags, users..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full pl-12 pr-6 py-3 bg-white border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors placeholder-gray-500"
              />
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {currentUser ? (
              <>
                <div className="hidden md:flex items-center space-x-2">
                  <div className="relative">
                    <button 
                      onClick={handleNotificationClick}
                      className="relative p-3 text-gray-600 hover:text-blue-600 hover:bg-gray-50 rounded-lg transition-colors"
                    >
                      <Bell className="h-5 w-5" />
                      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                        3
                      </span>
                    </button>
                    
                    {showNotifications && (
                      <div className="absolute right-0 mt-2 w-80 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                        <div className="p-4 border-b border-gray-100">
                          <h3 className="font-semibold text-gray-900">Notifications</h3>
                        </div>
                        <div className="p-4 space-y-3">
                          <div className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
                            <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                            <div>
                              <p className="text-sm font-medium text-gray-900">Your answer was accepted</p>
                              <p className="text-xs text-gray-600">Congratulations! Your React hooks answer was marked as accepted.</p>
                              <p className="text-xs text-gray-400 mt-1">5 minutes ago</p>
                            </div>
                          </div>
                          <div className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg">
                            <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                            <div>
                              <p className="text-sm font-medium text-gray-900">New upvote received</p>
                              <p className="text-xs text-gray-600">Someone upvoted your JavaScript question.</p>
                              <p className="text-xs text-gray-400 mt-1">1 hour ago</p>
                            </div>
                          </div>
                          <div className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg">
                            <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
                            <div>
                              <p className="text-sm font-medium text-gray-900">Badge earned</p>
                              <p className="text-xs text-gray-600">You earned the "Good Question" badge!</p>
                              <p className="text-xs text-gray-400 mt-1">2 hours ago</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div className="relative">
                    <button 
                      onClick={handleInboxClick}
                      className="relative p-3 text-gray-600 hover:text-blue-600 hover:bg-gray-50 rounded-lg transition-colors"
                    >
                      <Inbox className="h-5 w-5" />
                      <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                        2
                      </span>
                    </button>
                    
                    {showInbox && (
                      <div className="absolute right-0 mt-2 w-80 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                        <div className="p-4 border-b border-gray-100">
                          <h3 className="font-semibold text-gray-900">Inbox</h3>
                        </div>
                        <div className="p-4 space-y-3">
                          <div className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
                            <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                            <div>
                              <p className="text-sm font-medium text-gray-900">New message from Alex</p>
                              <p className="text-xs text-gray-600">Thanks for your help with the React question!</p>
                              <p className="text-xs text-gray-400 mt-1">2 minutes ago</p>
                            </div>
                          </div>
                          <div className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg">
                            <div className="w-2 h-2 bg-gray-300 rounded-full mt-2"></div>
                            <div>
                              <p className="text-sm font-medium text-gray-900">System notification</p>
                              <p className="text-xs text-gray-600">Your question has been featured!</p>
                              <p className="text-xs text-gray-400 mt-1">1 hour ago</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div className="relative">
                    <button 
                      onClick={handleAchievementsClick}
                      className="relative p-3 text-gray-600 hover:text-blue-600 hover:bg-gray-50 rounded-lg transition-colors"
                    >
                      <Trophy className="h-5 w-5" />
                      <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs rounded-full h-3 w-3"></span>
                    </button>
                    
                    {showAchievements && (
                      <div className="absolute right-0 mt-2 w-80 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                        <div className="p-4 border-b border-gray-100">
                          <h3 className="font-semibold text-gray-900">Recent Achievements</h3>
                        </div>
                        <div className="p-4 space-y-3">
                          <div className="flex items-center space-x-3 p-3 bg-yellow-50 rounded-lg">
                            <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center">
                              <Trophy className="h-4 w-4 text-white" />
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-900">Expert Contributor</p>
                              <p className="text-xs text-gray-600">Earned 1000+ reputation points</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                              <Star className="h-4 w-4 text-white" />
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-900">Great Question</p>
                              <p className="text-xs text-gray-600">Question received 25+ upvotes</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="flex items-bottom space-x-3">
                  <button 
                    onClick={handleProfileClick}
                    className="flex items-bottom space-x-3 hover:bg-gray-50 px-4 py-2 rounded-lg text-sm transition-colors"
                  >
                    <div className="relative">
                      <div className="w-8 h-8 bg-blue-600 rounded-lg text-white text-sm flex items-center justify-center font-semibold">
                        {currentUser.name.charAt(0).toUpperCase()}
                      </div>
                      <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white"></div>
                    </div>
                    <div className="hidden sm:block text-left">
                      <div className="text-sm font-medium text-gray-900">{currentUser.name}</div>
                      <div className="text-xs text-gray-500 font-bold">{currentUser.reputation.toLocaleString()}</div>
                    </div>
                  </button>
                  
                  {showProfile && (
                    <div className="absolute bottom-0 mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                      <div className="p-4 border-b border-gray-100">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-blue-600 rounded-lg text-white text-sm flex items-center justify-center font-semibold">
                            {currentUser.name.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <div className="font-medium text-gray-900">{currentUser.name}</div>
                            <div className="text-sm text-gray-500">{currentUser.reputation.toLocaleString()} reputation</div>
                          </div>
                        </div>
                      </div>
                      <div className="py-2">
                        <button
                          onClick={() => {
                            window.dispatchEvent(new CustomEvent('navigate-to-current-user-profile'));
                            setShowProfile(false);
                          }}
                          className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                        >
                          View Profile
                        </button>
                        <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors">
                          Settings
                        </button>
                      </div>
                    </div>
                  )}
                  <button
                    onClick={onLogout}
                    className="p-2 text-gray-600 hover:text-red-600 hover:bg-gray-50 rounded-lg transition-colors"
                    title="Logout"
                  >
                    <LogOut className="h-4 w-4" />
                  </button>
                </div>
              </>
            ) : (
              <button
                onClick={onLogin}
                className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg text-sm font-medium transition-colors"
              >
                <LogIn className="h-4 w-4" />
                <span>Sign In</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}