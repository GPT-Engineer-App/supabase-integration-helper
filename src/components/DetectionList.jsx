import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchDetections } from '@/integrations/supabase/index.js';
import Loader from '@/components/ui/loader';

const DetectionList = () => {
  const { data: detections, isLoading, error } = useQuery({
    queryKey: ['detections'],
    queryFn: fetchDetections,
  });

  if (isLoading) return <Loader />;
  if (error) return <div>Error loading detections</div>;

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Timestamp</th>
            <th className="py-2 px-4 border-b">Object Type</th>
            <th className="py-2 px-4 border-b">Count</th>
          </tr>
        </thead>
        <tbody>
          {detections.map(detection => (
            <tr key={detection.id}>
              <td className="py-2 px-4 border-b">{new Date(detection.timestamp).toLocaleString()}</td>
              <td className="py-2 px-4 border-b">{detection.object_type}</td>
              <td className="py-2 px-4 border-b">{detection.count}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DetectionList;