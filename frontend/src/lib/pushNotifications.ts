import { deleteDoc, doc, serverTimestamp, setDoc } from 'firebase/firestore';
import { deleteToken, getMessaging, getToken, isSupported } from 'firebase/messaging';
import { db, firebaseApp } from './firebase';

const tokenStorageKey = 'zalatte_fcm_token';
const serviceWorkerUrl = new URL('firebase-messaging-sw.js', document.baseURI).href;

export async function registerAppServiceWorker(): Promise<void> {
  if (!('serviceWorker' in navigator)) return;

  const hadController = Boolean(navigator.serviceWorker.controller);
  let reloading = false;
  navigator.serviceWorker.addEventListener('controllerchange', () => {
    if (!hadController || reloading) return;
    reloading = true;
    window.location.reload();
  });

  const registration = await navigator.serviceWorker.register(serviceWorkerUrl, {
    updateViaCache: 'none',
  });
  await registration.update();
}

export async function enablePushNotifications(userId: string): Promise<void> {
  if (!('Notification' in window) || !(await isSupported())) {
    throw new Error('이 기기에서는 푸시 알림을 지원하지 않습니다.');
  }

  const permission = await Notification.requestPermission();
  if (permission !== 'granted') {
    throw new Error('알림 권한이 허용되지 않았습니다.');
  }

  const registration = await navigator.serviceWorker.register(serviceWorkerUrl);
  const messaging = getMessaging(firebaseApp);
  const token = await getToken(messaging, { serviceWorkerRegistration: registration });
  if (!token) throw new Error('기기 알림 토큰을 만들지 못했습니다.');

  await setDoc(doc(db, 'users', userId, 'devices', token), {
    token,
    enabled: true,
    userAgent: navigator.userAgent,
    updatedAt: serverTimestamp(),
  });
  localStorage.setItem(tokenStorageKey, token);
}

export async function disablePushNotifications(userId: string): Promise<void> {
  const token = localStorage.getItem(tokenStorageKey);
  if (!token) return;
  await deleteDoc(doc(db, 'users', userId, 'devices', token));
  if (await isSupported()) await deleteToken(getMessaging(firebaseApp));
  localStorage.removeItem(tokenStorageKey);
}

export function isPushEnabled(): boolean {
  return Notification.permission === 'granted' && Boolean(localStorage.getItem(tokenStorageKey));
}
