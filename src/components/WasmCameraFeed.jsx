import React, { useEffect, useRef } from 'react';

const WasmCameraFeed = () => {
  const videoRef = useRef(null);

  useEffect(() => {
    const startCamera = async () => {
      const { Camera } = await import('../wasm/camera_lib');
      const camera = new Camera('videoElement');
      camera.start();
    };

    startCamera();

    return () => {
      const stopCamera = async () => {
        const { Camera } = await import('../wasm/camera_lib');
        const camera = new Camera('videoElement');
        camera.stop();
      };

      stopCamera();
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 md:p-8 lg:p-12">
      <h1 className="text-2xl md:text-4xl font-bold mb-4">Camera Feed</h1>
      <video
        id="videoElement"
        ref={videoRef}
        className="w-full max-w-md"
        autoPlay
        playsInline
        muted
      />
    </div>
  );
};

export default WasmCameraFeed;