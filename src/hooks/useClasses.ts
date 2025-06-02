
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Tables, TablesInsert, TablesUpdate } from '@/integrations/supabase/types';
import { useToast } from '@/hooks/use-toast';

type Class = Tables<'classes'>;
type ClassInsert = TablesInsert<'classes'>;
type ClassUpdate = TablesUpdate<'classes'>;

export const useClasses = (instructorId?: string) => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { data: classes, isLoading } = useQuery({
    queryKey: ['classes', instructorId],
    queryFn: async () => {
      console.log('useClasses - Fetching classes for instructor:', instructorId);
      
      if (!instructorId) {
        console.log('useClasses - No instructor ID provided');
        return [];
      }

      let query = supabase
        .from('classes')
        .select('*')
        .eq('instructor_id', instructorId)
        .eq('is_active', true);
      
      const { data, error } = await query.order('start_date', { ascending: true });
      
      if (error) {
        console.error('useClasses - Error fetching classes:', error);
        throw error;
      }
      
      console.log('useClasses - Fetched classes:', data);
      return data || [];
    },
    enabled: !!instructorId,
  });

  const createClassMutation = useMutation({
    mutationFn: async (data: ClassInsert) => {
      console.log('Creating class with data:', data);
      
      const { data: newClass, error } = await supabase
        .from('classes')
        .insert(data)
        .select()
        .single();

      if (error) {
        console.error('Error creating class:', error);
        throw error;
      }
      
      console.log('Class created successfully:', newClass);
      return newClass;
    },
    onSuccess: (newClass) => {
      console.log('Class creation success, invalidating queries');
      queryClient.invalidateQueries({ queryKey: ['classes'] });
      queryClient.invalidateQueries({ queryKey: ['public-classes'] });
      
      toast({
        title: "Class Created",
        description: `${newClass.title} has been successfully created.`,
      });
    },
    onError: (error) => {
      console.error('Class creation error:', error);
      toast({
        title: "Error",
        description: "Failed to create class. Please try again.",
        variant: "destructive",
      });
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
      queryClient.invalidateQueries({ queryKey: ['public-classes'] });
      
      toast({
        title: "Class Updated",
        description: "Class has been successfully updated.",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to update class. Please try again.",
        variant: "destructive",
      });
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
      queryClient.invalidateQueries({ queryKey: ['public-classes'] });
      
      toast({
        title: "Class Deleted",
        description: "Class has been successfully deleted.",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to delete class. Please try again.",
        variant: "destructive",
      });
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
