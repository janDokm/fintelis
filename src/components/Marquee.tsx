import { motion } from 'motion/react';

export function Marquee() {
  const words = [
    { text: "GLOBAL LIQUIDITY", color: "text-brand-emerald", val: "+2.4%" },
    { text: "MARKET ARBITRAGE", color: "text-brand-light/70", val: "OPTIMIZED" },
    { text: "CAPITAL VELOCITY", color: "text-brand-gold", val: "+1.8x" },
    { text: "ASSET RECOVERY", color: "text-brand-crimson", val: "-0.5%" },
    { text: "GLOBAL LIQUIDITY", color: "text-brand-emerald", val: "+2.4%" },
    { text: "MARKET ARBITRAGE", color: "text-brand-light/70", val: "OPTIMIZED" },
    { text: "CAPITAL VELOCITY", color: "text-brand-gold", val: "+1.8x" },
    { text: "ASSET RECOVERY", color: "text-brand-crimson", val: "-0.5%" },
  ];

  return (
    <div className="py-4 bg-brand-slate/30 border-y border-white/5 overflow-hidden flex whitespace-nowrap relative z-20 backdrop-blur-sm">
      <motion.div
        initial={{ x: 0 }}
        animate={{ x: "-50%" }}
        transition={{ repeat: Infinity, ease: "linear", duration: 25 }}
        className="flex items-center gap-12 text-sm md:text-base font-display font-medium uppercase tracking-widest"
      >
        {words.map((item, i) => (
          <div key={i} className="flex items-center gap-12">
            <div className="flex items-center gap-3">
              <span className={`${item.color} transition-colors duration-300`}>
                {item.text}
              </span>
              <span className={`text-xs ${item.color.includes('emerald') || item.color.includes('gold') || item.color.includes('crimson') ? item.color : 'text-brand-emerald'}`}>
                {item.val}
              </span>
            </div>
            <span className="w-1.5 h-1.5 bg-white/20 rounded-full" />
          </div>
        ))}
      </motion.div>
    </div>
  );
}
