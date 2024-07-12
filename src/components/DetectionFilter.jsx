import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchDetectionsByDateRange } from '@/integrations/supabase/index.js';
import Loader from '@/components/ui/loader';

const DetectionFilter = () => {
  const [objectType, setObjectType] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const { data: detections, isLoading, error } = useQuery({
    queryKey: ['filteredDetections', { objectType, startDate, endDate }],
    queryFn: () => fetchDetectionsByDateRange(startDate, endDate),
    enabled: !!startDate && !!endDate,
  });

  const handleFilter = () => {
    // Trigger the query with the new filters
  };

  if (isLoading) return <Loader />;
  if (error) return <div>Error loading detections</div>;

  return (
    <div>
      <div className="mb-4">
        <label className="block mb-2">Object Type</label>
        <input
          type="text"
          value={objectType}
          onChange={(e) => setObjectType(e.target.value)}
          className="border p-2 w-full"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2">Start Date</label>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="border p-2 w-full"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2">End Date</label>
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="border p-2 w-full"
        />
      </div>
      <button onClick={handleFilter} className="bg-blue-500 text-white p-2 rounded">Filter</button>
      {detections && (
        <div className="overflow-x-auto mt-4">
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
      )}
    </div>
  );
};

export default DetectionFilter;