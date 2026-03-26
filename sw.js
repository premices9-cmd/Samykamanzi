const CACHE_NAME = "kms-cache-v1";

// On ne garde que les fichiers qui existent réellement dans ton dossier
const urlsToCache = [
  "./",
  "./index.html",
  "./icon.png",
  "./manifest.json"
];

// Installation
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

// Activation (Nettoyage des anciens caches)
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(k => k !== CACHE_NAME)
            .map(k => caches.delete(k))
      )
    )
  );
});

// Fetch (Mode Offline)
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});
