const CACHE_NAME='lerno-v10-smart-install';
const APP_FILES=['./','./index.html','./manifest.webmanifest','./assets/style.css','./assets/auth.js','./assets/app.js','./assets/lerno-logo-180-v2.png','./assets/lerno-logo-192-v2.png','./assets/lerno-logo-512-v2.png'];
self.addEventListener('install',event=>event.waitUntil(caches.open(CACHE_NAME).then(cache=>cache.addAll(APP_FILES)).then(()=>self.skipWaiting())));
self.addEventListener('activate',event=>event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(key=>key!==CACHE_NAME).map(key=>caches.delete(key)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',event=>{if(event.request.method!=='GET')return;event.respondWith(fetch(event.request).then(response=>{let copy=response.clone();caches.open(CACHE_NAME).then(cache=>cache.put(event.request,copy));return response}).catch(()=>caches.match(event.request).then(cached=>cached||caches.match('./index.html'))))});
