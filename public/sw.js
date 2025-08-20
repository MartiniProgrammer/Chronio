// public/sw.js
// Minimal service worker — genoeg om PWA-install mogelijk te maken.
// # notes: no caching yet; we can add offline later if you want.
self.addEventListener('install', (event) => {
  self.skipWaiting();
});
self.addEventListener('activate', (event) => {
  clients.claim();
});
