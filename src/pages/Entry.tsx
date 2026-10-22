// Drop in: src/pages/Entry.tsx
// The isolated front door: one shared backdrop, Welcome <-> Login transition. Routes: #/, #/login and #/signup.
import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Backdrop } from '../components/Backdrop';
import { Welcome } from './Welcome';
import { Login } from './Login';
import { Signup } from './Signup';

type View = 'welcome' | 'login' | 'signup';
const read = (): View => (window.location.hash === '#/login' ? 'login' : window.location.hash === '#/signup' ? 'signup' : 'welcome');
const ease = [0.16, 1, 0.3, 1] as const;

export default function Entry() {
  const [view, setView] = useState<View>(read);

  useEffect(() => {
    const onHash = () => setView(read());
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Enter' && read() === 'welcome' && e.target === document.body) window.location.hash = '#/login';
      if (e.key === 'Escape' && read() === 'login') window.location.hash = '#/';
      if (e.key === 'Escape' && read() === 'signup') window.location.hash = '#/login';
    };
    window.addEventListener('hashchange', onHash);
    window.addEventListener('keydown', onKey);
    return () => { window.removeEventListener('hashchange', onHash); window.removeEventListener('keydown', onKey); };
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden bg-brand-dark text-brand-light">
      <Backdrop deep={view !== 'welcome'} />
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={view}
          className="relative z-10"
          initial={{ opacity: 0, scale: view !== 'welcome' ? 0.96 : 1.08, filter: 'blur(12px)' }}
          animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          exit={{ opacity: 0, scale: view !== 'welcome' ? 0.96 : 1.12, filter: 'blur(12px)' }}
          transition={{ duration: 0.7, ease }}
        >
          {view === 'welcome' ? <Welcome /> : view === 'login' ? <Login /> : <Signup />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
