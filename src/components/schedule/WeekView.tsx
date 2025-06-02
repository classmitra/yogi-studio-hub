
import React from 'react';
import { startOfWeek, endOfWeek, eachDayOfInterval, isSameDay, format } from 'date-fns';

interface WeekViewProps {
  currentDate: Date;
  classes: any[];
}

const WeekView = ({ currentDate, classes }: WeekViewProps) => {
  const weekStart = startOfWeek(currentDate, { weekStartsOn: 1 });
  const weekEnd = endOfWeek(currentDate, { weekStartsOn: 1 });
  const weekDays = eachDayOfInterval({ start: weekStart, end: weekEnd });

  const getClassesForDate = (date: Date) => {
    const dateString = date.toISOString().split('T')[0];
    return classes.filter(cls => cls.start_date === dateString);
  };

  return (
    <div className="space-y-4">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-black">
          Week of {format(weekStart, 'MMM d')} - {format(weekEnd, 'MMM d, yyyy')}
        </h2>
      </div>
      
      <div className="grid grid-cols-7 gap-4">
        {weekDays.map((day) => {
          const dayClasses = getClassesForDate(day);
          const isToday = isSameDay(day, new Date());
          
          return (
            <div key={day.toISOString()} className="min-h-[200px]">
              <div className={`p-3 rounded-lg border ${isToday ? 'bg-black text-white border-black' : 'bg-gray-50 border-gray-200'}`}>
                <div className="text-center mb-2">
                  <div className={`text-sm font-medium ${isToday ? 'text-white' : 'text-gray-600'}`}>
                    {format(day, 'EEE')}
                  </div>
                  <div className={`text-lg font-bold ${isToday ? 'text-white' : 'text-black'}`}>
                    {format(day, 'd')}
                  </div>
                </div>
                <div className="space-y-1">
                  {dayClasses.map((classItem) => (
                    <div 
                      key={classItem.id} 
                      className="p-2 bg-white rounded text-xs border border-gray-200 hover:shadow-sm cursor-pointer"
                    >
                      <div className="font-medium text-black truncate">{classItem.title}</div>
                      <div className="text-gray-600">{classItem.start_time}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WeekView;
