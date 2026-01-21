
import React, { useState, useEffect, useRef } from 'react';
import { OPERATORS } from '../constants';
import { Trophy, Target, ArrowUpRight, Crosshair, Plus, LocateFixed } from 'lucide-react';
import FadeIn from './ui/FadeIn';
import TiltCard from './ui/TiltCard';
import { AnimatePresence, motion, useSpring, useMotionValue } from 'framer-motion';
import OperatorModal from './ui/OperatorModal';
import { Operator } from '../types';

interface OperatorsProps {
  onModalChange?: (isOpen: boolean) => void;
}

const Operators: React.FC<OperatorsProps> = ({ onModalChange }) => {
  const [selectedOperator, setSelectedOperator] = useState<Operator | null>(null);
  const [isHoveringSection, setIsHoveringSection] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  
  // Custom Cursor Logic
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const cursorX = useSpring(mouseX, { stiffness: 500, damping: 28 });
  const cursorY = useSpring(mouseY, { stiffness: 500, damping: 28 });

  useEffect(() => {
    if (onModalChange) {
      onModalChange(!!selectedOperator);
    }
  }, [selectedOperator, onModalChange]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = sectionRef.current?.getBoundingClientRect();
    if (rect) {
        mouseX.set(e.clientX - rect.left);
        mouseY.set(e.clientY - rect.top);
    }
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = "https://images.unsplash.com/photo-1595590424283-b8f17842773f?q=80&w=800&auto=format&fit=crop"; 
    e.currentTarget.onerror = null; 
  };

  return (
    <section 
        id="operators" 
        ref={sectionRef}
        onMouseEnter={() => setIsHoveringSection(true)}
        onMouseLeave={() => setIsHoveringSection(false)}
        onMouseMove={handleMouseMove}
        className="py-24 bg-[#030303] relative z-10 cursor-none overflow-hidden"
    >
      {/* Background Texture for Density */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
         <div className="w-full h-full bg-[linear-gradient(45deg,#111_25%,transparent_25%,transparent_75%,#111_75%,#111),linear-gradient(45deg,#111_25%,transparent_25%,transparent_75%,#111_75%,#111)] bg-[size:20px_20px] bg-[position:0_0,10px_10px]"></div>
      </div>

      {/* Custom Scope Cursor - Only visible in this section */}
      <motion.div
        style={{ left: cursorX, top: cursorY, opacity: isHoveringSection ? 1 : 0 }}
        className="absolute pointer-events-none z-[60] -translate-x-1/2 -translate-y-1/2 mix-blend-difference hidden md:block"
      >
        <div className="relative">
            {/* Crosshair */}
            <div className="w-[1px] h-20 bg-delta-green/50 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
            <div className="w-20 h-[1px] bg-delta-green/50 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
            
            {/* Circle */}
            <div className="w-16 h-16 border border-delta-green rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
            
            {/* Ticks */}
            <div className="absolute top-1/2 left-1/2 translate-x-10 -translate-y-1/2 text-[8px] font-mono text-delta-green">RNG:200m</div>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        
        {/* Section Header - Compressed top spacing */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 border-b border-white/10 pb-6">
            <FadeIn direction="right" className="flex-1">
                <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter uppercase leading-none">
                    精英 <br/>
                    <span className="text-outline text-transparent group-hover:text-delta-green transition-colors duration-500">干员</span>
                </h2>
            </FadeIn>
            <FadeIn direction="left" delay={0.2} className="mt-8 md:mt-0 text-right">
                <div className="flex items-center justify-end gap-2 text-delta-green mb-2">
                    <LocateFixed className="w-4 h-4 animate-spin-slow" />
                    <p className="font-mono text-sm">/// 目标锁定模式</p>
                </div>
                <p className="text-gray-500 max-w-xs text-sm">
                    悬停查看干员数据，点击获取绝密档案。
                </p>
            </FadeIn>
        </div>

        {/* Bento Grid Layout - Reduced height on mobile (h-[230px]) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            {OPERATORS.map((op, index) => {
                const colSpan = index === 0 || index === 3 ? "md:col-span-8" : "md:col-span-4";
                
                return (
                    <div 
                        className={`${colSpan} h-[230px] md:h-[380px] cursor-none relative group/card`} 
                        key={op.id}
                        onClick={() => setSelectedOperator(op)}
                    >
                        {/* Target Lock Corners (Active on Hover) */}
                        <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-delta-green opacity-0 group-hover/card:opacity-100 transition-all duration-200 z-50 group-hover/card:translate-x-2 group-hover/card:translate-y-2"></div>
                        <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-delta-green opacity-0 group-hover/card:opacity-100 transition-all duration-200 z-50 group-hover/card:-translate-x-2 group-hover/card:translate-y-2"></div>
                        <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-delta-green opacity-0 group-hover/card:opacity-100 transition-all duration-200 z-50 group-hover/card:translate-x-2 group-hover/card:-translate-y-2"></div>
                        <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-delta-green opacity-0 group-hover/card:opacity-100 transition-all duration-200 z-50 group-hover/card:-translate-x-2 group-hover/card:-translate-y-2"></div>

                        <FadeIn delay={index * 0.1} direction="up" blur={true} className="h-full">
                            <TiltCard className="h-full">
                                {/* Image Layer with Noise & Glitch Effect */}
                                <div className="absolute inset-0 group-hover/card:scale-[1.02] transition-transform duration-500">
                                    <div className="absolute inset-0 bg-delta-green mix-blend-color opacity-0 group-hover/card:opacity-10 transition-opacity z-10"></div>
                                    <img 
                                        src={op.image} 
                                        alt={op.name}
                                        onError={handleImageError}
                                        className="w-full h-full object-cover opacity-60 grayscale group-hover/card:grayscale-0 transition-all duration-500"
                                    />
                                    {/* Scanline Overlay */}
                                    <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.4)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,6px_100%] z-20 opacity-0 group-hover/card:opacity-40 pointer-events-none"></div>
                                    
                                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90"></div>
                                </div>

                                {/* Content */}
                                <div className="absolute inset-0 p-6 flex flex-col justify-between z-20 pointer-events-none">
                                    <div className="flex justify-between items-start" style={{ transform: "translateZ(30px)" }}>
                                        <div className="flex flex-col gap-1">
                                            <span className="inline-block px-2 py-1 bg-black/80 backdrop-blur-md text-[10px] font-mono text-delta-green border border-delta-green/30 group-hover/card:bg-delta-green group-hover/card:text-black transition-colors">
                                                {op.role}
                                            </span>
                                            <span className="text-[10px] font-mono text-gray-500">
                                                ID: {op.id.toUpperCase()}
                                            </span>
                                        </div>
                                        <div className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/10 group-hover/card:bg-delta-green group-hover/card:text-black transition-all group-hover/card:rotate-180">
                                            <Target size={16} />
                                        </div>
                                    </div>
                                    
                                    <div style={{ transform: "translateZ(20px)" }}>
                                        {/* Large Transparent BG Text for fullness */}
                                        <h3 className="text-6xl font-black text-white uppercase italic mb-2 tracking-tighter mix-blend-overlay opacity-20 absolute -top-10 -left-4 select-none pointer-events-none w-[200%] truncate">
                                            {op.name}
                                        </h3>

                                        <h3 className="text-3xl font-black text-white uppercase italic mb-2 tracking-tighter relative z-10 group-hover/card:text-delta-green transition-colors">
                                            {op.name}
                                        </h3>
                                        
                                        <div className="h-px w-full bg-delta-green/50 mb-3 origin-left scale-x-0 group-hover/card:scale-x-100 transition-transform duration-500"></div>
                                        
                                        <div className="grid grid-cols-2 gap-2">
                                            <div className="bg-black/40 p-2 backdrop-blur-sm border border-white/5 group-hover/card:border-delta-green/30 transition-colors">
                                                <p className="text-[9px] text-gray-400 font-mono uppercase">Win Rate</p>
                                                <p className="text-lg font-bold text-delta-green">{op.winRate}</p>
                                            </div>
                                            <div className="bg-black/40 p-2 backdrop-blur-sm border border-white/5 group-hover/card:border-white/20 transition-colors">
                                                <p className="text-[9px] text-gray-400 font-mono uppercase">K/D Ratio</p>
                                                <p className="text-lg font-bold text-white">{op.kd}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </TiltCard>
                        </FadeIn>
                    </div>
                );
            })}
        </div>

        {/* Modal */}
        <AnimatePresence>
            {selectedOperator && (
                <OperatorModal 
                    operator={selectedOperator} 
                    onClose={() => setSelectedOperator(null)} 
                />
            )}
        </AnimatePresence>

      </div>
    </section>
  );
};

export default Operators;
