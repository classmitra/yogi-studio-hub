
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
  Heart,
  Star,
  ArrowRight,
  Minus
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
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="w-16 h-16 border border-black flex items-center justify-center mx-auto mb-8 breathe-minimal">
            <div className="w-6 h-6 border border-black border-t-transparent animate-spin"></div>
          </div>
          <p className="text-black/70 text-lg font-light tracking-wide">Preparing your sacred space...</p>
        </div>
      </div>
    );
  }

  if (!instructor) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center max-w-md mx-auto p-8">
          <div className="w-20 h-20 border border-black flex items-center justify-center mx-auto mb-8">
            <Settings className="h-10 w-10 text-black/60" />
          </div>
          <h1 className="text-5xl font-dongle font-normal text-black mb-6 leading-none">Sacred Space Setup</h1>
          <p className="text-black/70 mb-12 leading-relaxed font-light tracking-wide">
            Let's create your beautiful digital sanctuary before accessing your teaching dashboard.
          </p>
          <Button 
            onClick={() => navigate('/studio-setup')}
            className="minimal-button px-8 py-4 text-lg font-light tracking-wide"
          >
            Create Sacred Space
            <ArrowRight className="h-5 w-5 ml-2" />
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
    },
    {
      title: "Monthly Abundance",
      value: "$3,240",
      change: "+23%",
      icon: DollarSign,
    },
    {
      title: "Weekly Offerings",
      value: classes.length.toString(),
      change: "+2",
      icon: Calendar,
    },
    {
      title: "Sacred Rating",
      value: "4.9",
      change: "+0.1",
      icon: TrendingUp,
    }
  ];

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      {/* Scroll Progress */}
      <div className="scroll-progress-minimal"></div>

      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-1 h-48 bg-black/5 float-minimal"></div>
        <div className="absolute bottom-32 right-32 w-1 h-32 bg-black/10 parallax-slow"></div>
        <div className="absolute top-40 right-1/4 w-px h-64 bg-black/5 gentle-fade" />
        <div className="absolute bottom-40 left-1/4 w-1 h-1 bg-black/20 breathe-minimal" />
      </div>

      <div className="max-w-7xl mx-auto p-8 relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-16 fade-in-minimal">
          <div>
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-8 h-8 border border-black flex items-center justify-center">
                <div className="w-2 h-2 bg-black"></div>
              </div>
              <h1 className="text-6xl font-dongle font-normal text-black leading-none">
                Welcome back, sacred teacher
              </h1>
            </div>
            <p className="text-black/70 text-lg leading-relaxed font-light tracking-wide">Here's the beautiful energy flowing through your studio today</p>
            {instructor.subdomain && (
              <div className="mt-6 flex items-center space-x-6">
                <div className="flex items-center space-x-4">
                  <Badge variant="outline" className="border-black/20 text-black bg-transparent font-light tracking-wide">
                    {instructor.studio_name}
                  </Badge>
                  <span className="text-sm text-black/40">•</span>
                  <span className="text-sm text-black/70 font-light tracking-wide">{instructor.subdomain}.yogastudio.app</span>
                </div>
              </div>
            )}
          </div>
          <div className="flex items-center space-x-6">
            <Button 
              variant="outline" 
              onClick={() => window.open(studioUrl, '_blank')}
              className="flex items-center space-x-2 border-black bg-transparent text-black hover:bg-black hover:text-white transition-all duration-500 font-light tracking-wide"
            >
              <Eye className="h-4 w-4" />
              <span>View Sacred Space</span>
              <ExternalLink className="h-3 w-3" />
            </Button>
            <Button 
              variant="outline" 
              onClick={() => navigate('/studio-setup')}
              className="flex items-center space-x-2 border-black bg-transparent text-black hover:bg-black hover:text-white transition-all duration-500 font-light tracking-wide"
            >
              <Settings className="h-4 w-4" />
              <span>Sacred Settings</span>
            </Button>
          </div>
        </div>

        {/* Sacred Studio Info Card */}
        <Card className="border border-black/10 bg-white mb-16 slide-up-minimal" style={{ animationDelay: '0.1s' }}>
          <CardHeader>
            <CardTitle className="text-3xl font-dongle font-normal text-black flex items-center tracking-wide">
              <Heart className="h-6 w-6 mr-4 text-black/60" />
              Your Sacred Digital Sanctuary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="stagger-in" style={{ animationDelay: '0s' }}>
                <label className="text-sm font-light text-black/60 tracking-wide">Studio Name</label>
                <p className="text-black font-dongle text-2xl font-normal tracking-wide">{instructor.studio_name}</p>
              </div>
              <div className="stagger-in" style={{ animationDelay: '0.1s' }}>
                <label className="text-sm font-light text-black/60 tracking-wide">Sacred Domain</label>
                <p className="text-black font-light tracking-wide">{instructor.subdomain}</p>
              </div>
              <div className="stagger-in" style={{ animationDelay: '0.2s' }}>
                <label className="text-sm font-light text-black/60 tracking-wide">Sacred Portal</label>
                <a 
                  href={studioUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-black hover:opacity-60 text-sm underline flex items-center transition-opacity duration-300 font-light tracking-wide"
                >
                  Visit Sacred Space
                  <ExternalLink className="h-3 w-3 ml-1" />
                </a>
              </div>
              <div className="stagger-in" style={{ animationDelay: '0.3s' }}>
                <label className="text-sm font-light text-black/60 tracking-wide">Sacred Colors</label>
                <div className="flex items-center space-x-3">
                  <div 
                    className="w-5 h-5 border border-black/20"
                    style={{ backgroundColor: instructor.brand_color }}
                  ></div>
                  <span className="text-black text-sm font-light tracking-wide">{instructor.brand_color}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => (
            <Card 
              key={index} 
              className="border border-black/10 bg-white minimal-hover stagger-in group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-8">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-light text-black/60 mb-2 tracking-wide">{stat.title}</p>
                    <p className="text-4xl font-dongle font-normal text-black">{stat.value}</p>
                    <p className="text-sm text-black/70 font-light mt-2 tracking-wide">{stat.change} from last moon</p>
                  </div>
                  <div className="w-12 h-12 border border-black/20 flex items-center justify-center group-hover:border-black/60 transition-all duration-500">
                    <stat.icon className="h-6 w-6 text-black/60" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-16">
          {/* Today's Sacred Offerings */}
          <div className="lg:col-span-2">
            <Card className="border border-black/10 bg-white slide-up-minimal" style={{ animationDelay: '0.2s' }}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-3xl font-dongle font-normal text-black tracking-wide">Today's Sacred Offerings</CardTitle>
                    <CardDescription className="text-black/70 text-lg font-light tracking-wide">Nurture your scheduled soul sessions</CardDescription>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="border-black bg-transparent text-black hover:bg-black hover:text-white transition-all duration-500 font-light tracking-wide"
                    onClick={() => navigate('/class-schedule')}
                  >
                    <Calendar className="h-4 w-4 mr-2" />
                    Sacred Calendar
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {classesLoading ? (
                  <div className="text-center py-16">
                    <div className="w-12 h-12 border border-black/20 flex items-center justify-center mx-auto mb-6">
                      <div className="w-5 h-5 border border-black border-t-transparent animate-spin"></div>
                    </div>
                    <p className="text-black/70 font-light tracking-wide">Loading sacred offerings...</p>
                  </div>
                ) : todaysClasses.length === 0 ? (
                  <div className="text-center py-20">
                    <div className="w-16 h-16 border border-black/20 flex items-center justify-center mx-auto mb-8">
                      <Heart className="h-8 w-8 text-black/60" />
                    </div>
                    <p className="text-black/70 text-lg mb-8 font-light tracking-wide">A peaceful day with no scheduled offerings</p>
                    <Button 
                      onClick={() => navigate('/class-schedule')}
                      className="minimal-button px-6 py-3 font-light tracking-wide"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Create Sacred Experience
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-8">
                    {todaysClasses.map((classItem, index) => (
                      <div 
                        key={classItem.id} 
                        className="flex items-center justify-between p-8 bg-gray-50 border border-black/10 minimal-hover stagger-in"
                        style={{ animationDelay: `${index * 0.1}s` }}
                      >
                        <div className="flex items-center space-x-8">
                          <div className="text-center">
                            <p className="text-sm font-light text-black/60 tracking-wide">SACRED TIME</p>
                            <p className="text-2xl font-dongle font-normal text-black">{classItem.start_time}</p>
                          </div>
                          <div>
                            <h3 className="font-dongle text-2xl font-normal text-black tracking-wide">{classItem.title}</h3>
                            <div className="flex items-center space-x-8 mt-3">
                              <div className="flex items-center text-sm text-black/70 font-light tracking-wide">
                                <Clock className="h-4 w-4 mr-2" />
                                {classItem.duration_minutes} sacred minutes
                              </div>
                              <div className="flex items-center text-sm text-black/70 font-light tracking-wide">
                                <Users className="h-4 w-4 mr-2" />
                                0/{classItem.max_students} souls
                              </div>
                              <Badge variant="secondary" className="bg-transparent border border-black/20 text-black/70 font-light tracking-wide">
                                {classItem.category}
                              </Badge>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4">
                          <Button variant="outline" size="sm" className="border-black bg-transparent text-black hover:bg-black hover:text-white transition-all duration-500">
                            <MessageCircle className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm" className="border-black bg-transparent text-black hover:bg-black hover:text-white transition-all duration-500">
                            <Video className="h-4 w-4" />
                          </Button>
                          <Button size="sm" className="minimal-button font-light tracking-wide">
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
          <div className="space-y-12">
            {/* Quick Actions */}
            <div className="slide-up-minimal" style={{ animationDelay: '0.3s' }}>
              <QuickActions />
            </div>

            {/* Sacred Energy Flow */}
            <Card className="border border-black/10 bg-white slide-up-minimal" style={{ animationDelay: '0.4s' }}>
              <CardHeader>
                <CardTitle className="text-2xl font-dongle font-normal text-black tracking-wide">Sacred Energy Flow</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  {[
                    { action: "New soul joined the community", time: "2 minutes ago", type: "success", icon: Heart },
                    { action: "Sacred offering received - $25", time: "15 minutes ago", type: "success", icon: DollarSign },
                    { action: "Gentle reminder sent to souls", time: "1 hour ago", type: "info", icon: Calendar },
                    { action: "Beautiful feedback received", time: "2 hours ago", type: "info", icon: Star }
                  ].map((activity, index) => (
                    <div key={index} className="flex items-center space-x-4 stagger-in" style={{ animationDelay: `${index * 0.1}s` }}>
                      <div className="w-10 h-10 border border-black/20 flex items-center justify-center">
                        <activity.icon className="w-5 h-5 text-black/60" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-light text-black tracking-wide">{activity.action}</p>
                        <p className="text-xs text-black/50 font-light tracking-wide">{activity.time}</p>
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
