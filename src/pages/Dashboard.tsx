
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useInstructor } from '@/hooks/useInstructor';
import { Navigate } from 'react-router-dom';
import StudentDashboard from '@/components/student/StudentDashboard';
import EnhancedInstructorDashboard from '@/components/dashboard/EnhancedInstructorDashboard';

const Dashboard = () => {
  const { user, loading: authLoading } = useAuth();
  const { instructor, isLoading: instructorLoading } = useInstructor();

  // Show loading while checking auth and instructor status
  if (authLoading || instructorLoading) {
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

  // Redirect if not authenticated
  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  // Show instructor dashboard if user is an instructor
  if (instructor) {
    return <EnhancedInstructorDashboard />;
  }

  // Show student dashboard for regular users
  return <StudentDashboard />;
};

export default Dashboard;
