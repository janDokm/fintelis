// Replace: src/pages/Login.tsx
import { useState } from 'react';
import { ArrowLeft, KeyRound } from 'lucide-react';
import { Magnetic } from '../components/Magnetic';
import { TextScramble } from '../components/TextScramble';
import { Mark } from '../components/Backdrop';

const input = 'h-12 w-full rounded-[14px] border border-white/10 bg-brand-dark/50 px-4 text-[15px] font-light outline-none transition-all placeholder:text-brand-light/25 focus:border-brand-emerald/50 focus:shadow-[0_0_22px_rgba(0,223,130,0.12)]';
const alt = 'flex h-[46px] w-full items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 text-xs font-medium uppercase tracking-[0.14em] text-brand-light/80 transition-colors hover:bg-white/10';

// homeHref is the route the dashboard lives on (see App.tsx). Hash navigation: no reload, no file paths.
export function Login({ backHref = '#/', homeHref = '#/home' }: { backHref?: string; homeHref?: string }) {
  const [note, setNote] = useState('');
  const enter = () => { window.location.hash = homeHref; };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 py-10">
      <form
        noValidate
        onSubmit={(e) => { e.preventDefault(); enter(); }}
        className="w-full max-w-[400px] rounded-[28px] border border-white/[0.07] bg-brand-slate/45 px-8 pb-7 pt-9 shadow-[0_30px_120px_rgba(0,0,0,0.55),0_0_80px_rgba(0,223,130,0.05)] backdrop-blur-2xl max-sm:px-5"
      >
        <Mark size={44} />
        <h2 className="mb-1.5 mt-5 text-[32px] font-medium">Sign in</h2>
        <p className="mb-7 text-[15px] font-light leading-normal text-brand-light/55">Welcome back. Enter your details to continue.</p>

        <label className="mb-3 block"><span className="mb-1.5 ml-0.5 block text-xs text-brand-light/50">Work email</span>
          <input name="email" type="email" autoComplete="email" placeholder="name@company.com" autoFocus className={input} defaultValue="bypass@company.com" /></label>
        <label className="mb-3 block"><span className="mb-1.5 ml-0.5 block text-xs text-brand-light/50">Password</span>
          <input name="password" type="password" autoComplete="current-password" placeholder="Your password" className={input} defaultValue="password123" /></label>
        <div className="-mt-0.5 mb-5 text-right"><button type="button" onClick={() => setNote('Password reset isn’t connected yet.')} className="text-xs text-brand-light/45 transition-colors hover:text-brand-emerald">Forgot password?</button></div>

        <Magnetic wrapperClass="block">
          <button type="submit" className="h-12 w-full rounded-full border border-brand-emerald/30 bg-brand-emerald/10 text-xs font-medium uppercase tracking-[0.2em] text-brand-emerald shadow-[0_0_20px_rgba(0,223,130,0.1)] transition-all duration-300 hover:bg-brand-emerald hover:text-brand-dark hover:shadow-[0_0_30px_rgba(0,223,130,0.35)]">
            <TextScramble text="Sign in" />
          </button>
        </Magnetic>

        <div className="my-5 flex items-center gap-3 text-[11px] uppercase tracking-[0.2em] text-brand-light/30"><span className="h-px flex-1 bg-white/10" />or<span className="h-px flex-1 bg-white/10" /></div>
        <div className="grid gap-2.5">
          <button type="button" className={alt} onClick={enter}><KeyRound size={14} /> Continue with SSO</button>
          <button type="button" className={alt} onClick={enter}><span className="font-display text-sm font-semibold">G</span> Continue with Google</button>
        </div>
        <p role="status" className="mt-3.5 min-h-[18px] text-center text-[12.5px] text-brand-gold">{note}</p>
      </form>

      <a href={backHref} className="mt-6 inline-flex items-center gap-2 text-xs text-brand-light/45 transition-colors hover:text-brand-emerald"><ArrowLeft size={14} /> Back</a>
    </div>
  );
}
