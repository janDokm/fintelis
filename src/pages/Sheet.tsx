import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  AlignCenter, AlignLeft, AlignRight, ArrowDownUp, Banknote, Bold, Calendar, Check, ChevronDown, CircleDot, Eye, EyeOff, Filter, Gauge,
  Hash, History, Italic, LayoutGrid, Link2, ListChecks, MessageSquare, Table2, PaintBucket, Palette, PanelLeft, PanelRight, Percent,
  Plus, Printer, Redo2, Snowflake, Sparkles, Square, Star, Strikethrough, Type, Undo2, User, WrapText, Zap,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { ACTIVITY, COLS, Col, PEOPLE, ROWS, RULES, Row, STATUS, STATUS_KEYS, fmtDate, fmtMoney } from '../lib/data';
import { Avatar, Button, Pill } from '../components/ui';

type Pos = { r: number; c: number };
const letter = (i: number) => String.fromCharCode(65 + i);
const TYPE_ICON: Record<string, LucideIcon> = { key: Hash, text: Type, status: CircleDot, person: User, date: Calendar, money: Banknote, progress: Gauge };

type Tool = { t: string; i?: LucideIcon; l?: string };
const GROUPS: Tool[][] = [
  [{ t: 'Undo', i: Undo2 }, { t: 'Redo', i: Redo2 }, { t: 'Print', i: Printer }],
  [{ t: 'Format as currency', l: 'RM' }, { t: 'Format as percent', i: Percent }, { t: 'Fewer decimals', l: '.0' }, { t: 'More decimals', l: '.00' }],
  [{ t: 'Bold', i: Bold }, { t: 'Italic', i: Italic }, { t: 'Strikethrough', i: Strikethrough }, { t: 'Text colour', i: Type }, { t: 'Fill colour', i: PaintBucket }],
  [{ t: 'Borders', i: Square }, { t: 'Align left', i: AlignLeft }, { t: 'Align centre', i: AlignCenter }, { t: 'Align right', i: AlignRight }, { t: 'Wrap text', i: WrapText }],
  [{ t: 'Filter', i: Filter }, { t: 'Sort', i: ArrowDownUp }, { t: 'Freeze', i: Snowflake }, { t: 'Insert link', i: Link2 }, { t: 'Comment', i: MessageSquare }],
];
const SMART: Tool[] = [{ t: 'Automation rule', i: Zap }, { t: 'Fill with AI', i: Sparkles }, { t: 'Validation', i: ListChecks }, { t: 'Conditional formatting', i: Palette }];

function ToolBtn({ t, i: Icon, l, on, accent, onClick }: Tool & { on?: boolean; accent?: boolean; onClick?: () => void }) {
  return (
    <button title={t} aria-label={t} onClick={onClick} className={`flex h-7 min-w-7 shrink-0 items-center justify-center rounded-md px-1.5 text-[12px] font-medium transition-colors ${on ? 'bg-white/[0.14] text-brand-light' : accent ? 'text-brand-emerald hover:bg-brand-emerald/10' : 'text-white/65 hover:bg-white/[0.08]'}`}>
      {Icon ? <Icon size={15} /> : l}
    </button>
  );
}
const Chip = ({ children }: { children: React.ReactNode }) => (
  <button className="flex h-7 shrink-0 items-center gap-1 rounded-md px-2 text-[12px] text-white/65 hover:bg-white/[0.08]">{children}<ChevronDown size={12} /></button>
);
const Sep = () => <span className="mx-1 h-4 w-px shrink-0 bg-white/10" />;

function CellView({ col, v }: { col: Col; v: string | number }) {
  switch (col.type) {
    case 'status': return <Pill s={String(v)} />;
    case 'person': { const p = PEOPLE.find((x) => x.id === v); return p ? <span className="flex items-center gap-2 truncate"><Avatar id={p.id} size={20} />{p.name}</span> : null; }
    case 'date': return <span className="tabular-nums">{fmtDate(String(v))}</span>;
    case 'money': return <span className="ml-auto tabular-nums">{fmtMoney(Number(v))}</span>;
    case 'progress': return (
      <span className="flex w-full items-center gap-2"><span className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/10"><span className="block h-full bg-brand-emerald" style={{ width: `${v}%` }} /></span><span className="w-9 text-right tabular-nums text-white/55">{v}%</span></span>
    );
    case 'key': return <span className="tabular-nums text-white/45">{v}</span>;
    default: return <span className="truncate">{v}</span>;
  }
}

