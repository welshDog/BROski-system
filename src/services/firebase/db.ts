import { initializeApp } from 'firebase/app';
import { getFirestore, enableIndexedDbPersistence } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: (import.meta as any).env.VITE_FIREBASE_API_KEY,
  authDomain: (import.meta as any).env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: (import.meta as any).env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: (import.meta as any).env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: (import.meta as any).env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: (import.meta as any).env.VITE_FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);
export const db = /* @__PURE__ */ getFirestore(app);
let authInstance: any = null;
try {
  authInstance = /* @__PURE__ */ getAuth(app);
} catch {}
export const auth = authInstance;

enableIndexedDbPersistence(db).catch((err: any) => {
  if (err?.code === 'failed-precondition') {
    console.warn('Multiple tabs open, persistence disabled');
  }
});
