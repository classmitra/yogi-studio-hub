
import { useInstructorClasses } from './useInstructorClasses';
import { useClassMutations } from './useClassMutations';

export const useClasses = (instructorId?: string) => {
  const { classes, isLoading } = useInstructorClasses(instructorId);
  const mutations = useClassMutations();

  return {
    classes,
    isLoading,
    ...mutations,
  };
};

export { usePublicClasses } from './usePublicClasses';
