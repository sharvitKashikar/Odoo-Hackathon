import React from 'react';
import { Home, Users, Tag, Star, HelpCircle, TrendingUp, Zap, Sparkles } from 'lucide-react';

interface SidebarProps {
  currentView: string;
  onNavigate: (view: 'home' | 'questions' | 'question' | 'ask' | 'tags' | 'users' | 'profile') => void;
}

export function Sidebar({ currentView, onNavigate }: SidebarProps) {
  const isActive = (view: string) => currentView === view;

  return (
    <aside className="w-56 min-h-screen sticky top-16 bg-gray-50 border-r border-gray-200">
      <div className="p-6">
        <nav className="space-y-2">
          <button
            onClick={() => onNavigate('home')}
            className={`w-full flex items-center space-x-3 px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
              isActive('home') 
                ? 'bg-blue-600 text-white' 
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <Home className="h-5 w-5" />
            <span>Home</span>
          </button>
          
          <div className="pt-6">
            <h3 className="px-4 text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">
              Discover
            </h3>
            <div className="space-y-1">
              <button
                onClick={() => onNavigate('questions')}
                className={`w-full flex items-center justify-between px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                  isActive('questions') 
                    ? 'bg-blue-600 text-white' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <HelpCircle className="h-5 w-5" />
                  <span>Questions</span>
                </div>
                <div className="flex items-center space-x-1">
                  <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full font-bold">
                    2.4k
                  </span>
                </div>
              </button>
              
              <button 
                onClick={() => onNavigate('tags')}
                className={`w-full flex items-center space-x-3 px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                  isActive('tags') 
                    ? 'bg-blue-600 text-white' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Tag className="h-5 w-5" />
                <span>Tags</span>
              </button>
              
              <button 
                onClick={() => onNavigate('users')}
                className={`w-full flex items-center space-x-3 px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                  isActive('users') 
                    ? 'bg-blue-600 text-white' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Users className="h-5 w-5" />
                <span>Users</span>
              </button>
            </div>
          </div>

          <div className="pt-6">
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-3">
                <Star className="h-4 w-4 text-blue-600 fill-current" />
                <span className="text-sm font-semibold text-gray-900">Premium Features</span>
              </div>
              <p className="text-xs text-gray-600 mb-3">
                Unlock advanced analytics, priority support, and exclusive content.
              </p>
              <button className="w-full bg-blue-600 text-white text-xs font-medium py-2 px-3 rounded-lg hover:bg-blue-700 transition-colors">
                Upgrade to Premium
              </button>
            </div>
          </div>

          <div className="pt-4">
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-3">
                <Sparkles className="h-4 w-4 text-blue-600" />
                <span className="text-sm font-semibold text-gray-900">Daily Challenge</span>
              </div>
              <p className="text-xs text-gray-600 mb-3">
                Answer today's featured question and earn bonus reputation!
              </p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-blue-600 font-medium">+50 XP</span>
                <button className="text-xs text-blue-600 hover:text-blue-700 font-medium">
                  View →
                </button>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </aside>
  );
}