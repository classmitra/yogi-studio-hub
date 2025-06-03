
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useInstructor } from './useInstructor';

export const useRevenueTrend = () => {
  const { instructor } = useInstructor();

  return useQuery({
    queryKey: ['revenue-trend', instructor?.id],
    queryFn: async () => {
      if (!instructor?.id) return [];
      
      const sixMonthsAgo = new Date();
      sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
      
      const { data, error } = await supabase
        .from('bookings')
        .select(`
          booking_date,
          payment_amount_cents,
          classes!bookings_class_id_fkey(instructor_id)
        `)
        .eq('classes.instructor_id', instructor.id)
        .eq('status', 'confirmed')
        .gte('booking_date', sixMonthsAgo.toISOString().split('T')[0])
        .order('booking_date');
      
      if (error) throw error;
      
      // Group by month and sum revenue
      const monthlyRevenue = data.reduce((acc: any[], booking) => {
        const month = new Date(booking.booking_date).toLocaleDateString('en-US', { month: 'short' });
        const existing = acc.find(item => item.month === month);
        
        if (existing) {
          existing.value += booking.payment_amount_cents;
        } else {
          acc.push({
            month,
            value: booking.payment_amount_cents
          });
        }
        
        return acc;
      }, []);
      
      return monthlyRevenue;
    },
    enabled: !!instructor?.id,
  });
};
