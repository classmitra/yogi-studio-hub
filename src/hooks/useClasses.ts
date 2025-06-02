
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Tables, TablesInsert, TablesUpdate } from '@/integrations/supabase/types';

type Class = Tables<'classes'>;
type ClassInsert = TablesInsert<'classes'>;
type ClassUpdate = TablesUpdate<'classes'>;

export const useClasses = (instructorId?: string) => {
  const queryClient = useQueryClient();

  const { data: classes, isLoading } = useQuery({
    queryKey: ['classes', instructorId],
    queryFn: async () => {
      let query = supabase.from('classes').select('*').eq('is_active', true);
      
      if (instructorId) {
        query = query.eq('instructor_id', instructorId);
      }
      
      const { data, error } = await query.order('start_date', { ascending: true });
      
      if (error) throw error;
      return data || [];
    },
    enabled: !!instructorId,
  });

  const createClassMutation = useMutation({
    mutationFn: async (data: ClassInsert) => {
      const { data: newClass, error } = await supabase
        .from('classes')
        .insert(data)
        .select()
        .single();

      if (error) throw error;
      return newClass;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['classes'] });
    },
  });

  const updateClassMutation = useMutation({
    mutationFn: async ({ id, ...data }: ClassUpdate & { id: string }) => {
      const { data: updated, error } = await supabase
        .from('classes')
        .update(data)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return updated;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['classes'] });
    },
  });

  const deleteClassMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('classes')
        .update({ is_active: false })
        .eq('id', id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['classes'] });
    },
  });

  return {
    classes: classes || [],
    isLoading,
    createClass: createClassMutation.mutate,
    updateClass: updateClassMutation.mutate,
    deleteClass: deleteClassMutation.mutate,
    isCreating: createClassMutation.isPending,
    isUpdating: updateClassMutation.isPending,
    isDeleting: deleteClassMutation.isPending,
  };
};

export const usePublicClasses = (subdomain?: string) => {
  const { data: classes, isLoading, error } = useQuery({
    queryKey: ['public-classes', subdomain],
    queryFn: async () => {
      if (!subdomain) {
        console.log('usePublicClasses - No subdomain provided');
        return [];
      }
      
      console.log('usePublicClasses - Fetching classes for subdomain:', subdomain);
      
      const { data, error } = await supabase
        .from('classes')
        .select(`
          *,
          instructors!inner(
            id,
            studio_name,
            subdomain,
            bio,
            brand_color,
            profile_image_url
          )
        `)
        .eq('instructors.subdomain', subdomain)
        .eq('is_active', true)
        .gte('start_date', new Date().toISOString().split('T')[0])
        .order('start_date', { ascending: true });
      
      if (error) {
        console.error('usePublicClasses - Error fetching classes:', error);
        throw error;
      }
      
      console.log('usePublicClasses - Fetched classes data:', data);
      return data || [];
    },
    enabled: !!subdomain,
  });

  return {
    classes: classes || [],
    isLoading,
    error,
  };
};
