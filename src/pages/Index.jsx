import { useQuery } from '@tanstack/react-query';
import { fetchDetectionsByDateRange } from '@/integrations/supabase/index.js';
import { format, subDays, subMonths } from 'date-fns';
import Loader from '@/components/ui/loader';
import CameraFeed from '@/components/CameraFeed';
import { useEffect, useState } from 'react';
import DetectionCounter from '@/components/DetectionCounter';

const Index = () => {
  const today = new Date();
  const startOfDay = format(today, 'yyyy-MM-dd 00:00:00');
  const endOfDay = format(today, 'yyyy-MM-dd 23:59:59');
  const startOfWeek = format(subDays(today, today.getDay()), 'yyyy-MM-dd 00:00:00');
  const startOfMonth = format(subMonths(today, 1), 'yyyy-MM-dd 00:00:00');

  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const { data: dailyDetections, isLoading: isLoadingDaily, error: errorDaily } = useQuery({
    queryKey: ['dailyDetections'],
    queryFn: () => fetchDetectionsByDateRange(startOfDay, endOfDay),
    enabled: isOnline,
    refetchInterval: 60000, // Refetch data every 60 seconds
  });

  const { data: weeklyDetections, isLoading: isLoadingWeekly, error: errorWeekly } = useQuery({
    queryKey: ['weeklyDetections'],
    queryFn: () => fetchDetectionsByDateRange(startOfWeek, endOfDay),
    enabled: isOnline,
    refetchInterval: 60000, // Refetch data every 60 seconds
  });

  const { data: monthlyDetections, isLoading: isLoadingMonthly, error: errorMonthly } = useQuery({
    queryKey: ['monthlyDetections'],
    queryFn: () => fetchDetectionsByDateRange(startOfMonth, endOfDay),
    enabled: isOnline,
    refetchInterval: 60000, // Refetch data every 60 seconds
  });

  const { data: allTimeDetections, isLoading: isLoadingAllTime, error: errorAllTime } = useQuery({
    queryKey: ['allTimeDetections'],
    queryFn: () => fetchDetectionsByDateRange('1970-01-01', endOfDay), // Corrected query function
    enabled: isOnline,
    refetchInterval: 60000, // Refetch data every 60 seconds
  });

  if (errorDaily || errorWeekly || errorMonthly || errorAllTime) {
    return <div>Error loading data</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 md:p-8 lg:p-12">
      <h1 className="text-2xl md:text-4xl font-bold mb-4">Object Detection Counts</h1>
      <DetectionCounter
        dailyCount={isLoadingDaily ? null : dailyDetections?.length ?? 'N/A'}
        weeklyCount={isLoadingWeekly ? null : weeklyDetections?.length ?? 'N/A'}
        monthlyCount={isLoadingMonthly ? null : monthlyDetections?.length ?? 'N/A'}
        allTimeCount={isLoadingAllTime ? null : allTimeDetections?.length ?? 'N/A'}
      />
      <CameraFeed />
      {!isOnline && <div className="text-red-500 mt-4">You are currently offline. Some features may not be available.</div>}
    </div>
  );
};

export default Index;