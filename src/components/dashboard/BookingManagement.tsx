
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useInstructor } from '@/hooks/useInstructor';
import { Users, Calendar, Clock, DollarSign } from 'lucide-react';

const BookingManagement = () => {
  const { instructor } = useInstructor();

  const { data: bookings = [], isLoading } = useQuery({
    queryKey: ['instructor-bookings', instructor?.id],
    queryFn: async () => {
      if (!instructor?.id) return [];
      
      const { data, error } = await supabase
        .from('bookings')
        .select(`
          id,
          booking_date,
          booking_time,
          status,
          payment_status,
          student_name,
          student_email,
          payment_amount_cents,
          classes!inner(
            title,
            instructor_id
          )
        `)
        .eq('classes.instructor_id', instructor.id)
        .order('booking_date', { ascending: true });
      
      if (error) throw error;
      return data || [];
    },
    enabled: !!instructor?.id,
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Booking Management</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">Loading bookings...</div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <Users className="h-5 w-5" />
            <span>Recent Bookings</span>
          </CardTitle>
          <Badge variant="outline">{bookings.length} total</Badge>
        </div>
      </CardHeader>
      <CardContent>
        {bookings.length === 0 ? (
          <div className="text-center py-8">
            <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No bookings yet</h3>
            <p className="text-gray-600">Bookings will appear here once students start booking your classes.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {bookings.slice(0, 5).map((booking) => (
              <div key={booking.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="text-center">
                    <p className="text-sm font-medium text-gray-600">DATE</p>
                    <p className="text-lg font-bold text-yoga-600">
                      {new Date(booking.booking_date).toLocaleDateString('en-US', { 
                        month: 'short', 
                        day: 'numeric' 
                      })}
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{booking.student_name}</h3>
                    <p className="text-sm text-gray-600">{booking.student_email}</p>
                    <div className="flex items-center space-x-4 mt-1">
                      <div className="flex items-center text-sm text-gray-600">
                        <Clock className="h-4 w-4 mr-1" />
                        {booking.booking_time}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <DollarSign className="h-4 w-4 mr-1" />
                        ${(booking.payment_amount_cents / 100).toFixed(2)}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge className={getStatusColor(booking.status)}>
                    {booking.status}
                  </Badge>
                  <Badge className={getPaymentStatusColor(booking.payment_status)}>
                    {booking.payment_status}
                  </Badge>
                </div>
              </div>
            ))}
            {bookings.length > 5 && (
              <div className="text-center pt-4">
                <Button variant="outline">View All Bookings</Button>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default BookingManagement;
