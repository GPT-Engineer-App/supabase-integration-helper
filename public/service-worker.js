const CACHE_NAME = 'pwa-cache-v2';
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  '/favicon.ico',
  '/icons/icon-192x192.png',
  '/icons/icon-512x512.png'
];

// Install event - caching static assets
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

// Fetch event - caching dynamic content
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response;
        }
        return fetch(event.request).then(
          response => {
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }
            const responseToCache = response.clone();
            caches.open(CACHE_NAME)
              .then(cache => {
                cache.put(event.request, responseToCache);
              });
            return response;
          }
        );
      })
  );
});

// Activate event - cleaning up old caches
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Sync event - handling background sync
self.addEventListener('sync', event => {
  if (event.tag === 'sync-detections') {
    event.waitUntil(syncDetections());
  }
});

async function syncDetections() {
  const detections = await getOfflineDetections();
  for (const detection of detections) {
    await createDetection(detection);
  }
  clearOfflineDetections();
}

async function getOfflineDetections() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('detectionsDB', 1);
    request.onsuccess = event => {
      const db = event.target.result;
      const transaction = db.transaction(['detections'], 'readonly');
      const store = transaction.objectStore('detections');
      const getAllRequest = store.getAll();
      getAllRequest.onsuccess = () => {
        resolve(getAllRequest.result);
      };
      getAllRequest.onerror = () => {
        reject(getAllRequest.error);
      };
    };
    request.onerror = () => {
      reject(request.error);
    };
  });
}

async function clearOfflineDetections() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('detectionsDB', 1);
    request.onsuccess = event => {
      const db = event.target.result;
      const transaction = db.transaction(['detections'], 'readwrite');
      const store = transaction.objectStore('detections');
      const clearRequest = store.clear();
      clearRequest.onsuccess = () => {
        resolve();
      };
      clearRequest.onerror = () => {
        reject(clearRequest.error);
      };
    };
    request.onerror = () => {
      reject(request.error);
    };
  });
}