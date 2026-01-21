
import React, { useRef, useState, useEffect } from 'react';
import TextReveal from './ui/TextReveal';
import InfiniteMarquee from './ui/InfiniteMarquee';
import { ArrowDown, Cpu } from 'lucide-react';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';

interface HeroProps {
  onOpenShopInfo: () => void;
}

const Hero: React.FC<HeroProps> = ({ onOpenShopInfo }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  
  // Mouse movement logic for 3D Parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Smooth spring animation for mouse values
  const springConfig = { damping: 25, stiffness: 100 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  // Parallax transforms - Background moves opposite to mouse
  const gridRotateX = useTransform(springY, [-0.5, 0.5], [65, 55]); // Base rotation is 60
  const gridRotateY = useTransform(springX, [-0.5, 0.5], [-5, 5]);
  const contentX = useTransform(springX, [-0.5, 0.5], [-20, 20]);
  const contentY = useTransform(springY, [-0.5, 0.5], [-20, 20]);

  // Scroll transforms
  const backgroundY = useTransform(scrollY, [0, 1000], [0, 500]);
  const textY = useTransform(scrollY, [0, 1000], [0, 200]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);
  
  const handleMouseMove = (e: React.MouseEvent) => {
    // Normalize coordinates -0.5 to 0.5
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    mouseX.set(clientX / innerWidth - 0.5);
    mouseY.set(clientY / innerHeight - 0.5);
  };

  const scrollToMission = () => {
    const element = document.getElementById('mission');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Glitch Scramble Function
  const useScramble = (text: string) => {
    const [display, setDisplay] = useState(text);
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";
    
    const scramble = () => {
        let iter = 0;
        const interval = setInterval(() => {
            setDisplay(text.split('').map((c, i) => {
                if (i < iter) return text[i];
                return chars[Math.floor(Math.random() * chars.length)];
            }).join(''));
            if (iter >= text.length) clearInterval(interval);
            iter += 1/3;
        }, 30);
    };
    return { display, scramble };
  };

  // English Text Scramble
  const deltaText = useScramble("DELTA");
  const forceText = useScramble("FORCE");

  return (
    <div 
        id="hero" 
        ref={ref} 
        onMouseMove={handleMouseMove}
        className="relative h-screen w-full overflow-hidden flex flex-col items-center justify-center bg-delta-dark perspective-1000"
    >
      
      {/* 3D Perspective Grid Floor - Interactive */}
      <motion.div 
        style={{ 
            rotateX: gridRotateX,
            rotateY: gridRotateY,
            y: backgroundY,
        }} 
        className="absolute inset-0 -bottom-[50%] z-0 pointer-events-none opacity-20"
      >
        <div className="w-full h-full bg-[linear-gradient(to_right,#1f2937_1px,transparent_1px),linear-gradient(to_bottom,#1f2937_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] animate-grid-flow"></div>
      </motion.div>

      {/* Kinetic Background Typography - Interactive */}
      <motion.div 
        style={{ 
            x: useTransform(springX, [-0.5, 0.5], [50, -50]),
            y: useTransform(springY, [-0.5, 0.5], [50, -50]),
            rotate: -6, 
            scale: 1 
        }} 
        className="absolute inset-0 flex flex-col justify-center pointer-events-none z-0 mix-blend-color-dodge opacity-10"
      >
         <InfiniteMarquee text="TACTICAL SUPREMACY // ELITE SQUAD //" className="text-[12rem] font-black text-outline" speed="slow" />
         <InfiniteMarquee text="DELTA FORCE // EXTRACTION SECURE //" className="text-[12rem] font-black text-outline translate-x-32" speed="slow" reverse />
         <InfiniteMarquee text="HAZARD OPERATIONS // HAVOC WARFARE //" className="text-[12rem] font-black text-outline" speed="slow" />
      </motion.div>

      {/* Main Content - Interactive */}
      <motion.div 
        style={{ x: contentX, y: contentY, opacity: opacity }}
        className="relative z-10 max-w-7xl mx-auto px-4 w-full flex flex-col items-start justify-center h-full pt-20 pb-40 md:pb-0"
      >
        
        {/* Badge */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="group inline-flex items-center gap-2 px-3 py-1 rounded-sm border border-delta-green/30 bg-delta-green/5 backdrop-blur-md mb-8 cursor-crosshair hover:bg-delta-green/20 transition-all hover:border-delta-green hover:shadow-[0_0_15px_rgba(0,255,157,0.3)]"
        >
            <Cpu className="w-3 h-3 text-delta-green animate-pulse" />
            <span className="text-[10px] font-mono tracking-[0.3em] text-delta-green group-hover:tracking-[0.5em] transition-all duration-300">SYSTEM ONLINE</span>
        </motion.div>

        {/* Huge Title */}
        <h1 className="text-6xl md:text-[9rem] leading-[0.9] font-black tracking-tighter text-white mb-6 uppercase mix-blend-difference relative">
          <motion.span 
            initial={{ x: -100, opacity: 0, filter: "blur(20px)" }}
            animate={{ x: 0, opacity: 1, filter: "blur(0px)" }}
            onHoverStart={deltaText.scramble}
            className="block hover:text-outline-green hover:translate-x-4 transition-all duration-300 cursor-default"
          >
            {deltaText.display}
          </motion.span>
          <motion.span 
             initial={{ x: 100, opacity: 0, filter: "blur(20px)" }}
             animate={{ x: 0, opacity: 1, filter: "blur(0px)" }}
             onHoverStart={forceText.scramble}
             className="block text-transparent bg-clip-text bg-gradient-to-r from-delta-green to-emerald-500 hover:text-white transition-all duration-500 cursor-default"
          >
            {forceText.display}
          </motion.span>
          
          <span className="block text-3xl md:text-6xl font-normal font-mono text-gray-400 mt-4 tracking-tight border-t border-white/10 pt-4">
             <TextReveal text="顶级战术陪玩服务" delay={800} />
          </span>
        </h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="max-w-md text-gray-400 text-sm md:text-base font-mono mb-12 leading-relaxed border-l-2 border-delta-green pl-6 hover:border-white transition-colors"
        >
            进入战术网络。全网最强宗师级打手集结。
            <br/>
            <span className="text-delta-green group-hover:text-white transition-colors">/// 烽火地带摸金 /// 全面战场制霸</span>
        </motion.p>

        {/* CTAs with Magnetic Glitch Effect */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
          className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
        >
            <button 
              onClick={scrollToMission}
              className="group relative px-8 py-4 bg-delta-green text-black font-black uppercase tracking-wider overflow-hidden hover:scale-105 transition-transform duration-200 clip-diagonal"
            >
                <div className="absolute inset-0 w-full h-full bg-black transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                <div className="relative z-10 flex items-center gap-2 group-hover:text-delta-green transition-colors">
                    <span>发布任务 // START MISSION</span>
                </div>
            </button>
            <button 
              onClick={onOpenShopInfo}
              className="group px-8 py-4 border border-white/20 text-white font-bold uppercase tracking-wider hover:bg-white/5 transition-all duration-300 backdrop-blur-sm hover:border-delta-green/50 hover:text-delta-green relative overflow-hidden"
            >
                <span className="relative z-10 group-hover:tracking-[0.2em] transition-all duration-300">服务档案 // DATABASE</span>
                <div className="absolute inset-0 bg-delta-green/10 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 skew-x-12"></div>
            </button>
        </motion.div>

      </motion.div>

      {/* Scroll Indicator */}
      <motion.div 
        style={{ opacity }}
        className="absolute bottom-32 md:bottom-8 right-8 md:right-16 flex flex-col items-center gap-2 z-20"
      >
        <div className="w-[1px] h-12 bg-gradient-to-b from-transparent to-delta-green animate-pulse"></div>
        <span className="text-[10px] font-mono text-delta-green uppercase vertical-rl tracking-widest" style={{ writingMode: 'vertical-rl' }}>Scroll</span>
      </motion.div>
    </div>
  );
};

export default Hero;
