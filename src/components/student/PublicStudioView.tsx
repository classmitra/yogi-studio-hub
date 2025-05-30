import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { usePublicClasses } from '@/hooks/useClasses';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Clock, Users, Calendar, DollarSign, User } from 'lucide-react';
import { format } from 'date-fns';

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

      // Open Stripe checkout in a new tab
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
      {/* Studio Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="flex items-center space-x-6">
            {instructor.profile_image_url && (
              <img
                src={instructor.profile_image_url}
                alt={instructor.studio_name}
                className="w-20 h-20 rounded-full object-cover"
              />
            )}
            <div>
              <h1 className="text-3xl font-bold text-gray-900" style={{ color: instructor.brand_color }}>
                {instructor.studio_name}
              </h1>
              {instructor.bio && (
                <p className="text-gray-600 mt-2 max-w-2xl">{instructor.bio}</p>
              )}
              <div className="flex items-center space-x-4 mt-3 text-sm text-gray-500">
                <span className="flex items-center">
                  <User className="h-4 w-4 mr-1" />
                  {subdomain}.yogastudio.app
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Classes Section */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Upcoming Classes</h2>
        
        {classes.length === 0 ? (
          <Card>
            <CardContent className="text-center py-12">
              <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No Classes Scheduled</h3>
              <p className="text-gray-600">Check back soon for upcoming classes.</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {classes.map((classItem) => (
              <Card key={classItem.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">{classItem.title}</CardTitle>
                    <Badge variant="secondary" className="capitalize">
                      {classItem.difficulty_level}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center text-sm text-gray-600">
                      <Calendar className="h-4 w-4 mr-2" />
                      {format(new Date(classItem.start_date), 'EEEE, MMMM d')}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Clock className="h-4 w-4 mr-2" />
                      {classItem.start_time} ({classItem.duration_minutes} min)
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Users className="h-4 w-4 mr-2" />
                      Max {classItem.max_students} students
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <DollarSign className="h-4 w-4 mr-2" />
                      ${(classItem.price_cents / 100).toFixed(2)}
                    </div>
                    {classItem.description && (
                      <p className="text-sm text-gray-600 mt-2">{classItem.description}</p>
                    )}
                    <Button
                      onClick={() => handleBookClass(classItem)}
                      disabled={bookingClass === classItem.id}
                      className="w-full mt-4"
                      style={{ backgroundColor: instructor.brand_color }}
                    >
                      {bookingClass === classItem.id ? 'Processing...' : 'Book Class'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PublicStudioView;