const Switch = ({ on, onChange }: { on: boolean; onChange: () => void }) => (
  <button role="switch" aria-checked={on} onClick={onChange} className={`relative h-5 w-9 shrink-0 rounded-full transition-colors ${on ? 'bg-brand-emerald' : 'bg-white/15'}`}>
    <span className={`absolute top-0.5 h-4 w-4 rounded-full bg-white transition-all ${on ? 'left-[18px]' : 'left-0.5'}`} />
  </button>
);

export function SheetPage() {
  const [rows, setRows] = useState<Row[]>(ROWS);
  const [hidden, setHidden] = useState<Set<string>>(new Set());
  const vis = useMemo(() => COLS.filter((c) => !hidden.has(c.id)), [hidden]);
  const [anchor, setAnchor] = useState<Pos>({ r: 2, c: 1 });
  const [focus, setFocus] = useState<Pos>({ r: 2, c: 1 });
  const [edit, setEdit] = useState<Pos | null>(null);
  const [draft, setDraft] = useState('');
  const [leftOpen, setLeftOpen] = useState(true);
  const [rightOpen, setRightOpen] = useState(true);
  const [tab, setTab] = useState<'details' | 'automations' | 'activity'>('details');
  const [sheetTab, setSheetTab] = useState('Pipeline');
  const [title, setTitle] = useState('Document pipeline');
  const [fmt, setFmt] = useState<Set<string>>(new Set());
  const [rules, setRules] = useState(RULES);
  const [toast, setToast] = useState<string | null>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);
  const cancelled = useRef(false);

  // Clamped selection (columns can be hidden, rows can change)
  const maxR = rows.length - 1, maxC = vis.length - 1;
  const cl = (p: Pos): Pos => ({ r: Math.min(p.r, maxR), c: Math.min(p.c, maxC) });
  const f = cl(focus), a = cl(anchor);
  const r1 = Math.min(a.r, f.r), r2 = Math.max(a.r, f.r), c1 = Math.min(a.c, f.c), c2 = Math.max(a.c, f.c);
  const inSel = (r: number, c: number) => r >= r1 && r <= r2 && c >= c1 && c <= c2;
  const row = rows[f.r];
  const nRows = r2 - r1 + 1;

  useEffect(() => { const up = () => { dragging.current = false; }; window.addEventListener('mouseup', up); return () => window.removeEventListener('mouseup', up); }, []);
  useEffect(() => { if (!edit) gridRef.current?.focus({ preventScroll: true }); }, [edit]);
  useEffect(() => { if (!toast) return; const t = setTimeout(() => setToast(null), 2600); return () => clearTimeout(t); }, [toast]);

  const setCell = (r: number, colId: string, v: string | number) => setRows((rs) => rs.map((x, i) => (i === r ? { ...x, [colId]: v } : x)));
  const setSelRows = (colId: string, v: string) => setRows((rs) => rs.map((x, i) => (i >= r1 && i <= r2 ? { ...x, [colId]: v } : x)));

  const move = (dr: number, dc: number, extend: boolean) => {
    const n = cl({ r: Math.max(0, f.r + dr), c: Math.max(0, f.c + dc) });
    setFocus(n); if (!extend) setAnchor(n);
  };
  const startEdit = (p: Pos, initial?: string) => {
    const col = vis[p.c]; const select = col.type === 'status' || col.type === 'person';
    setDraft(select || initial === undefined ? String(rows[p.r][col.id]) : initial); cancelled.current = false; setEdit(p);
  };
  const commit = () => {
    if (!edit) return;
    const col = vis[edit.c];
    const v = col.type === 'money' ? Number(draft) || 0 : col.type === 'progress' ? Math.min(100, Math.max(0, Number(draft) || 0)) : draft;
    setCell(edit.r, col.id, v); setEdit(null);
  };

  const onKey = (e: React.KeyboardEvent) => {
    if (edit) return;
    const k = e.key;
    if (k.startsWith('Arrow')) { e.preventDefault(); move(k === 'ArrowDown' ? 1 : k === 'ArrowUp' ? -1 : 0, k === 'ArrowRight' ? 1 : k === 'ArrowLeft' ? -1 : 0, e.shiftKey); }
    else if (k === 'Enter' || k === 'F2') { e.preventDefault(); startEdit(f); }
    else if (k === 'Tab') { e.preventDefault(); move(0, e.shiftKey ? -1 : 1, false); }
    else if (k === 'Delete' || k === 'Backspace') { for (let r = r1; r <= r2; r++) for (let c = c1; c <= c2; c++) { const t = vis[c].type; if (t === 'text') setCell(r, vis[c].id, ''); } }
    else if (k.length === 1 && !e.metaKey && !e.ctrlKey) startEdit(f, k);
  };

  const editor = (col: Col) => {
    const base = 'absolute inset-0 z-10 h-full w-full bg-brand-field px-3 text-[13px] outline-none ring-2 ring-inset ring-brand-emerald shadow-[0_0_14px_rgba(0,223,130,0.25)]';
    const stop = (e: React.KeyboardEvent) => e.stopPropagation();
    if (col.type === 'status' || col.type === 'person') {
      const opts: [string, string][] = col.type === 'status' ? STATUS_KEYS.map((k) => [k, STATUS[k].label]) : PEOPLE.map((p) => [p.id, p.name]);
      return (
        <select autoFocus className={base} value={draft} onChange={(e) => { setCell(edit!.r, col.id, e.target.value); setEdit(null); }} onBlur={() => setEdit(null)} onKeyDown={(e) => { stop(e); if (e.key === 'Escape') setEdit(null); }}>
          {opts.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
        </select>
      );
    }
    return (
      <input autoFocus className={base} type={col.type === 'date' ? 'date' : col.type === 'money' || col.type === 'progress' ? 'number' : 'text'} value={draft} onChange={(e) => setDraft(e.target.value)}
        onBlur={() => { if (cancelled.current) { cancelled.current = false; return; } commit(); }}
        onKeyDown={(e) => {
          stop(e);
          if (e.key === 'Enter') { commit(); move(1, 0, false); }
          else if (e.key === 'Tab') { e.preventDefault(); commit(); move(0, e.shiftKey ? -1 : 1, false); }
          else if (e.key === 'Escape') { cancelled.current = true; setEdit(null); }
        }} />
    );
  };

  const addRow = () => {
    const n = 101 + rows.length;
    setRows((rs) => [...rs, { key: `FIN-${n}`, title: '', client: '', type: '', status: 'draft', owner: 'at', due: '', amount: 0, progress: 0 }]);
    const p = { r: rows.length, c: Math.min(1, maxC) }; setAnchor(p); setFocus(p);
  };

  // Status-bar numbers for the selected range
  const nums: number[] = [];
  for (let r = r1; r <= r2; r++) for (let c = c1; c <= c2; c++) { const t = vis[c].type; if (t === 'money' || t === 'progress') nums.push(Number(rows[r][vis[c].id])); }
  const sum = nums.reduce((x, y) => x + y, 0);

  const gridCols = `48px ${vis.map((c) => `${c.width}px`).join(' ')} 72px`;
  const total = 48 + 72 + vis.reduce((s, c) => s + c.width, 0);
  const toggle = (k: string) => setFmt((s) => { const n = new Set(s); n.has(k) ? n.delete(k) : n.add(k); return n; });

  return (
    <div className="mx-auto h-[calc(100vh-4rem)] min-h-[560px] max-w-[1600px] p-3 sm:p-5">
      <div className="surface flex h-full flex-col overflow-hidden rounded-3xl shadow-[0_0_80px_rgba(0,223,130,0.04)]">
        {/* Title + menus */}
        <div className="flex items-start gap-3 px-4 pt-3">
          <span className="mt-0.5 flex h-9 w-9 items-center justify-center rounded-xl bg-brand-emerald/10 text-brand-emerald"><Table2 size={18} /></span>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1">
              <input value={title} onChange={(e) => setTitle(e.target.value)} aria-label="Sheet title" className="rounded-md bg-transparent px-1.5 py-0.5 font-display text-lg font-medium tracking-wide outline-none hover:bg-white/[0.05] focus:bg-white/[0.07]" size={Math.max(title.length, 8)} />
              <button aria-label="Star" className="rounded-md p-1 text-white/40 hover:text-brand-gold"><Star size={15} /></button>
              <span className="hidden items-center gap-1 text-xs text-white/35 sm:flex"><Check size={12} /> Saved</span>
            </div>
            <div className="no-scrollbar flex gap-0.5 overflow-x-auto">
              {['File', 'Edit', 'View', 'Insert', 'Format', 'Data', 'Automate', 'Tools', 'Help'].map((m) => (
                <button key={m} className={`shrink-0 rounded-md px-2 py-0.5 text-[13px] hover:bg-white/[0.07] ${m === 'Automate' ? 'text-brand-emerald' : 'text-white/60'}`}>{m}</button>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="mr-1 hidden -space-x-1.5 md:flex">{PEOPLE.slice(0, 3).map((p) => <Avatar key={p.id} id={p.id} size={26} />)}</span>
            <Button variant="ghost" size="sm" className="hidden sm:inline-flex"><History size={15} /> History</Button>
            <Button size="sm">Share</Button>
          </div>
        </div>

        {/* Toolbar */}
        <div className="no-scrollbar mx-3 mt-2 flex h-10 items-center overflow-x-auto rounded-xl bg-white/[0.04] px-2">
          <Chip>100%</Chip><Chip>Inter</Chip><Chip>13</Chip><Sep />
          {GROUPS.map((g, gi) => (<React.Fragment key={gi}>{g.map((t) => <ToolBtn key={t.t} {...t} on={fmt.has(t.t)} onClick={() => toggle(t.t)} />)}<Sep /></React.Fragment>))}
          {SMART.map((t) => <ToolBtn key={t.t} {...t} accent />)}
        </div>

        {/* Formula bar */}
        <div className="mt-2 flex h-8 items-center gap-2 px-4">
          <span className="flex h-7 w-16 items-center justify-center rounded-md border border-white/10 text-[12px] tabular-nums text-white/70">{letter(f.c)}{f.r + 1}</span>
          <span className="font-display text-sm italic text-white/40">fx</span>
          <input readOnly={!edit} value={edit ? draft : String(row?.[vis[f.c]?.id] ?? '')} onChange={(e) => setDraft(e.target.value)} className="h-7 flex-1 rounded-md bg-transparent px-2 text-[13px] outline-none focus:bg-white/[0.05]" aria-label="Cell value" />
          <div className="flex gap-1">
            <button aria-label="Toggle sidebar" onClick={() => setLeftOpen((o) => !o)} className={`rounded-md p-1.5 hover:bg-white/[0.07] ${leftOpen ? 'text-brand-emerald' : 'text-white/50'}`}><PanelLeft size={16} /></button>
            <button aria-label="Toggle details" onClick={() => setRightOpen((o) => !o)} className={`rounded-md p-1.5 hover:bg-white/[0.07] ${rightOpen ? 'text-brand-emerald' : 'text-white/50'}`}><PanelRight size={16} /></button>
          </div>
        </div>

        {/* Contextual action bar: reacts to selection */}
        <div className="no-scrollbar flex h-10 items-center gap-2 overflow-x-auto border-y border-white/[0.06] bg-brand-emerald/[0.04] px-4 text-[13px]">
          <span className="shrink-0 text-white/70">{nRows === 1 ? <><span className="tabular-nums text-white/45">{row.key}</span> {row.title || 'Untitled'}</> : `${nRows} rows selected`}</span>
          <Sep />
          <label className="flex shrink-0 items-center gap-1.5 text-white/50">Status
            <select value="" onChange={(e) => e.target.value && setSelRows('status', e.target.value)} className="h-7 rounded-md border border-white/10 bg-brand-field px-2 text-[12px] text-white/80 outline-none"><option value="">Set…</option>{STATUS_KEYS.map((k) => <option key={k} value={k}>{STATUS[k].label}</option>)}</select></label>
          <label className="flex shrink-0 items-center gap-1.5 text-white/50">Owner
            <select value="" onChange={(e) => e.target.value && setSelRows('owner', e.target.value)} className="h-7 rounded-md border border-white/10 bg-brand-field px-2 text-[12px] text-white/80 outline-none"><option value="">Assign…</option>{PEOPLE.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}</select></label>
          <Button variant="subtle" size="sm" className="h-7 shrink-0" onClick={() => setToast(`Ran “Notify reviewer” on ${nRows} row${nRows > 1 ? 's' : ''}`)}><Zap size={13} className="text-brand-emerald" /> Run automation</Button>
          <Button variant="ghost" size="sm" className="h-7 shrink-0" onClick={() => { setRightOpen(true); setTab('details'); }}><MessageSquare size={13} /> Comment</Button>
        </div>

        {/* Body: left panel | grid | right panel */}
        <div className="flex min-h-0 flex-1">
          {leftOpen && (
            <aside className="hidden w-56 shrink-0 overflow-y-auto border-r border-white/[0.06] p-3 text-[13px] md:block">
              <p className="px-2 pb-2 text-[10px] font-medium uppercase tracking-[0.2em] text-brand-emerald/70">Views</p>
              {[['Grid', Table2, true], ['Board', LayoutGrid, false], ['Calendar', Calendar, false]].map(([n, Icon, on]) => { const I = Icon as LucideIcon; return (
                <button key={n as string} className={`flex w-full items-center gap-2 rounded-lg px-2 py-1.5 ${on ? 'bg-white/[0.09] text-brand-light' : 'text-white/55 hover:bg-white/[0.05]'}`}><I size={15} />{n as string}</button>); })}
              <p className="px-2 pb-2 pt-6 text-[10px] font-medium uppercase tracking-[0.2em] text-brand-emerald/70">Saved filters</p>
              {['Assigned to me', 'Due this week', 'Blocked'].map((n) => <button key={n} className="flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-white/55 hover:bg-white/[0.05]"><Filter size={14} />{n}</button>)}
              <p className="px-2 pb-2 pt-6 text-[10px] font-medium uppercase tracking-[0.2em] text-brand-emerald/70">Columns</p>
              {COLS.map((c) => { const I = TYPE_ICON[c.type]; const off = hidden.has(c.id); return (
                <button key={c.id} onClick={() => setHidden((h) => { const n = new Set(h); off ? n.delete(c.id) : n.add(c.id); return n; })} className="flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-white/55 hover:bg-white/[0.05]">
                  <I size={14} /><span className={`flex-1 text-left ${off ? 'line-through opacity-50' : ''}`}>{c.title}</span>{off ? <EyeOff size={14} /> : <Eye size={14} />}</button>); })}
            </aside>
          )}

          <div ref={gridRef} tabIndex={0} onKeyDown={onKey} role="grid" aria-label="Spreadsheet" className="min-w-0 flex-1 overflow-auto outline-none">
            <div style={{ width: total }} className="text-[13px]">
              <div style={{ gridTemplateColumns: gridCols }} className="sticky top-0 z-20 grid h-8 bg-[#0b131b]">
                <div className="sticky left-0 z-30 border-b border-r border-white/[0.07] bg-[#0b131b]" />
                {vis.map((c, ci) => { const I = TYPE_ICON[c.type]; const sel = ci >= c1 && ci <= c2; return (
                  <button key={c.id} onClick={() => { setAnchor({ r: 0, c: ci }); setFocus({ r: maxR, c: ci }); }} className={`flex items-center gap-1.5 border-b border-r border-white/[0.07] px-3 text-left text-[12px] ${sel ? 'bg-brand-emerald/10 text-brand-emerald' : 'text-white/55'}`}>
                    <I size={13} /><span className="flex-1 truncate">{c.title}</span><span className="text-[10px] opacity-50">{letter(ci)}</span></button>); })}
                <button onClick={() => setToast('Column editor is a placeholder in this skeleton')} className="flex items-center justify-center border-b border-white/[0.07] text-white/40 hover:text-brand-emerald" aria-label="Add column"><Plus size={14} /></button>
              </div>

              {rows.map((rw, r) => (
                <div key={rw.key as string} style={{ gridTemplateColumns: gridCols }} className="grid h-9">
                  <button onClick={() => { setAnchor({ r, c: 0 }); setFocus({ r, c: maxC }); }} className={`sticky left-0 z-10 flex items-center justify-center border-b border-r border-white/[0.07] bg-[#0b131b] text-[11px] tabular-nums ${r >= r1 && r <= r2 ? 'text-brand-emerald' : 'text-white/35'}`}>{r + 1}</button>
                  {vis.map((col, c) => {
                    const isF = f.r === r && f.c === c;
                    return (
                      <div key={col.id} role="gridcell" aria-selected={inSel(r, c)}
                        onMouseDown={(e) => { if (e.shiftKey) setFocus({ r, c }); else { setAnchor({ r, c }); setFocus({ r, c }); } dragging.current = true; }}
                        onMouseEnter={() => dragging.current && setFocus({ r, c })}
                        onDoubleClick={() => startEdit({ r, c })}
                        className={`relative flex items-center border-b border-r border-white/[0.05] px-3 ${inSel(r, c) ? 'bg-brand-emerald/[0.07]' : ''} ${isF ? 'z-[5] ring-2 ring-inset ring-brand-emerald shadow-[0_0_14px_rgba(0,223,130,0.25)]' : ''}`}>
                        {edit && edit.r === r && edit.c === c ? editor(col) : <CellView col={col} v={rw[col.id]} />}
                      </div>
                    );
                  })}
                  <div className="border-b border-white/[0.05]" />
                </div>
              ))}
              <button onClick={addRow} className="flex h-9 w-full items-center gap-2 px-16 text-[13px] text-white/40 hover:bg-white/[0.03] hover:text-brand-emerald"><Plus size={14} /> New row</button>
            </div>
          </div>

          {rightOpen && (
            <aside className="hidden w-80 shrink-0 flex-col border-l border-white/[0.06] lg:flex">
              <div className="flex gap-1 border-b border-white/[0.06] p-2">
                {(['details', 'automations', 'activity'] as const).map((t) => <button key={t} onClick={() => setTab(t)} className={`flex-1 rounded-lg py-1.5 text-[11px] uppercase tracking-widest ${tab === t ? 'bg-white/[0.1] text-brand-light' : 'text-white/50 hover:bg-white/[0.05]'}`}>{t}</button>)}
              </div>
              <div className="flex-1 space-y-5 overflow-y-auto p-4 text-[13px]">
                {tab === 'details' && row && (<>
                  <div><p className="tabular-nums text-xs text-white/40">{row.key}</p><h3 className="mt-1 text-lg font-medium leading-snug">{row.title || 'Untitled document'}</h3><p className="text-white/45">{row.client}</p></div>
                  <dl className="space-y-3">
                    <div className="flex items-center justify-between"><dt className="text-white/45">Status</dt><dd><select value={String(row.status)} onChange={(e) => setCell(f.r, 'status', e.target.value)} className="rounded-md border border-white/10 bg-brand-field px-2 py-1 text-[12px] outline-none">{STATUS_KEYS.map((k) => <option key={k} value={k}>{STATUS[k].label}</option>)}</select></dd></div>
                    <div className="flex items-center justify-between"><dt className="text-white/45">Owner</dt><dd><select value={String(row.owner)} onChange={(e) => setCell(f.r, 'owner', e.target.value)} className="rounded-md border border-white/10 bg-brand-field px-2 py-1 text-[12px] outline-none">{PEOPLE.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}</select></dd></div>
                    <div className="flex items-center justify-between"><dt className="text-white/45">Due</dt><dd><input type="date" value={String(row.due)} onChange={(e) => setCell(f.r, 'due', e.target.value)} className="rounded-md border border-white/10 bg-brand-field px-2 py-1 text-[12px] outline-none [color-scheme:dark]" /></dd></div>
                    <div className="flex items-center justify-between"><dt className="text-white/45">Amount</dt><dd className="tabular-nums">{fmtMoney(Number(row.amount))}</dd></div>
                    <div><div className="mb-1.5 flex justify-between"><dt className="text-white/45">Progress</dt><dd className="tabular-nums text-white/60">{row.progress}%</dd></div><div className="h-1.5 overflow-hidden rounded-full bg-white/10"><div className="h-full bg-brand-emerald" style={{ width: `${row.progress}%` }} /></div></div>
                  </dl>
                  <div><p className="mb-2 text-[10px] font-medium uppercase tracking-[0.2em] text-brand-emerald/70">Comments</p><textarea rows={3} placeholder="Add a comment" className="w-full resize-none rounded-xl border border-white/10 bg-white/[0.04] p-3 outline-none placeholder:text-white/30 focus:border-brand-emerald/40" /></div>
                </>)}
                {tab === 'automations' && (<>
                  {rules.map((r) => (
                    <div key={r.id} className="flex items-start gap-3 rounded-xl surface p-3"><div className="flex-1"><p className="font-medium">{r.name}</p><p className="mt-0.5 text-xs text-white/45">{r.trigger}</p></div>
                      <Switch on={r.on} onChange={() => setRules(rules.map((x) => (x.id === r.id ? { ...x, on: !x.on } : x)))} /></div>))}
                  <button className="flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-white/15 py-3 text-white/50 hover:border-brand-emerald/40 hover:text-brand-emerald"><Plus size={14} /> New rule</button>
                </>)}
                {tab === 'activity' && ACTIVITY.map((a, i) => (
                  <div key={i} className="flex gap-3"><Avatar id={a.who} size={24} /><p className="flex-1 text-white/65">{PEOPLE.find((p) => p.id === a.who)?.name.split(' ')[0]} {a.text}<span className="block text-xs text-white/35">{a.when}</span></p></div>))}
              </div>
            </aside>
          )}
        </div>

        {/* Sheet tabs + status bar */}
        <div className="flex h-10 items-center gap-1 border-t border-white/[0.06] px-3 text-[13px]">
          <button aria-label="Add sheet" className="rounded-md p-1.5 text-white/50 hover:bg-white/[0.07]"><Plus size={15} /></button>
          {['Pipeline', 'Compliance', 'Archive'].map((t) => <button key={t} onClick={() => setSheetTab(t)} className={`rounded-md px-3 py-1 ${sheetTab === t ? 'bg-white/[0.1] text-brand-light' : 'text-white/50 hover:bg-white/[0.05]'}`}>{t}</button>)}
          <div className="ml-auto flex items-center gap-5 text-xs text-white/50">
            {toast && <span className="flex items-center gap-1.5 text-brand-emerald"><Check size={13} />{toast}</span>}
            {nums.length > 0 && <><span>Sum <span className="tabular-nums text-white/80">{sum.toLocaleString('en-MY')}</span></span><span>Average <span className="tabular-nums text-white/80">{Math.round(sum / nums.length).toLocaleString('en-MY')}</span></span></>}
            <span>Count <span className="tabular-nums text-white/80">{nRows * (c2 - c1 + 1)}</span></span>
            <span className="hidden sm:inline tabular-nums">{rows.length} rows</span>
          </div>
        </div>
      </div>
    </div>
  );
}
