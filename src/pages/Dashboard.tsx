import { useState } from 'react';
import { ArrowRight, Check, FileText, Table2, Upload, Workflow, Zap } from 'lucide-react';
import { ACTIVITY, PEOPLE, ROWS, RULES, STATUS, STATUS_KEYS, fmtDate } from '../lib/data';
import { Avatar, Button, Eyebrow, LiveBadge, Pill } from '../components/ui';
import { TiltCard } from '../components/TiltCard';
import { Ticker } from '../components/Ticker';
import { Magnetic } from '../components/Magnetic';
import { TextScramble } from '../components/TextScramble';
import { Link, go } from '../lib/router';
import { useAuth } from '../lib/auth';

const QUICK = [
  { icon: Table2, label: 'New sheet', hint: 'Track documents in a grid', to: '/sheet', glow: 'emerald', color: 'text-brand-emerald' },
  { icon: FileText, label: 'New document', hint: 'Write with structure', to: '/documents', glow: 'white', color: 'text-white' },
  { icon: Workflow, label: 'New workflow', hint: 'Automate handoffs', to: '/workflows', glow: 'gold', color: 'text-brand-gold' },
  { icon: Upload, label: 'Import files', hint: 'CSV or Excel', to: '/sheet', glow: 'crimson', color: 'text-brand-crimson' },
] as const;

