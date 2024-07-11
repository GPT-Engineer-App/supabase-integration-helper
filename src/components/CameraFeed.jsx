import React, { useRef, useEffect, useState } from 'react';
import * as cocoSsd from '@tensorflow-models/coco-ssd';
import '@tensorflow/tfjs';
import { createDetection } from '@/integrations/supabase/index.js';

const CameraFeed = () => {
  const videoRef = useRef(null);
  const [model, setModel] = useState(null);
  const [detections, setDetections] = useState([]);

  useEffect(() => {
    const loadModel = async () => {
      const loadedModel = await cocoSsd.load();
      setModel(loadedModel);
    };

    loadModel();
  }, []);

  useEffect(() => {
    const startVideo = async () => {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' },
      });
      videoRef.current.srcObject = stream;
    };

    startVideo();
  }, []);

  useEffect(() => {
    const detectObjects = async () => {
      if (model && videoRef.current) {
        const predictions = await model.detect(videoRef.current);
        setDetections(predictions);
        predictions.forEach(async (prediction) => {
          await createDetection({ object: prediction.class, detected_at: new Date().toISOString() });
        });
      }
    };

    const intervalId = setInterval(detectObjects, 1000);

    return () => clearInterval(intervalId);
  }, [model]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-4xl font-bold mb-4">Camera Feed</h1>
      <video ref={videoRef} autoPlay playsInline muted className="w-full max-w-md" />
      <div className="text-lg space-y-2 mt-4">
        {detections.map((detection, index) => (
          <p key={index}>{detection.class}: {Math.round(detection.score * 100)}%</p>
        ))}
      </div>
    </div>
  );
};

export default CameraFeed;