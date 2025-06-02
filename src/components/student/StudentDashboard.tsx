
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useBookings } from '@/hooks/useBookings';
import { useToast } from '@/hooks/use-toast';
import { Calendar, Clock, MapPin, User, X, ExternalLink, Star, Award, CheckCircle } from 'lucide-react';
import { format, isToday, isTomorrow, isThisWeek } from 'date-fns';

const StudentDashboard = () => {
  const { bookings, isLoading, cancelBooking, isCancelling } = useBookings();
  const { toast } = useToast();

  const handleCancelBooking = (bookingId: string) => {
    if (window.confirm('Are you sure you want to cancel this booking?')) {
      cancelBooking({ id: bookingId, reason: 'Cancelled by student' });
      toast({
        title: "Booking Cancelled",
        description: "Your booking has been cancelled successfully.",
      });
    }
  };

  const getDateLabel = (date: Date) => {
    if (isToday(date)) return 'Today';
    if (isTomorrow(date)) return 'Tomorrow';
    if (isThisWeek(date)) return format(date, 'EEEE');
    return format(date, 'MMMM d');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const upcomingBookings = bookings.filter(booking => 
    booking.status === 'confirmed' && 
    new Date(booking.booking_date) >= new Date()
  ).sort((a, b) => new Date(a.booking_date).getTime() - new Date(b.booking_date).getTime());

  const pastBookings = bookings.filter(booking => 
    booking.status === 'completed' || 
    new Date(booking.booking_date) < new Date()
  ).sort((a, b) => new Date(b.booking_date).getTime() - new Date(a.booking_date).getTime());

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 bg-gradient-to-br from-yoga-500 to-ocean-500 rounded-lg flex items-center justify-center mx-auto mb-4">
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          </div>
          <p className="text-gray-600">Loading your bookings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-yoga-50 to-ocean-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Enhanced Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">My Yoga Journey</h1>
          <p className="text-gray-600 text-lg">Track your practice and manage your classes</p>
          
          {/* Quick Stats */}
          <div className="flex justify-center mt-6 space-x-8">
            <div className="text-center">
              <div className="text-2xl font-bold text-yoga-600">{upcomingBookings.length}</div>
              <div className="text-sm text-gray-500">Upcoming Classes</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-ocean-600">{pastBookings.length}</div>
              <div className="text-sm text-gray-500">Classes Completed</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {pastBookings.filter(b => b.attended).length}
              </div>
              <div className="text-sm text-gray-500">Classes Attended</div>
            </div>
          </div>
        </div>

        {/* Upcoming Classes */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold text-gray-900 flex items-center">
              <Calendar className="h-6 w-6 mr-2 text-yoga-500" />
              Upcoming Classes
            </h2>
            <Button variant="outline" onClick={() => window.location.href = '/'}>
              Browse More Classes
            </Button>
          </div>
          
          {upcomingBookings.length === 0 ? (
            <Card className="bg-white shadow-lg">
              <CardContent className="text-center py-16">
                <Calendar className="h-16 w-16 text-gray-400 mx-auto mb-6" />
                <h3 className="text-xl font-semibold text-gray-900 mb-3">No Upcoming Classes</h3>
                <p className="text-gray-600 mb-6">Ready to start your yoga journey? Book your first class today!</p>
                <Button onClick={() => window.location.href = '/'}>
                  Explore Classes
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {upcomingBookings.map((booking) => (
                <Card key={booking.id} className="group hover:shadow-xl transition-all duration-300 bg-white overflow-hidden border-l-4 border-l-yoga-500">
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start mb-2">
                      <Badge className={`font-medium ${getStatusColor(booking.status)}`}>
                        {booking.status}
                      </Badge>
                      <Badge variant={booking.payment_status === 'paid' ? 'default' : 'secondary'}>
                        {booking.payment_status}
                      </Badge>
                    </div>
                    <CardTitle className="text-lg font-bold text-gray-900">
                      {booking.classes.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex items-center text-sm">
                        <Calendar className="h-4 w-4 mr-3 text-yoga-500" />
                        <div>
                          <span className="font-semibold text-gray-900">
                            {getDateLabel(new Date(booking.booking_date))}
                          </span>
                          <span className="text-gray-500 ml-2">
                            {format(new Date(booking.booking_date), 'MMMM d, yyyy')}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Clock className="h-4 w-4 mr-3 text-yoga-500" />
                        <span className="font-medium">{booking.booking_time}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <MapPin className="h-4 w-4 mr-3 text-yoga-500" />
                        <span>{booking.classes.instructors.studio_name}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <User className="h-4 w-4 mr-3 text-yoga-500" />
                        <span className="font-mono text-xs bg-gray-100 px-2 py-1 rounded">
                          {booking.booking_reference}
                        </span>
                      </div>
                    </div>
                    
                    {booking.special_requests && (
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                        <p className="text-sm text-blue-800">
                          <strong>Your Note:</strong> {booking.special_requests}
                        </p>
                      </div>
                    )}
                    
                    <div className="flex space-x-2 pt-4 border-t border-gray-100">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleCancelBooking(booking.id)}
                        disabled={isCancelling}
                        className="flex-1 text-red-600 border-red-200 hover:bg-red-50"
                      >
                        <X className="h-4 w-4 mr-1" />
                        Cancel
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1">
                        <ExternalLink className="h-4 w-4 mr-1" />
                        Details
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* Past Classes */}
        {pastBookings.length > 0 && (
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
              <CheckCircle className="h-6 w-6 mr-2 text-green-500" />
              Practice History
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {pastBookings.slice(0, 8).map((booking) => (
                <Card key={booking.id} className="group hover:shadow-lg transition-all duration-200 bg-white opacity-90 hover:opacity-100">
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start mb-2">
                      <Badge 
                        variant={booking.attended ? 'default' : 'secondary'}
                        className={booking.attended ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'}
                      >
                        {booking.attended ? (
                          <><CheckCircle className="h-3 w-3 mr-1" /> Attended</>
                        ) : (
                          'Missed'
                        )}
                      </Badge>
                    </div>
                    <CardTitle className="text-base font-semibold text-gray-900 leading-tight">
                      {booking.classes.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm text-gray-600">
                      <div className="flex items-center">
                        <Calendar className="h-3 w-3 mr-2" />
                        {format(new Date(booking.booking_date), 'MMM d, yyyy')}
                      </div>
                      <div className="flex items-center">
                        <MapPin className="h-3 w-3 mr-2" />
                        {booking.classes.instructors.studio_name}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            {pastBookings.length > 8 && (
              <div className="text-center mt-6">
                <Button variant="outline">View All History</Button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentDashboard;
