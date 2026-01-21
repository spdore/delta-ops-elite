
import React, { useState, useRef } from 'react';
import { MISSIONS } from '../constants';
import { Database, Users, Shield, ArrowRight, Activity, Radar, ScanLine, Hexagon } from 'lucide-react';
import FadeIn from './ui/FadeIn';
import TiltCard from './ui/TiltCard';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

const Mission: React.FC = () => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  
  // Mouse tracking for background parallax
  const ref = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const x = (e.clientX - left) / width - 0.5;
    const y = (e.clientY - top) / height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const gridX = useSpring(useTransform(mouseX, [-0.5, 0.5], [20, -20]), { stiffness: 150, damping: 20 });
  const gridY = useSpring(useTransform(mouseY, [-0.5, 0.5], [20, -20]), { stiffness: 150, damping: 20 });

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Database': return <Database size={32} />;
      case 'Users': return <Users size={32} />;
      case 'Shield': return <Shield size={32} />;
      default: return <Activity size={32} />;
    }
  };

  return (
    <section 
      id="mission" 
      ref={ref}
      onMouseMove={handleMouseMove}
      className="py-24 bg-[#050505] relative overflow-hidden group/section"
    >
      {/* Interactive Radar Grid Background */}
      <motion.div 
        style={{ x: gridX, y: gridY }}
        className="absolute inset-[-10%] w-[120%] h-[120%] opacity-10 pointer-events-none"
      >
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,157,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,157,0.1)_1px,transparent_1px)] bg-[size:60px_60px]"></div>
        {/* Radar Circles */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-delta-green/20 rounded-full"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] border border-delta-green/20 rounded-full"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] border border-delta-green/20 rounded-full"></div>
        
        {/* Rotating Radar Sweep */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-[conic-gradient(from_0deg,transparent_0_deg,rgba(0,255,157,0.1)_60deg,transparent_60deg)] animate-spin-slow duration-[5s]"></div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="mb-20 text-center relative">
            <FadeIn direction="up">
                <div className="inline-flex items-center gap-2 mb-4 px-4 py-1 bg-delta-green/5 border border-delta-green/20 rounded-full">
                    <Radar size={16} className="text-delta-green animate-pulse" />
                    <span className="text-delta-green font-mono text-xs tracking-[0.2em] uppercase">战术区域扫描中</span>
                </div>
                <h2 className="text-6xl md:text-8xl font-black text-white tracking-tighter uppercase mb-6 mix-blend-exclusion">
                    作战 <span className="text-transparent bg-clip-text bg-gradient-to-r from-delta-green to-emerald-600">任务</span>
                </h2>
            </FadeIn>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {MISSIONS.map((mission, index) => (
                <FadeIn key={mission.id} delay={index * 0.2} direction="up" className="h-full">
                    <div 
                        onMouseEnter={() => setHoveredCard(index)}
                        onMouseLeave={() => setHoveredCard(null)}
                        className="h-full relative group perspective-1000"
                    >
                        {/* Connecting Lines (Decor) */}
                        <div className="absolute top-1/2 -left-4 w-4 h-px bg-delta-green/20 hidden md:block"></div>
                        <div className="absolute top-1/2 -right-4 w-4 h-px bg-delta-green/20 hidden md:block"></div>

                        {/* Holographic Base Projection */}
                        <div className={`absolute -bottom-8 left-1/2 -translate-x-1/2 w-[80%] h-4 bg-delta-green/20 blur-xl rounded-[100%] transition-opacity duration-300 ${hoveredCard === index ? 'opacity-100' : 'opacity-0'}`}></div>

                        <TiltCard className="h-full bg-[#080808] border border-white/10 group-hover:border-delta-green/50 transition-colors duration-500 overflow-hidden">
                            
                            {/* Scanning Laser Effect */}
                            <motion.div 
                                initial={{ top: "-10%" }}
                                animate={hoveredCard === index ? { top: "110%" } : { top: "-10%" }}
                                transition={{ duration: 1.5, repeat: Infinity, ease: "linear", repeatDelay: 0.5 }}
                                className="absolute left-0 right-0 h-[2px] bg-delta-green z-20 pointer-events-none opacity-0 group-hover:opacity-100 shadow-[0_0_15px_#00FF9D,0_0_30px_#00FF9D]"
                            >
                                <div className="absolute top-0 right-0 text-[8px] font-mono text-delta-green bg-black px-1 transform translate-x-full">SCANNING...</div>
                            </motion.div>
                            
                            {/* Inner Grid Pattern for Hologram feel */}
                            <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,157,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,157,0.03)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity"></div>

                            <div className="p-8 h-full flex flex-col relative overflow-hidden">
                                
                                {/* Background Tech Patterns */}
                                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-30 transition-opacity">
                                    <ScanLine size={100} className="text-delta-green" />
                                </div>

                                {/* Icon & ID */}
                                <div className="flex justify-between items-start mb-8 relative z-10">
                                    <div className="relative">
                                        <div className="p-4 bg-white/5 rounded-sm text-delta-green border border-white/5 group-hover:bg-delta-green group-hover:text-black transition-all duration-300 transform group-hover:scale-110 group-hover:rotate-3">
                                            {getIcon(mission.icon)}
                                        </div>
                                        {/* Ping Effect behind icon */}
                                        <div className="absolute inset-0 bg-delta-green rounded-sm animate-ping opacity-0 group-hover:opacity-30"></div>
                                    </div>
                                    <div className="flex flex-col items-end">
                                        <span className="font-mono text-xs text-gray-600 group-hover:text-delta-green transition-colors">SRV-0{index + 1}</span>
                                        <Hexagon size={12} className="text-gray-800 group-hover:text-delta-green transition-colors mt-1" />
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="flex-1 relative z-10" style={{ transform: "translateZ(20px)" }}>
                                    <div className="flex items-center gap-2 mb-2 opacity-50 group-hover:opacity-100 transition-opacity">
                                        <div className="w-1 h-1 bg-delta-green rounded-full"></div>
                                        <h3 className="text-[10px] font-bold text-delta-green uppercase tracking-widest">{mission.subtitle}</h3>
                                    </div>
                                    <h4 className="text-3xl font-black text-white uppercase italic mb-4 group-hover:translate-x-2 transition-transform duration-300 relative inline-block">
                                        {mission.title}
                                        {/* Glitch Overlay Text */}
                                        <span className="absolute top-0 left-0 -ml-[2px] text-delta-green opacity-0 group-hover:opacity-50 group-hover:animate-pulse pointer-events-none mix-blend-screen">{mission.title}</span>
                                    </h4>
                                    <p className="text-gray-400 text-sm leading-relaxed mb-6 group-hover:text-gray-200 transition-colors">
                                        {mission.desc}
                                    </p>
                                </div>

                                {/* Features List with Decode Animation */}
                                <div className="relative z-10 mb-8 border-t border-white/5 pt-6">
                                    <ul className="space-y-3">
                                        {mission.features?.map((feature, i) => (
                                            <li key={i} className="flex items-center text-xs font-mono text-gray-300 group-hover:text-delta-green transition-colors delay-[100ms]">
                                                <ArrowRight size={12} className="mr-2 transform group-hover:translate-x-1 transition-transform" />
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Status Bar */}
                                <div className="absolute bottom-0 left-0 w-full h-1 bg-white/5">
                                    <div className="h-full bg-delta-green w-0 group-hover:w-full transition-all duration-700 ease-in-out"></div>
                                </div>
                            </div>
                        </TiltCard>
                    </div>
                </FadeIn>
            ))}
        </div>
      </div>
    </section>
  );
};

export default Mission;
