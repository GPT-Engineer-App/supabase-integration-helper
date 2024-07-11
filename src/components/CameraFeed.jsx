import React, { useRef, useEffect, useState } from 'react';
import * as cocoSsd from '@tensorflow-models/coco-ssd';
import '@tensorflow/tfjs';
import '@tensorflow/tfjs-backend-webgl';
import * as tf from '@tensorflow/tfjs'; // Import TensorFlow.js
import { createDetection } from '@/integrations/supabase/index.js';

const CameraFeed = () => {
  const videoRef = useRef(null);
  const [model, setModel] = useState(null);
  const [detections, setDetections] = useState([]);
  const [detectionInterval, setDetectionInterval] = useState(500); // Default interval set to 500ms

  useEffect(() => {
    const loadModel = async () => {
      await tf.setBackend('webgl'); // Use WebGL backend for better performance
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
      <video ref={videoRef} autoPlay playsInline muted className="w-full max-w-md" />
      <div className="text-base md:text-lg space-y-2 mt-4">
        {detections.map((detection, index) => (
          <p key={index}>{detection.class}: {Math.round(detection.score * 100)}%</p>
        ))}
      </div>
    </div>
  );
};

export default CameraFeed;