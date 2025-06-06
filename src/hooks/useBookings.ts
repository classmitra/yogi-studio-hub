
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

interface BookingWithClass {
  id: string;
  student_id: string;
  class_id: string;
  booking_date: string;
  booking_time: string;
  status: string;
  payment_status: string;
  booking_reference: string;
  special_requests?: string;
  attended?: boolean;
  created_at: string;
  classes: {
    title: string;
    instructors: {
      studio_name: string;
    };
  };
}

export const useBookings = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { data: bookings = [], isLoading } = useQuery({
    queryKey: ['bookings', user?.id],
    queryFn: async (): Promise<BookingWithClass[]> => {
      if (!user?.id) return [];
      
      const { data, error } = await supabase
        .from('bookings')
        .select(`
          id,
          student_id,
          class_id,
          booking_date,
          booking_time,
          status,
          payment_status,
          booking_reference,
          special_requests,
          attended,
          created_at,
          classes!bookings_class_id_fkey(
            title,
            instructors!classes_instructor_id_fkey(
              studio_name
            )
          )
        `)
        .eq('student_id', user.id)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as BookingWithClass[] || [];
    },
    enabled: !!user?.id,
  });

  const cancelBookingMutation = useMutation({
    mutationFn: async ({ id, reason }: { id: string; reason: string }) => {
      const { error } = await supabase
        .from('bookings')
        .update({ 
          status: 'cancelled',
          cancellation_reason: reason,
          cancelled_at: new Date().toISOString()
        })
        .eq('id', id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookings'] });
    },
  });

  return {
    bookings,
    isLoading,
    cancelBooking: cancelBookingMutation.mutate,
    isCancelling: cancelBookingMutation.isPending,
  };
};
