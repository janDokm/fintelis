import React from 'react';
import { KeyRound } from 'lucide-react';
import { Avatar, Button, Eyebrow, LiveBadge, Logo, Pill } from '../components/ui';
import { Magnetic } from '../components/Magnetic';
import { TextScramble } from '../components/TextScramble';
import { Link, go } from '../lib/router';
import { PEOPLE, ROWS, fmtDate } from '../lib/data';

const field = 'h-12 w-full rounded-xl border border-white/10 bg-brand-slate/40 px-4 text-sm font-light tracking-wide outline-none backdrop-blur transition-all placeholder:text-brand-light/30 focus:border-brand-emerald/50 focus:shadow-[0_0_20px_rgba(0,223,130,0.1)]';

export function Auth({ mode }: { mode: 'login' | 'signup' }) {
  const signup = mode === 'signup';
  const submit = (e: React.FormEvent) => { e.preventDefault(); go('/'); }; // UI only: no real auth

  return (
    <div className="relative grid min-h-screen overflow-hidden lg:grid-cols-[minmax(460px,1fr)_1.3fr]">
      {/* Backdrop: same grid + radial glow as the Hero */}
      <div className="grid-bg pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_80%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,_rgba(0,223,130,0.07)_0%,_transparent_60%)]" />

      <section className="relative z-10 flex flex-col px-6 py-8 sm:px-14">
        <Magnetic><Link to="/" className="flex items-center gap-3"><Logo size={40} /><span className="font-display text-xl font-medium tracking-wide">Fintelis</span></Link></Magnetic>

        <div className="mx-auto flex w-full max-w-sm flex-1 flex-col justify-center py-12">
          <div><LiveBadge>Secure access</LiveBadge></div>
          <h1 className="mb-4 mt-8 text-5xl font-medium leading-[1.05]">
            <span className="block bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">{signup ? 'Create your' : 'Welcome'}</span>
            <span className="block bg-gradient-to-r from-brand-emerald to-brand-gold bg-clip-text pb-1 text-transparent">{signup ? 'workspace.' : 'back.'}</span>
          </h1>
          <p className="mb-8 border-l border-brand-emerald/30 pl-5 text-base font-light leading-relaxed tracking-wide text-brand-light/60">{signup ? 'Track every document from intake to approval.' : 'Pick up where your team left off.'}</p>

          <form onSubmit={submit} className="space-y-3">
            {signup && <input className={field} placeholder="Full name" autoComplete="name" />}
            <input className={field} type="email" placeholder="Work email" autoComplete="email" />
            <input className={field} type="password" placeholder="Password" autoComplete={signup ? 'new-password' : 'current-password'} />
            {!signup && <div className="text-right"><a href="#/login" className="text-xs text-brand-light/40 transition-colors hover:text-brand-emerald">Forgot password?</a></div>}
            <Magnetic wrapperClass="block pt-2"><Button size="lg" className="w-full"><TextScramble text={signup ? 'Create account' : 'Sign in'} /></Button></Magnetic>
          </form>

          <div className="my-6 flex items-center gap-3 text-[11px] uppercase tracking-[0.2em] text-brand-light/30"><span className="h-px flex-1 bg-white/10" />or<span className="h-px flex-1 bg-white/10" /></div>
          <div className="space-y-2.5">
            <Button type="button" variant="subtle" size="lg" className="w-full" onClick={() => go('/')}><KeyRound size={15} /> Continue with SSO</Button>
            <Button type="button" variant="subtle" size="lg" className="w-full" onClick={() => go('/')}><span className="font-display text-sm font-semibold">G</span> Continue with Google</Button>
          </div>

          <p className="mt-8 text-center text-sm font-light text-brand-light/50">
            {signup ? 'Already have an account?' : 'New to Fintelis?'}{' '}
            <Link to={signup ? '/login' : '/signup'} className="text-brand-emerald hover:underline">{signup ? 'Sign in' : 'Create an account'}</Link>
          </p>
        </div>
      </section>

      {/* Right: rotating rings from the Hero, sheet preview as the focal object */}
      <section className="relative hidden items-center overflow-hidden border-l border-white/5 lg:flex">
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="absolute h-[640px] w-[640px] animate-[spin_40s_linear_infinite] rounded-full border border-brand-emerald/20 border-x-brand-gold/30" />
          <div className="absolute h-[470px] w-[470px] animate-[spin_35s_linear_infinite_reverse] rounded-full border border-white/5 border-y-brand-emerald/30" />
          <div className="absolute h-[320px] w-[320px] animate-[spin_50s_linear_infinite] rounded-full border border-brand-gold/10 border-x-white/10" />
        </div>
        <div className="relative z-10 pl-16">
          <Eyebrow>Document tracking</Eyebrow>
          <h2 className="max-w-lg text-5xl font-medium leading-[1.05]">
            <span className="block bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">Every document.</span>
            <span className="block bg-gradient-to-r from-brand-emerald to-brand-gold bg-clip-text pb-1 text-transparent">Every handoff.</span>
          </h2>
          <div className="surface mt-12 w-[700px] origin-left rotate-[-2deg] overflow-hidden rounded-2xl shadow-[0_40px_120px_rgba(0,0,0,0.6)] [mask-image:linear-gradient(to_bottom,black_60%,transparent)]">
            {ROWS.slice(0, 7).map((r, i) => (
              <div key={i} className="grid h-11 grid-cols-[80px_210px_120px_150px_80px] items-center border-b border-white/5 px-4 text-[13px] font-light text-brand-light/75">
                <span className="text-brand-light/40">{r.key}</span><span className="truncate">{r.title}</span><span><Pill s={r.status as string} /></span>
                <span className="flex items-center gap-2"><Avatar id={r.owner as string} size={20} />{PEOPLE.find((x) => x.id === r.owner)?.name}</span><span className="text-brand-light/50">{fmtDate(r.due as string)}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
