import React, { useRef } from 'react';
import { motion, useMotionValue, useTransform } from 'motion/react';
import { 
  Building2, 
  Briefcase, 
  Landmark, 
  ShieldAlert, 
  FileCheck, 
  TrendingUp,
  ArrowRight
} from 'lucide-react';

const services = [
  {
    title: "Liquidity Optimization",
    description: "Algorithmic routing to maximize portfolio exchange efficiency and capital yield.",
    icon: TrendingUp,
    accent: "group-hover:border-brand-emerald/50 group-hover:shadow-[0_0_30px_rgba(0,223,130,0.1)]",
    iconColor: "text-brand-emerald"
  },
  {
    title: "Risk Architecture",
    description: "Identify and neutralize operational and market volatility before it breaches.",
    icon: ShieldAlert,
    accent: "group-hover:border-brand-crimson/50 group-hover:shadow-[0_0_30px_rgba(255,42,66,0.1)]",
    iconColor: "text-brand-crimson"
  },
  {
    title: "Capital Solutions",
    description: "Strategic structuring of institutional financing and reserve allocations.",
    icon: Landmark,
    accent: "group-hover:border-white/50 group-hover:shadow-[0_0_30px_rgba(255,255,255,0.1)]",
    iconColor: "text-white"
  },
  {
    title: "Protocol Management",
    description: "Agile, end-to-end deployment ensuring execution within strict market tolerances.",
    icon: Briefcase,
    accent: "group-hover:border-brand-emerald/50 group-hover:shadow-[0_0_30px_rgba(0,223,130,0.1)]",
    iconColor: "text-brand-emerald"
  },
  {
    title: "Asset Strategy",
    description: "Data-driven insights into high-yield property and tangible asset liquidations.",
    icon: Building2,
    accent: "group-hover:border-brand-gold/50 group-hover:shadow-[0_0_30px_rgba(212,175,55,0.1)]",
    iconColor: "text-brand-gold"
  },
  {
    title: "Value Recovery",
    description: "Sophisticated, compliant recovery engineering to inject liquidity back into your streams.",
    icon: FileCheck,
    accent: "group-hover:border-white/50 group-hover:shadow-[0_0_30px_rgba(255,255,255,0.1)]",
    iconColor: "text-white"
  }
];

const ServiceCard: React.FC<{ service: any, index: number }> = ({ service, index }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-100, 100], [10, -10]);
  const rotateY = useTransform(x, [-100, 100], [-10, 10]);

  function handleMouseMove(event: React.MouseEvent<HTMLDivElement>) {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    x.set(event.clientX - rect.left - rect.width / 2);
    y.set(event.clientY - rect.top - rect.height / 2);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: 1200 }}
      className="h-full"
    >
      <motion.div
        style={{ rotateX, rotateY }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
        className={`group bg-brand-slate/40 backdrop-blur-xl border border-white/5 p-8 rounded-2xl h-full flex flex-col justify-between transition-all duration-500 ${service.accent}`}
      >
        <div>
          <div className="w-14 h-14 rounded-full border border-white/10 bg-white/5 flex items-center justify-center mb-8 group-hover:scale-110 group-hover:bg-white/10 transition-all duration-500">
            <service.icon className={`w-6 h-6 ${service.iconColor} opacity-80 group-hover:opacity-100`} />
          </div>
          
          <h4 className="text-2xl font-display font-medium text-brand-light mb-3 tracking-wide">{service.title}</h4>
          <p className="text-brand-light/50 mb-8 text-sm leading-relaxed font-light">
            {service.description}
          </p>
        </div>
        
        <div className="flex items-center gap-2 text-xs font-medium text-brand-light/30 uppercase tracking-[0.2em] overflow-hidden">
          <span className="group-hover:text-brand-light transition-colors">Access Interface</span>
          <ArrowRight className="w-4 h-4 -translate-x-full opacity-0 group-hover:translate-x-0 group-hover:opacity-100 group-hover:text-brand-emerald transition-all duration-300" />
        </div>
      </motion.div>
    </motion.div>
  );
}

export function Services() {
  return (
    <section id="services" className="py-32 bg-brand-dark relative">
      {/* Subtle Grid */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+CjxwYXRoIGQ9Ik0wIDBoNDB2NDBIMHoiIGZpbGw9Im5vbmUiLz4KPHBhdGggZD0iTTAgMGg0MHY0MEgweiIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMDMpIiBzdHJva2Utd2lkdGg9IjEiLz4KPC9zdmc+')] [mask-image:linear-gradient(to_bottom,transparent,black_20%,black_80%,transparent)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-8">
          <div className="max-w-3xl">
            <motion.h2 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-brand-emerald font-medium tracking-[0.2em] uppercase text-xs mb-6 flex items-center gap-4"
            >
              <span className="w-8 h-px bg-brand-emerald/50" />
              Operational Modules
            </motion.h2>
            <motion.h3 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-display font-medium text-brand-light tracking-tight leading-[1.1]"
            >
              Engineered for velocity. <br className="hidden md:block"/>
              Secured by architecture.
            </motion.h3>
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="hidden md:block w-24 h-24 rounded-full border border-brand-gold/30 border-t-brand-emerald border-r-transparent animate-[spin_8s_linear_infinite]"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <ServiceCard key={index} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
