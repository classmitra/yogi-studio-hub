
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useInstructor } from './useInstructor';
import { isInstructorMetrics } from '@/utils/analyticsTypes';
import type { InstructorMetrics } from '@/types/analytics';

export const useInstructorMetrics = () => {
  const { instructor } = useInstructor();

  return useQuery({
    queryKey: ['instructor-metrics', instructor?.id],
    queryFn: async (): Promise<InstructorMetrics | null> => {
      if (!instructor?.id) return null;
      
      const { data, error } = await supabase.rpc('get_instructor_metrics', {
        instructor_uuid: instructor.id
      });
      
      if (error) throw error;
      
      if (isInstructorMetrics(data)) {
        return data;
      }
      
      return null;
    },
    enabled: !!instructor?.id,
  });
};
