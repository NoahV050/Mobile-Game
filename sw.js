const CACHE = 'gymbalance-v1';
const FILES = ['./', './index.html', './manifest.json',
  './css/base.css', './css/screens.css', './css/animations.css',
  './js/ui.js', './js/draw.js', './js/game.js', './js/main.js'];

self.addEventListener('install',  e => e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES))));
self.addEventListener('activate', e => e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k))))));
self.addEventListener('fetch',    e => e.respondWith(caches.match(e.request).then(r => r || fetch(e.request))));
