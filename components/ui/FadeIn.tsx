import React from 'react';
import { motion } from 'framer-motion';

interface FadeInProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  fullWidth?: boolean;
  blur?: boolean;
}

export const FadeIn: React.FC<FadeInProps> = ({ 
  children, 
  delay = 0, 
  className = "",
  direction = 'up',
  fullWidth = false,
  blur = false
}) => {
  const directions = {
    up: { y: 60, x: 0 },
    down: { y: -60, x: 0 },
    left: { x: 60, y: 0 },
    right: { x: -60, y: 0 },
    none: { x: 0, y: 0 }
  };

  const initialFilter = blur ? "blur(10px)" : "blur(0px)";
  const finalFilter = "blur(0px)";

  return (
    <motion.div
      initial={{ 
        opacity: 0, 
        ...directions[direction],
        filter: initialFilter
      }}
      whileInView={{ 
        opacity: 1, 
        x: 0, 
        y: 0,
        filter: finalFilter
      }}
      viewport={{ once: true, margin: "-10%" }} // Trigger a bit before element is fully in view
      transition={{ 
        duration: 1.0, 
        delay: delay, 
        ease: [0.25, 0.1, 0.25, 1.0] // Apple-style smooth cubic-bezier
      }}
      className={`${className} ${fullWidth ? 'w-full' : ''}`}
    >
      {children}
    </motion.div>
  );
};

export default FadeIn;