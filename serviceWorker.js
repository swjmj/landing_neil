const staticAngeloPage = "dev-angelo-site-v1";
const assets = [
  "/",
  "/index.html",
  "/css/style.css",
  "/css/queries.css",
  "/js/pagination.js",
  "IMG/planeta.svg",
  "/IMG/sun.svg",
  "/IMG/earth.svg",
  "/IMG/saturn.svg",
  "/IMG/meteorShower.png",
  "/IMG/line.svg",
  "/IMG/sunrise.jpg",
  "/IMG/andromeda.jpg",
  "/IMG/stars.jpg",
  "/IMG/background.png",
];

self.addEventListener("install", (installEvent) => {
  installEvent.waitUntil(
    caches.open(staticAngeloPage).then((cache) => {
      return cache.addAll(assets);
    })
  );
});

self.addEventListener("fetch", (fetchEvent) => {
  fetchEvent.respondWith(
    caches.match(fetchEvent.request).then((res) => {
      return res || fetch(fetchEvent.request);
    })
  );
});
