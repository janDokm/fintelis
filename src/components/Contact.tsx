import React from 'react';
import { motion } from 'motion/react';
import { Magnetic } from './Magnetic';

export function Contact() {
  return (
    <section id="contact" className="py-32 bg-brand-dark relative border-t border-white/5 overflow-hidden">
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[800px] h-[800px] bg-[radial-gradient(circle_at_center,_rgba(0,223,130,0.03)_0%,_transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="pr-8"
          >
            <div>
              <h2 className="text-brand-gold font-medium tracking-[0.2em] uppercase text-xs mb-4 flex items-center gap-4">
                <span className="w-8 h-px bg-brand-gold/50" />
                Connection Portal
              </h2>
              <h3 className="text-4xl md:text-5xl lg:text-6xl font-display font-medium text-brand-light mb-6 tracking-tight leading-[1.1]">
                Initialize your <br/>
                strategic phase.
              </h3>
              <p className="text-lg text-brand-light/60 font-light mb-12 max-w-md leading-relaxed border-l border-white/10 pl-4">
                Secure a confidential briefing session with our senior partners to discuss your specific liquidity and operational architecture.
              </p>
            </div>

            <div className="space-y-8 mt-12 pt-12 border-t border-white/5">
              <div className="flex gap-4 group">
                <div className="text-brand-emerald">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-brand-light/50 font-medium uppercase tracking-[0.2em] mb-1 text-xs">Node Command Center</h4>
                  <p className="text-brand-light font-light text-base leading-relaxed">
                    Level 27, Menara AIA Cap Square,<br/>
                    Kuala Lumpur, Malaysia
                  </p>
                </div>
              </div>

              <div className="flex gap-4 group">
                <div className="text-brand-emerald">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-brand-light/50 font-medium uppercase tracking-[0.2em] mb-1 text-xs">Direct Channel</h4>
                  <Magnetic>
                    <a href="mailto:info@fintelis.com.my" className="text-brand-light text-xl hover:text-brand-emerald transition-colors inline-block tracking-wide font-light">
                      info@fintelis.com.my
                    </a>
                  </Magnetic>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-brand-slate/30 border border-white/5 p-8 md:p-10 rounded-2xl backdrop-blur-md"
          >
            <form className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="firstName" className="block text-xs font-medium text-brand-light/50 uppercase tracking-[0.1em]">First Name</label>
                  <input 
                    type="text" 
                    id="firstName" 
                    className="w-full px-4 py-3 bg-brand-dark/50 border border-white/10 rounded-lg focus:border-brand-emerald/50 focus:outline-none focus:ring-1 focus:ring-brand-emerald/50 transition-all font-light text-brand-light"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="lastName" className="block text-xs font-medium text-brand-light/50 uppercase tracking-[0.1em]">Last Name</label>
                  <input 
                    type="text" 
                    id="lastName" 
                    className="w-full px-4 py-3 bg-brand-dark/50 border border-white/10 rounded-lg focus:border-brand-emerald/50 focus:outline-none focus:ring-1 focus:ring-brand-emerald/50 transition-all font-light text-brand-light"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="email" className="block text-xs font-medium text-brand-light/50 uppercase tracking-[0.1em]">Corporate Email</label>
                <input 
                  type="email" 
                  id="email" 
                  className="w-full px-4 py-3 bg-brand-dark/50 border border-white/10 rounded-lg focus:border-brand-emerald/50 focus:outline-none focus:ring-1 focus:ring-brand-emerald/50 transition-all font-light text-brand-light"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="service" className="block text-xs font-medium text-brand-light/50 uppercase tracking-[0.1em]">Target Protocol</label>
                <select 
                  id="service" 
                  className="w-full px-4 py-3 bg-brand-dark/50 border border-white/10 rounded-lg focus:border-brand-emerald/50 focus:outline-none focus:ring-1 focus:ring-brand-emerald/50 transition-all font-light text-brand-light appearance-none"
                >
                  <option value="" disabled selected hidden>Select Module...</option>
                  <option className="bg-brand-dark" value="financial">Liquidity Optimization</option>
                  <option className="bg-brand-dark" value="risk">Risk Architecture</option>
                  <option className="bg-brand-dark" value="capital">Capital Solutions</option>
                  <option className="bg-brand-dark" value="other">Other Inquiry</option>
                </select>
              </div>

              <Magnetic wrapperClass="block w-full">
                <button
                  type="button"
                  className="w-full px-8 py-4 mt-6 rounded-full bg-brand-light text-brand-dark text-sm font-medium uppercase tracking-[0.15em] overflow-hidden transition-all duration-500 hover:bg-brand-emerald hover:text-white shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(0,223,130,0.3)]"
                >
                  Transmit Data
                </button>
              </Magnetic>
            </form>
          </motion.div>
          
        </div>
      </div>
    </section>
  );
}
