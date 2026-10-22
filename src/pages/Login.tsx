// Replace: src/pages/Login.tsx
// Real Firebase email/password sign-in. Email is the user's key; the profile lives in Firestore users/{email}.
import React, { useState } from 'react';
import { ArrowLeft, Eye, EyeOff, Loader2 } from 'lucide-react';
import { Magnetic } from '../components/Magnetic';
import { TextScramble } from '../components/TextScramble';
import { Mark } from '../components/Backdrop';
import { authMessage, useAuth } from '../lib/auth';

export const inputCls = 'h-12 w-full rounded-[14px] border border-white/10 bg-brand-dark/50 px-4 text-[15px] font-light outline-none transition-all placeholder:text-brand-light/25 focus:border-brand-emerald/50 focus:shadow-[0_0_22px_rgba(0,223,130,0.12)]';

export function Login({ backHref = '#/', homeHref = '#/home', signupHref = '#/signup' }: { backHref?: string; homeHref?: string; signupHref?: string }) {
  const { signIn, resetPassword } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [show, setShow] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [note, setNote] = useState('');

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(''); setNote('');
    if (!email.trim() || !password) { setError('Enter your email and password.'); return; }
    setBusy(true);
    try {
      await signIn(email, password);
      window.location.hash = homeHref;
    } catch (err) {
      setError(authMessage(err));
    } finally {
      setBusy(false);
    }
  };

  const forgot = async () => {
    setError(''); setNote('');
    if (!email.trim()) { setNote('Type your email above first, then tap “Forgot password?”.'); return; }
    try {
      await resetPassword(email);
      setNote('If that email has an account, a reset link is on its way.');
    } catch (err) {
      setError(authMessage(err));
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 py-10">
      <form
        noValidate
        onSubmit={submit}
        className="w-full max-w-[400px] rounded-[28px] border border-white/[0.07] bg-brand-slate/45 px-8 pb-7 pt-9 shadow-[0_30px_120px_rgba(0,0,0,0.55),0_0_80px_rgba(0,223,130,0.05)] backdrop-blur-2xl max-sm:px-5"
      >
        <Mark size={44} />
        <h2 className="mb-1.5 mt-5 text-[32px] font-medium">Sign in</h2>
        <p className="mb-7 text-[15px] font-light leading-normal text-brand-light/55">Welcome back. Enter your details to continue.</p>

        <label className="mb-3 block"><span className="mb-1.5 ml-0.5 block text-xs text-brand-light/50">Email</span>
          <input name="email" type="email" autoComplete="email" placeholder="name@email.com" autoFocus className={inputCls} value={email} onChange={(e) => setEmail(e.target.value)} /></label>
        <label className="mb-3 block"><span className="mb-1.5 ml-0.5 block text-xs text-brand-light/50">Password</span>
          <span className="relative block">
            <input name="password" type={show ? 'text' : 'password'} autoComplete="current-password" placeholder="Your password" className={`${inputCls} pr-12`} value={password} onChange={(e) => setPassword(e.target.value)} />
            <button type="button" onClick={() => setShow((s) => !s)} aria-label={show ? 'Hide password' : 'Show password'} className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-brand-light/40 transition-colors hover:text-brand-emerald">
              {show ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </span></label>
        <div className="-mt-0.5 mb-5 text-right"><button type="button" onClick={forgot} className="text-xs text-brand-light/45 transition-colors hover:text-brand-emerald">Forgot password?</button></div>

        <Magnetic wrapperClass="block">
          <button type="submit" disabled={busy} className="flex h-12 w-full items-center justify-center gap-2 rounded-full border border-brand-emerald/30 bg-brand-emerald/10 text-xs font-medium uppercase tracking-[0.2em] text-brand-emerald shadow-[0_0_20px_rgba(0,223,130,0.1)] transition-all duration-300 hover:bg-brand-emerald hover:text-brand-dark hover:shadow-[0_0_30px_rgba(0,223,130,0.35)] disabled:opacity-60">
            {busy ? <><Loader2 size={14} className="animate-spin" /> Signing in</> : <TextScramble text="Sign in" />}
          </button>
        </Magnetic>

        <p role="alert" className="mt-3.5 min-h-[18px] text-center text-[12.5px] text-red-400">{error}</p>
        <p role="status" className="min-h-[18px] text-center text-[12.5px] text-brand-gold">{note}</p>

        <p className="mt-4 text-center text-sm font-light text-brand-light/50">New here? <a href={signupHref} className="text-brand-emerald hover:underline">Create an account</a></p>
      </form>

      <a href={backHref} className="mt-6 inline-flex items-center gap-2 text-xs text-brand-light/45 transition-colors hover:text-brand-emerald"><ArrowLeft size={14} /> Back</a>
    </div>
  );
}
