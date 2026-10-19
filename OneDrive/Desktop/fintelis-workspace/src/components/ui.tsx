import React from 'react';
import { PEOPLE, STATUS, StatusKey } from '../lib/data';

// Logo mirrors the existing Navbar mark (emerald ring + F), scaled down.
export function Logo({ size = 32 }: { size?: number }) {
  return (
    <span style={{ width: size, height: size }} className="rounded-full border border-brand-emerald/30 bg-brand-emerald/5 shadow-[0_0_15px_rgba(0,223,130,0.15)] relative overflow-hidden inline-flex items-center justify-center font-display font-medium text-brand-light">
      <span className="absolute inset-0 bg-gradient-to-tr from-brand-emerald/20 to-transparent opacity-50" />
      <span className="relative" style={{ fontSize: size * 0.45 }}>F</span>
    </span>
  );
}

type BtnProps = React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary' | 'light' | 'subtle' | 'ghost'; size?: 'sm' | 'md' | 'lg' };
// Primary = the "Access Portal" pill from fintelis-main's Navbar; light = the Hero CTA.
const V = {
  primary: 'border border-brand-emerald/30 bg-brand-emerald/10 text-brand-emerald shadow-[0_0_20px_rgba(0,223,130,0.1)] hover:bg-brand-emerald hover:text-brand-dark hover:shadow-[0_0_30px_rgba(0,223,130,0.3)] duration-300',
  light: 'bg-brand-light text-brand-dark hover:shadow-[0_0_40px_rgba(255,255,255,0.2)] duration-500',
  subtle: 'border border-white/10 bg-white/5 text-brand-light/80 hover:bg-white/10',
  ghost: 'text-brand-light/60 hover:text-brand-light hover:bg-white/5',
};
const S = { sm: 'h-8 px-3.5 text-[11px]', md: 'h-10 px-5 text-xs', lg: 'h-12 px-6 text-xs' };
export function Button({ variant = 'primary', size = 'md', className = '', ...p }: BtnProps) {
  return <button {...p} className={`inline-flex items-center justify-center gap-2 rounded-full font-medium uppercase tracking-[0.15em] transition-all disabled:opacity-40 ${V[variant]} ${S[size]} ${className}`} />;
}

export function Pill({ s }: { s: StatusKey | string }) {
  const c = STATUS[s as StatusKey];
  if (!c) return null;
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-xs font-medium ${c.bg} ${c.text}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${c.dot}`} />
      {c.label}
    </span>
  );
}

export function Avatar({ id, size = 24 }: { id: string; size?: number }) {
  const p = PEOPLE.find((x) => x.id === id) ?? PEOPLE[0];
  const initials = p.name.split(' ').map((w) => w[0]).join('');
  return (
    <span title={p.name} style={{ width: size, height: size, fontSize: size * 0.4, background: `hsl(${p.hue} 45% 28%)` }} className="inline-flex shrink-0 items-center justify-center rounded-full font-medium text-white/90 ring-2 ring-brand-dark">
      {initials}
    </span>
  );
}

export const Kbd = ({ children }: { children: React.ReactNode }) => (
  <kbd className="rounded-md border border-white/10 bg-white/[0.05] px-1.5 py-0.5 text-[11px] font-sans text-white/50">{children}</kbd>
);

// Section label from fintelis-main (line + tracked caps).
export const Eyebrow = ({ children, tone = 'emerald' }: { children: React.ReactNode; tone?: 'emerald' | 'gold' }) => (
  <p className={`mb-4 flex items-center gap-4 text-xs font-medium uppercase tracking-[0.2em] ${tone === 'gold' ? 'text-brand-gold' : 'text-brand-emerald'}`}>
    <span className={`h-px w-8 ${tone === 'gold' ? 'bg-brand-gold/50' : 'bg-brand-emerald/50'}`} />{children}
  </p>
);

// Pulsing badge from the Hero.
export const LiveBadge = ({ children }: { children: React.ReactNode }) => (
  <span className="inline-flex items-center gap-3 rounded-full border border-brand-emerald/20 bg-brand-emerald/5 px-4 py-2 text-xs font-medium uppercase tracking-[0.2em] text-brand-emerald backdrop-blur-md">
    <span className="relative flex h-2 w-2"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-emerald opacity-75" /><span className="relative inline-flex h-2 w-2 rounded-full bg-brand-emerald" /></span>{children}
  </span>
);
