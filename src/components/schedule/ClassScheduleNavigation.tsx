
import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ClassScheduleNavigationProps {
  currentDate: Date;
  setCurrentDate: (date: Date) => void;
  viewMode: 'day' | 'week' | 'month';
}

const ClassScheduleNavigation = ({ currentDate, setCurrentDate, viewMode }: ClassScheduleNavigationProps) => {
  const navigateDate = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    if (viewMode === 'day') {
      newDate.setDate(currentDate.getDate() + (direction === 'next' ? 1 : -1));
    } else if (viewMode === 'week') {
      newDate.setDate(currentDate.getDate() + (direction === 'next' ? 7 : -7));
    } else if (viewMode === 'month') {
      newDate.setMonth(currentDate.getMonth() + (direction === 'next' ? 1 : -1));
    }
    setCurrentDate(newDate);
  };

  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center space-x-2">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => navigateDate('prev')}
          className="border-gray-300 text-black hover:bg-gray-50"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => setCurrentDate(new Date())}
          className="border-gray-300 text-black hover:bg-gray-50"
        >
          Today
        </Button>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => navigateDate('next')}
          className="border-gray-300 text-black hover:bg-gray-50"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default ClassScheduleNavigation;
