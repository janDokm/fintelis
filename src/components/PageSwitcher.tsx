// New file: src/components/PageSwitcher.tsx
// Always-on launcher (bottom centre, every page). Lists every route so you can jump anywhere. Esc closes.
import { useEffect, useState } from 'react';
import { Layers } from 'lucide-react';

export const PAGES = [
  { group: 'Front door', items: [
    { to: '/', label: 'Welcome' },
    { to: '/login', label: 'Login' },
    { to: '/signup', label: 'Sign up' },
  ] },
  { group: 'Workspace', items: [
    { to: '/home', label: 'Dashboard' },
    { to: '/sheet', label: 'Sheet' },
    { to: '/documents', label: 'Documents' },
    { to: '/workflows', label: 'Workflows' },
    { to: '/reports', label: 'Reports' },
  ] },
];

export function PageSwitcher({ route }: { route: string }) {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const on = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', on);
    return () => window.removeEventListener('keydown', on);
  }, []);
  useEffect(() => setOpen(false), [route]);

  return (
    <div className="fixed bottom-3 left-1/2 z-[100] -translate-x-1/2">
      {open && <div className="fixed inset-0" onClick={() => setOpen(false)} />}
      {open && (
        <div className="absolute bottom-12 left-1/2 w-64 -translate-x-1/2 rounded-2xl border border-white/10 bg-brand-dark/95 p-2 shadow-[0_20px_80px_rgba(0,0,0,0.6)] backdrop-blur-xl">
          {PAGES.map((g) => (
            <div key={g.group} className="mb-1">
              <p className="px-3 pb-1 pt-2 text-[10px] font-medium uppercase tracking-[0.2em] text-brand-emerald/70">{g.group}</p>
              {g.items.map((p) => (
                <a key={p.to} href={`#${p.to}`} className={`flex items-center justify-between rounded-lg px-3 py-2 text-sm transition-colors hover:bg-white/5 ${route === p.to ? 'text-brand-emerald' : 'text-brand-light/70'}`}>
                  {p.label}<span className="text-[11px] text-brand-light/30">#{p.to}</span>
                </a>
              ))}
            </div>
          ))}
        </div>
      )}
      <button onClick={() => setOpen((o) => !o)} aria-expanded={open} className="flex h-9 items-center gap-2 rounded-full border border-white/10 bg-brand-dark/80 px-4 text-[11px] font-medium uppercase tracking-[0.2em] text-brand-light/60 backdrop-blur-xl transition-colors hover:border-brand-emerald/30 hover:text-brand-emerald">
        <Layers size={14} /> All pages
      </button>
    </div>
  );
}
