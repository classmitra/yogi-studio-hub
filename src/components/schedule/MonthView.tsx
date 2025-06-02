
import React from 'react';
import { Calendar } from '@/components/ui/calendar';
import ClassCard from './ClassCard';

interface MonthViewProps {
  currentDate: Date;
  setCurrentDate: (date: Date) => void;
  classes: any[];
}

const MonthView = ({ currentDate, setCurrentDate, classes }: MonthViewProps) => {
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

  return (
    <div className="space-y-4">
      <Calendar
        mode="single"
        selected={currentDate}
        onSelect={(date) => date && setCurrentDate(date)}
        className="rounded-md border border-gray-200"
        modifiers={{
          hasClass: (date) => getClassesForDate(date).length > 0
        }}
        modifiersStyles={{
          hasClass: { 
            backgroundColor: '#000', 
            color: 'white',
            fontWeight: 'bold'
          }
        }}
      />
      
      <div className="mt-6">
        <h3 className="text-lg font-semibold text-black mb-4">
          Classes on {formatDate(currentDate)}
        </h3>
        {getClassesForDate(currentDate).length === 0 ? (
          <p className="text-gray-600">No classes scheduled for this day</p>
        ) : (
          <div className="grid gap-4">
            {getClassesForDate(currentDate).map((classItem) => (
              <ClassCard key={classItem.id} classItem={classItem} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MonthView;
