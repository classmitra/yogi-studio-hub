
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { ClassWithInstructor } from '@/types/class';

export const usePublicClasses = (subdomain?: string) => {
  const { data: classes, isLoading, error } = useQuery({
    queryKey: ['public-classes', subdomain],
    queryFn: async (): Promise<ClassWithInstructor[]> => {
      if (!subdomain) {
        console.log('usePublicClasses - No subdomain provided');
        return [];
      }
      
      console.log('usePublicClasses - Fetching classes for subdomain:', subdomain);
      
      // First get the instructor by subdomain
      const { data: instructor, error: instructorError } = await supabase
        .from('instructors')
        .select('*')
        .eq('subdomain', subdomain)
        .single();
      
      if (instructorError) {
        console.error('usePublicClasses - Error fetching instructor:', instructorError);
        if (instructorError.code === 'PGRST116') {
          // No instructor found with this subdomain
          return [];
        }
        throw instructorError;
      }
      
      if (!instructor) {
        console.log('usePublicClasses - No instructor found for subdomain:', subdomain);
        return [];
      }
      
      // Then get the classes for this instructor
      const { data: classesData, error: classesError } = await supabase
        .from('classes')
        .select('*')
        .eq('instructor_id', instructor.id)
        .eq('is_active', true)
        .order('start_date', { ascending: true });
      
      if (classesError) {
        console.error('usePublicClasses - Error fetching classes:', classesError);
        throw classesError;
      }
      
      // If no classes but instructor exists, return empty array with instructor info
      // This allows the studio website to show even without classes
      if (!classesData || classesData.length === 0) {
        console.log('usePublicClasses - No classes found, but instructor exists');
        return [{
          id: 'no-classes',
          instructors: instructor,
          isEmpty: true
        } as ClassWithInstructor];
      }
      
      // Add instructor data to each class
      const classesWithInstructor = classesData.map(classItem => ({
        ...classItem,
        instructors: instructor
      }));
      
      console.log('usePublicClasses - Fetched classes data:', classesWithInstructor);
      return classesWithInstructor;
    },
    enabled: !!subdomain,
  });

  return {
    classes: classes || [],
    isLoading,
    error,
  };
};
