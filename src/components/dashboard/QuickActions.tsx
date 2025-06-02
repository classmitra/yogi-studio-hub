
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useInstructor } from '@/hooks/useInstructor';
import { useToast } from '@/hooks/use-toast';
import { 
  Plus,
  Users,
  Settings,
  Calendar,
  BarChart3,
  Video,
  Globe,
  MessageCircle,
  HelpCircle
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

  const handleStudentManagement = () => {
    toast({
      title: "Coming Soon",
      description: "Student management panel will be available soon.",
    });
  };

  const handleCalendarView = () => {
    toast({
      title: "Coming Soon", 
      description: "Calendar view coming soon.",
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
      action: handleCalendarView
    },
    {
      title: "Manage Students",
      icon: Users,
      action: handleStudentManagement
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
      icon: HelpCircle,
      action: handleSupport
    }
  ];

  return (
    <Card className="minimal-card">
      <CardHeader className="border-b border-gray-200">
        <CardTitle className="text-lg font-semibold text-black">Quick Actions</CardTitle>
      </CardHeader>
      <CardContent className="p-6 space-y-2">
        {quickActions.map((action, index) => (
          <Button
            key={index}
            variant={action.primary ? "default" : "outline"}
            className={`w-full justify-start ${
              action.primary 
                ? "bg-black hover:bg-gray-800 text-white" 
                : "border-gray-300 text-black hover:bg-gray-50"
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
