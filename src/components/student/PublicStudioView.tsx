
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { usePublicClasses } from '@/hooks/useClasses';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Clock, Users, Calendar, DollarSign, User, MapPin, Star, Award } from 'lucide-react';
import { format } from 'date-fns';
import WhatsAppWidget from '@/components/WhatsAppWidget';

interface PublicStudioViewProps {
  subdomain: string;
}

const PublicStudioView = ({ subdomain }: PublicStudioViewProps) => {
  const { classes, isLoading } = usePublicClasses(subdomain);
  const { user } = useAuth();
  const { toast } = useToast();
  const [bookingClass, setBookingClass] = React.useState<string | null>(null);

  const instructor = classes.length > 0 ? classes[0].instructors : null;

  const handleBookClass = async (classItem: any) => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to book a class.",
        variant: "destructive",
      });
      return;
    }

    setBookingClass(classItem.id);

    try {
      const bookingData = {
        booking_date: classItem.start_date,
        booking_time: classItem.start_time,
      };

      const { data, error } = await supabase.functions.invoke('create-payment-checkout', {
        body: {
          classId: classItem.id,
          bookingData,
        },
      });

      if (error) {
        throw error;
      }

      window.open(data.url, '_blank');

      toast({
        title: "Redirecting to Payment",
        description: "You'll be redirected to complete your payment.",
      });
    } catch (error) {
      console.error('Booking error:', error);
      toast({
        title: "Booking Failed",
        description: "There was an error processing your booking. Please try again.",
        variant: "destructive",
      });
    } finally {
      setBookingClass(null);
    }
  };

  const getDifficultyColor = (level: string) => {
    switch (level.toLowerCase()) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case 'hatha': return <Star className="h-4 w-4" />;
      case 'vinyasa': return <Award className="h-4 w-4" />;
      default: return <Star className="h-4 w-4" />;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 bg-gradient-to-br from-yoga-500 to-ocean-500 rounded-lg flex items-center justify-center mx-auto mb-4">
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          </div>
          <p className="text-gray-600">Loading studio...</p>
        </div>
      </div>
    );
  }

  if (!instructor) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Studio Not Found</h1>
          <p className="text-gray-600">The studio you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="min-h-screen bg-gradient-to-br from-yoga-50 to-ocean-50"
      style={{ backgroundColor: instructor.brand_color + '10' }}
    >
      {/* Enhanced Studio Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-6 py-12">
          <div className="flex flex-col md:flex-row items-start md:items-center space-y-6 md:space-y-0 md:space-x-8">
            {instructor.profile_image_url && (
              <div className="relative">
                <img
                  src={instructor.profile_image_url}
                  alt={instructor.studio_name}
                  className="w-32 h-32 rounded-full object-cover shadow-lg border-4 border-white"
                />
                <div 
                  className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full flex items-center justify-center shadow-lg"
                  style={{ backgroundColor: instructor.brand_color }}
                >
                  <Star className="h-4 w-4 text-white" />
                </div>
              </div>
            )}
            <div className="flex-1">
              <h1 className="text-4xl font-bold text-gray-900 mb-2" style={{ color: instructor.brand_color }}>
                {instructor.studio_name}
              </h1>
              {instructor.bio && (
                <p className="text-gray-600 text-lg leading-relaxed mb-4 max-w-3xl">{instructor.bio}</p>
              )}
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                <span className="flex items-center bg-gray-100 px-3 py-1 rounded-full">
                  <User className="h-4 w-4 mr-2" />
                  {subdomain}.yogastudio.app
                </span>
                <span className="flex items-center bg-gray-100 px-3 py-1 rounded-full">
                  <MapPin className="h-4 w-4 mr-2" />
                  Online Classes
                </span>
                <span className="flex items-center bg-gray-100 px-3 py-1 rounded-full">
                  <Calendar className="h-4 w-4 mr-2" />
                  {classes.length} Classes Available
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Classes Section */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Upcoming Classes</h2>
            <p className="text-gray-600">Join our community and transform your practice</p>
          </div>
          {!user && (
            <Button 
              variant="outline" 
              onClick={() => window.location.href = '/auth'}
              className="hidden md:flex"
            >
              Sign In to Book
            </Button>
          )}
        </div>
        
        {classes.length === 0 ? (
          <Card className="bg-white shadow-lg">
            <CardContent className="text-center py-16">
              <Calendar className="h-16 w-16 text-gray-400 mx-auto mb-6" />
              <h3 className="text-xl font-semibold text-gray-900 mb-3">No Classes Scheduled</h3>
              <p className="text-gray-600 text-lg">Check back soon for upcoming classes or contact the studio directly.</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {classes.map((classItem) => (
              <Card key={classItem.id} className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 bg-white overflow-hidden">
                <CardHeader className="pb-4">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center space-x-2">
                      {getCategoryIcon(classItem.category)}
                      <span className="text-sm font-medium text-gray-600">{classItem.category}</span>
                    </div>
                    <Badge 
                      variant="secondary" 
                      className={`capitalize font-medium ${getDifficultyColor(classItem.difficulty_level)}`}
                    >
                      {classItem.difficulty_level}
                    </Badge>
                  </div>
                  <CardTitle className="text-xl font-bold text-gray-900 group-hover:text-yoga-600 transition-colors">
                    {classItem.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="flex items-center text-gray-600">
                      <Calendar className="h-4 w-4 mr-2 text-yoga-500" />
                      <span className="font-medium">
                        {format(new Date(classItem.start_date), 'MMM d')}
                      </span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Clock className="h-4 w-4 mr-2 text-yoga-500" />
                      <span className="font-medium">{classItem.start_time}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Users className="h-4 w-4 mr-2 text-yoga-500" />
                      <span className="font-medium">Max {classItem.max_students}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Clock className="h-4 w-4 mr-2 text-yoga-500" />
                      <span className="font-medium">{classItem.duration_minutes}min</span>
                    </div>
                  </div>
                  
                  {classItem.description && (
                    <p className="text-sm text-gray-600 leading-relaxed line-clamp-3">
                      {classItem.description}
                    </p>
                  )}
                  
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="flex items-center">
                      <DollarSign className="h-5 w-5 text-green-600 mr-1" />
                      <span className="text-2xl font-bold text-gray-900">
                        {(classItem.price_cents / 100).toFixed(0)}
                      </span>
                      <span className="text-sm text-gray-500 ml-1">USD</span>
                    </div>
                    <Button
                      onClick={() => handleBookClass(classItem)}
                      disabled={bookingClass === classItem.id}
                      className="px-6 py-2 font-semibold transition-all duration-200"
                      style={{ 
                        backgroundColor: instructor.brand_color,
                        borderColor: instructor.brand_color 
                      }}
                    >
                      {bookingClass === classItem.id ? (
                        <div className="flex items-center space-x-2">
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          <span>Processing...</span>
                        </div>
                      ) : (
                        'Book Now'
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      <WhatsAppWidget />
    </div>
  );
};

export default PublicStudioView;
