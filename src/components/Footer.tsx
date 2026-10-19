import React from 'react';
import { Magnetic } from './Magnetic';

export function Footer() {
  return (
    <footer className="bg-[#03060a] pt-24 pb-12 overflow-hidden border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          
          <div className="lg:col-span-1">
            <Magnetic>
              <a href="#" className="flex items-center gap-3 mb-6 inline-flex group">
                <div className="w-10 h-10 rounded-full border border-brand-emerald/30 flex items-center justify-center text-brand-emerald font-display font-medium text-xl bg-brand-emerald/5 transition-colors group-hover:bg-brand-emerald group-hover:text-brand-dark">
                  F
                </div>
                <span className="font-display text-2xl font-medium text-brand-light tracking-wide">
                  Fintelis
                </span>
              </a>
            </Magnetic>
            <p className="text-brand-light/40 font-light text-sm leading-relaxed mt-4 border-l border-brand-emerald/30 pl-4">
              Architecting financial and operational resilience for modern global enterprises.
            </p>
          </div>

          <div>
            <h4 className="text-brand-light/50 font-medium uppercase tracking-[0.2em] mb-6 text-xs">Directory</h4>
            <ul className="space-y-4">
              {['Manifesto', 'Methodology', 'Case Studies', 'Careers', 'Contact'].map((item) => (
                <li key={item}>
                  <Magnetic>
                    <a href={`#${item.toLowerCase().replace(' ', '-')}`} className="text-brand-light/80 hover:text-brand-emerald text-sm transition-colors inline-block tracking-wide font-light">
                      {item}
                    </a>
                  </Magnetic>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-brand-light/50 font-medium uppercase tracking-[0.2em] mb-6 text-xs">Capabilities</h4>
            <ul className="space-y-4">
              {[
                'Liquidity Optimization', 
                'Risk Architecture', 
                'Capital Solutions', 
                'Value Recovery'
              ].map((item) => (
                <li key={item}>
                  <Magnetic>
                    <a href="#services" className="text-brand-light/80 hover:text-brand-gold text-sm transition-colors inline-block tracking-wide font-light">
                      {item}
                    </a>
                  </Magnetic>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-brand-light/50 font-medium uppercase tracking-[0.2em] mb-6 text-xs">Command Center</h4>
            <p className="text-brand-light/80 font-light text-sm leading-relaxed mb-4">
              Level 27, Menara AIA<br/>
              Kuala Lumpur, MY
            </p>
            <Magnetic>
              <a href="mailto:info@fintelis.com.my" className="inline-block text-brand-emerald hover:text-brand-light text-sm font-medium transition-colors tracking-wide">
                info@fintelis.com.my
              </a>
            </Magnetic>
          </div>
          
        </div>
        
        {/* Massive Footer Text */}
        <div className="w-full text-center border-t border-white/5 pt-12">
           <h2 className="text-[12vw] font-display font-medium text-white/5 leading-none tracking-tighter select-none">
             FINTELIS
           </h2>
        </div>

        <div className="mt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-brand-light/40 font-light tracking-[0.1em] text-xs">
          <p>
            &copy; {new Date().getFullYear()} FINTELIS ADVISORY. ALL RIGHTS RESERVED.
          </p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-brand-emerald transition-colors">PRIVACY POLICY</a>
            <a href="#" className="hover:text-brand-emerald transition-colors">TERMS OF SERVICE</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
