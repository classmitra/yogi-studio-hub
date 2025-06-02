
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Calendar, 
  Clock, 
  Users, 
  Plus,
  ChevronLeft,
  ChevronRight,
  Video,
  MapPin
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ClassSchedule = () => {
  const navigate = useNavigate();
  const [currentDate, setCurrentDate] = useState(new Date());

  const classes = [
    {
      id: 1,
      title: "Morning Vinyasa Flow",
      time: "8:00 AM - 9:00 AM",
      date: "2024-06-02",
      students: 12,
      maxStudents: 15,
      type: "Live",
      location: "Studio A"
    },
    {
      id: 2,
      title: "Gentle Yin Yoga",
      time: "6:00 PM - 7:30 PM",
      date: "2024-06-02",
      students: 8,
      maxStudents: 10,
      type: "Live",
      location: "Studio B"
    },
    {
      id: 3,
      title: "Power Yoga",
      time: "10:00 AM - 11:00 AM",
      date: "2024-06-03",
      students: 15,
      maxStudents: 20,
      type: "Live",
      location: "Studio A"
    }
  ];

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
    newDate.setDate(currentDate.getDate() + (direction === 'next' ? 1 : -1));
    setCurrentDate(newDate);
  };

  return (
    <div className="min-h-screen bg-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-black">Class Schedule</h1>
            <p className="text-gray-600 mt-1">Manage your class calendar</p>
          </div>
          <div className="flex items-center space-x-3">
            <Button 
              variant="outline" 
              onClick={() => navigate('/dashboard')}
              className="border-gray-300 text-black hover:bg-gray-50"
            >
              Back to Dashboard
            </Button>
            <Button className="bg-black hover:bg-gray-800 text-white">
              <Plus className="h-4 w-4 mr-2" />
              New Class
            </Button>
          </div>
        </div>

        <Tabs defaultValue="calendar" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="calendar">Calendar View</TabsTrigger>
            <TabsTrigger value="list">List View</TabsTrigger>
          </TabsList>

          <TabsContent value="calendar">
            <Card className="border border-gray-200 shadow-sm">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl font-semibold text-black flex items-center">
                    <Calendar className="h-5 w-5 mr-2" />
                    {formatDate(currentDate)}
                  </CardTitle>
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
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {classes
                    .filter(cls => cls.date === currentDate.toISOString().split('T')[0])
                    .map((classItem) => (
                    <div key={classItem.id} className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="font-semibold text-black">{classItem.title}</h3>
                        <Badge variant="secondary" className="bg-gray-100 text-gray-800">
                          {classItem.type}
                        </Badge>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center text-sm text-gray-600">
                          <Clock className="h-4 w-4 mr-2" />
                          {classItem.time}
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <Users className="h-4 w-4 mr-2" />
                          {classItem.students}/{classItem.maxStudents} students
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <MapPin className="h-4 w-4 mr-2" />
                          {classItem.location}
                        </div>
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
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="list">
            <Card className="border border-gray-200 shadow-sm">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-black">All Classes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {classes.map((classItem) => (
                    <div key={classItem.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="flex items-center space-x-4">
                        <div className="text-center">
                          <p className="text-sm font-medium text-gray-600">TIME</p>
                          <p className="text-lg font-bold text-black">{classItem.time.split(' - ')[0]}</p>
                        </div>
                        <div>
                          <h3 className="font-semibold text-black">{classItem.title}</h3>
                          <div className="flex items-center space-x-4 mt-1">
                            <div className="flex items-center text-sm text-gray-600">
                              <Calendar className="h-4 w-4 mr-1" />
                              {classItem.date}
                            </div>
                            <div className="flex items-center text-sm text-gray-600">
                              <Users className="h-4 w-4 mr-1" />
                              {classItem.students}/{classItem.maxStudents}
                            </div>
                            <Badge variant="secondary" className="bg-gray-100 text-gray-800">
                              {classItem.type}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm" className="border-gray-300">
                          Edit
                        </Button>
                        <Button size="sm" className="bg-black hover:bg-gray-800 text-white">
                          <Video className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ClassSchedule;
