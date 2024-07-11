import { useQuery } from '@tanstack/react-query';
import { fetchDetectionsByDateRange } from '@/integrations/supabase/index.js';
import { format, subDays, subMonths } from 'date-fns';
import Loader from '@/components/ui/loader';
import CameraFeed from '@/components/CameraFeed';

const Index = () => {
  const today = new Date();
  const startOfDay = format(today, 'yyyy-MM-dd 00:00:00');
  const endOfDay = format(today, 'yyyy-MM-dd 23:59:59');
  const startOfWeek = format(subDays(today, today.getDay()), 'yyyy-MM-dd 00:00:00');
  const startOfMonth = format(subMonths(today, 1), 'yyyy-MM-dd 00:00:00');

  const { data: dailyDetections, isLoading: isLoadingDaily, error: errorDaily } = useQuery({
    queryKey: ['dailyDetections'],
    queryFn: () => fetchDetectionsByDateRange(startOfDay, endOfDay),
  });

  const { data: weeklyDetections, isLoading: isLoadingWeekly, error: errorWeekly } = useQuery({
    queryKey: ['weeklyDetections'],
    queryFn: () => fetchDetectionsByDateRange(startOfWeek, endOfDay),
  });

  const { data: monthlyDetections, isLoading: isLoadingMonthly, error: errorMonthly } = useQuery({
    queryKey: ['monthlyDetections'],
    queryFn: () => fetchDetectionsByDateRange(startOfMonth, endOfDay),
  });

  const { data: allTimeDetections, isLoading: isLoadingAllTime, error: errorAllTime } = useQuery({
    queryKey: ['allTimeDetections'],
    queryFn: fetchDetectionsByDateRange,
  });

  if (errorDaily || errorWeekly || errorMonthly || errorAllTime) {
    return <div>Error loading data</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 md:p-8 lg:p-12">
      <h1 className="text-2xl md:text-4xl font-bold mb-4">Object Detection Counts</h1>
      <div className="text-base md:text-lg space-y-2">
        <p>Daily Count: {isLoadingDaily ? <Loader /> : dailyDetections?.length ?? 'N/A'}</p>
        <p>Weekly Count: {isLoadingWeekly ? <Loader /> : weeklyDetections?.length ?? 'N/A'}</p>
        <p>Monthly Count: {isLoadingMonthly ? <Loader /> : monthlyDetections?.length ?? 'N/A'}</p>
        <p>All-Time Count: {isLoadingAllTime ? <Loader /> : allTimeDetections?.length ?? 'N/A'}</p>
      </div>
      <CameraFeed />
      {!navigator.onLine && <div className="text-red-500 mt-4">You are currently offline. Some features may not be available.</div>}
    </div>
  );
};

export default Index;