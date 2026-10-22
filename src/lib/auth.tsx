// Auth + user profile.
// Database: Firestore collection `users`, one document per person, DOCUMENT ID = lowercase email (the primary key).
// Password is NOT stored in Firestore: Firebase Authentication keeps it (hashed). Never save plaintext passwords in a database.
import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import {
  User,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut as fbSignOut,
  updateProfile,
} from 'firebase/auth';
import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore';
import { auth, db } from './firebase';

export type Profile = {
  email: string;            // primary key (also the document id)
  displayName: string;
  nricPassport: string;     // NRIC or passport number
  internshipStart: string;  // YYYY-MM-DD
  internshipEnd: string;    // YYYY-MM-DD
  focusResidence: string;
};

export type SignUpInput = Omit<Profile, 'email'> & { email: string; password: string };

export const emailKey = (email: string) => email.trim().toLowerCase();

type Ctx = {
  user: User | null;
  profile: Profile | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (input: SignUpInput) => Promise<void>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
};

const AuthCtx = createContext<Ctx | null>(null);

export function useAuth() {
  const c = useContext(AuthCtx);
  if (!c) throw new Error('useAuth must be used inside <AuthProvider>');
  return c;
}

// Turn Firebase error codes into messages a person can act on.
export function authMessage(err: unknown): string {
  const code = (err as { code?: string })?.code ?? '';
  switch (code) {
    case 'auth/invalid-credential':
    case 'auth/wrong-password':
    case 'auth/user-not-found':
      return 'Email or password is incorrect.';
    case 'auth/invalid-email': return 'That email address isn’t valid.';
    case 'auth/email-already-in-use': return 'An account with this email already exists. Try signing in.';
    case 'auth/weak-password': return 'Password is too weak. Use at least 8 characters.';
    case 'auth/too-many-requests': return 'Too many attempts. Wait a moment and try again.';
    case 'auth/network-request-failed': return 'Network error. Check your connection and try again.';
    case 'auth/operation-not-allowed': return 'Email/password sign-in is not enabled in the Firebase console yet.';
    case 'permission-denied': return 'Your account was created but the profile could not be saved (check Firestore rules).';
    default: return 'Something went wrong. Please try again.';
  }
}

async function loadProfile(email: string): Promise<Profile | null> {
  try {
    const snap = await getDoc(doc(db, 'users', emailKey(email)));
    return snap.exists() ? (snap.data() as Profile) : null;
  } catch {
    return null;
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => onAuthStateChanged(auth, async (u) => {
    setUser(u);
    if (u?.email) {
      const p = await loadProfile(u.email);
      // During sign-up the profile doc is written just after the account exists; don't wipe the one signUp() already set.
      setProfile((prev) => p ?? (prev && prev.email === emailKey(u.email!) ? prev : null));
    } else {
      setProfile(null);
    }
    setLoading(false);
  }), []);

  const signIn = useCallback(async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email.trim(), password);
  }, []);

  const signUp = useCallback(async (input: SignUpInput) => {
    const email = emailKey(input.email);
    const cred = await createUserWithEmailAndPassword(auth, email, input.password);
    await updateProfile(cred.user, { displayName: input.displayName.trim() });
    const data: Profile = {
      email,
      displayName: input.displayName.trim(),
      nricPassport: input.nricPassport.trim().toUpperCase(),
      internshipStart: input.internshipStart,
      internshipEnd: input.internshipEnd,
      focusResidence: input.focusResidence.trim(),
    };
    await setDoc(doc(db, 'users', email), { ...data, createdAt: serverTimestamp() });
    setProfile(data);
  }, []);

  const signOut = useCallback(async () => { await fbSignOut(auth); }, []);
  const resetPassword = useCallback(async (email: string) => { await sendPasswordResetEmail(auth, email.trim()); }, []);

  const value = useMemo(() => ({ user, profile, loading, signIn, signUp, signOut, resetPassword }), [user, profile, loading, signIn, signUp, signOut, resetPassword]);
  return <AuthCtx.Provider value={value}>{children}</AuthCtx.Provider>;
}
