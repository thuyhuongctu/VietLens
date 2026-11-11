/* Service worker tối thiểu cho bản cài đặt (PWA, Google Play).
 * Cài: lưu sẵn vỏ ứng dụng. Chạy: ưu tiên mạng, mất mạng thì lấy bản đã lưu.
 * Đổi KHOA mỗi lần tài sản thay đổi. */
const KHOA = "vietlens-v1";
const VO = [
  "./",
  "./index.html",
  "./styles.css",
  "./css/clay-vietlens-skin.css",
  "./css/bizon-clay-fonts.css",
  "./js/bizon-lang.js",
  "./js/capture-guard.js",
  "./sample-data.js",
  "./official-data.js",
  "./app.js",
  "./official.js",
  "./assets/favicon.svg",
  "./manifest.webmanifest",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
  "./chinh-sach.html"
];
self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(KHOA).then((c) => c.addAll(VO)).then(() => self.skipWaiting()));
});
self.addEventListener("activate", (e) => {
  e.waitUntil(caches.keys().then((ks) => Promise.all(ks.filter((k) => k !== KHOA).map((k) => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener("fetch", (e) => {
  if (e.request.method !== "GET" || new URL(e.request.url).origin !== location.origin) return;
  e.respondWith(
    fetch(e.request).then((r) => { const b = r.clone(); caches.open(KHOA).then((c) => c.put(e.request, b)); return r; })
      .catch(() => caches.match(e.request).then((r) => r || (e.request.mode === "navigate" ? caches.match("./index.html") : undefined)))
  );
});
