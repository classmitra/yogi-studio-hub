
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { ClassInsert, ClassUpdate } from '@/types/class';

export const useClassMutations = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

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
    createClass: createClassMutation.mutate,
    updateClass: updateClassMutation.mutate,
    deleteClass: deleteClassMutation.mutate,
    isCreating: createClassMutation.isPending,
    isUpdating: updateClassMutation.isPending,
    isDeleting: deleteClassMutation.isPending,
  };
};
