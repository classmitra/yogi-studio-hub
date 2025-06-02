
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
      color: "text-black"
    },
    {
      title: "Active Students",
      value: "89",
      change: "+5 new",
      icon: Users,
      color: "text-black"
    },
    {
      title: "Studio Visits",
      value: "1,247",
      change: "+12%",
      icon: TrendingUp,
      color: "text-black"
    },
    {
      title: "Total Revenue",
      value: "$2,840",
      change: "+18%",
      icon: DollarSign,
      color: "text-black"
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
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8 pb-6 border-b border-gray-200">
          <div>
            <h1 className="text-4xl font-bold text-black mb-2">
              {instructor?.studio_name || 'Your Studio'}
            </h1>
            <p className="text-gray-600">
              Studio URL: <span className="font-mono text-black">{instructor?.subdomain}.yogastudio.app</span>
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <Button 
              variant="outline" 
              className="border-black text-black hover:bg-gray-50"
              onClick={() => window.open(`https://${instructor?.subdomain}.yogastudio.app`, '_blank')}
            >
              <Globe className="h-4 w-4 mr-2" />
              View Studio
            </Button>
            <Button 
              onClick={handleShowClassForm}
              className="bg-black hover:bg-gray-800 text-white"
            >
              <Plus className="h-4 w-4 mr-2" />
              New Class
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="minimal-card">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 mb-1">{stat.title}</p>
                    <p className="text-3xl font-bold text-black mb-1">{stat.value}</p>
                    <p className="text-sm text-gray-500">{stat.change}</p>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <stat.icon className="h-6 w-6 text-black" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Classes Management */}
          <div className="lg:col-span-2 space-y-8">
            <Card className="minimal-card">
              <CardHeader className="border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-2xl font-bold text-black">Your Classes</CardTitle>
                    <CardDescription className="text-gray-600">Manage your yoga class schedule</CardDescription>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={handleShowClassForm}
                    className="border-black text-black hover:bg-gray-50"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Class
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {classes.map((classItem) => (
                    <div key={classItem.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
                      <div className="flex items-center space-x-4">
                        <div className="text-center px-3 py-2 bg-white rounded border border-gray-200">
                          <p className="text-xs font-medium text-gray-600">TIME</p>
                          <p className="text-lg font-bold text-black">{classItem.start_time}</p>
                        </div>
                        <div>
                          <h3 className="font-semibold text-black text-lg">{classItem.title}</h3>
                          <div className="flex items-center space-x-4 mt-2">
                            <div className="flex items-center text-sm text-gray-600">
                              <Clock className="h-4 w-4 mr-1" />
                              {classItem.duration_minutes} min
                            </div>
                            <div className="flex items-center text-sm text-gray-600">
                              <Users className="h-4 w-4 mr-1" />
                              Max {classItem.max_students}
                            </div>
                            <Badge variant="secondary" className="bg-white border border-gray-300 text-black">
                              {classItem.category}
                            </Badge>
                            {classItem.price_cents > 0 && (
                              <Badge variant="outline" className="border-black text-black">
                                ${(classItem.price_cents / 100).toFixed(2)}
                              </Badge>
                            )}
                            {classItem.price_cents === 0 && (
                              <Badge variant="outline" className="border-green-600 text-green-600">
                                Free
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleEditClass(classItem)}
                          className="border-gray-300 hover:bg-gray-50"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleDeleteClass(classItem.id)}
                          className="border-red-300 text-red-600 hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                  
                  {classes.length === 0 && (
                    <div className="text-center py-12">
                      <Calendar className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                      <h3 className="text-xl font-semibold text-black mb-2">No classes yet</h3>
                      <p className="text-gray-600 mb-6">Create your first yoga class to get started!</p>
                      <Button 
                        onClick={handleShowClassForm}
                        className="bg-black hover:bg-gray-800 text-white"
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
            <Card className="minimal-card">
              <CardHeader className="border-b border-gray-200">
                <CardTitle className="text-lg font-semibold text-black">Studio Information</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-medium text-gray-600 mb-1">Studio Name</p>
                    <p className="text-black font-medium">{instructor?.studio_name}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600 mb-1">Studio URL</p>
                    <p className="text-black font-mono text-sm">{instructor?.subdomain}.yogastudio.app</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600 mb-1">Contact Email</p>
                    <p className="text-black">{instructor?.contact_email || 'Not set'}</p>
                  </div>
                  {instructor?.brand_color && (
                    <div>
                      <p className="text-sm font-medium text-gray-600 mb-1">Brand Color</p>
                      <div className="flex items-center space-x-2">
                        <div 
                          className="w-4 h-4 rounded border border-gray-300"
                          style={{ backgroundColor: instructor?.brand_color }}
                        />
                        <span className="text-black font-mono text-sm">{instructor?.brand_color}</span>
                      </div>
                    </div>
                  )}
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
