'use strict';

// Update cache names any time any of the cached files change.
const CACHE_NAME = 'static-cache-v1';

// Add list of files to cache here.
const FILES_TO_CACHE = [
    '/manifest.json',
    '/index.html',
    '/global.css',
    '/favicon.png',
    '/images/icons/icon-32x32.png',
    '/images/icons/icon-128x128.png',
    '/images/icons/icon-144x144.png',
    '/images/icons/icon-152x152.png',
    '/images/icons/icon-192x192.png',
    '/images/icons/icon-256x256.png',
    '/images/icons/icon-512x512.png',
    '/build/bundle.css',
    '/build/bundle.css.map',
    '/build/bundle.js',
    '/build/bundle.js.map',
];
self.addEventListener("install", function (e) {
    e.waitUntil(
        caches.open(CACHE_NAME).then(function (cache) {
            return cache.addAll(FILES_TO_CACHE);
        })
    );
});
self.addEventListener("activate", e => {
    e.waitUntil(
        caches.keys().then(function (cacheNames) {
            return Promise.all(
                cacheNames.map(function (thisCacheName) {
                    if (thisCacheName !== CACHE_NAME) {
                        return caches.delete(thisCacheName);
                    }
                })
            );
        })
    );
});
self.addEventListener("fetch", e => {
    e.respondWith(
        (async function () {
            const r = await caches.match(e.request);
            return r || fetch(e.request, { redirect: 'follow' }).then((response) => {
                return caches.open(CACHE_NAME).then((cache) => {
                    console.log('[Service Worker] Caching new resource: ' + e.request.url);
                    cache.put(e.request, response.clone());
                    return response;
                });
            });
        })()
    );
});

// self.addEventListener('install', (evt) => {
//     console.log('[ServiceWorker] Install');
//     evt.waitUntil(
//         caches.open(CACHE_NAME).then((cache) => {
//             console.log('[ServiceWorker] Pre-caching offline page');
//             return cache.addAll(FILES_TO_CACHE);
//         })
//     );

//     self.skipWaiting();
// });

// self.addEventListener('activate', (evt) => {
//     console.log('[ServiceWorker] Activate');
//     // Remove previous cached data from disk.
//     evt.waitUntil(
//         caches.keys().then((keyList) => {
//             return Promise.all(keyList.map((key) => {
//                 if (key !== CACHE_NAME) {
//                     console.log('[ServiceWorker] Removing old cache', key);
//                     return caches.delete(key);
//                 }
//             }));
//         })
//     );

//     self.clients.claim();
// });

// // self.addEventListener('fetch', (evt) => {
// //     console.log('[ServiceWorker] Fetch', evt.request.url);
// //     if (evt.request.mode !== 'navigate') {
// //         return;
// //     }
// //     evt.respondWith(
// //         fetch(evt.request, { redirect: 'manual' })
// //             .catch(() => {
// //                 return caches.open(CACHE_NAME)
// //                     .then((cache) => {
// //                         return cache.match('index.html');
// //                     });
// //             })
// //     );
// // });

// self.addEventListener('fetch', (evt) => {
//     if (evt.request.mode !== 'navigate') {
//         // Not a page navigation, bail.
//         return;
//     }
//     evt.respondWith(
//         caches.match(evt.request).then((r) => {
//             console.log('[Service Worker] Fetching resource: ' + evt.request.url);
//             return r || fetch(evt.request, { redirect: 'manual' }).then((response) => {
//                 return caches.open(CACHE_NAME).then((cache) => {
//                     console.log('[Service Worker] Caching new resource: ' + evt.request.url);
//                     cache.put(evt.request, response.clone());
//                     return response;
//                 });
//             });
//         })
//     );
// });