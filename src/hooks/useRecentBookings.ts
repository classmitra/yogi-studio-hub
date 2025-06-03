
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useInstructor } from './useInstructor';

export const useRecentBookings = () => {
  const { instructor } = useInstructor();

  return useQuery({
    queryKey: ['recent-bookings', instructor?.id],
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
          classes!bookings_class_id_fkey(
            title,
            instructor_id
          )
        `)
        .eq('classes.instructor_id', instructor.id)
        .order('created_at', { ascending: false })
        .limit(10);
      
      if (error) throw error;
      return data;
    },
    enabled: !!instructor?.id,
  });
};
