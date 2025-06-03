
import { useInstructorMetrics } from './useInstructorMetrics';
import { useRevenueTrend } from './useRevenueTrend';
import { useStudentGrowth } from './useStudentGrowth';
import { useClassPerformance } from './useClassPerformance';
import { useRecentBookings } from './useRecentBookings';

export const useAnalytics = () => {
  const { data: metrics, isLoading: metricsLoading } = useInstructorMetrics();
  const { data: revenueTrend, isLoading: revenueTrendLoading } = useRevenueTrend();
  const { data: studentGrowth, isLoading: studentGrowthLoading } = useStudentGrowth();
  const { data: classPerformance, isLoading: classPerformanceLoading } = useClassPerformance();
  const { data: recentBookings, isLoading: recentBookingsLoading } = useRecentBookings();

  return {
    metrics,
    revenueTrend,
    studentGrowth,
    classPerformance,
    recentBookings,
    isLoading: metricsLoading || revenueTrendLoading || studentGrowthLoading || 
               classPerformanceLoading || recentBookingsLoading
  };
};
