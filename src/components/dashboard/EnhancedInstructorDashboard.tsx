
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
  Eye,
  Sparkles,
  Heart,
  Mountain,
  Leaf
} from 'lucide-react';
import { useInstructor } from '@/hooks/useInstructor';
import { useClasses } from '@/hooks/useClasses';
import { useNavigate } from 'react-router-dom';
import QuickActions from './QuickActions';
import { useScrollAnimations } from '@/hooks/useScrollAnimations';

const EnhancedInstructorDashboard = () => {
  const { instructor, isLoading } = useInstructor();
  const { classes, isLoading: classesLoading } = useClasses(instructor?.id);
  const navigate = useNavigate();
  useScrollAnimations();

  console.log('EnhancedInstructorDashboard - instructor data:', instructor);
  console.log('EnhancedInstructorDashboard - classes data:', classes);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center wellness-gradient">
        <div className="text-center">
          <div className="w-16 h-16 bg-sage-400 rounded-3xl flex items-center justify-center mx-auto mb-6 breathe">
            <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          </div>
          <p className="text-earth-600 text-lg">Preparing your sacred space...</p>
        </div>
      </div>
    );
  }

  if (!instructor) {
    return (
      <div className="min-h-screen flex items-center justify-center wellness-gradient">
        <div className="text-center max-w-md mx-auto p-8">
          <div className="w-20 h-20 bg-sand-100 rounded-3xl flex items-center justify-center mx-auto mb-6">
            <Settings className="h-10 w-10 text-sand-600" />
          </div>
          <h1 className="text-3xl font-cormorant font-semibold text-earth-800 mb-4">Sacred Space Setup</h1>
          <p className="text-earth-600 mb-8 leading-relaxed">
            Let's create your beautiful digital sanctuary before accessing your teaching dashboard.
          </p>
          <Button 
            onClick={() => navigate('/studio-setup')}
            className="bg-sage-500 hover:bg-sage-600 text-white px-8 py-4 text-lg rounded-2xl ripple-effect hover-lift"
          >
            <Sparkles className="h-5 w-5 mr-2" />
            Create Sacred Space
          </Button>
        </div>
      </div>
    );
  }

  const studioUrl = `${window.location.origin}/studio/${instructor.subdomain}`;

  // Get today's classes
  const today = new Date().toISOString().split('T')[0];
  const todaysClasses = classes.filter(cls => cls.start_date === today);

  const stats = [
    {
      title: "Sacred Community",
      value: "247",
      change: "+12%",
      icon: Users,
      color: "sage",
      gradient: "from-sage-400 to-sage-600"
    },
    {
      title: "Monthly Abundance",
      value: "$3,240",
      change: "+23%",
      icon: DollarSign,
      color: "earth",
      gradient: "from-earth-400 to-earth-600"
    },
    {
      title: "Weekly Offerings",
      value: classes.length.toString(),
      change: "+2",
      icon: Calendar,
      color: "sand",
      gradient: "from-sand-400 to-sand-600"
    },
    {
      title: "Sacred Rating",
      value: "4.9",
      change: "+0.1",
      icon: TrendingUp,
      color: "stone",
      gradient: "from-stone-400 to-stone-600"
    }
  ];

  return (
    <div className="min-h-screen wellness-gradient relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-96 h-96 bg-sage-200/10 rounded-full blur-3xl float"></div>
        <div className="absolute bottom-32 right-32 w-64 h-64 bg-earth-200/10 rounded-full blur-3xl"></div>
        <Mountain className="absolute top-40 right-1/4 h-32 w-32 text-sage-200/10 parallax-slow" />
        <Leaf className="absolute bottom-40 left-1/4 h-16 w-16 text-earth-200/20 gentle-pulse" />
      </div>

      <div className="max-w-7xl mx-auto p-6 relative z-10">
        {/* Enhanced Header */}
        <div className="flex items-center justify-between mb-12 fade-in-up">
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-sage-400 rounded-2xl flex items-center justify-center">
                <Sparkles className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-4xl font-cormorant font-semibold text-earth-800">
                Welcome back, sacred teacher 🧘‍♀️
              </h1>
            </div>
            <p className="text-earth-600 text-lg leading-relaxed">Here's the beautiful energy flowing through your studio today</p>
            {instructor.subdomain && (
              <div className="mt-4 flex items-center space-x-4">
                <div className="flex items-center space-x-3">
                  <Badge variant="outline" className="border-sage-300 text-sage-700 bg-sage-50">
                    {instructor.studio_name}
                  </Badge>
                  <span className="text-sm text-earth-500">•</span>
                  <span className="text-sm text-earth-600 font-medium">{instructor.subdomain}.yogastudio.app</span>
                </div>
              </div>
            )}
          </div>
          <div className="flex items-center space-x-4">
            <Button 
              variant="outline" 
              onClick={() => window.open(studioUrl, '_blank')}
              className="flex items-center space-x-2 border-earth-300 text-earth-700 hover:bg-earth-50 hover-lift"
            >
              <Eye className="h-4 w-4" />
              <span>View Sacred Space</span>
              <ExternalLink className="h-3 w-3" />
            </Button>
            <Button 
              variant="outline" 
              onClick={() => navigate('/studio-setup')}
              className="flex items-center space-x-2 border-earth-300 text-earth-700 hover:bg-earth-50 hover-lift"
            >
              <Settings className="h-4 w-4" />
              <span>Sacred Settings</span>
            </Button>
          </div>
        </div>

        {/* Sacred Studio Info Card */}
        <Card className="glass-card border-0 shadow-xl mb-12 fade-in-up" style={{ animationDelay: '0.1s' }}>
          <CardHeader>
            <CardTitle className="text-2xl font-cormorant font-semibold text-earth-800 flex items-center">
              <Heart className="h-6 w-6 mr-3 text-sage-500" />
              Your Sacred Digital Sanctuary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="scale-in" style={{ animationDelay: '0s' }}>
                <label className="text-sm font-medium text-earth-600">Studio Name</label>
                <p className="text-earth-800 font-cormorant text-xl font-semibold">{instructor.studio_name}</p>
              </div>
              <div className="scale-in" style={{ animationDelay: '0.1s' }}>
                <label className="text-sm font-medium text-earth-600">Sacred Domain</label>
                <p className="text-earth-800 font-medium">{instructor.subdomain}</p>
              </div>
              <div className="scale-in" style={{ animationDelay: '0.2s' }}>
                <label className="text-sm font-medium text-earth-600">Sacred Portal</label>
                <a 
                  href={studioUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-sage-600 hover:text-sage-800 text-sm underline flex items-center hover-lift"
                >
                  Visit Sacred Space
                  <ExternalLink className="h-3 w-3 ml-1" />
                </a>
              </div>
              <div className="scale-in" style={{ animationDelay: '0.3s' }}>
                <label className="text-sm font-medium text-earth-600">Sacred Colors</label>
                <div className="flex items-center space-x-2">
                  <div 
                    className="w-5 h-5 rounded-full border-2 border-white shadow-sm"
                    style={{ backgroundColor: instructor.brand_color }}
                  ></div>
                  <span className="text-earth-800 text-sm font-medium">{instructor.brand_color}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Enhanced Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {stats.map((stat, index) => (
            <Card 
              key={index} 
              className="glass-card border-0 shadow-xl hover-lift scale-in group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-8">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-earth-600 mb-1">{stat.title}</p>
                    <p className="text-3xl font-cormorant font-bold text-earth-800">{stat.value}</p>
                    <p className={`text-sm text-${stat.color}-600 font-medium mt-1`}>{stat.change} from last moon</p>
                  </div>
                  <div className={`p-4 rounded-2xl bg-gradient-to-br ${stat.gradient} group-hover:scale-110 transition-transform duration-300`}>
                    <stat.icon className="h-8 w-8 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Today's Sacred Offerings */}
          <div className="lg:col-span-2">
            <Card className="glass-card border-0 shadow-xl fade-in-up" style={{ animationDelay: '0.2s' }}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-2xl font-cormorant font-semibold text-earth-800">Today's Sacred Offerings</CardTitle>
                    <CardDescription className="text-earth-600 text-lg">Nurture your scheduled soul sessions</CardDescription>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="border-earth-300 text-earth-700 hover:bg-earth-50 hover-lift"
                    onClick={() => navigate('/class-schedule')}
                  >
                    <Calendar className="h-4 w-4 mr-2" />
                    Sacred Calendar
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {classesLoading ? (
                  <div className="text-center py-12">
                    <div className="w-12 h-12 bg-sage-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <div className="w-5 h-5 border-2 border-sage-400 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                    <p className="text-earth-600">Loading sacred offerings...</p>
                  </div>
                ) : todaysClasses.length === 0 ? (
                  <div className="text-center py-16">
                    <div className="w-16 h-16 bg-sage-100 rounded-3xl flex items-center justify-center mx-auto mb-6">
                      <Heart className="h-8 w-8 text-sage-600" />
                    </div>
                    <p className="text-earth-600 text-lg mb-6">A peaceful day with no scheduled offerings</p>
                    <Button 
                      onClick={() => navigate('/class-schedule')}
                      className="bg-sage-500 hover:bg-sage-600 text-white px-6 py-3 rounded-2xl ripple-effect hover-lift"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Create Sacred Experience
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {todaysClasses.map((classItem, index) => (
                      <div 
                        key={classItem.id} 
                        className="flex items-center justify-between p-6 bg-gradient-to-r from-sage-50 to-earth-50 rounded-2xl border border-sage-100 hover-lift scale-in"
                        style={{ animationDelay: `${index * 0.1}s` }}
                      >
                        <div className="flex items-center space-x-6">
                          <div className="text-center">
                            <p className="text-sm font-medium text-earth-600">SACRED TIME</p>
                            <p className="text-xl font-cormorant font-bold text-sage-600">{classItem.start_time}</p>
                          </div>
                          <div>
                            <h3 className="font-cormorant text-xl font-semibold text-earth-800">{classItem.title}</h3>
                            <div className="flex items-center space-x-6 mt-2">
                              <div className="flex items-center text-sm text-earth-600">
                                <Clock className="h-4 w-4 mr-1" />
                                {classItem.duration_minutes} sacred minutes
                              </div>
                              <div className="flex items-center text-sm text-earth-600">
                                <Users className="h-4 w-4 mr-1" />
                                0/{classItem.max_students} souls
                              </div>
                              <Badge variant="secondary" className="bg-sage-100 text-sage-800">
                                {classItem.category}
                              </Badge>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Button variant="outline" size="sm" className="border-earth-300 text-earth-700 hover:bg-earth-50 hover-lift">
                            <MessageCircle className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm" className="border-earth-300 text-earth-700 hover:bg-earth-50 hover-lift">
                            <Video className="h-4 w-4" />
                          </Button>
                          <Button size="sm" className="bg-sage-500 hover:bg-sage-600 text-white ripple-effect">
                            Begin Sacred Space
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sacred Actions & Energy */}
          <div className="space-y-8">
            {/* Enhanced Quick Actions */}
            <div className="fade-in-up" style={{ animationDelay: '0.3s' }}>
              <QuickActions />
            </div>

            {/* Sacred Energy Flow */}
            <Card className="glass-card border-0 shadow-xl fade-in-up" style={{ animationDelay: '0.4s' }}>
              <CardHeader>
                <CardTitle className="text-xl font-cormorant font-semibold text-earth-800">Sacred Energy Flow</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {[
                    { action: "New soul joined the community", time: "2 minutes ago", type: "success", icon: Heart },
                    { action: "Sacred offering received - $25", time: "15 minutes ago", type: "success", icon: Sparkles },
                    { action: "Gentle reminder sent to souls", time: "1 hour ago", type: "info", icon: Calendar },
                    { action: "Beautiful feedback received", time: "2 hours ago", type: "info", icon: Star }
                  ].map((activity, index) => (
                    <div key={index} className="flex items-center space-x-4 scale-in" style={{ animationDelay: `${index * 0.1}s` }}>
                      <div className={`w-10 h-10 rounded-2xl ${activity.type === 'success' ? 'bg-sage-100' : 'bg-earth-100'} flex items-center justify-center`}>
                        <activity.icon className={`w-5 h-5 ${activity.type === 'success' ? 'text-sage-600' : 'text-earth-600'}`} />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-earth-800">{activity.action}</p>
                        <p className="text-xs text-earth-500">{activity.time}</p>
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
