
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Tables, TablesInsert, TablesUpdate } from '@/integrations/supabase/types';

type Instructor = Tables<'instructors'>;
type InstructorInsert = TablesInsert<'instructors'>;
type InstructorUpdate = TablesUpdate<'instructors'>;

export const useInstructor = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { data: instructor, isLoading } = useQuery({
    queryKey: ['instructor', user?.id],
    queryFn: async () => {
      if (!user) {
        console.log('useInstructor - No user found');
        return null;
      }
      
      console.log('useInstructor - Fetching instructor for user:', user.id);
      
      const { data, error } = await supabase
        .from('instructors')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('useInstructor - Error fetching instructor:', error);
        throw error;
      }
      
      console.log('useInstructor - Instructor data:', data);
      return data;
    },
    enabled: !!user,
  });

  const createInstructorMutation = useMutation({
    mutationFn: async (data: InstructorInsert) => {
      console.log('useInstructor - Creating instructor with data:', data);
      
      const { data: instructor, error } = await supabase
        .from('instructors')
        .insert(data)
        .select()
        .single();

      if (error) {
        console.error('useInstructor - Error creating instructor:', error);
        throw error;
      }
      
      console.log('useInstructor - Created instructor:', instructor);
      return instructor;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['instructor'] });
    },
  });

  const updateInstructorMutation = useMutation({
    mutationFn: async (data: InstructorUpdate) => {
      if (!instructor?.id) {
        console.error('useInstructor - No instructor found for update');
        throw new Error('No instructor found');
      }
      
      console.log('useInstructor - Updating instructor:', instructor.id, 'with data:', data);
      
      const { data: updated, error } = await supabase
        .from('instructors')
        .update(data)
        .eq('id', instructor.id)
        .select()
        .single();

      if (error) {
        console.error('useInstructor - Error updating instructor:', error);
        throw error;
      }
      
      console.log('useInstructor - Updated instructor:', updated);
      return updated;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['instructor'] });
    },
  });

  return {
    instructor,
    isLoading,
    createInstructor: createInstructorMutation.mutate,
    updateInstructor: updateInstructorMutation.mutate,
    isCreating: createInstructorMutation.isPending,
    isUpdating: updateInstructorMutation.isPending,
  };
};

export const useSubdomainCheck = () => {
  const checkSubdomainMutation = useMutation({
    mutationFn: async (subdomain: string) => {
      console.log('useSubdomainCheck - Checking subdomain availability:', subdomain);
      
      const { data, error } = await supabase
        .from('instructors')
        .select('subdomain')
        .eq('subdomain', subdomain)
        .maybeSingle();

      if (error) {
        console.error('useSubdomainCheck - Error checking subdomain:', error);
        throw error;
      }
      
      const isAvailable = !data;
      console.log('useSubdomainCheck - Subdomain available:', isAvailable);
      return isAvailable; // true if available, false if taken
    },
  });

  return {
    checkSubdomain: checkSubdomainMutation.mutate,
    isChecking: checkSubdomainMutation.isPending,
    isAvailable: checkSubdomainMutation.data,
  };
};
