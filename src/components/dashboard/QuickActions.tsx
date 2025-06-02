
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Plus, 
  Users, 
  BarChart3, 
  Eye, 
  Calendar,
  Settings 
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ClassForm from '@/components/classes/ClassForm';

const QuickActions = () => {
  const navigate = useNavigate();
  const [showClassForm, setShowClassForm] = useState(false);

  const actions = [
    {
      icon: Plus,
      label: 'Create New Class',
      description: 'Schedule a new yoga class',
      onClick: () => setShowClassForm(true),
      primary: true
    },
    {
      icon: Eye,
      label: 'View Studio',
      description: 'Preview your public studio page',
      onClick: () => navigate('/view-studio'),
      primary: false
    },
    {
      icon: Users,
      label: 'Manage Students',
      description: 'View and manage your students',
      onClick: () => navigate('/dashboard'), // Will be enhanced later
      primary: false
    },
    {
      icon: Calendar,
      label: 'Class Schedule',
      description: 'View your class calendar',
      onClick: () => navigate('/dashboard'), // Will be enhanced later
      primary: false
    },
    {
      icon: BarChart3,
      label: 'Analytics',
      description: 'View performance metrics',
      onClick: () => navigate('/dashboard'), // Will be enhanced later
      primary: false
    },
    {
      icon: Settings,
      label: 'Studio Settings',
      description: 'Update your studio information',
      onClick: () => navigate('/studio-setup'),
      primary: false
    }
  ];

  return (
    <>
      <Card className="border border-gray-200 shadow-sm bg-white">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg font-semibold text-black">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {actions.map((action, index) => (
            <Button
              key={index}
              variant={action.primary ? "default" : "outline"}
              className={`w-full justify-start h-auto p-4 ${
                action.primary 
                  ? 'bg-black hover:bg-gray-800 text-white' 
                  : 'border-gray-300 text-black hover:bg-gray-50'
              }`}
              onClick={action.onClick}
            >
              <div className="flex items-start space-x-3 w-full">
                <action.icon className="h-5 w-5 mt-0.5 flex-shrink-0" />
                <div className="text-left">
                  <div className="font-medium">{action.label}</div>
                  <div className={`text-xs ${action.primary ? 'text-gray-200' : 'text-gray-500'}`}>
                    {action.description}
                  </div>
                </div>
              </div>
            </Button>
          ))}
        </CardContent>
      </Card>

      {showClassForm && (
        <ClassForm onClose={() => setShowClassForm(false)} />
      )}
    </>
  );
};

export default QuickActions;
