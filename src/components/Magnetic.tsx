import React, { useRef, useState } from 'react';
import { motion } from 'motion/react';

export const Magnetic: React.FC<{ children: React.ReactNode, wrapperClass?: string }> = ({ children, wrapperClass = "inline-block" }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const mouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY } = e;
    const { width, height, left, top } = ref.current!.getBoundingClientRect();
    const x = clientX - (left + width / 2);
    const y = clientY - (top + height / 2);
    setPosition({ x, y });
  };

  const mouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={mouseMove}
      onMouseLeave={mouseLeave}
      animate={{ x: position.x * 0.15, y: position.y * 0.15 }}
      transition={{ type: "spring", stiffness: 200, damping: 20, mass: 0.1 }}
      className={wrapperClass}
    >
      {children}
    </motion.div>
  );
}
