// New file: src/pages/Signup.tsx
// Creates the Firebase Auth account, then writes Firestore users/{email}:
// email (PK), displayName, nricPassport, internshipStart, internshipEnd, focusResidence. Password stays in Firebase Auth only.
import React, { useState } from 'react';
import { ArrowLeft, Eye, EyeOff, Loader2 } from 'lucide-react';
import { Magnetic } from '../components/Magnetic';
import { TextScramble } from '../components/TextScramble';
import { Mark } from '../components/Backdrop';
import { authMessage, useAuth } from '../lib/auth';
import { inputCls } from './Login';

const dateCls = `${inputCls} [color-scheme:dark]`;
const Label = ({ children }: { children: React.ReactNode }) => <span className="mb-1.5 ml-0.5 block text-xs text-brand-light/50">{children}</span>;

export function Signup({ backHref = '#/login', homeHref = '#/home' }: { backHref?: string; homeHref?: string }) {
  const { signUp } = useAuth();
  const [f, setF] = useState({ displayName: '', email: '', password: '', confirm: '', nricPassport: '', internshipStart: '', internshipEnd: '', focusResidence: '' });
  const [show, setShow] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const set = (k: keyof typeof f) => (e: React.ChangeEvent<HTMLInputElement>) => setF((p) => ({ ...p, [k]: e.target.value }));

  const validate = (): string => {
    if (f.displayName.trim().length < 2) return 'Enter your display name.';
    if (!/^\S+@\S+\.\S+$/.test(f.email.trim())) return 'Enter a valid email address.';
    if (f.password.length < 8) return 'Password must be at least 8 characters.';
    if (f.password !== f.confirm) return 'Passwords do not match.';
    if (!/^[A-Za-z0-9-]{6,20}$/.test(f.nricPassport.trim())) return 'Enter a valid NRIC or passport number (letters, numbers, dashes).';
    if (!f.internshipStart || !f.internshipEnd) return 'Choose your internship start and end dates.';
    if (f.internshipEnd < f.internshipStart) return 'Internship end date must be after the start date.';
    if (!f.focusResidence.trim()) return 'Enter your focus residence.';
    return '';
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const v = validate();
    if (v) { setError(v); return; }
    setError(''); setBusy(true);
    try {
      await signUp(f);
      window.location.hash = homeHref;
    } catch (err) {
      setError(authMessage(err));
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 py-10">
      <form noValidate onSubmit={submit} className="w-full max-w-[460px] rounded-[28px] border border-white/[0.07] bg-brand-slate/45 px-8 pb-7 pt-9 shadow-[0_30px_120px_rgba(0,0,0,0.55),0_0_80px_rgba(0,223,130,0.05)] backdrop-blur-2xl max-sm:px-5">
        <Mark size={44} />
        <h2 className="mb-1.5 mt-5 text-[32px] font-medium">Create account</h2>
        <p className="mb-7 text-[15px] font-light leading-normal text-brand-light/55">Your email is your unique ID in Fintelis.</p>

        <label className="mb-3 block"><Label>Display name</Label><input autoFocus autoComplete="name" placeholder="Hafizul Amir Aliff" className={inputCls} value={f.displayName} onChange={set('displayName')} /></label>
        <label className="mb-3 block"><Label>Email (primary key)</Label><input type="email" autoComplete="email" placeholder="name@email.com" className={inputCls} value={f.email} onChange={set('email')} /></label>

        <div className="mb-3 grid grid-cols-2 gap-3 max-sm:grid-cols-1">
          <label className="block"><Label>Password</Label>
            <span className="relative block">
              <input type={show ? 'text' : 'password'} autoComplete="new-password" placeholder="Min. 8 characters" className={`${inputCls} pr-11`} value={f.password} onChange={set('password')} />
              <button type="button" onClick={() => setShow((s) => !s)} aria-label={show ? 'Hide password' : 'Show password'} className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-brand-light/40 transition-colors hover:text-brand-emerald">{show ? <EyeOff size={16} /> : <Eye size={16} />}</button>
            </span></label>
          <label className="block"><Label>Confirm password</Label><input type={show ? 'text' : 'password'} autoComplete="new-password" placeholder="Repeat password" className={inputCls} value={f.confirm} onChange={set('confirm')} /></label>
        </div>

        <label className="mb-3 block"><Label>NRIC / Passport number</Label><input autoComplete="off" placeholder="e.g. 030101-10-1234 or A12345678" className={inputCls} value={f.nricPassport} onChange={set('nricPassport')} /></label>

        <div className="mb-3 grid grid-cols-2 gap-3 max-sm:grid-cols-1">
          <label className="block"><Label>Internship start</Label><input type="date" className={dateCls} value={f.internshipStart} onChange={set('internshipStart')} /></label>
          <label className="block"><Label>Internship end</Label><input type="date" min={f.internshipStart || undefined} className={dateCls} value={f.internshipEnd} onChange={set('internshipEnd')} /></label>
        </div>

        <label className="mb-5 block"><Label>Focus residence</Label><input autoComplete="off" placeholder="Your focus residence" className={inputCls} value={f.focusResidence} onChange={set('focusResidence')} /></label>

        <Magnetic wrapperClass="block">
          <button type="submit" disabled={busy} className="flex h-12 w-full items-center justify-center gap-2 rounded-full border border-brand-emerald/30 bg-brand-emerald/10 text-xs font-medium uppercase tracking-[0.2em] text-brand-emerald shadow-[0_0_20px_rgba(0,223,130,0.1)] transition-all duration-300 hover:bg-brand-emerald hover:text-brand-dark hover:shadow-[0_0_30px_rgba(0,223,130,0.35)] disabled:opacity-60">
            {busy ? <><Loader2 size={14} className="animate-spin" /> Creating account</> : <TextScramble text="Create account" />}
          </button>
        </Magnetic>

        <p role="alert" className="mt-3.5 min-h-[18px] text-center text-[12.5px] text-red-400">{error}</p>
        <p className="mt-2 text-center text-sm font-light text-brand-light/50">Already have an account? <a href="#/login" className="text-brand-emerald hover:underline">Sign in</a></p>
      </form>

      <a href={backHref} className="mt-6 inline-flex items-center gap-2 text-xs text-brand-light/45 transition-colors hover:text-brand-emerald"><ArrowLeft size={14} /> Back</a>
    </div>
  );
}
