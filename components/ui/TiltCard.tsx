
import React, { useRef } from 'react';
import { motion, useMotionTemplate, useMotionValue, useSpring } from 'framer-motion';

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
}

const TiltCard: React.FC<TiltCardProps> = ({ children, className = "", glowColor = "#00FF9D" }) => {
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Stiffer spring for snappier movement
  const xSpring = useSpring(x, { stiffness: 400, damping: 15 });
  const ySpring = useSpring(y, { stiffness: 400, damping: 15 });

  const rotateX = useMotionTemplate`${ySpring}deg`;
  const rotateY = useMotionTemplate`${xSpring}deg`;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const mouseX = (e.clientX - rect.left) * 45; // Increased multiplier for stronger tilt
    const mouseY = (e.clientY - rect.top) * 45;

    const rX = (mouseY / height - 45 / 2) * -1;
    const rY = (mouseX / width - 45 / 2);

    // Increased limits
    const limitedRX = Math.max(-15, Math.min(15, rX));
    const limitedRY = Math.max(-15, Math.min(15, rY));

    x.set(limitedRY);
    y.set(limitedRX);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: "preserve-3d",
        rotateX,
        rotateY,
      }}
      className={`relative group perspective-1000 ${className}`}
    >
        {/* Holographic Edge Effect */}
      <div 
        style={{ transform: "translateZ(0px)" }}
        className="absolute -inset-[1px] rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-transparent via-delta-green/80 to-transparent blur-md"
      ></div>

      <div className="relative h-full rounded-2xl bg-[#0A0A0A] overflow-hidden" style={{ transform: "translateZ(1px)" }}>
         {children}
         
         {/* Dynamic Glare - Brighter */}
         <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/10 to-white/0 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-300 mix-blend-overlay" />
      </div>
    </motion.div>
  );
};

export default TiltCard;
