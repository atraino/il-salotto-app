/*
 * Il Salotto service worker.
 *
 * Network first for everything, with the cache kept only as the thing that
 * makes the app work on a plane.
 *
 * It used to serve assets from cache first and refresh them quietly in the
 * background. That is the usual advice, and it cost days here: the site in
 * Safari and the copy installed on the home screen were running the same
 * address and different code, so fixes that plainly worked in the browser
 * appeared to do nothing in the app. Correctness beats the few milliseconds
 * that cache-first was buying.
 */

const CACHE = 'il-salotto-v3'

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

  event.respondWith(
    fetch(request)
      .then((response) => {
        if (response.ok) {
          const copy = response.clone()
          caches.open(CACHE).then((cache) => cache.put(request, copy))
        }
        return response
      })
      .catch(() =>
        caches
          .match(request)
          .then((hit) => hit || (request.mode === 'navigate' ? caches.match('/index.html') : undefined)),
      ),
  )
})
