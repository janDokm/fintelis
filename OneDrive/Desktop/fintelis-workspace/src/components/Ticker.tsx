import { motion } from 'motion/react';
import { ROWS, STATUS, STATUS_KEYS } from '../lib/data';

// Same marquee as fintelis-main, fed by live pipeline counts instead of market tickers.
const TONE: Record<string, string> = { draft: 'text-brand-light/70', review: 'text-brand-gold', approved: 'text-brand-emerald', blocked: 'text-brand-crimson', done: 'text-brand-light/70' };

export function Ticker() {
  const items = [...STATUS_KEYS, ...STATUS_KEYS].map((k) => ({ k, text: STATUS[k].label, val: String(ROWS.filter((r) => r.status === k).length) }));
  return (
    <div className="relative z-20 flex overflow-hidden whitespace-nowrap border-y border-white/5 bg-brand-slate/30 py-4 backdrop-blur-sm">
      <motion.div initial={{ x: 0 }} animate={{ x: '-50%' }} transition={{ repeat: Infinity, ease: 'linear', duration: 25 }} className="flex items-center gap-12 font-display text-sm font-medium uppercase tracking-widest md:text-base">
        {items.map((it, i) => (
          <div key={i} className="flex items-center gap-12">
            <div className="flex items-center gap-3"><span className={TONE[it.k]}>{it.text}</span><span className="text-xs text-brand-emerald">{it.val}</span></div>
            <span className="h-1.5 w-1.5 rounded-full bg-white/20" />
          </div>
        ))}
      </motion.div>
    </div>
  );
}
