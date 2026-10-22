import React, { useEffect, useState } from 'react';
import { Activity, Bell, ChevronDown, FileText, House, LogOut, Plus, Search, Settings, Table2, Workflow } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { Link, go } from '../lib/router';
import { Button, Kbd, Logo } from './ui';
import { useAuth } from '../lib/auth';
import { Magnetic } from './Magnetic';
import { TextScramble } from './TextScramble';

export const NAV = [
  { to: '/home', label: 'Home', icon: House },
  { to: '/documents', label: 'Documents', icon: FileText },
  { to: '/sheet', label: 'Sheets', icon: Table2 },
  { to: '/workflows', label: 'Workflows', icon: Workflow },
  { to: '/reports', label: 'Reports', icon: Activity },
];
const active = (route: string, to: string) => route.startsWith(to);
const initials = (name: string) => name.trim().split(/\s+/).slice(0, 2).map((w) => w[0]?.toUpperCase()).join('') || '?';

export function Shell({ route, children }: { route: string; children: React.ReactNode }) {
  const [palette, setPalette] = useState(false);
  const [menu, setMenu] = useState(false);
  const { user, profile, signOut } = useAuth();
  const name = profile?.displayName || user?.displayName || user?.email || 'Account';
  const logout = async () => { await signOut(); go('/login'); };

  useEffect(() => {
    const on = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); setPalette((p) => !p); }
      if (e.key === 'Escape') { setPalette(false); setMenu(false); }
    };
    window.addEventListener('keydown', on);
    return () => window.removeEventListener('keydown', on);
  }, []);

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 border-b border-white/5 bg-brand-dark/80 backdrop-blur-lg">
        <div className="mx-auto flex h-16 max-w-[1600px] items-center gap-6 px-4 sm:px-6 lg:px-8">
          <Magnetic>
            <Link to="/home" className="flex items-center gap-3">
              <Logo size={36} />
              <span className="font-display text-xl font-medium tracking-wide">Fintelis</span>
            </Link>
          </Magnetic>

          <nav className="mx-auto hidden items-center gap-4 md:flex">
            {NAV.map(({ to, label }) => (
              <Magnetic key={to}>
                <Link to={to} className={`px-2 py-2 text-xs font-medium uppercase tracking-widest transition-colors ${active(route, to) ? 'text-brand-emerald' : 'text-brand-light/70 hover:text-brand-emerald'}`}>
                  <TextScramble text={label} />
                </Link>
              </Magnetic>
            ))}
          </nav>

          <div className="ml-auto flex items-center gap-3 md:ml-0">
            <button onClick={() => setPalette(true)} className="hidden h-9 items-center gap-2 rounded-full border border-white/10 bg-white/5 pl-3.5 pr-2 text-xs text-brand-light/50 transition-colors hover:border-brand-emerald/30 sm:flex">
              <Search size={14} /> Search <Kbd>⌘K</Kbd>
            </button>
            <Magnetic><Button size="sm" onClick={() => go('/sheet')}><Plus size={14} /><TextScramble text="New" /></Button></Magnetic>
            <button aria-label="Notifications" className="relative rounded-full p-2 text-brand-light/60 transition-colors hover:text-brand-emerald">
              <Bell size={18} /><span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-brand-emerald shadow-[0_0_8px_rgba(0,223,130,0.8)]" />
            </button>
            <div className="relative">
              <button onClick={() => setMenu((m) => !m)} aria-label="Account" title={name} className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-brand-emerald/15 text-[12px] font-medium text-brand-emerald ring-2 ring-brand-dark">{initials(name)}</button>
              {menu && (
                <>
                  <div className="fixed inset-0" onClick={() => setMenu(false)} />
                  <div className="absolute right-0 top-11 w-56 rounded-2xl border border-white/10 bg-brand-dark/95 p-1.5 shadow-2xl backdrop-blur-xl">
                    <div className="px-3 py-2"><p className="truncate text-sm font-medium">{name}</p><p className="truncate text-xs text-brand-light/40">{user?.email}</p></div>
                    <button className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-brand-light/70 hover:bg-white/5 hover:text-brand-emerald"><Settings size={15} /> Settings</button>
                    <button onClick={logout} className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-brand-light/70 hover:bg-white/5 hover:text-brand-emerald"><LogOut size={15} /> Sign out</button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
        <nav className="no-scrollbar flex gap-4 overflow-x-auto border-t border-white/5 px-4 py-2 md:hidden">
          {NAV.map(({ to, label }) => (
            <Link key={to} to={to} className={`shrink-0 text-xs font-medium uppercase tracking-widest ${active(route, to) ? 'text-brand-emerald' : 'text-brand-light/60'}`}>{label}</Link>
          ))}
        </nav>
      </header>

      <main className="flex-1">{children}</main>
      <AnimatePresence>{palette && <Palette onClose={() => setPalette(false)} onSignOut={logout} />}</AnimatePresence>
    </div>
  );
}

function Palette({ onClose, onSignOut }: { onClose: () => void; onSignOut: () => void }) {
  const [q, setQ] = useState('');
  const items: { label: string; to?: string; icon: typeof Plus }[] = [
    ...NAV.map((n) => ({ label: `Go to ${n.label}`, to: n.to, icon: n.icon })),
    { label: 'Create a new sheet', to: '/sheet', icon: Plus },
    { label: 'Sign out', icon: LogOut },
  ].filter((i) => i.label.toLowerCase().includes(q.toLowerCase()));
  const pick = (to?: string) => { if (to) go(to); else onSignOut(); onClose(); };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.12 }} className="fixed inset-0 z-50 flex items-start justify-center bg-black/50 pt-[15vh]" onClick={onClose}>
      <motion.div initial={{ scale: 0.97, y: -6 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.97 }} transition={{ duration: 0.15 }} onClick={(e) => e.stopPropagation()} className="w-full max-w-lg overflow-hidden rounded-2xl border border-white/10 bg-brand-dark/95 shadow-[0_0_60px_rgba(0,223,130,0.08)] backdrop-blur-xl">
        <div className="flex items-center gap-3 border-b border-white/[0.07] px-4">
          <Search size={16} className="text-white/40" />
          <input autoFocus value={q} onChange={(e) => setQ(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && items[0] && pick(items[0].to)} placeholder="Search documents, sheets, or actions" className="h-12 flex-1 bg-transparent text-[15px] outline-none placeholder:text-white/35" />
        </div>
        <ul className="max-h-72 overflow-auto p-1.5">
          {items.map(({ label, to, icon: Icon }) => (
            <li key={label}><button onClick={() => pick(to)} className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm text-white/80 hover:bg-white/[0.07]"><Icon size={16} className="text-white/45" />{label}</button></li>
          ))}
          {!items.length && <li className="px-3 py-6 text-center text-sm text-white/40">No results for “{q}”. Try a document name or action.</li>}
        </ul>
      </motion.div>
    </motion.div>
  );
}
