import React, { useRef } from 'react';
import { motion, useMotionValue, useTransform } from 'motion/react';

// Extracted from fintelis-main Services.tsx: same perspective tilt + glass card + coloured hover glow.
export const GLOW = {
  emerald: 'group-hover:border-brand-emerald/50 group-hover:shadow-[0_0_30px_rgba(0,223,130,0.1)]',
  crimson: 'group-hover:border-brand-crimson/50 group-hover:shadow-[0_0_30px_rgba(255,42,66,0.1)]',
  gold: 'group-hover:border-brand-gold/50 group-hover:shadow-[0_0_30px_rgba(212,175,55,0.1)]',
  white: 'group-hover:border-white/50 group-hover:shadow-[0_0_30px_rgba(255,255,255,0.1)]',
};

export const TiltCard: React.FC<{ glow?: keyof typeof GLOW; className?: string; delay?: number; children: React.ReactNode }> = ({ glow = 'emerald', className = '', delay = 0, children }) => {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0), y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [6, -6]);
  const rotateY = useTransform(x, [-100, 100], [-6, 6]);
  const move = (e: React.MouseEvent) => { if (!ref.current) return; const r = ref.current.getBoundingClientRect(); x.set(e.clientX - r.left - r.width / 2); y.set(e.clientY - r.top - r.height / 2); };
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }} onMouseMove={move} onMouseLeave={() => { x.set(0); y.set(0); }} style={{ perspective: 1200 }} className="h-full">
      <motion.div style={{ rotateX, rotateY }} transition={{ type: 'spring', stiffness: 400, damping: 30 }} className={`group surface h-full rounded-2xl transition-all duration-500 ${GLOW[glow]} ${className}`}>{children}</motion.div>
    </motion.div>
  );
};
