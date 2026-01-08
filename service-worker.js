const CACHE_NAME = 'meal-planner-v1';

// Svi fajlovi koje tvoja aplikacija koristi moraju biti ovdje
const ASSETS = [
	'./',
	'./index.html',
	'./style.css',
	'./recepies.js',
	'./script.js',
	'./manifest.json',
	// Ako imaš ikonice, dodaj i njih ovdje
	'https://cdn-icons-png.flaticon.com/512/3511/3511451.png',
];

// Instalacija Service Workera i keširanje resursa
self.addEventListener('install', (event) => {
	event.waitUntil(
		caches.open(CACHE_NAME).then((cache) => {
			console.log('Caching app assets');
			return cache.addAll(ASSETS);
		})
	);
});

// Strategija: Cache First, fallback to Network
self.addEventListener('fetch', (event) => {
	event.respondWith(
		caches.match(event.request).then((response) => {
			// Vrati iz keša ako postoji, inače traži na mreži
			return response || fetch(event.request);
		})
	);
});

// Aktiviranje i čišćenje starih keševa
self.addEventListener('activate', (event) => {
	event.waitUntil(
		caches.keys().then((cacheNames) => {
			return Promise.all(
				cacheNames.map((cache) => {
					if (cache !== CACHE_NAME) {
						console.log('Clearing old cache');
						return caches.delete(cache);
					}
				})
			);
		})
	);
});
