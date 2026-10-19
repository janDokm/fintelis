// Drop in: src/pages/Welcome.tsx
// Isolated welcome screen: says nothing about the product, one button to Login.
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { Magnetic } from '../components/Magnetic';
import { TextScramble } from '../components/TextScramble';
import { Mark } from '../components/Backdrop';

const ease = [0.16, 1, 0.3, 1] as const;

export function Welcome({ loginHref = '#/login' }: { loginHref?: string }) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.4, delay: 0.2, ease }}>
        <Mark />
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 12, filter: 'blur(16px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        transition={{ duration: 1.6, delay: 0.6, ease }}
        className="mt-9 text-[clamp(46px,10vw,124px)] font-medium leading-none"
      >
        <span className="block bg-gradient-to-r from-white to-white/70 bg-clip-text pb-2 text-transparent">Welcome to</span>
        <span className="block bg-gradient-to-r from-brand-emerald to-brand-gold bg-clip-text pb-2 text-transparent">Fintelis.</span>
      </motion.h1>

      <motion.div className="mt-14" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.4, delay: 1.6, ease }}>
        <Magnetic>
          <a href={loginHref} className="group inline-flex items-center gap-3 rounded-full bg-brand-light px-9 py-4 text-xs font-medium uppercase tracking-[0.2em] text-brand-dark transition-all duration-500 hover:shadow-[0_0_44px_rgba(255,255,255,0.25)]">
            <TextScramble text="Enter" />
            <ArrowRight className="h-[18px] w-[18px] transition-transform group-hover:translate-x-1" />
          </a>
        </Magnetic>
      </motion.div>
    </div>
  );
}
