
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
      case 'confirmed': return 'bg-green-50 text-green-800 border-green-200';
      case 'cancelled': return 'bg-red-50 text-red-800 border-red-200';
      case 'pending': return 'bg-yellow-50 text-yellow-800 border-yellow-200';
      default: return 'bg-gray-50 text-gray-800 border-gray-200';
    }
  };

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'bg-green-50 text-green-800 border-green-200';
      case 'pending': return 'bg-yellow-50 text-yellow-800 border-yellow-200';
      case 'failed': return 'bg-red-50 text-red-800 border-red-200';
      default: return 'bg-gray-50 text-gray-800 border-gray-200';
    }
  };

  if (isLoading) {
    return (
      <Card className="minimal-card">
        <CardHeader>
          <CardTitle className="text-black">Booking Management</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <div className="w-8 h-8 border-2 border-black border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Loading bookings...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="minimal-card">
      <CardHeader className="border-b border-gray-200">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-2 text-black">
            <Users className="h-5 w-5" />
            <span>Recent Bookings</span>
          </CardTitle>
          <Badge variant="outline" className="border-black text-black">{bookings.length} total</Badge>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        {bookings.length === 0 ? (
          <div className="text-center py-12">
            <Users className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-black mb-2">No bookings yet</h3>
            <p className="text-gray-600">Bookings will appear here once students start booking your classes.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {bookings.slice(0, 5).map((booking) => (
              <div key={booking.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
                <div className="flex items-center space-x-4">
                  <div className="text-center px-3 py-2 bg-white rounded border border-gray-200">
                    <p className="text-xs font-medium text-gray-600">DATE</p>
                    <p className="text-lg font-bold text-black">
                      {new Date(booking.booking_date).toLocaleDateString('en-US', { 
                        month: 'short', 
                        day: 'numeric' 
                      })}
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-black">{booking.student_name}</h3>
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
                  <Badge className={`border ${getStatusColor(booking.status)}`}>
                    {booking.status}
                  </Badge>
                  <Badge className={`border ${getPaymentStatusColor(booking.payment_status)}`}>
                    {booking.payment_status}
                  </Badge>
                </div>
              </div>
            ))}
            {bookings.length > 5 && (
              <div className="text-center pt-4">
                <Button variant="outline" className="border-black text-black hover:bg-gray-50">
                  View All Bookings
                </Button>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default BookingManagement;
