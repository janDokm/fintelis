// Mock data. Replace with API calls later; shapes are intentionally close to what a backend would return.
export type StatusKey = 'draft' | 'review' | 'approved' | 'blocked' | 'done';

export const STATUS: Record<StatusKey, { label: string; dot: string; text: string; bg: string }> = {
  draft:    { label: 'Draft',     dot: 'bg-white/40',        text: 'text-white/70',       bg: 'bg-white/[0.08]' },
  review:   { label: 'In review', dot: 'bg-brand-gold',      text: 'text-brand-gold',     bg: 'bg-brand-gold/10' },
  approved: { label: 'Approved',  dot: 'bg-brand-emerald',   text: 'text-brand-emerald',  bg: 'bg-brand-emerald/10' },
  blocked:  { label: 'Blocked',   dot: 'bg-brand-crimson',   text: 'text-brand-crimson',  bg: 'bg-brand-crimson/10' },
  done:     { label: 'Done',      dot: 'bg-sky-400',         text: 'text-sky-300',        bg: 'bg-sky-400/10' },
};
export const STATUS_KEYS = Object.keys(STATUS) as StatusKey[];

export const PEOPLE = [
  { id: 'at', name: 'Alex Tan', hue: 160 },
  { id: 'nr', name: 'Nadia Rahman', hue: 40 },
  { id: 'jl', name: 'Jun Lee', hue: 210 },
  { id: 'sm', name: 'Siti Mansor', hue: 330 },
];

export type ColType = 'key' | 'text' | 'status' | 'person' | 'date' | 'money' | 'progress';
export interface Col { id: string; title: string; type: ColType; width: number }
export type Row = Record<string, string | number>;

export const COLS: Col[] = [
  { id: 'key', title: 'Key', type: 'key', width: 90 },
  { id: 'title', title: 'Document', type: 'text', width: 240 },
  { id: 'client', title: 'Client', type: 'text', width: 170 },
  { id: 'type', title: 'Category', type: 'text', width: 120 },
  { id: 'status', title: 'Status', type: 'status', width: 130 },
  { id: 'owner', title: 'Owner', type: 'person', width: 160 },
  { id: 'due', title: 'Due', type: 'date', width: 100 },
  { id: 'amount', title: 'Amount', type: 'money', width: 130 },
  { id: 'progress', title: 'Progress', type: 'progress', width: 150 },
];

const iso = (d: number) => new Date(Date.UTC(2026, 9, 19 + d)).toISOString().slice(0, 10);
const DOCS = ['Loan application pack', 'KYC verification', 'Property valuation report', 'Income statement review', 'Insurance policy schedule', 'Sale & purchase agreement', 'Letter of offer', 'Credit report summary', 'Stamp duty receipt', 'Risk assessment', 'Disbursement memo', 'Renewal notice'];
const CLIENTS = ['Lim Holdings', 'Haziq & Co.', 'Orchid Residences', 'Tan Family Trust', 'Meridian Logistics', 'Kasih Bakery', 'Orbit Dental'];
const CATS = ['Mortgage', 'Insurance', 'Compliance', 'Investment'];

export const ROWS: Row[] = Array.from({ length: 28 }, (_, i) => {
  const status = STATUS_KEYS[(i * 3 + (i % 4)) % 5];
  const progress = status === 'done' ? 100 : status === 'approved' ? 90 : status === 'draft' ? (i * 7) % 30 : 30 + ((i * 11) % 50);
  return {
    key: `FIN-${101 + i}`,
    title: DOCS[i % DOCS.length],
    client: CLIENTS[(i * 5) % CLIENTS.length],
    type: CATS[i % CATS.length],
    status,
    owner: PEOPLE[(i * 2 + 1) % PEOPLE.length].id,
    due: iso(((i * 5) % 21) - 4),
    amount: ((i * 37) % 90 + 10) * 5000,
    progress,
  };
});

export const fmtDate = (s: string) => (s ? new Date(`${s}T00:00:00Z`).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', timeZone: 'UTC' }) : '');
export const fmtMoney = (n: number) => `RM ${n.toLocaleString('en-MY')}`;
export const TODAY = iso(0);

export const ACTIVITY = [
  { who: 'nr', text: 'approved Letter of offer', ref: 'FIN-107', when: '12 min ago' },
  { who: 'jl', text: 'commented on KYC verification', ref: 'FIN-102', when: '1 hr ago' },
  { who: 'sm', text: 'moved Risk assessment to In review', ref: 'FIN-110', when: '3 hr ago' },
  { who: 'at', text: 'uploaded Stamp duty receipt', ref: 'FIN-109', when: 'Yesterday' },
];

export const RULES = [
  { id: 'r1', name: 'Notify reviewer', trigger: 'When status becomes In review', on: true },
  { id: 'r2', name: 'Escalate overdue items', trigger: 'When due date passes and status is not Done', on: true },
  { id: 'r3', name: 'Archive completed', trigger: 'When status is Done for 14 days', on: false },
];
