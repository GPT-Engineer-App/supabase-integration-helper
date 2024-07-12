import React, { useEffect, useState } from 'react';
import { subscribeToDetections } from '@/integrations/supabase/index.js';

const RealTimeUpdates = () => {
  const [newDetections, setNewDetections] = useState([]);

  useEffect(() => {
    const subscription = subscribeToDetections((newDetection) => {
      setNewDetections((prevDetections) => [newDetection, ...prevDetections]);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Real-Time Updates</h2>
      {newDetections.length > 0 ? (
        <ul>
          {newDetections.map((detection, index) => (
            <li key={index} className="mb-2">
              New detection: {detection.object_type} at {new Date(detection.timestamp).toLocaleString()}
            </li>
          ))}
        </ul>
      ) : (
        <p>No new detections</p>
      )}
    </div>
  );
};

export default RealTimeUpdates;