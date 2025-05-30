
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useInstructor } from '@/hooks/useInstructor';
import { useClasses } from '@/hooks/useClasses';
import ClassForm from '@/components/classes/ClassForm';
import BookingManagement from '@/components/dashboard/BookingManagement';
import QuickActions from '@/components/dashboard/QuickActions';
import { 
  Calendar, 
  Users, 
  DollarSign, 
  Clock, 
  Plus,
  TrendingUp,
  Globe,
  Edit,
  Trash2
} from 'lucide-react';

const EnhancedInstructorDashboard = () => {
  const [showClassForm, setShowClassForm] = useState(false);
  const [editingClass, setEditingClass] = useState(null);
  const { instructor } = useInstructor();
  const { classes, deleteClass } = useClasses(instructor?.id);

  const stats = [
    {
      title: "Total Classes",
      value: classes.length.toString(),
      change: "+2 this week",
      icon: Calendar,
      color: "text-yoga-600"
    },
    {
      title: "Studio Visits",
      value: "1,247",
      change: "+12%",
      icon: Users,
      color: "text-green-600"
    },
    {
      title: "This Month",
      value: "$2,840",
      change: "+18%",
      icon: DollarSign,
      color: "text-ocean-600"
    },
    {
      title: "Active Students",
      value: "89",
      change: "+5",
      icon: TrendingUp,
      color: "text-purple-600"
    }
  ];

  const handleEditClass = (classItem: any) => {
    setEditingClass(classItem);
    setShowClassForm(true);
  };

  const handleDeleteClass = (classId: string) => {
    if (confirm('Are you sure you want to delete this class?')) {
      deleteClass(classId);
    }
  };

  const handleShowClassForm = () => {
    setEditingClass(null);
    setShowClassForm(true);
  };

  return (
    <div className="min-h-screen bg-yoga-gradient p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Welcome back to {instructor?.studio_name}! 🧘‍♀️
            </h1>
            <p className="text-gray-600 mt-1">
              Your studio URL: <span className="font-medium">{instructor?.subdomain}.yogastudio.app</span>
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <Button 
              variant="outline" 
              className="flex items-center space-x-2"
              onClick={() => window.open(`https://${instructor?.subdomain}.yogastudio.app`, '_blank')}
            >
              <Globe className="h-4 w-4" />
              <span>View Studio</span>
            </Button>
            <Button 
              onClick={handleShowClassForm}
              className="bg-yoga-600 hover:bg-yoga-700 text-white flex items-center space-x-2"
            >
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
                    <p className={`text-sm ${stat.color} font-medium`}>{stat.change}</p>
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
          {/* Classes Management */}
          <div className="lg:col-span-2 space-y-8">
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-md">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-xl font-semibold text-gray-900">Your Classes</CardTitle>
                    <CardDescription>Manage your yoga class schedule</CardDescription>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={handleShowClassForm}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Class
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {classes.map((classItem) => (
                    <div key={classItem.id} className="flex items-center justify-between p-4 bg-yoga-50 rounded-lg border border-yoga-100">
                      <div className="flex items-center space-x-4">
                        <div className="text-center">
                          <p className="text-sm font-medium text-gray-600">TIME</p>
                          <p className="text-lg font-bold text-yoga-600">{classItem.start_time}</p>
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{classItem.title}</h3>
                          <div className="flex items-center space-x-4 mt-1">
                            <div className="flex items-center text-sm text-gray-600">
                              <Clock className="h-4 w-4 mr-1" />
                              {classItem.duration_minutes} min
                            </div>
                            <div className="flex items-center text-sm text-gray-600">
                              <Users className="h-4 w-4 mr-1" />
                              Max {classItem.max_students}
                            </div>
                            <Badge variant="secondary" className="bg-yoga-100 text-yoga-800">
                              {classItem.category}
                            </Badge>
                            <Badge variant="outline">
                              ${(classItem.price_cents / 100).toFixed(2)}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleEditClass(classItem)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleDeleteClass(classItem.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                        <Button size="sm" className="bg-yoga-600 hover:bg-yoga-700 text-white">
                          Manage
                        </Button>
                      </div>
                    </div>
                  ))}
                  
                  {classes.length === 0 && (
                    <div className="text-center py-8">
                      <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">No classes yet</h3>
                      <p className="text-gray-600 mb-4">Create your first yoga class to get started!</p>
                      <Button 
                        onClick={handleShowClassForm}
                        className="bg-yoga-600 hover:bg-yoga-700 text-white"
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Create Your First Class
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Booking Management */}
            <div id="booking-management">
              <BookingManagement />
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <QuickActions onShowClassForm={handleShowClassForm} />

            {/* Studio Info */}
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-md">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-gray-900">Studio Info</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Studio Name</p>
                    <p className="text-gray-900">{instructor?.studio_name}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Subdomain</p>
                    <p className="text-gray-900">{instructor?.subdomain}.yogastudio.app</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Contact Email</p>
                    <p className="text-gray-900">{instructor?.contact_email || 'Not set'}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Brand Color</p>
                    <div className="flex items-center space-x-2">
                      <div 
                        className="w-4 h-4 rounded border"
                        style={{ backgroundColor: instructor?.brand_color }}
                      />
                      <span className="text-gray-900">{instructor?.brand_color}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Class Form Modal */}
        {showClassForm && (
          <ClassForm
            onClose={() => {
              setShowClassForm(false);
              setEditingClass(null);
            }}
            editingClass={editingClass}
          />
        )}
      </div>
    </div>
  );
};

export default EnhancedInstructorDashboard;
