
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useInstructor } from './useInstructor';

export const useStudentGrowth = () => {
  const { instructor } = useInstructor();

  return useQuery({
    queryKey: ['student-growth', instructor?.id],
    queryFn: async () => {
      if (!instructor?.id) return [];
      
      const sixMonthsAgo = new Date();
      sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
      
      const { data, error } = await supabase
        .from('bookings')
        .select(`
          booking_date,
          student_id,
          classes!bookings_class_id_fkey(instructor_id)
        `)
        .eq('classes.instructor_id', instructor.id)
        .eq('status', 'confirmed')
        .gte('booking_date', sixMonthsAgo.toISOString().split('T')[0])
        .order('booking_date');
      
      if (error) throw error;
      
      // Group by month and count unique students
      const monthlyStudents = data.reduce((acc: any[], booking) => {
        const month = new Date(booking.booking_date).toLocaleDateString('en-US', { month: 'short' });
        const existing = acc.find(item => item.month === month);
        
        if (existing) {
          existing.students.add(booking.student_id);
        } else {
          acc.push({
            month,
            students: new Set([booking.student_id])
          });
        }
        
        return acc;
      }, []);
      
      // Convert sets to counts and create cumulative totals
      let cumulative = 0;
      return monthlyStudents.map(item => {
        cumulative += item.students.size;
        return {
          month: item.month,
          value: cumulative
        };
      });
    },
    enabled: !!instructor?.id,
  });
};
