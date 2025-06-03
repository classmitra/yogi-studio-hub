
import React from 'react';
import { ArrowRight, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useInstructor } from '@/hooks/useInstructor';
import { useClasses } from '@/hooks/useClasses';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useScrollAnimations } from '@/hooks/useScrollAnimations';
import DashboardHeader from './DashboardHeader';
import StudioInfoCard from './StudioInfoCard';
import DashboardStats from './DashboardStats';
import TodaysClasses from './TodaysClasses';
import QuickActions from './QuickActions';
import RecentActivity from './RecentActivity';
import ParallaxContainer from '@/components/animations/ParallaxContainer';
import ScrollReveal from '@/components/animations/ScrollReveal';
import FloatingElement from '@/components/animations/FloatingElement';

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
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="w-16 h-16 border border-black flex items-center justify-center mx-auto mb-8 breathe-minimal">
            <motion.div 
              className="w-6 h-6 border border-black border-t-transparent"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
          </div>
          <p className="text-black/70 text-lg font-light tracking-wide">Preparing your space...</p>
        </motion.div>
      </div>
    );
  }

  if (!instructor) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <motion.div 
          className="text-center max-w-md mx-auto p-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="w-20 h-20 border border-black flex items-center justify-center mx-auto mb-8">
            <Settings className="h-10 w-10 text-black/60" />
          </div>
          <h1 className="text-5xl font-dongle font-normal text-black mb-6 leading-none">Studio Setup</h1>
          <p className="text-black/70 mb-12 leading-relaxed font-light tracking-wide">
            Create your digital studio space before accessing your teaching dashboard.
          </p>
          <Button 
            onClick={() => navigate('/studio-setup')}
            className="minimal-button px-8 py-4 text-lg font-light tracking-wide"
          >
            Create Studio
            <ArrowRight className="h-5 w-5 ml-2" />
          </Button>
        </motion.div>
      </div>
    );
  }

  // Get today's classes
  const today = new Date().toISOString().split('T')[0];
  const todaysClasses = classes.filter(cls => cls.start_date === today);

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      {/* Background Elements with Parallax */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <ParallaxContainer speed={0.3} className="absolute top-20 left-20">
          <div className="w-1 h-48 bg-black/5" />
        </ParallaxContainer>
        
        <ParallaxContainer speed={0.5} direction="down" className="absolute bottom-32 right-32">
          <div className="w-1 h-32 bg-black/10" />
        </ParallaxContainer>
        
        <ParallaxContainer speed={0.2} className="absolute top-40 right-1/4">
          <div className="w-px h-64 bg-black/5" />
        </ParallaxContainer>
        
        <FloatingElement intensity={5} duration={8} className="absolute bottom-40 left-1/4">
          <div className="w-1 h-1 bg-black/20" />
        </FloatingElement>
      </div>

      <div className="max-w-7xl mx-auto p-8 relative z-10">
        {/* Header with enhanced animation */}
        <ScrollReveal delay={0.1}>
          <DashboardHeader instructor={instructor} />
        </ScrollReveal>

        {/* Studio Info Card */}
        <ScrollReveal delay={0.2} direction="up">
          <StudioInfoCard instructor={instructor} />
        </ScrollReveal>

        {/* Stats Grid with staggered animations */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <DashboardStats classes={classes} />
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-16">
          {/* Today's Classes */}
          <div className="lg:col-span-2">
            <ScrollReveal delay={0.4} direction="left">
              <TodaysClasses 
                classes={classes}
                classesLoading={classesLoading}
                todaysClasses={todaysClasses}
              />
            </ScrollReveal>
          </div>

          {/* Quick Actions & Activity */}
          <div className="space-y-12">
            <ScrollReveal delay={0.5} direction="right">
              <QuickActions />
            </ScrollReveal>

            <ScrollReveal delay={0.6} direction="right">
              <RecentActivity />
            </ScrollReveal>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnhancedInstructorDashboard;
