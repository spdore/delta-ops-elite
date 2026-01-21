
import React, { useEffect, useState } from 'react';
import { motion, useScroll, useSpring, useTransform, useMotionValue } from 'framer-motion';

const TacticalHud: React.FC = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [time, setTime] = useState('');
  const { scrollYProgress } = useScroll();
  
  // Mouse Motion Values for Compass
  const mouseX = useMotionValue(0);
  const smoothMouseX = useSpring(mouseX, { stiffness: 100, damping: 20 });
  
  // Transform mouse X to compass degrees (simple sliding effect)
  const compassX = useTransform(smoothMouseX, [0, window.innerWidth], [-200, 200]);

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      mouseX.set(e.clientX);
    };
    
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' }) + ':' + String(now.getMilliseconds()).padStart(3, '0'));
    };

    window.addEventListener('mousemove', handleMouseMove);
    const timer = setInterval(updateTime, 50);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearInterval(timer);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[50] pointer-events-none overflow-hidden select-none mix-blend-screen hidden md:block">
      
      {/* 1. TOP COMPASS BAR */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 w-[600px] h-8 overflow-hidden mask-linear-fade">
         <motion.div 
            className="flex items-center gap-12 text-delta-green/40 font-mono text-xs"
            style={{ x: compassX }}
         >
            <span>15</span><span>30</span><span>NE</span><span>60</span><span>75</span>
            <span className="text-white font-bold scale-125">N</span>
            <span>15</span><span>30</span><span>NW</span><span>60</span><span>75</span>
            <span className="text-white font-bold scale-125">S</span>
            <span>195</span><span>210</span><span>SW</span><span>240</span><span>255</span>
         </motion.div>
         {/* Center Marker */}
         <div className="absolute top-0 left-1/2 -translate-x-1/2 w-0 h-2 border-l-2 border-delta-green"></div>
         <div className="absolute top-2 left-1/2 -translate-x-1/2 w-2 h-2 border-l border-t border-delta-green/50 rotate-45"></div>
      </div>

      {/* 2. CORNER BRACKETS (Heavy Duty) */}
      <div className="absolute top-8 left-8 w-24 h-24">
        <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-delta-green to-transparent"></div>
        <div className="absolute top-0 left-0 h-full w-[2px] bg-gradient-to-b from-delta-green to-transparent"></div>
        <div className="absolute top-0 left-0 bg-delta-green/20 p-1 text-[9px] font-mono text-delta-green">CAM_01</div>
      </div>
      
      <div className="absolute top-8 right-8 w-24 h-24">
        <div className="absolute top-0 right-0 w-full h-[2px] bg-gradient-to-l from-delta-green to-transparent"></div>
        <div className="absolute top-0 right-0 h-full w-[2px] bg-gradient-to-b from-delta-green to-transparent"></div>
        <div className="absolute top-0 right-0 bg-delta-green/20 p-1 text-[9px] font-mono text-delta-green">REC ●</div>
      </div>

      <div className="absolute bottom-8 left-8 w-16 h-16 border-l-2 border-b-2 border-delta-green/30 rounded-bl-lg"></div>
      <div className="absolute bottom-8 right-8 w-16 h-16 border-r-2 border-b-2 border-delta-green/30 rounded-br-lg"></div>

      {/* 3. CENTER CROSSHAIR (Delayed Follow) */}
      <motion.div 
        className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-10"
        animate={{ 
            x: (mousePos.x - window.innerWidth/2) * 0.05,
            y: (mousePos.y - window.innerHeight/2) * 0.05
        }}
        transition={{ type: "spring", stiffness: 50, damping: 20 }}
      >
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-white/10 rounded-full"></div>
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] border border-delta-green/5 rounded-[40px]"></div>
      </motion.div>

      {/* 4. COORDINATES TRACKER */}
      <div className="absolute bottom-10 left-12 font-mono text-[10px] text-delta-green/70 space-y-1">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 bg-delta-green animate-pulse"></span>
          <span>TRK_POS_X: {mousePos.x.toString().padStart(4, '0')}</span>
        </div>
        <div className="flex items-center gap-2">
           <span className="w-2 h-2 border border-delta-green"></span>
           <span>TRK_POS_Y: {mousePos.y.toString().padStart(4, '0')}</span>
        </div>
        <div>SYS_TIME: {time}</div>
      </div>

      {/* 5. RIGHT SCROLL BAR (Weapon Charge Style) */}
      <div className="absolute top-1/2 right-10 -translate-y-1/2 h-64 w-1 bg-white/10 rounded-full overflow-hidden flex flex-col justify-end">
        <motion.div 
          className="w-full bg-delta-green shadow-[0_0_10px_#00FF9D]"
          style={{ height: scrollYProgress.get() * 100 + "%" }}
        />
      </div>
      <div className="absolute top-[calc(50%+130px)] right-8 text-[9px] font-mono text-delta-green -rotate-90 origin-left">
        DEPTH_SENSOR
      </div>

      {/* 6. TOP STATUS BAR */}
      <div className="absolute top-6 left-1/2 -translate-x-1/2 flex items-center gap-4 bg-black/40 backdrop-blur-sm px-6 py-1 border border-white/10 rounded-sm skew-x-[-10deg]">
         <span className="text-[9px] font-mono text-gray-400 skew-x-[10deg]">CONN: <span className="text-delta-green">SECURE</span></span>
         <span className="w-px h-3 bg-white/20 skew-x-[10deg]"></span>
         <span className="text-[9px] font-mono text-gray-400 skew-x-[10deg]">PING: <span className="text-delta-green">12ms</span></span>
         <span className="w-px h-3 bg-white/20 skew-x-[10deg]"></span>
         <span className="text-[9px] font-mono text-gray-400 skew-x-[10deg]">FPS: <span className="text-delta-green">60</span></span>
      </div>

      {/* 7. LOCALIZED SCANNER BOX */}
      <div className="absolute bottom-32 right-32 w-48 h-24 border border-delta-green/20 bg-delta-green/5 overflow-hidden hidden lg:block">
         <div className="absolute top-0 left-0 w-full h-1 bg-delta-green/30 animate-[grid-flow_2s_linear_infinite]"></div>
         <div className="p-2 font-mono text-[8px] text-delta-green/50 leading-tight">
            Scanning local assets...<br/>
            Optimizing render pipeline...<br/>
            Target acquired: USER<br/>
            > READY_FOR_DEPLOYMENT
         </div>
         {/* Decorative bars */}
         <div className="absolute bottom-1 right-1 flex gap-1">
            <div className="w-1 h-3 bg-delta-green/40"></div>
            <div className="w-1 h-2 bg-delta-green/40"></div>
            <div className="w-1 h-4 bg-delta-green/40"></div>
         </div>
      </div>
    </div>
  );
};

export default TacticalHud;
