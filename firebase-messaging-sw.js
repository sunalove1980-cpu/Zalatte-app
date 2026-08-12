importScripts('https://www.gstatic.com/firebasejs/12.1.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/12.1.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: 'AIzaSyAL7KNxJLzQZzvs5SYk16uv4yqGUYYKPes',
  authDomain: 'zalatte-diary-2026.firebaseapp.com',
  projectId: 'zalatte-diary-2026',
  storageBucket: 'zalatte-diary-2026.firebasestorage.app',
  messagingSenderId: '922458466374',
  appId: '1:922458466374:web:62c89833abd2b7216a4247',
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
