import React from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { Magnetic } from './Magnetic';
import { TextScramble } from './TextScramble';

export function About() {
  return (
    <section id="about" className="py-32 bg-brand-dark relative overflow-hidden text-brand-light border-y border-white/5">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_rgba(212,175,55,0.05)_0%,_transparent_50%)] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 items-center bg-brand-slate/20 rounded-3xl border border-white/5 overflow-hidden backdrop-blur-sm">
          
          <motion.div
            initial={{ opacity: 0, filter: "blur(20px)" }}
            whileInView={{ opacity: 1, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="lg:col-span-5 relative h-full min-h-[400px] lg:min-h-full overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-brand-emerald/10 to-transparent mix-blend-overlay z-10" />
            <img 
              src="https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80" 
              alt="Global Markets Data" 
              className="absolute inset-0 w-full h-full object-cover grayscale opacity-60 hover:opacity-100 hover:grayscale-0 transition-all duration-1000"
            />
            <div className="absolute bottom-8 left-8 z-20">
              <div className="backdrop-blur-md bg-brand-dark/60 border border-white/10 rounded-2xl p-6">
                 <h3 className="font-display font-medium text-3xl tracking-tight text-white">Est. 2019</h3>
                 <div className="flex items-center gap-2 mt-2">
                   <span className="w-2 h-2 rounded-full bg-brand-emerald animate-pulse"></span>
                   <p className="text-brand-emerald text-xs font-medium uppercase tracking-widest">Global Operations</p>
                 </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 p-8 md:p-16 flex flex-col justify-center"
          >
            <h2 className="text-brand-gold font-medium tracking-[0.2em] uppercase text-xs mb-6 flex items-center gap-4">
              <span className="w-8 h-px bg-brand-gold/50" />
              The Framework
            </h2>
            <h3 className="text-3xl md:text-5xl font-display font-medium text-white mb-8 leading-[1.1] tracking-tight">
              We translate market friction into <span className="text-brand-emerald">capital advantage.</span>
            </h3>
            
            <div className="space-y-6 text-brand-light/60 font-light leading-relaxed mb-12">
              <p>
                Operating from Menara AIA Cap Square, we function as the structural architects for modern enterprises. We do not offer passive advice; we engineer measurable outcomes through advanced data topologies and strict execution protocols.
              </p>
              <p>
                By fusing institutional market intelligence with agile project deployment, we empower our partners to navigate volatility and secure enduring capital velocity.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-8 mb-12 border-t border-white/5 pt-12">
              <div>
                <h4 className="text-brand-light font-display font-medium text-lg mb-2">Absolute Integrity</h4>
                <p className="text-brand-light/40 text-sm font-light">Uncompromising fiduciary standards applied across every asset class.</p>
              </div>
              <div>
                <h4 className="text-brand-light font-display font-medium text-lg mb-2">Quantitative Precision</h4>
                <p className="text-brand-light/40 text-sm font-light">Data-driven methodologies overriding intuition with mathematical certainty.</p>
              </div>
            </div>
            
            <Magnetic>
              <a
                href="#careers"
                className="inline-flex items-center gap-3 text-brand-light/70 hover:text-brand-emerald text-sm uppercase tracking-[0.2em] font-medium transition-colors group"
              >
                <span className="border-b border-brand-light/20 group-hover:border-brand-emerald pb-1 transition-colors">
                  <TextScramble text="Join the Network" />
                </span>
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </a>
            </Magnetic>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
