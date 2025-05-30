
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useInstructor } from '@/hooks/useInstructor';
import { useToast } from '@/hooks/use-toast';
import ClassForm from '@/components/classes/ClassForm';
import { 
  Plus,
  Users,
  Settings,
  Calendar,
  BarChart3,
  Video,
  Globe,
  MessageCircle
} from 'lucide-react';

interface QuickActionsProps {
  onShowClassForm: () => void;
}

const QuickActions = ({ onShowClassForm }: QuickActionsProps) => {
  const { instructor } = useInstructor();
  const { toast } = useToast();

  const handleViewStudio = () => {
    if (instructor?.subdomain) {
      window.open(`https://${instructor.subdomain}.yogastudio.app`, '_blank');
    } else {
      toast({
        title: "Studio not available",
        description: "Please complete your studio setup first.",
        variant: "destructive",
      });
    }
  };

  const handleViewBookings = () => {
    // This could scroll to bookings section or open a modal
    document.getElementById('booking-management')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleStudioSettings = () => {
    toast({
      title: "Coming Soon",
      description: "Studio settings panel will be available soon.",
    });
  };

  const handleAnalytics = () => {
    toast({
      title: "Coming Soon", 
      description: "Analytics dashboard will be available soon.",
    });
  };

  const handleVideoSetup = () => {
    toast({
      title: "Video Setup",
      description: "Add your meeting links when creating classes.",
    });
  };

  const handleSupport = () => {
    toast({
      title: "Support",
      description: "Contact us at support@yogastudio.app for assistance.",
    });
  };

  const quickActions = [
    {
      title: "Schedule New Class",
      icon: Plus,
      action: onShowClassForm,
      primary: true
    },
    {
      title: "View My Studio",
      icon: Globe,
      action: handleViewStudio
    },
    {
      title: "View Bookings",
      icon: Users,
      action: handleViewBookings
    },
    {
      title: "Class Calendar",
      icon: Calendar,
      action: () => toast({ title: "Coming Soon", description: "Calendar view coming soon." })
    },
    {
      title: "Setup Video Calls",
      icon: Video,
      action: handleVideoSetup
    },
    {
      title: "Analytics",
      icon: BarChart3,
      action: handleAnalytics
    },
    {
      title: "Studio Settings", 
      icon: Settings,
      action: handleStudioSettings
    },
    {
      title: "Get Support",
      icon: MessageCircle,
      action: handleSupport
    }
  ];

  return (
    <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-md">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-900">Quick Actions</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {quickActions.map((action, index) => (
          <Button
            key={index}
            variant={action.primary ? "default" : "outline"}
            className={`w-full justify-start ${
              action.primary 
                ? "bg-yoga-600 hover:bg-yoga-700 text-white" 
                : "hover:bg-yoga-50"
            }`}
            onClick={action.action}
          >
            <action.icon className="h-4 w-4 mr-2" />
            {action.title}
          </Button>
        ))}
      </CardContent>
    </Card>
  );
};

export default QuickActions;
