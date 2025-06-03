
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Class } from '@/types/class';

export const useInstructorClasses = (instructorId?: string) => {
  const { data: classes, isLoading } = useQuery({
    queryKey: ['classes', instructorId],
    queryFn: async (): Promise<Class[]> => {
      console.log('useInstructorClasses - Fetching classes for instructor:', instructorId);
      
      if (!instructorId) {
        console.log('useInstructorClasses - No instructor ID provided');
        return [];
      }

      let query = supabase
        .from('classes')
        .select('*')
        .eq('instructor_id', instructorId)
        .eq('is_active', true);
      
      const { data, error } = await query.order('start_date', { ascending: true });
      
      if (error) {
        console.error('useInstructorClasses - Error fetching classes:', error);
        throw error;
      }
      
      console.log('useInstructorClasses - Fetched classes:', data);
      return data || [];
    },
    enabled: !!instructorId,
  });

  return {
    classes: classes || [],
    isLoading,
  };
};
