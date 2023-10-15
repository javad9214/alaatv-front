/* eslint-env serviceworker */

/*
 * This file (which will be your service worker)
 * is picked up by the build system ONLY if
 * quasar.config.js > pwa > workboxMode is set to "injectManifest"
 */

import { clientsClaim } from 'workbox-core'
import { precacheAndRoute, cleanupOutdatedCaches, createHandlerBoundToURL } from 'workbox-precaching'
import { registerRoute, NavigationRoute } from 'workbox-routing'
import { StaleWhileRevalidate, CacheFirst } from 'workbox-strategies'

self.skipWaiting()
clientsClaim()

// These will be placeholders that we'll replace during the build process
const ASSET_SERVE = '__ASSET_SERVE__'
const NODES_SERVER_URL_SSL = '__NODES_SERVER_URL_SSL__'
const MODE = '__MODE__'
const PROD = '__PROD__'
const PWA_FALLBACK_HTML = '__PWA_FALLBACK_HTML__'

// Extract the origin from NODES_SERVER_URL_SSL
const ASSET_ORIGIN = new URL(NODES_SERVER_URL_SSL).origin

// Limit the number of resources prefetched by the service worker
const MAX_PREFETCH = 200
const limitedResources = self.__WB_MANIFEST.slice(0, MAX_PREFETCH)

if (ASSET_SERVE === 'remote') {
  const prefix = NODES_SERVER_URL_SSL
  const adjustedManifest = limitedResources.map(entry => {
    return { ...entry, url: `${prefix}${entry.url}` }
  })
  precacheAndRoute(adjustedManifest)
} else {
  precacheAndRoute(limitedResources)
}

cleanupOutdatedCaches()

// Strategy to serve stale content while revalidating in the background
registerRoute(
  ({ request }) => request.destination === 'script' || request.destination === 'style',
  new StaleWhileRevalidate()
)

// Use Cache First, then Network strategy for assets
// If the asset isn't in the cache, it will be fetched from the network and then cached for future use
registerRoute(
  ({ url }) => url.origin === ASSET_ORIGIN,
  new CacheFirst({
    cacheName: 'alaatv-assets',
    plugins: [
      {
        fetchDidFail: async ({ originalRequest }) => {
          // This callback is triggered whenever a network request fails, e.g. due to a NetworkError
          // Here, we're ensuring that the asset is fetched from the network and cached for future use
          const cache = await caches.open('alaatv-assets')
          const response = await fetch(originalRequest)
          if (response && response.status === 200) {
            await cache.put(originalRequest, response.clone())
          }
          return response
        }
      }
    ]
  })
)

// Add delay to service worker requests to give browser requests higher priority
const NETWORK_REQUEST_DELAY = 200 // 200ms delay

self.addEventListener('fetch', (event) => {
  if (event.request.url.startsWith(ASSET_ORIGIN)) {
    event.respondWith(
      new Promise((resolve) => {
        setTimeout(async () => {
          const response = await fetch(event.request)
          resolve(response)
        }, NETWORK_REQUEST_DELAY)
      })
    )
  }
})

// Non-SSR fallback to index.html
// Production SSR fallback to offline.html (except for dev)
if (MODE !== 'ssr' || PROD) {
  registerRoute(
    new NavigationRoute(
      createHandlerBoundToURL(PWA_FALLBACK_HTML),
      { denylist: [/sw\.js$/, /workbox-(.)*\.js$/] }
    )
  )
}
