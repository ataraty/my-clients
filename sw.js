const CACHE_NAME = 'beauty-app-v1';
const ASSETS = [
  'index.html',
  'manifest.json'
];

// Сохраняем файлы приложения в память устройства при установке
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
  self.skipWaiting();
});

// Активируем офлайн-режим
self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

// Насильно выдаем приложение из памяти телефона, если нет интернета
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
