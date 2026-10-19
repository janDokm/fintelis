import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { Magnetic } from './Magnetic';
import { TextScramble } from './TextScramble';

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    const x = (clientX / innerWidth - 0.5) * 60;
    const y = (clientY / innerHeight - 0.5) * 60;
    setMousePos({ x, y });
  };

  const titleWords1 = "Fluid Capital.".split(" ");
  const titleWords2 = "Precision Flow.".split(" ");

  return (
    <section 
      ref={containerRef}
      id="home" 
      className="relative min-h-screen flex items-center pt-32 pb-16 overflow-hidden bg-brand-dark"
      onMouseMove={handleMouseMove}
    >
      {/* Abstract Financial Market / Money Exchange Visuals */}
      <motion.div style={{ y }} className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center">
        {/* Glowing Liquidity Core */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(0,223,130,0.05)_0%,_transparent_60%)]" />
        
        {/* Rotating Abstract "Coin/Currency" Rings */}
        <motion.div 
          animate={{ rotateX: mousePos.y * 2, rotateY: mousePos.x * 2, rotateZ: 360 }}
          transition={{ rotateZ: { repeat: Infinity, duration: 40, ease: "linear" }, type: "spring", stiffness: 20, damping: 30 }}
          className="absolute w-[600px] h-[600px] rounded-full border border-brand-emerald/20 border-x-brand-gold/30"
          style={{ transformStyle: "preserve-3d" }}
        />
        <motion.div 
          animate={{ rotateX: mousePos.y * -1.5, rotateY: mousePos.x * 1.5, rotateZ: -360 }}
          transition={{ rotateZ: { repeat: Infinity, duration: 35, ease: "linear" }, type: "spring", stiffness: 30, damping: 20 }}
          className="absolute w-[450px] h-[450px] rounded-full border border-white/5 border-y-brand-emerald/30"
          style={{ transformStyle: "preserve-3d" }}
        />
        <motion.div 
          animate={{ rotateX: mousePos.y * 1, rotateY: mousePos.x * -2, rotateZ: 360 }}
          transition={{ rotateZ: { repeat: Infinity, duration: 50, ease: "linear" }, type: "spring", stiffness: 25, damping: 25 }}
          className="absolute w-[300px] h-[300px] rounded-full border border-brand-gold/10 border-x-white/10"
          style={{ transformStyle: "preserve-3d" }}
        />
        
        {/* Trading Terminal Grid */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+CjxwYXRoIGQ9Ik0wIDBoNDB2NDBIMHoiIGZpbGw9Im5vbmUiLz4KPHBhdGggZD0iTTAgMGg0MHY0MEgweiIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMDMpIiBzdHJva2Utd2lkdGg9IjEiLz4KPC9zdmc+')] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_80%)] -z-10" />
      </motion.div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-brand-emerald/20 bg-brand-emerald/5 backdrop-blur-md text-brand-emerald text-xs font-medium uppercase tracking-[0.2em] mb-8"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-emerald opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-emerald"></span>
            </span>
            Algorithmic Wealth Exchange
          </motion.div>
          
          <h1 className="text-5xl md:text-7xl lg:text-[7rem] font-display font-medium text-brand-light leading-[1] tracking-tight mb-8">
            <div className="overflow-hidden pb-2">
              {titleWords1.map((word, i) => (
                <motion.span
                  key={i}
                  initial={{ y: "100%", opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className="inline-block mr-4 md:mr-6 text-transparent bg-clip-text bg-gradient-to-r from-white to-white/70"
                >
                  {word}
                </motion.span>
              ))}
            </div>
            <div className="overflow-hidden pb-4">
              {titleWords2.map((word, i) => (
                <motion.span
                  key={i}
                  initial={{ y: "100%", opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.2 + (i * 0.1), ease: [0.16, 1, 0.3, 1] }}
                  className="inline-block mr-4 md:mr-6 text-transparent bg-clip-text bg-gradient-to-r from-brand-emerald to-brand-gold"
                >
                  {word}
                </motion.span>
              ))}
            </div>
          </h1>
          
          <motion.p
            initial={{ opacity: 0, filter: "blur(10px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            transition={{ duration: 1, delay: 0.6 }}
            className="text-lg md:text-xl text-brand-light/60 mb-12 max-w-2xl font-light tracking-wide leading-relaxed border-l border-brand-emerald/30 pl-6"
          >
            Unlocking capital velocity across borders. We deploy high-frequency structural strategies to optimize liquidity and secure asset dominancy.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-6"
          >
            <Magnetic>
              <a
                href="#services"
                className="group relative inline-flex justify-center items-center gap-3 px-8 py-4 rounded-full bg-brand-light text-brand-dark text-sm font-medium uppercase tracking-[0.15em] overflow-hidden transition-all duration-500 hover:shadow-[0_0_40px_rgba(255,255,255,0.2)]"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-brand-emerald/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <span className="relative z-10 flex items-center gap-2">
                  <TextScramble text="Initialize Protocol" />
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </a>
            </Magnetic>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