export function Dashboard() {
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';
  const { profile, user } = useAuth();
  const firstName = (profile?.displayName || user?.displayName || user?.email?.split('@')[0] || 'there').trim().split(/\s+/)[0];
  const count = (s: string) => ROWS.filter((r) => r.status === s).length;
  const attention = ROWS.filter((r) => r.status === 'review' || r.status === 'blocked').slice(0, 6);

  const [steps, setSteps] = useState([
    { t: 'Create your workspace', d: true }, { t: 'Invite your team', d: true },
    { t: 'Import your first sheet', d: false }, { t: 'Set up an automation', d: false }, { t: 'Connect your inbox', d: false },
  ]);
  const done = steps.filter((s) => s.d).length;
  const R = 22, C = 2 * Math.PI * R;

  return (
    <>
      <section className="relative overflow-hidden pb-16 pt-16">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,_rgba(0,223,130,0.06)_0%,_transparent_60%)]" />
        <div className="grid-bg pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_top,black_20%,transparent_75%)]" />
        <div className="pointer-events-none absolute right-[8%] top-10 hidden h-40 w-40 animate-[spin_8s_linear_infinite] rounded-full border border-brand-gold/30 border-t-brand-emerald border-r-transparent md:block" />
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
          <LiveBadge>Workspace live</LiveBadge>
          <h1 className="mb-6 mt-8 text-5xl font-medium leading-[1] md:text-7xl">
            <span className="block bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">{greeting},</span>
            <span className="block bg-gradient-to-r from-brand-emerald to-brand-gold bg-clip-text pb-2 text-transparent">{firstName}.</span>
          </h1>
          <p className="max-w-2xl border-l border-brand-emerald/30 pl-6 text-lg font-light leading-relaxed tracking-wide text-brand-light/60">
            {count('review')} documents are waiting for review and {count('blocked')} are blocked. Everything else is moving.
          </p>
        </div>
      </section>
      <Ticker />

      <div className="mx-auto max-w-6xl space-y-10 px-4 py-14 sm:px-6">
        <div className="grid grid-cols-2 gap-5 md:grid-cols-4">
          {QUICK.map(({ icon: Icon, label, hint, to, glow, color }, i) => (
            <TiltCard key={label} glow={glow} delay={i * 0.08}>
              <a href={`#${to}`} className="flex h-full flex-col justify-between p-6">
                <div>
                  <span className="mb-6 flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 transition-all duration-500 group-hover:scale-110 group-hover:bg-white/10"><Icon size={20} className={`${color} opacity-80 group-hover:opacity-100`} /></span>
                  <p className="font-display text-xl font-medium tracking-wide">{label}</p>
                  <p className="mt-1 text-sm font-light text-brand-light/50">{hint}</p>
                </div>
                <span className="mt-6 flex items-center gap-2 overflow-hidden text-[11px] font-medium uppercase tracking-[0.2em] text-brand-light/30 transition-colors group-hover:text-brand-light">Open <ArrowRight size={14} className="-translate-x-full opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:text-brand-emerald group-hover:opacity-100" /></span>
              </a>
            </TiltCard>
          ))}
        </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <section className="surface rounded-2xl lg:col-span-2">
          <div className="flex items-end justify-between px-6 py-5"><div><Eyebrow>Review queue</Eyebrow><h2 className="font-display text-2xl font-medium">Needs your attention</h2></div><Link to="/sheet" className="text-[11px] font-medium uppercase tracking-[0.2em] text-brand-light/50 hover:text-brand-emerald">Open in sheet</Link></div>
          <ul>
            {attention.map((r) => (
              <li key={r.key as string} className="border-t border-white/[0.06]">
                <button onClick={() => go('/sheet')} className="flex w-full items-center gap-4 px-5 py-3 text-left hover:bg-white/[0.04]">
                  <span className="w-16 text-[13px] tabular-nums text-white/40">{r.key}</span>
                  <span className="min-w-0 flex-1"><span className="block truncate text-sm">{r.title}</span><span className="block truncate text-xs text-white/40">{r.client}</span></span>
                  <Pill s={r.status as string} />
                  <span className="hidden w-14 text-right text-[13px] text-white/50 sm:block">{fmtDate(r.due as string)}</span>
                  <Avatar id={r.owner as string} size={24} />
                </button>
              </li>
            ))}
          </ul>
        </section>

        <aside className="surface rounded-2xl p-5">
          <div className="flex items-center gap-4">
            <svg width="56" height="56" viewBox="0 0 56 56" className="-rotate-90">
              <circle cx="28" cy="28" r={R} fill="none" stroke="rgb(255 255 255 / 0.08)" strokeWidth="4" />
              <circle cx="28" cy="28" r={R} fill="none" stroke="#00df82" strokeWidth="4" strokeLinecap="round" strokeDasharray={C} strokeDashoffset={C * (1 - done / steps.length)} className="transition-all duration-500" />
            </svg>
            <div><h2 className="font-display text-xl font-medium">Set up your workspace</h2><p className="text-[13px] text-white/45">{done} of {steps.length} complete</p></div>
          </div>
          <ul className="mt-5 space-y-1">
            {steps.map((s, i) => (
              <li key={s.t}>
                <button onClick={() => setSteps(steps.map((x, j) => (j === i ? { ...x, d: !x.d } : x)))} className="flex w-full items-center gap-3 rounded-lg px-2 py-2 text-left text-sm hover:bg-white/[0.05]">
                  <span className={`flex h-5 w-5 items-center justify-center rounded-full border ${s.d ? 'border-brand-emerald bg-brand-emerald text-brand-dark' : 'border-white/20'}`}>{s.d && <Check size={12} strokeWidth={3} />}</span>
                  <span className={s.d ? 'text-white/40 line-through' : ''}>{s.t}</span>
                </button>
              </li>
            ))}
          </ul>
        </aside>
      </div>

      <section className="surface rounded-2xl p-5">
        <div className="mb-5 flex items-end justify-between"><div><Eyebrow tone="gold">Pipeline</Eyebrow><h2 className="font-display text-2xl font-medium">Where every document stands</h2></div><span className="text-[13px] text-white/45">{ROWS.length} documents</span></div>
        <div className="flex h-3 gap-1 overflow-hidden rounded-full">
          {STATUS_KEYS.map((k) => <span key={k} title={`${STATUS[k].label}: ${count(k)}`} className={`${STATUS[k].dot} rounded-full`} style={{ flex: count(k) }} />)}
        </div>
        <div className="mt-4 flex flex-wrap gap-x-8 gap-y-2">
          {STATUS_KEYS.map((k) => <span key={k} className="flex items-center gap-2 text-sm text-white/65"><span className={`h-2 w-2 rounded-full ${STATUS[k].dot}`} />{STATUS[k].label}<span className="tabular-nums text-white/40">{count(k)}</span></span>)}
        </div>
      </section>

      <div className="grid gap-6 md:grid-cols-2">
        <section className="surface rounded-2xl p-5">
          <Eyebrow>Activity</Eyebrow><h2 className="mb-4 font-display text-2xl font-medium">Recent activity</h2>
          <ul className="space-y-3">
            {ACTIVITY.map((a, i) => (
              <li key={i} className="flex items-start gap-3 text-sm"><Avatar id={a.who} size={26} />
                <p className="flex-1 text-white/70"><span className="text-brand-light">{PEOPLE.find((p) => p.id === a.who)?.name.split(' ')[0]}</span> {a.text} <span className="text-white/40">{a.ref}</span></p>
                <span className="text-xs text-white/35">{a.when}</span></li>
            ))}
          </ul>
        </section>
        <section className="surface rounded-2xl p-5">
          <div className="mb-4 flex items-start justify-between"><div><Eyebrow tone="gold">Automations</Eyebrow><h2 className="font-display text-2xl font-medium">Running rules</h2></div><Button variant="ghost" size="sm" onClick={() => go('/workflows')}>Manage</Button></div>
          <ul className="space-y-3">
            {RULES.map((r) => (
              <li key={r.id} className="flex items-start gap-3"><span className="mt-0.5 flex h-7 w-7 items-center justify-center rounded-lg bg-brand-gold/10 text-brand-gold"><Zap size={14} /></span>
                <div className="flex-1"><p className="text-sm">{r.name}</p><p className="text-xs text-white/45">{r.trigger}</p></div>
                <span className={`text-xs ${r.on ? 'text-brand-emerald' : 'text-white/35'}`}>{r.on ? 'On' : 'Off'}</span></li>
            ))}
          </ul>
        </section>
      </div>
      </div>
    </>
  );
}
