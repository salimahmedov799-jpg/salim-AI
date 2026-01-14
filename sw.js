self.addEventListener("install", e => {
  e.waitUntil(
    caches.open("alkhas").then(cache =>
      cache.addAll(["./", "./index.html", "./photo.png"])
    )
  );
});

self.addEventListener("fetch", e => {
  e.respondWith(
    caches.match(e.request).then(r => r || fetch(e.request))
  );
});
