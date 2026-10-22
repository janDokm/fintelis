// Firebase init. Values come from .env (VITE_FIREBASE_*), with your project's web config as the fallback.
// The web apiKey is not a secret: access is protected by Auth + firestore.rules, so deploy those rules.
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const env = import.meta.env;

const firebaseConfig = {
  apiKey: env.VITE_FIREBASE_API_KEY ?? 'AIzaSyCBB3xi_N7l9F51XpeYwgARxjeUT5L5YXU',
  authDomain: env.VITE_FIREBASE_AUTH_DOMAIN ?? 'fintelis-6fed1.firebaseapp.com',
  projectId: env.VITE_FIREBASE_PROJECT_ID ?? 'fintelis-6fed1',
  storageBucket: env.VITE_FIREBASE_STORAGE_BUCKET ?? 'fintelis-6fed1.firebasestorage.app',
  messagingSenderId: env.VITE_FIREBASE_MESSAGING_SENDER_ID ?? '191684349152',
  appId: env.VITE_FIREBASE_APP_ID ?? '1:191684349152:web:fe7a3916aedc428407d485',
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
