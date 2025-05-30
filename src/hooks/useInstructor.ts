
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
      if (!user) return null;
      
      const { data, error } = await supabase
        .from('instructors')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (error && error.code !== 'PGRST116') {
        throw error;
      }
      
      return data;
    },
    enabled: !!user,
  });

  const createInstructorMutation = useMutation({
    mutationFn: async (data: InstructorInsert) => {
      const { data: instructor, error } = await supabase
        .from('instructors')
        .insert(data)
        .select()
        .single();

      if (error) throw error;
      return instructor;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['instructor'] });
    },
  });

  const updateInstructorMutation = useMutation({
    mutationFn: async (data: InstructorUpdate) => {
      if (!instructor?.id) throw new Error('No instructor found');
      
      const { data: updated, error } = await supabase
        .from('instructors')
        .update(data)
        .eq('id', instructor.id)
        .select()
        .single();

      if (error) throw error;
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
      const { data, error } = await supabase
        .from('instructors')
        .select('subdomain')
        .eq('subdomain', subdomain)
        .maybeSingle();

      if (error) throw error;
      return !data; // true if available, false if taken
    },
  });

  return {
    checkSubdomain: checkSubdomainMutation.mutate,
    isChecking: checkSubdomainMutation.isPending,
    isAvailable: checkSubdomainMutation.data,
  };
};
