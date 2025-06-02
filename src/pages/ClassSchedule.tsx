
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { useInstructor } from '@/hooks/useInstructor';
import { useClasses } from '@/hooks/useClasses';
import ClassScheduleHeader from '@/components/schedule/ClassScheduleHeader';
import ClassScheduleNavigation from '@/components/schedule/ClassScheduleNavigation';
import DayView from '@/components/schedule/DayView';
import WeekView from '@/components/schedule/WeekView';
import MonthView from '@/components/schedule/MonthView';
import ClassForm from '@/components/classes/ClassForm';

const ClassSchedule = () => {
  const { instructor } = useInstructor();
  const { classes, isLoading } = useClasses(instructor?.id);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState<'day' | 'week' | 'month'>('week');
  const [showClassForm, setShowClassForm] = useState(false);

  console.log('ClassSchedule - classes:', classes);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white p-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center py-12">
            <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center mx-auto mb-4">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            </div>
            <p className="text-gray-600">Loading your classes...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <ClassScheduleHeader viewMode={viewMode} setViewMode={setViewMode} />
          <Button 
            onClick={() => setShowClassForm(true)}
            className="bg-black hover:bg-gray-800 text-white"
          >
            <Plus className="h-4 w-4 mr-2" />
            New Class
          </Button>
        </div>
        
        <ClassScheduleNavigation 
          currentDate={currentDate} 
          setCurrentDate={setCurrentDate} 
          viewMode={viewMode} 
        />

        <Card className="border border-gray-200 shadow-sm">
          <CardContent className="p-6">
            {viewMode === 'day' && <DayView currentDate={currentDate} classes={classes} />}
            {viewMode === 'week' && <WeekView currentDate={currentDate} classes={classes} />}
            {viewMode === 'month' && (
              <MonthView 
                currentDate={currentDate} 
                setCurrentDate={setCurrentDate} 
                classes={classes} 
              />
            )}
          </CardContent>
        </Card>

        {showClassForm && (
          <ClassForm onClose={() => setShowClassForm(false)} />
        )}
      </div>
    </div>
  );
};

export default ClassSchedule;
