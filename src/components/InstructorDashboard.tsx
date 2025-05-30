
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Calendar, 
  Users, 
  DollarSign, 
  Clock, 
  Plus,
  TrendingUp,
  Video,
  MessageCircle,
  Settings,
  BarChart3
} from 'lucide-react';

const InstructorDashboard = () => {
  const upcomingClasses = [
    {
      id: 1,
      title: "Morning Vinyasa Flow",
      time: "8:00 AM",
      duration: "60 min",
      students: 12,
      maxStudents: 15,
      type: "Live"
    },
    {
      id: 2,
      title: "Gentle Yin Yoga",
      time: "6:00 PM",
      duration: "90 min",
      students: 8,
      maxStudents: 10,
      type: "Live"
    },
    {
      id: 3,
      title: "Meditation & Breathwork",
      time: "7:30 PM",
      duration: "45 min",
      students: 20,
      maxStudents: 25,
      type: "Live"
    }
  ];

  const stats = [
    {
      title: "Total Students",
      value: "247",
      change: "+12%",
      icon: Users,
      color: "text-yoga-600"
    },
    {
      title: "Monthly Revenue",
      value: "$3,240",
      change: "+23%",
      icon: DollarSign,
      color: "text-green-600"
    },
    {
      title: "Classes This Week",
      value: "18",
      change: "+2",
      icon: Calendar,
      color: "text-ocean-600"
    },
    {
      title: "Average Rating",
      value: "4.9",
      change: "+0.1",
      icon: TrendingUp,
      color: "text-purple-600"
    }
  ];

  return (
    <div className="min-h-screen bg-yoga-gradient p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Welcome back, Sarah! 🧘‍♀️</h1>
            <p className="text-gray-600 mt-1">Here's what's happening in your studio today</p>
          </div>
          <div className="flex items-center space-x-3">
            <Button variant="outline" className="flex items-center space-x-2">
              <Settings className="h-4 w-4" />
              <span>Studio Settings</span>
            </Button>
            <Button className="bg-yoga-600 hover:bg-yoga-700 text-white flex items-center space-x-2">
              <Plus className="h-4 w-4" />
              <span>New Class</span>
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="bg-white/80 backdrop-blur-sm border-0 shadow-md hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                    <p className={`text-sm ${stat.color} font-medium`}>{stat.change} from last month</p>
                  </div>
                  <div className={`p-3 rounded-full bg-gray-100`}>
                    <stat.icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Today's Classes */}
          <div className="lg:col-span-2">
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-md">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-xl font-semibold text-gray-900">Today's Classes</CardTitle>
                    <CardDescription>Manage your scheduled sessions</CardDescription>
                  </div>
                  <Button variant="outline" size="sm">
                    <Calendar className="h-4 w-4 mr-2" />
                    View Calendar
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {upcomingClasses.map((classItem) => (
                    <div key={classItem.id} className="flex items-center justify-between p-4 bg-yoga-50 rounded-lg border border-yoga-100">
                      <div className="flex items-center space-x-4">
                        <div className="text-center">
                          <p className="text-sm font-medium text-gray-600">TIME</p>
                          <p className="text-lg font-bold text-yoga-600">{classItem.time}</p>
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{classItem.title}</h3>
                          <div className="flex items-center space-x-4 mt-1">
                            <div className="flex items-center text-sm text-gray-600">
                              <Clock className="h-4 w-4 mr-1" />
                              {classItem.duration}
                            </div>
                            <div className="flex items-center text-sm text-gray-600">
                              <Users className="h-4 w-4 mr-1" />
                              {classItem.students}/{classItem.maxStudents} students
                            </div>
                            <Badge variant="secondary" className="bg-yoga-100 text-yoga-800">
                              {classItem.type}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm">
                          <MessageCircle className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Video className="h-4 w-4" />
                        </Button>
                        <Button size="sm" className="bg-yoga-600 hover:bg-yoga-700 text-white">
                          Start Class
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions & Analytics */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-md">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-gray-900">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <Plus className="h-4 w-4 mr-2" />
                  Schedule New Class
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Users className="h-4 w-4 mr-2" />
                  Manage Students
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Video className="h-4 w-4 mr-2" />
                  Upload Recording
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <BarChart3 className="h-4 w-4 mr-2" />
                  View Analytics
                </Button>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-md">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-gray-900">Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { action: "New student enrollment", time: "2 minutes ago", type: "success" },
                    { action: "Payment received - $25", time: "15 minutes ago", type: "success" },
                    { action: "Class reminder sent", time: "1 hour ago", type: "info" },
                    { action: "Student feedback received", time: "2 hours ago", type: "info" }
                  ].map((activity, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div className={`w-2 h-2 rounded-full ${activity.type === 'success' ? 'bg-green-500' : 'bg-blue-500'}`}></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                        <p className="text-xs text-gray-500">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstructorDashboard;
