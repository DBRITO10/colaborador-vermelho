const CACHE_NAME = "assistencia-ms-v7"; // Mudei a versão para forçar atualização
const urlsToCache = [
  "./",
  "./pagina.html",
  "./estoque.html",
  "./produtos.html",
  "./index.html",
  "./first_login.html",
  "./manifest.json",
  "./icon-192.jpg",
  "./icon-512.jpg",
  "./favicon.ico.jpg"
];

// Instalação
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache))
  );
  self.skipWaiting();
});

// Ativação e limpeza de cache antigo
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// Busca de arquivos (Fetch)
self.addEventListener("fetch", (event) => {
  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request))
  );
});
