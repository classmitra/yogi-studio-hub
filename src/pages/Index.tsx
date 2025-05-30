
import React, { useState } from 'react';
import Header from '@/components/Header';
import LandingPage from '@/components/LandingPage';
import InstructorDashboard from '@/components/InstructorDashboard';
import ClassScheduler from '@/components/ClassScheduler';
import { Button } from '@/components/ui/button';

const Index = () => {
  const [currentView, setCurrentView] = useState('landing'); // landing, dashboard, scheduler

  const renderCurrentView = () => {
    switch (currentView) {
      case 'dashboard':
        return <InstructorDashboard />;
      case 'scheduler':
        return <ClassScheduler />;
      default:
        return <LandingPage />;
    }
  };

  return (
    <div className="min-h-screen">
      {currentView === 'landing' && <Header />}
      
      {/* Demo Navigation (for demonstration purposes) */}
      {currentView === 'landing' && (
        <div className="fixed bottom-6 right-6 z-50">
          <div className="bg-white/90 backdrop-blur-md rounded-lg shadow-lg p-4 border border-gray-200">
            <p className="text-sm font-medium text-gray-700 mb-3">🚀 Demo Navigation</p>
            <div className="flex flex-col space-y-2">
              <Button 
                size="sm" 
                variant="outline"
                onClick={() => setCurrentView('dashboard')}
                className="text-left justify-start"
              >
                View Dashboard
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
