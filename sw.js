const version = 'v0.1.2';
// sw.js
self.addEventListener('install', function(event) {
  self.skipWaiting();
});

self.addEventListener('activate', function(event) {
  self.clients.claim();
  self.clients.matchAll().then(clients => {
    clients.forEach(client => client.navigate(client.url))
  });
});