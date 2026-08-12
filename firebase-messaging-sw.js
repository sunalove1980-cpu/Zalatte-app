importScripts('https://www.gstatic.com/firebasejs/12.1.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/12.1.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: 'AIzaSyCfHwfe9cE2lFRT2tTiQL6tUoi0JwWkuzc',
  authDomain: 'versatile-media-mxhgq.firebaseapp.com',
  projectId: 'versatile-media-mxhgq',
  storageBucket: 'versatile-media-mxhgq.firebasestorage.app',
  messagingSenderId: '726003942285',
  appId: '1:726003942285:web:87c9257c6df01cf437b3c4',
});

self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (event) => event.waitUntil(clients.claim()));

firebase.messaging().onBackgroundMessage((payload) => {
  const appUrl = self.registration.scope;
  const logoUrl = new URL('assets/logo.svg', appUrl).href;
  const title = payload.data?.title || '자라떼';
  self.registration.showNotification(title, {
    body: payload.data?.body || '새로운 소식이 있어요.',
    icon: logoUrl,
    badge: logoUrl,
    data: payload.data || {},
  });
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(clients.matchAll({ type: 'window', includeUncontrolled: true }).then((windows) => {
    if (windows.length) return windows[0].focus();
    return clients.openWindow(self.registration.scope);
  }));
});
