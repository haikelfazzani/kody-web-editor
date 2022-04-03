/* eslint-disable no-restricted-globals */
import { clientsClaim } from 'workbox-core';
import { precacheAndRoute, createHandlerBoundToURL } from 'workbox-precaching';
import { ExpirationPlugin } from 'workbox-expiration';
import { registerRoute } from 'workbox-routing';
import { StaleWhileRevalidate } from 'workbox-strategies';

clientsClaim();
precacheAndRoute(self.__WB_MANIFEST);
const fileExtensionRegexp = new RegExp('/[^/?]+\\.[^/]+$');
registerRoute(({ request, url }) => {
  if (request.mode !== 'navigate') { return false; }
  if (url.pathname.startsWith('/_')) { return false }
  if (url.pathname.match(fileExtensionRegexp)) { return false; }
  return true;
},
  createHandlerBoundToURL(process.env.PUBLIC_URL + '/index.html')
);

registerRoute(({ url }) => /^.*\.(jpg|gif|jpeg|png|svg)$/gi.test(url.hostname),
  new StaleWhileRevalidate({ cacheName: 'images' })
);

registerRoute(
  ({ url }) => /cloudflare|jsdelivr|unpkg|ace-builds/gi.test(url.hostname)
    && /^.*\.js$/g.test(url.pathname),
  new StaleWhileRevalidate({
    cacheName: 'js-cdn',
    plugins: [
      new ExpirationPlugin({ maxAgeSeconds: 30 * 24 * 60 * 60 }),
    ]
  })
);

registerRoute(
  ({ url }) => /cloudflare|googleapis|unpkg|ace-builds/gi.test(url.hostname)
    && /^.*\.css$/g.test(url.pathname),
  new StaleWhileRevalidate({
    cacheName: 'styles',
    plugins: [
      new ExpirationPlugin({ maxAgeSeconds: 30 * 24 * 60 * 60 }),
    ]
  })
);

registerRoute(
  ({ url }) => /cloudflare|googleapis|fonts.gstatic|ace-builds/gi.test(url.hostname)
    && /woff2/g.test(url.pathname),
  new StaleWhileRevalidate({ cacheName: 'fonts' })
);

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});