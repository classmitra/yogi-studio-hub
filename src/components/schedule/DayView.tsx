
import React from 'react';
import { Button } from '@/components/ui/button';
import { Calendar as CalendarIcon, Plus } from 'lucide-react';
import ClassCard from './ClassCard';

interface DayViewProps {
  currentDate: Date;
  classes: any[];
}

const DayView = ({ currentDate, classes }: DayViewProps) => {
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const getClassesForDate = (date: Date) => {
    const dateString = date.toISOString().split('T')[0];
    return classes.filter(cls => cls.start_date === dateString);
  };

  const dayClasses = getClassesForDate(currentDate);
  
  return (
    <div className="space-y-4">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-black">{formatDate(currentDate)}</h2>
      </div>
      
      {dayClasses.length === 0 ? (
        <div className="text-center py-12">
          <CalendarIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 mb-4">No classes scheduled for this day</p>
          <Button className="bg-black hover:bg-gray-800 text-white">
            <Plus className="h-4 w-4 mr-2" />
            Schedule Class
          </Button>
        </div>
      ) : (
        <div className="grid gap-4">
          {dayClasses.map((classItem) => (
            <ClassCard key={classItem.id} classItem={classItem} />
          ))}
        </div>
      )}
    </div>
  );
};

export default DayView;
