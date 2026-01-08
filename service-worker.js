const CACHE_NAME = 'meal-planner-v3'; // Nova verzija za persistence

const ASSETS = [
	'./',
	'./index.html',
	'./style.css',
	'./recepies.js',
	'./script.js',
	'./manifest.json',
	'./icons/icon-192.png',
	'./icons/icon-512.png',
];

self.addEventListener('install', (event) => {
	event.waitUntil(
		caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
	);
});

self.addEventListener('fetch', (event) => {
	event.respondWith(
		caches.match(event.request).then((response) => {
			return response || fetch(event.request);
		})
	);
});

self.addEventListener('activate', (event) => {
	event.waitUntil(
		caches.keys().then((cacheNames) => {
			return Promise.all(
				cacheNames.map((cache) => {
					if (cache !== CACHE_NAME) {
						return caches.delete(cache);
					}
				})
			);
		})
	);
});
