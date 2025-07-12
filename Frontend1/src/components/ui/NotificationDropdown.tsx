import React from 'react';
import { Bell } from 'lucide-react';

export function NotificationDropdown() {
  return (
    <div className="relative">
      <button className="p-3 text-gray-600 hover:text-blue-600 hover:bg-gray-50 rounded-lg transition-colors">
        <Bell className="h-5 w-5" />
        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
          3
        </span>
      </button>
    </div>
  );
}