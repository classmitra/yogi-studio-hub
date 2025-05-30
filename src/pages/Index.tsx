
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
  const [currentView, setCurrentView] = useState('landing'); // landing, dashboard, scheduler
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
      
      {/* Demo Navigation (for demonstration purposes) - only show if user is authenticated */}
      {currentView === 'landing' && user && instructor && (
        <div className="fixed bottom-6 right-6 z-50">
          <div className="bg-white/90 backdrop-blur-md rounded-lg shadow-lg p-4 border border-gray-200">
            <p className="text-sm font-medium text-gray-700 mb-3">🚀 Studio Management</p>
            <div className="flex flex-col space-y-2">
              <Button 
                size="sm" 
                variant="outline"
                onClick={() => setCurrentView('dashboard')}
                className="text-left justify-start"
              >
                Studio Dashboard
              </Button>
              <Button 
                size="sm" 
                variant="outline"
                onClick={() => setCurrentView('scheduler')}
                className="text-left justify-start"
              >
                Class Scheduler
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Back to Landing from other views */}
      {currentView !== 'landing' && (
        <div className="fixed top-6 left-6 z-50">
          <Button 
            variant="outline"
            onClick={() => setCurrentView('landing')}
            className="bg-white/90 backdrop-blur-md"
          >
            ← Back to Landing
          </Button>
        </div>
      )}

      {renderCurrentView()}
    </div>
  );
};

export default Index;
