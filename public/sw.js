var staticCacheName = 'chatter-static-v1';

// self.addEventListener('install', function (event) {
//   event.waitUntil(
//     caches.open(staticCacheName).then(cache => {
//       return cache.addAll(filesToCache);
//     })
//   );
// });

self.addEventListener('fetch', function (event) {
  var requestUrl = new URL(event.request.url);
  console.log(requestUrl.pathname);
  if (requestUrl.pathname.endsWith('.png')) {
    event.respondWith(serveImages(event.request, requestUrl));
    return;
  }
  event.respondWith(
    fetch(event.request).then(response => {
      if (response.status === 404) {
        return new Response('<h1>You are not connected to the internet</h1>', {
          headers: {
            'Content-Type': 'text/html'
          }
        });
      }
      return response;
    }).catch(err => {
      return new Response('<h1>You are not connected to the internet</h1>', {
        headers: {
          'Content-Type': 'text/html'
        }
      });
    })
  );
  // var url = new URL(event.request.url);
  // caches.open(staticCacheName).then(cache => {
  //   cache.match(event.request).then(response => {
  //     if (response) {
  //       console.log('response found!');
  //       return response;
  //     }
  //     fetch(event.request).then(response => {
  //       if (response.status === 404) {
  //         return new Response("Whoops! Not found!");
  //       }
  //       if (url.pathname.endsWith('.js')) {
  //         cache.put(url.pathname, response.clone());
  //       }
  //       return response;
  //     });
  //   });
  // })
});

self.addEventListener('activate', function (event) {
  event.waitUntil(
    caches.keys().then(function (cacheNames) {
      return Promise.all(
        cacheNames.filter(function (cacheName) {
          return cacheName.startsWith('chatter-') &&
            cacheName !== staticCacheName;
        }).map(function (cacheName) {
          return caches.delete(cacheName);
        })
      );
    })
  );
});

function serveImages(request, requestUrl) {
  return caches.open(staticCacheName).then(cache => {
    return cache.match(requestUrl.pathname).then(response => {
      var networkFetch = fetch(request).then(networkResponse => {
        cache.put(requestUrl.pathname, networkResponse.clone());
        return networkResponse;
      });
      return response || networkFetch;
    });
  });
}