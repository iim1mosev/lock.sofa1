// Service Worker: بيستقبل الإشعار حتى لو الموقع مقفول
self.addEventListener("push", e => {
  const d = e.data ? e.data.json() : {};
  e.waitUntil(self.registration.showNotification(d.title || "💌", {
    body: d.body || "",
    icon: new URL("cover.png", self.registration.scope).href,
    tag: d.tag || "msg",
    renotify: true,
    dir: "rtl",
    lang: "ar",
    data: { url: self.registration.scope }
  }));
});

self.addEventListener("notificationclick", e => {
  e.notification.close();
  e.waitUntil(clients.matchAll({ type: "window", includeUncontrolled: true }).then(list => {
    for (const c of list) if ("focus" in c) return c.focus();
    return clients.openWindow(e.notification.data.url);
  }));
});
