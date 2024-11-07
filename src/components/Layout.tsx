import React, { useState } from 'react';
import { Outlet, useLocation, Link } from 'react-router-dom';
import Sidebar from './Sidebar';
import { Menu, Calendar, Package2, Settings, Music2 } from 'lucide-react';
import LoadingSpinner from './common/LoadingSpinner';

export default function Layout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();

  // Get the current page title based on the route
  const getPageTitle = () => {
    const path = location.pathname.split('/').pop();
    switch (path) {
      case 'events':
        return 'Events';
      case 'inventory':
        return 'Inventory';
      case 'craybo':
        return 'Craybo Hub';
      case 'settings':
        return 'Settings';
      default:
        return 'Dashboard';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-50 to-indigo-50">
      {/* Background Pattern */}
      <div className="fixed inset-0 bg-noise opacity-[0.015] pointer-events-none" />

      {/* Mobile header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-30 bg-white/80 backdrop-blur-sm border-b border-gray-200">
        <div className="flex items-center justify-between px-4 py-3">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="p-2 -ml-2 text-gray-600 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
          >
            <span className="sr-only">Open sidebar</span>
            <Menu className="h-6 w-6" />
          </button>
          <h1 className="text-lg font-semibold text-gray-900">
            {getPageTitle()}
          </h1>
          <div className="w-6" /> {/* Spacer for centering */}
        </div>
      </div>

      <div className="flex h-screen overflow-hidden">
        {/* Sidebar backdrop */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-gray-600/30 backdrop-blur-sm z-40 lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <div
          className={`
            fixed lg:sticky top-0 left-0 z-50 w-64 h-screen
            transform lg:transform-none lg:opacity-100
            transition-all duration-300 ease-in-out
            ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          `}
        >
          <Sidebar onClose={() => setIsSidebarOpen(false)} />
        </div>

        {/* Main content */}
        <main className="flex-1 overflow-y-auto pt-16 lg:pt-0 pb-16 lg:pb-0">
          <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
            <Outlet />
          </div>
        </main>
      </div>

      {/* Mobile bottom navigation */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-30">
        <nav className="flex justify-around py-2">
          {[
            { path: '/dashboard/events', label: 'Events', icon: Calendar },
            { path: '/dashboard/inventory', label: 'Inventory', icon: Package2 },
            { path: '/dashboard/craybo', label: 'Craybo', icon: Music2 },
            { path: '/dashboard/settings', label: 'Settings', icon: Settings }
          ].map(({ path, label, icon: Icon }) => (
            <Link
              key={path}
              to={path}
              className={`
                flex flex-col items-center px-4 py-2 text-xs
                ${location.pathname === path 
                  ? 'text-indigo-600' 
                  : 'text-gray-600 hover:text-gray-900'
                }
              `}
            >
              <Icon className="w-6 h-6 mb-1" />
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}