// Drop in: src/pages/Entry.tsx
// The isolated front door: one shared backdrop, Welcome <-> Login transition. Routes: #/ and #/login.
import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Backdrop } from '../components/Backdrop';
import { Welcome } from './Welcome';
import { Login } from './Login';

const read = () => (window.location.hash === '#/login' ? 'login' : 'welcome');
const ease = [0.16, 1, 0.3, 1] as const;

export default function Entry({ onSignIn }: { onSignIn?: () => void }) {
  const [view, setView] = useState<'welcome' | 'login'>(read);

  useEffect(() => {
    const onHash = () => setView(read());
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Enter' && read() === 'welcome' && e.target === document.body) window.location.hash = '#/login';
      if (e.key === 'Escape' && read() === 'login') window.location.hash = '#/';
    };
    window.addEventListener('hashchange', onHash);
    window.addEventListener('keydown', onKey);
    return () => { window.removeEventListener('hashchange', onHash); window.removeEventListener('keydown', onKey); };
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden bg-brand-dark text-brand-light">
      <Backdrop deep={view === 'login'} />
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={view}
          className="relative z-10"
          initial={{ opacity: 0, scale: view === 'login' ? 0.96 : 1.08, filter: 'blur(12px)' }}
          animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          exit={{ opacity: 0, scale: view === 'login' ? 0.96 : 1.12, filter: 'blur(12px)' }}
          transition={{ duration: 0.7, ease }}
        >
          {view === 'welcome' ? <Welcome /> : <Login onSubmit={onSignIn} />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
