import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar } from '@/components/ui/calendar';
import { 
  Calendar as CalendarIcon, 
  Clock, 
  Users, 
  Plus,
  ChevronLeft,
  ChevronRight,
  Video,
  MapPin,
  ArrowLeft
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useInstructor } from '@/hooks/useInstructor';
import { useClasses } from '@/hooks/useClasses';
import { format, startOfWeek, endOfWeek, eachDayOfInterval, isSameDay, addDays, subDays } from 'date-fns';

const ClassSchedule = () => {
  const navigate = useNavigate();
  const { instructor } = useInstructor();
  const { classes, isLoading } = useClasses(instructor?.id);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState<'day' | 'week' | 'month'>('week');

  console.log('ClassSchedule - classes:', classes);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

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

  const getClassesForDate = (date: Date) => {
    const dateString = date.toISOString().split('T')[0];
    return classes.filter(cls => cls.start_date === dateString);
  };

  const renderDayView = () => {
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

  const renderWeekView = () => {
    const weekStart = startOfWeek(currentDate, { weekStartsOn: 1 });
    const weekEnd = endOfWeek(currentDate, { weekStartsOn: 1 });
    const weekDays = eachDayOfInterval({ start: weekStart, end: weekEnd });

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

  const renderMonthView = () => {
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
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Button 
              variant="outline" 
              onClick={() => navigate('/dashboard')}
              className="border-gray-300 text-black hover:bg-gray-50"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-black">Class Schedule</h1>
              <p className="text-gray-600 mt-1">Manage your class calendar</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-1 bg-gray-100 rounded-lg p-1">
              <Button
                variant={viewMode === 'day' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('day')}
                className={viewMode === 'day' ? 'bg-black text-white' : 'text-black hover:bg-gray-200'}
              >
                Day
              </Button>
              <Button
                variant={viewMode === 'week' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('week')}
                className={viewMode === 'week' ? 'bg-black text-white' : 'text-black hover:bg-gray-200'}
              >
                Week
              </Button>
              <Button
                variant={viewMode === 'month' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('month')}
                className={viewMode === 'month' ? 'bg-black text-white' : 'text-black hover:bg-gray-200'}
              >
                Month
              </Button>
            </div>
            <Button className="bg-black hover:bg-gray-800 text-white">
              <Plus className="h-4 w-4 mr-2" />
              New Class
            </Button>
          </div>
        </div>

        {/* Navigation Controls */}
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

        {/* Calendar Content */}
        <Card className="border border-gray-200 shadow-sm">
          <CardContent className="p-6">
            {viewMode === 'day' && renderDayView()}
            {viewMode === 'week' && renderWeekView()}
            {viewMode === 'month' && renderMonthView()}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

// Separate component for class cards to keep code clean
const ClassCard = ({ classItem }: { classItem: any }) => (
  <div className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
    <div className="flex items-start justify-between mb-3">
      <h3 className="font-semibold text-black">{classItem.title}</h3>
      <Badge variant="secondary" className="bg-gray-100 text-gray-800">
        {classItem.category}
      </Badge>
    </div>
    <div className="space-y-2">
      <div className="flex items-center text-sm text-gray-600">
        <Clock className="h-4 w-4 mr-2" />
        {classItem.start_time} ({classItem.duration_minutes} min)
      </div>
      <div className="flex items-center text-sm text-gray-600">
        <Users className="h-4 w-4 mr-2" />
        0/{classItem.max_students} students
      </div>
      {classItem.description && (
        <div className="text-sm text-gray-600">
          {classItem.description}
        </div>
      )}
    </div>
    <div className="flex items-center space-x-2 mt-4">
      <Button variant="outline" size="sm" className="flex-1 border-gray-300">
        Edit
      </Button>
      <Button size="sm" className="flex-1 bg-black hover:bg-gray-800 text-white">
        <Video className="h-4 w-4 mr-1" />
        Start
      </Button>
    </div>
  </div>
);

export default ClassSchedule;
