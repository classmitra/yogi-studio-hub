import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useInstructor } from './useInstructor';
import type { InstructorMetrics } from '@/types/analytics';

export const useAnalytics = () => {
  const { instructor } = useInstructor();

  // Get instructor metrics using the database function
  const { data: metrics, isLoading: metricsLoading } = useQuery({
    queryKey: ['instructor-metrics', instructor?.id],
    queryFn: async (): Promise<InstructorMetrics | null> => {
      if (!instructor?.id) return null;
      
      const { data, error } = await supabase.rpc('get_instructor_metrics', {
        instructor_uuid: instructor.id
      });
      
      if (error) throw error;
      
      // Type guard to ensure data matches InstructorMetrics structure
      if (data && typeof data === 'object' && !Array.isArray(data)) {
        return data as InstructorMetrics;
      }
      
      return null;
    },
    enabled: !!instructor?.id,
  });

  // Get revenue trend data (last 6 months)
  const { data: revenueTrend, isLoading: revenueTrendLoading } = useQuery({
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

  // Get student growth data
  const { data: studentGrowth, isLoading: studentGrowthLoading } = useQuery({
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

  // Get class performance data
  const { data: classPerformance, isLoading: classPerformanceLoading } = useQuery({
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

  // Get recent bookings
  const { data: recentBookings, isLoading: recentBookingsLoading } = useQuery({
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

  return {
    metrics,
    revenueTrend,
    studentGrowth,
    classPerformance,
    recentBookings,
    isLoading: metricsLoading || revenueTrendLoading || studentGrowthLoading || 
               classPerformanceLoading || recentBookingsLoading
  };
};
