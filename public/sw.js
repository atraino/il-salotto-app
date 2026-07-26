/*
 * Il Salotto service worker.
 *
 * The page itself is always fetched from the network first, so a deploy is
 * live the moment someone opens the app: no stale version stuck on a phone.
 * Hashed assets (JS, CSS, fonts, icons) are content-addressed and safe to
 * serve from cache. Falling back to cache only happens when the network fails,
 * which is what makes it work on a plane.
 */

const CACHE = 'il-salotto-v1'

self.addEventListener('install', () => {
  self.skipWaiting()
})

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((key) => key !== CACHE).map((key) => caches.delete(key))))
      .then(() => self.clients.claim()),
  )
})

self.addEventListener('fetch', (event) => {
  const { request } = event
  if (request.method !== 'GET') return

  const url = new URL(request.url)
  if (url.origin !== self.location.origin) return

  // The page: network first, cache as a safety net when offline.
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((response) => {
          const copy = response.clone()
          caches.open(CACHE).then((cache) => cache.put(request, copy))
          return response
        })
        .catch(() => caches.match(request).then((hit) => hit || caches.match('/index.html'))),
    )
    return
  }

  // Everything else: serve from cache, refresh it in the background.
  event.respondWith(
    caches.match(request).then((hit) => {
      const fresh = fetch(request)
        .then((response) => {
          if (response.ok) {
            const copy = response.clone()
            caches.open(CACHE).then((cache) => cache.put(request, copy))
          }
          return response
        })
        .catch(() => hit)
      return hit || fresh
    }),
  )
})
