// service-worker.js
self.addEventListener('install', (event) => {
	event.waitUntil(
		caches.open('meal-cache-v1').then((cache) => {
			return cache.addAll([
				'/',
				'/index.html',
				'/styles.css',
				'/script.js',
				'/recepies.js',
			]);
		})
	);
});

self.addEventListener('fetch', (event) => {
	event.respondWith(
		caches.match(event.request).then((resp) => {
			return resp || fetch(event.request);
		})
	);
});
