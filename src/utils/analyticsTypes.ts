
import type { InstructorMetrics } from '@/types/analytics';

export const isInstructorMetrics = (data: any): data is InstructorMetrics => {
  return data && 
    typeof data === 'object' && 
    !Array.isArray(data) &&
    'total_revenue' in data && 
    'total_students' in data && 
    'total_classes' in data && 
    'avg_rating' in data && 
    'recurring_students' in data;
};
