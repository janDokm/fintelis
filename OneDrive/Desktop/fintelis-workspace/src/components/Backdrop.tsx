// Drop in: src/components/Backdrop.tsx
// Immersive background: flow-field canvas that swirls around the pointer + grid + your Hero's rotating rings.
import { useEffect, useRef } from 'react';

export function Mark({ size = 52 }: { size?: number }) {
  // Same emerald-ring "F" mark as your Navbar, scaled up.
  return (
    <span style={{ width: size, height: size }} className="relative inline-flex items-center justify-center overflow-hidden rounded-full border border-brand-emerald/30 bg-brand-emerald/5 font-display font-medium text-brand-light shadow-[0_0_24px_rgba(0,223,130,0.18)]">
      <span className="absolute inset-0 bg-gradient-to-tr from-brand-emerald/20 to-transparent opacity-60" />
      <span className="relative" style={{ fontSize: size * 0.42 }}>F</span>
    </span>
  );
}

type P = { x: number; y: number; g: boolean; s: number };

export function Backdrop({ deep = false }: { deep?: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ringsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cv = canvasRef.current!;
    const cx = cv.getContext('2d')!;
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const m = { x: -999, y: -999 };
    let W = 0, H = 0, t = 0, raf = 0, ps: P[] = [];
    const seed = (): P => ({ x: Math.random() * W, y: Math.random() * H, g: Math.random() < 0.18, s: 0.5 + Math.random() * 1.1 });

    const size = () => {
      const D = Math.min(devicePixelRatio || 1, 2);
      W = innerWidth; H = innerHeight;
      cv.width = W * D; cv.height = H * D;
      cx.setTransform(D, 0, 0, D, 0, 0);
      cx.fillStyle = '#050a0f'; cx.fillRect(0, 0, W, H);
      ps = Array.from({ length: Math.round(Math.min(900, (W * H) / 2400)) }, seed);
    };

    const step = () => {
      t++;
      cx.fillStyle = 'rgba(5,10,15,.07)'; cx.fillRect(0, 0, W, H); cx.lineWidth = 1;
      for (const p of ps) {
        const a = Math.sin(p.x * 0.0018 + t * 0.003) * Math.cos(p.y * 0.0016 - t * 0.002) * 6.283;
        let vx = Math.cos(a) * p.s, vy = Math.sin(a) * p.s;
        const dx = p.x - m.x, dy = p.y - m.y, d = Math.hypot(dx, dy) + 0.001;
        if (d < 210) { const k = (1 - d / 210) * 2.4; vx += (-dy / d) * k; vy += (dx / d) * k; }
        const nx = p.x + vx, ny = p.y + vy;
        cx.strokeStyle = p.g ? 'rgba(212,175,55,.5)' : 'rgba(0,223,130,.45)';
        cx.beginPath(); cx.moveTo(p.x, p.y); cx.lineTo(nx, ny); cx.stroke();
        p.x = nx; p.y = ny;
        if (nx < 0 || nx > W || ny < 0 || ny > H || Math.random() < 0.003) Object.assign(p, seed());
      }
    };
    const loop = () => { step(); raf = requestAnimationFrame(loop); };

    const move = (e: PointerEvent) => {
      m.x = e.clientX; m.y = e.clientY;
      if (ringsRef.current) ringsRef.current.style.translate = `${(e.clientX / innerWidth - 0.5) * 18}px ${(e.clientY / innerHeight - 0.5) * 18}px`;
    };
    const leave = () => { m.x = m.y = -999; };

    size();
    if (reduce) for (let i = 0; i < 260; i++) step(); else loop();
    addEventListener('resize', size);
    addEventListener('pointermove', move);
    document.addEventListener('pointerleave', leave);
    return () => {
      cancelAnimationFrame(raf);
      removeEventListener('resize', size);
      removeEventListener('pointermove', move);
      document.removeEventListener('pointerleave', leave);
    };
  }, []);

  const ease = 'cubic-bezier(0.16,1,0.3,1)';
  return (
    <div aria-hidden className="fixed inset-0 overflow-hidden bg-brand-dark">
      <canvas ref={canvasRef} className="absolute inset-0 block h-full w-full" />
      <div className="absolute inset-0 [background-image:linear-gradient(rgba(255,255,255,.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.035)_1px,transparent_1px)] [background-size:40px_40px] [mask-image:radial-gradient(ellipse_at_center,black_15%,transparent_70%)]" />
      <div ref={ringsRef} className="pointer-events-none absolute inset-0 flex items-center justify-center" style={{ scale: deep ? 1.55 : 1, opacity: deep ? 0.4 : 1, transition: `scale 1.4s ${ease}, opacity 1.4s ${ease}` }}>
        <div className="absolute h-[min(82vmin,680px)] w-[min(82vmin,680px)] animate-[spin_40s_linear_infinite] rounded-full border border-brand-emerald/20 border-x-brand-gold/30" />
        <div className="absolute h-[min(60vmin,500px)] w-[min(60vmin,500px)] animate-[spin_35s_linear_infinite_reverse] rounded-full border border-white/5 border-y-brand-emerald/30" />
        <div className="absolute h-[min(40vmin,330px)] w-[min(40vmin,330px)] animate-[spin_50s_linear_infinite] rounded-full border border-brand-gold/10 border-x-white/10" />
      </div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent_30%,rgba(5,10,15,0.85)_100%)]" />
    </div>
  );
}
