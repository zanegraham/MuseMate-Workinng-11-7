import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { SignIn, SignUp, useAuth } from '@clerk/clerk-react';
import Layout from './components/Layout';
import LandingPage from './components/landing/LandingPage';
import InventoryList from './components/inventory/InventoryList';
import EventList from './components/events/EventList';
import SettingsPage from './components/settings/SettingsPage';
import CrayboHub from './components/craybo/CrayboHub';

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { isSignedIn, isLoaded } = useAuth();
  
  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      </div>
    );
  }
  
  if (!isSignedIn) {
    return <Navigate to="/sign-in" replace />;
  }
  
  return <>{children}</>;
}

function App() {
  const { isSignedIn } = useAuth();

  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={isSignedIn ? <Navigate to="/dashboard" /> : <LandingPage />} />
      <Route 
        path="/sign-in" 
        element={
          <div className="flex items-center justify-center min-h-screen bg-gray-50">
            <div className="w-full max-w-md">
              <SignIn signUpUrl="/sign-up" />
            </div>
          </div>
        } 
      />
      <Route 
        path="/sign-up" 
        element={
          <div className="flex items-center justify-center min-h-screen bg-gray-50">
            <div className="w-full max-w-md">
              <SignUp signInUrl="/sign-in" />
            </div>
          </div>
        } 
      />

      {/* Protected routes */}
      <Route path="/dashboard" element={
        <PrivateRoute>
          <Layout />
        </PrivateRoute>
      }>
        <Route index element={<Navigate to="/dashboard/events" replace />} />
        <Route path="events" element={<EventList />} />
        <Route path="inventory" element={<InventoryList />} />
        <Route path="craybo" element={<CrayboHub />} />
        <Route path="settings" element={<SettingsPage />} />
      </Route>
    </Routes>
  );
}

export default App;