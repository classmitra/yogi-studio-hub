
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
  BarChart3,
  ExternalLink,
  Eye
} from 'lucide-react';
import { useInstructor } from '@/hooks/useInstructor';
import { useNavigate } from 'react-router-dom';
import QuickActions from './QuickActions';

const EnhancedInstructorDashboard = () => {
  const { instructor, isLoading } = useInstructor();
  const navigate = useNavigate();

  console.log('EnhancedInstructorDashboard - instructor data:', instructor);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center mx-auto mb-4">
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          </div>
          <p className="text-gray-600">Loading instructor dashboard...</p>
        </div>
      </div>
    );
  }

  if (!instructor) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center max-w-md mx-auto p-6">
          <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Settings className="h-8 w-8 text-yellow-600" />
          </div>
          <h1 className="text-2xl font-bold text-black mb-2">Studio Setup Required</h1>
          <p className="text-gray-600 mb-6">
            You need to set up your studio before you can access the dashboard.
          </p>
          <Button 
            onClick={() => navigate('/studio-setup')}
            className="bg-black hover:bg-gray-800 text-white"
          >
            Set Up Studio
          </Button>
        </div>
      </div>
    );
  }

  const studioUrl = `${window.location.origin}/studio/${instructor.subdomain}`;

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
      color: "text-gray-600"
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
      color: "text-gray-600"
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
    <div className="min-h-screen bg-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header with Studio Info */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-black">
              Welcome back! 🧘‍♀️
            </h1>
            <p className="text-gray-600 mt-1">Here's what's happening in your studio today</p>
            {instructor.subdomain && (
              <div className="mt-3 flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Badge variant="outline" className="border-gray-300 text-gray-700">
                    {instructor.studio_name}
                  </Badge>
                  <span className="text-sm text-gray-500">•</span>
                  <span className="text-sm text-gray-600">{instructor.subdomain}.yogastudio.app</span>
                </div>
              </div>
            )}
          </div>
          <div className="flex items-center space-x-3">
            <Button 
              variant="outline" 
              onClick={() => window.open(studioUrl, '_blank')}
              className="flex items-center space-x-2 border-gray-300 text-black hover:bg-gray-50"
            >
              <Eye className="h-4 w-4" />
              <span>View Studio</span>
              <ExternalLink className="h-3 w-3" />
            </Button>
            <Button 
              variant="outline" 
              onClick={() => navigate('/studio-setup')}
              className="flex items-center space-x-2 border-gray-300 text-black hover:bg-gray-50"
            >
              <Settings className="h-4 w-4" />
              <span>Studio Settings</span>
            </Button>
          </div>
        </div>

        {/* Studio Info Card */}
        <Card className="border border-gray-200 shadow-sm bg-white mb-8">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-black flex items-center">
              <Settings className="h-5 w-5 mr-2" />
              Your Studio Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-600">Studio Name</label>
                <p className="text-black font-medium">{instructor.studio_name}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">Subdomain</label>
                <p className="text-black font-medium">{instructor.subdomain}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">Public URL</label>
                <a 
                  href={studioUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 text-sm underline flex items-center"
                >
                  Visit Studio Page
                  <ExternalLink className="h-3 w-3 ml-1" />
                </a>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">Brand Color</label>
                <div className="flex items-center space-x-2">
                  <div 
                    className="w-4 h-4 rounded-full border border-gray-300"
                    style={{ backgroundColor: instructor.brand_color }}
                  ></div>
                  <span className="text-black text-sm">{instructor.brand_color}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="border border-gray-200 shadow-sm bg-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-2xl font-bold text-black">{stat.value}</p>
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
            <Card className="border border-gray-200 shadow-sm bg-white">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-xl font-semibold text-black">Today's Classes</CardTitle>
                    <CardDescription className="text-gray-600">Manage your scheduled sessions</CardDescription>
                  </div>
                  <Button variant="outline" size="sm" className="border-gray-300 text-black hover:bg-gray-50">
                    <Calendar className="h-4 w-4 mr-2" />
                    View Calendar
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {upcomingClasses.map((classItem) => (
                    <div key={classItem.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
                      <div className="flex items-center space-x-4">
                        <div className="text-center">
                          <p className="text-sm font-medium text-gray-600">TIME</p>
                          <p className="text-lg font-bold text-black">{classItem.time}</p>
                        </div>
                        <div>
                          <h3 className="font-semibold text-black">{classItem.title}</h3>
                          <div className="flex items-center space-x-4 mt-1">
                            <div className="flex items-center text-sm text-gray-600">
                              <Clock className="h-4 w-4 mr-1" />
                              {classItem.duration}
                            </div>
                            <div className="flex items-center text-sm text-gray-600">
                              <Users className="h-4 w-4 mr-1" />
                              {classItem.students}/{classItem.maxStudents} students
                            </div>
                            <Badge variant="secondary" className="bg-gray-100 text-gray-800">
                              {classItem.type}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm" className="border-gray-300 text-black hover:bg-gray-50">
                          <MessageCircle className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm" className="border-gray-300 text-black hover:bg-gray-50">
                          <Video className="h-4 w-4" />
                        </Button>
                        <Button size="sm" className="bg-black hover:bg-gray-800 text-white">
                          Start Class
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions & Recent Activity */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <QuickActions />

            {/* Recent Activity */}
            <Card className="border border-gray-200 shadow-sm bg-white">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-black">Recent Activity</CardTitle>
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
                        <p className="text-sm font-medium text-black">{activity.action}</p>
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

export default EnhancedInstructorDashboard;
