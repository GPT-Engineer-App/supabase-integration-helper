import React from 'react';
import DetectionList from '@/components/DetectionList';
import DetectionFilter from '@/components/DetectionFilter';
import RealTimeUpdates from '@/components/RealTimeUpdates';

const DetectionsPage = () => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Detections</h1>
      <DetectionFilter />
      <DetectionList />
      <RealTimeUpdates />
    </div>
  );
};

export default DetectionsPage;