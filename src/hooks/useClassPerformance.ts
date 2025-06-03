
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useInstructor } from './useInstructor';

export const useClassPerformance = () => {
  const { instructor } = useInstructor();

  return useQuery({
    queryKey: ['class-performance', instructor?.id],
    queryFn: async () => {
      if (!instructor?.id) return [];
      
      const { data, error } = await supabase
        .from('classes')
        .select(`
          id,
          title,
          bookings!bookings_class_id_fkey(
            id,
            status,
            payment_amount_cents
          )
        `)
        .eq('instructor_id', instructor.id)
        .eq('is_active', true);
      
      if (error) throw error;
      
      return data.map(classItem => ({
        name: classItem.title,
        students: classItem.bookings.filter(b => b.status === 'confirmed').length,
        revenue: `$${(classItem.bookings
          .filter(b => b.status === 'confirmed')
          .reduce((sum, b) => sum + b.payment_amount_cents, 0) / 100).toFixed(0)}`
      }));
    },
    enabled: !!instructor?.id,
  });
};
