import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth, UserButton } from '@clerk/clerk-react';
import { 
  Package2, Calendar, Settings, X, Music2, Zap 
} from 'lucide-react';

interface SidebarProps {
  onClose?: () => void;
}

export default function Sidebar({ onClose }: SidebarProps) {
  const location = useLocation();
  const { user } = useAuth();
  
  const menuItems = [
    { 
      icon: Calendar, 
      label: 'Events', 
      path: '/dashboard/events',
      description: 'Plan & manage events'
    },
    { 
      icon: Package2, 
      label: 'Inventory', 
      path: '/dashboard/inventory',
      description: 'Track equipment & stock'
    },
    { 
      icon: Music2, 
      label: 'Craybo Hub', 
      path: '/dashboard/craybo',
      description: 'Access production services'
    },
    { 
      icon: Settings, 
      label: 'Settings', 
      path: '/dashboard/settings',
      description: 'App preferences'
    },
  ];

  return (
    <div className="h-full flex flex-col bg-white/80 backdrop-blur-sm border-r border-gray-200">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <Link to="/dashboard" className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="font-bold text-xl bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                MuseMate
              </span>
            </div>
          </Link>
          <button
            onClick={onClose}
            className="lg:hidden text-gray-500 hover:text-gray-700"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`nav-link group ${
              location.pathname === item.path ? 'active' : ''
            }`}
            onClick={onClose}
          >
            <div className="flex items-center gap-3 flex-1">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-gray-50 group-hover:bg-white transition-colors">
                <item.icon className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <span className="font-medium">{item.label}</span>
                <p className="text-xs text-gray-500">{item.description}</p>
              </div>
            </div>
          </Link>
        ))}
      </nav>

      {/* User Section */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center gap-3">
          <UserButton afterSignOutUrl="/" />
          <div className="flex flex-col">
            <span className="text-sm font-medium text-gray-900">
              {user?.fullName || 'User'}
            </span>
            <span className="text-xs text-gray-500">
              {user?.primaryEmailAddress?.emailAddress}
            </span>
          </div>
        </div>
      </div>

      {/* Craybo Branding */}
      <div className="p-4 bg-gradient-to-r from-indigo-50 to-purple-50 border-t border-indigo-100/50">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Music2 className="w-4 h-4 text-indigo-600" />
              <p className="text-sm font-medium bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Powered by Craybo
              </p>
            </div>
            <p className="text-xs text-gray-600">
              Production & Rental Services
            </p>
          </div>
          <a
            href="https://craybo.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-indigo-600 hover:text-indigo-700 font-medium"
          >
            Learn More →
          </a>
        </div>
      </div>
    </div>
  );
}