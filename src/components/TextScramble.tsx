import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';

interface TextScrambleProps {
  text: string;
  className?: string;
}

const CHARACTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+";

export const TextScramble: React.FC<TextScrambleProps> = ({ text, className }) => {
  const [displayText, setDisplayText] = useState(text);
  const [isScrambling, setIsScrambling] = useState(false);

  const scramble = () => {
    if (isScrambling) return;
    setIsScrambling(true);
    
    let iteration = 0;
    const maxIterations = 10;
    const interval = setInterval(() => {
      setDisplayText((prev) => 
        text.split("").map((letter, index) => {
          if (index < iteration) {
            return text[index];
          }
          if (letter === " ") return " ";
          return CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)];
        }).join("")
      );
      
      if (iteration >= text.length) {
        clearInterval(interval);
        setIsScrambling(false);
      }
      
      iteration += 1 / 2; // Adjust speed
    }, 30);
  };

  return (
    <motion.span
      onMouseEnter={scramble}
      className={className}
      initial={{ opacity: 1 }}
    >
      {displayText}
    </motion.span>
  );
};
