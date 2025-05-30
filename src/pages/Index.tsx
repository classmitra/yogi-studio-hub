
import React, { useState } from 'react';
import Header from '@/components/Header';
import LandingPage from '@/components/LandingPage';
import EnhancedInstructorDashboard from '@/components/dashboard/EnhancedInstructorDashboard';
import ClassScheduler from '@/components/ClassScheduler';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useInstructor } from '@/hooks/useInstructor';
import { Navigate } from 'react-router-dom';

const Index = () => {
  const [currentView, setCurrentView] = useState('landing');
  const { user, loading } = useAuth();
  const { instructor, isLoading: instructorLoading } = useInstructor();

  // Show loading while checking auth state
  if (loading || instructorLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 bg-gradient-to-br from-yoga-500 to-ocean-500 rounded-lg flex items-center justify-center mx-auto mb-4">
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          </div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // If user is authenticated but doesn't have an instructor profile, redirect to setup
  if (user && !instructor) {
    return <Navigate to="/studio-setup" replace />;
  }

  // If user is authenticated and has instructor profile, redirect to dashboard
  if (user && instructor) {
    return <Navigate to="/dashboard" replace />;
  }

  const renderCurrentView = () => {
    switch (currentView) {
      case 'dashboard':
        return <EnhancedInstructorDashboard />;
      case 'scheduler':
        return <ClassScheduler />;
      default:
        return <LandingPage />;
    }
  };

  return (
    <div className="min-h-screen">
      {currentView === 'landing' && <Header />}
      {renderCurrentView()}
    </div>
  );
};

export default Index;
