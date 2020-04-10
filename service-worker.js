const cacheName = 'cache-v2';
const precacheResources = [
  '/',
  'index.html',
  'css/master.css',
  'scripts/main.js',
  'scripts/validate.js'
];

self.addEventListener('install', event => {
  console.log('Service worker install event!');
  event.waitUntil(
    caches.open(cacheName)
      .then(cache => {
        return cache.addAll(precacheResources);
      })
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  console.log('Activating new service worker...');

  const cacheWhitelist = [cacheName];

  event.waitUntil(
    caches.keys().then(
      cacheNames => {
        return Promise.all(
          cacheNames.map(
            cache => {
              if (cacheWhitelist.indexOf(cache) === -1){
                return caches.delete(cache);
              }
            })
        );
      })
  );

  self.clients.claim();
});

self.addEventListener('fetch', event => {
  console.log('Fetch intercepted for: ', event.request.url);
  event.respondWith(caches.match(event.request, {'ignoreSearch': true})
    .then(cachedResponse => {
      if (cachedResponse){
        return cachedResponse;
      }
      return fetch(event.request)
               .then( response => {
                 return caches.open(cacheName)
                        .then(cache => {
                          cache.put(event.request.url, response.clone());
                          return response;
                        });
                    });
    })
  );
});
