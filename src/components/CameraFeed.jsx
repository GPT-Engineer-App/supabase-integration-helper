import React, { useRef, useEffect, useState } from 'react';
import ReactWebcam from 'react-webcam';
import * as cocoSsd from '@tensorflow-models/coco-ssd';
import '@tensorflow/tfjs';
import { createDetection } from '@/integrations/supabase/index.js';

const CameraFeed = () => {
  const webcamRef = useRef(null);
  const [model, setModel] = useState(null);
  const [detections, setDetections] = useState([]);
  const [detectionInterval, setDetectionInterval] = useState(500); // Default interval set to 500ms

  useEffect(() => {
    const loadModel = async () => {
      const loadedModel = await cocoSsd.load();
      setModel(loadedModel);
    };

    loadModel();
  }, []);

  useEffect(() => {
    const detectObjects = async () => {
      if (model && webcamRef.current && webcamRef.current.video.readyState === 4) {
        const video = webcamRef.current.video;
        const predictions = await model.detect(video);
        setDetections(predictions);
        predictions.forEach(async (prediction) => {
          await saveDetectionOffline({ object: prediction.class, detected_at: new Date().toISOString() });
        });
      }
    };

    const intervalId = setInterval(detectObjects, detectionInterval);

    return () => clearInterval(intervalId);
  }, [model, detectionInterval]);

  const saveDetectionOffline = async (detection) => {
    if (navigator.onLine) {
      await createDetection(detection);
    } else {
      const request = indexedDB.open('detectionsDB', 1);
      request.onupgradeneeded = event => {
        const db = event.target.result;
        db.createObjectStore('detections', { autoIncrement: true });
      };
      request.onsuccess = event => {
        const db = event.target.result;
        const transaction = db.transaction(['detections'], 'readwrite');
        const store = transaction.objectStore('detections');
        store.add(detection);
      };
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 md:p-8 lg:p-12">
      <h1 className="text-2xl md:text-4xl font-bold mb-4">Camera Feed</h1>
      <ReactWebcam
        ref={webcamRef}
        audio={false}
        screenshotFormat="image/jpeg"
        className="w-full max-w-md"
      />
      <div className="text-base md:text-lg space-y-2 mt-4">
        {detections.map((detection, index) => (
          <p key={index}>{detection.class}: {Math.round(detection.score * 100)}%</p>
        ))}
      </div>
    </div>
  );
};

export default CameraFeed;