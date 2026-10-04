import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { initializeFirestore } from 'firebase/firestore';

// Standard Firebase Configuration.
// Users can replace these values with their own Firebase project credentials.
const firebaseConfig = {
  apiKey: "AIzaSyAL7KNxJLzQZzvs5SYk16uv4yqGUYYKPes",
  authDomain: "zalatte-diary-2026.firebaseapp.com",
  projectId: "zalatte-diary-2026",
  storageBucket: "zalatte-diary-2026.firebasestorage.app",
  messagingSenderId: "922458466374",
  appId: "1:922458466374:web:62c89833abd2b7216a4247"
};

const databaseId = "(default)";

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
export const firebaseApp = app;

// Initialize Auth
export const auth = getAuth(app);

// Initialize Firestore (with the custom databaseId provided by the platform, falling back to default)
export const db = initializeFirestore(app, {}, databaseId || '(default)');

export default app;
