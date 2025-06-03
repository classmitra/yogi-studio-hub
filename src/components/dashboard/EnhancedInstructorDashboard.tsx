
import React from 'react';
import { ArrowRight, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useInstructor } from '@/hooks/useInstructor';
import { useClasses } from '@/hooks/useClasses';
import { useNavigate } from 'react-router-dom';
import { useScrollAnimations } from '@/hooks/useScrollAnimations';
import DashboardHeader from './DashboardHeader';
import StudioInfoCard from './StudioInfoCard';
import DashboardStats from './DashboardStats';
import TodaysClasses from './TodaysClasses';
import QuickActions from './QuickActions';
import RecentActivity from './RecentActivity';

const EnhancedInstructorDashboard = () => {
  const { instructor, isLoading } = useInstructor();
  const { classes, isLoading: classesLoading } = useClasses(instructor?.id);
  const navigate = useNavigate();
  useScrollAnimations();

  console.log('EnhancedInstructorDashboard - instructor data:', instructor);
  console.log('EnhancedInstructorDashboard - classes data:', classes);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="w-16 h-16 border border-black flex items-center justify-center mx-auto mb-8 breathe-minimal">
            <div className="w-6 h-6 border border-black border-t-transparent animate-spin"></div>
          </div>
          <p className="text-black/70 text-lg font-light tracking-wide">Preparing your sacred space...</p>
        </div>
      </div>
    );
  }

  if (!instructor) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center max-w-md mx-auto p-8">
          <div className="w-20 h-20 border border-black flex items-center justify-center mx-auto mb-8">
            <Settings className="h-10 w-10 text-black/60" />
          </div>
          <h1 className="text-5xl font-dongle font-normal text-black mb-6 leading-none">Sacred Space Setup</h1>
          <p className="text-black/70 mb-12 leading-relaxed font-light tracking-wide">
            Let's create your beautiful digital sanctuary before accessing your teaching dashboard.
          </p>
          <Button 
            onClick={() => navigate('/studio-setup')}
            className="minimal-button px-8 py-4 text-lg font-light tracking-wide"
          >
            Create Sacred Space
            <ArrowRight className="h-5 w-5 ml-2" />
          </Button>
        </div>
      </div>
    );
  }

  // Get today's classes
  const today = new Date().toISOString().split('T')[0];
  const todaysClasses = classes.filter(cls => cls.start_date === today);

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      {/* Scroll Progress */}
      <div className="scroll-progress-minimal"></div>

      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-1 h-48 bg-black/5 float-minimal"></div>
        <div className="absolute bottom-32 right-32 w-1 h-32 bg-black/10 parallax-slow"></div>
        <div className="absolute top-40 right-1/4 w-px h-64 bg-black/5 gentle-fade" />
        <div className="absolute bottom-40 left-1/4 w-1 h-1 bg-black/20 breathe-minimal" />
      </div>

      <div className="max-w-7xl mx-auto p-8 relative z-10">
        {/* Header */}
        <DashboardHeader instructor={instructor} />

        {/* Sacred Studio Info Card */}
        <StudioInfoCard instructor={instructor} />

        {/* Stats Grid */}
        <DashboardStats classes={classes} />

        <div className="grid lg:grid-cols-3 gap-16">
          {/* Today's Sacred Offerings */}
          <div className="lg:col-span-2">
            <TodaysClasses 
              classes={classes}
              classesLoading={classesLoading}
              todaysClasses={todaysClasses}
            />
          </div>

          {/* Sacred Actions & Energy */}
          <div className="space-y-12">
            {/* Quick Actions */}
            <div className="slide-up-minimal" style={{ animationDelay: '0.3s' }}>
              <QuickActions />
            </div>

            {/* Sacred Energy Flow */}
            <RecentActivity />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnhancedInstructorDashboard;
