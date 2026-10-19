import { FileText } from 'lucide-react';
import { NAV } from '../components/Shell';
import { Button, Eyebrow } from '../components/ui';
import { Magnetic } from '../components/Magnetic';
import { TextScramble } from '../components/TextScramble';
import { go } from '../lib/router';

export function Placeholder({ route }: { route: string }) {
  const item = NAV.find((n) => n.to === route);
  const Icon = item?.icon ?? FileText;
  return (
    <div className="relative flex min-h-[70vh] items-center justify-center overflow-hidden px-6 py-24">
      <div className="grid-bg pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_70%)]" />
      <div className="relative flex max-w-md flex-col items-center text-center">
        <span className="mb-8 flex h-16 w-16 items-center justify-center rounded-full border border-white/10 bg-white/5"><Icon size={26} className="text-brand-emerald" /></span>
        <Eyebrow>{item ? 'Ready to build' : 'Not found'}</Eyebrow>
        <h1 className="text-4xl font-medium">{item?.label ?? 'Page not found'}</h1>
        <p className="mt-4 font-light text-brand-light/55">{item ? 'This page is scaffolded. Start from the sheet template in the meantime.' : 'That address doesn’t match any page.'}</p>
        <Magnetic wrapperClass="mt-10 inline-block"><Button size="lg" onClick={() => go(item ? '/sheet' : '/')}><TextScramble text={item ? 'Open sheet template' : 'Go home'} /></Button></Magnetic>
      </div>
    </div>
  );
}
