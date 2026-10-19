import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Magnetic } from './Magnetic';
import { TextScramble } from './TextScramble';

const navLinks = [
  { name: 'Architecture', href: '#home', color: 'hover:text-brand-emerald' },
  { name: 'Solutions', href: '#services', color: 'hover:text-brand-emerald' },
  { name: 'Intelligence', href: '#about', color: 'hover:text-brand-gold' },
  { name: 'Connect', href: '#contact', color: 'hover:text-brand-emerald' },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-brand-dark/80 backdrop-blur-lg border-b border-white/5 py-4' 
          : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Magnetic>
            <a href="#" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full border border-brand-emerald/30 flex items-center justify-center text-brand-light font-display font-medium text-xl bg-brand-emerald/5 shadow-[0_0_15px_rgba(0,223,130,0.15)] relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-tr from-brand-emerald/20 to-transparent opacity-50" />
                <span className="relative z-10">F</span>
              </div>
              <span className="font-display text-xl font-medium tracking-wide text-brand-light">
                Fintelis
              </span>
            </a>
          </Magnetic>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Magnetic key={link.name}>
                <a
                  href={link.href}
                  className={`px-2 py-2 text-sm font-medium text-brand-light/70 uppercase tracking-widest transition-colors ${link.color}`}
                >
                  <TextScramble text={link.name} />
                </a>
              </Magnetic>
            ))}
            <Magnetic>
              <a
                href="#contact"
                className="ml-6 px-6 py-2.5 bg-brand-emerald/10 text-brand-emerald text-sm font-medium uppercase tracking-widest border border-brand-emerald/30 rounded-full hover:bg-brand-emerald hover:text-brand-dark transition-all duration-300 shadow-[0_0_20px_rgba(0,223,130,0.1)] hover:shadow-[0_0_30px_rgba(0,223,130,0.3)]"
              >
                <TextScramble text="Access Portal" />
              </a>
            </Magnetic>
          </nav>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-brand-light/70 hover:text-brand-emerald transition-colors"
            >
              <span className="sr-only">Open main menu</span>
              {mobileMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden absolute top-full left-0 w-full bg-brand-dark/95 backdrop-blur-xl border-b border-white/5 overflow-hidden shadow-2xl"
          >
            <div className="px-4 py-6 space-y-4 flex flex-col">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block px-4 py-3 text-lg font-display font-medium text-brand-light/80 uppercase tracking-widest ${link.color} transition-colors`}
                >
                  {link.name}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
