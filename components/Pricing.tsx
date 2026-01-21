
import React, { useState, useEffect, useRef } from 'react';
import { PRICING } from '../constants';
import { ArrowRight, Hexagon, Shield, Radio, Zap, Crosshair, Lock, Unlock, Cpu, Crown } from 'lucide-react';
import FadeIn from './ui/FadeIn';
import { PricingTier } from '../types';
import PricingModal from './ui/PricingModal';
import { AnimatePresence, motion, useMotionTemplate, useMotionValue, useSpring } from 'framer-motion';

interface PricingProps {
  onModalChange?: (isOpen: boolean) => void;
}

// Local component for Scrambling Text Effect
const ScrambleText = ({ text, active }: { text: string; active: boolean }) => {
    const [display, setDisplay] = useState(text);
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_-%$#@";
    
    useEffect(() => {
        if (!active) {
            setDisplay(text);
            return;
        }
        
        let iteration = 0;
        const interval = setInterval(() => {
            setDisplay(
                text.split("").map((letter, index) => {
                    if (index < iteration) return text[index];
                    return chars[Math.floor(Math.random() * chars.length)];
                }).join("")
            );
            if (iteration >= text.length) clearInterval(interval);
            iteration += 1/2; 
        }, 30);
        
        return () => clearInterval(interval);
    }, [active, text]);

    return <span>{display}</span>;
};

const PricingCard = ({ tier, onClick, index }: { tier: PricingTier; onClick: () => void; index: number }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const isLegendary = tier.id === 'tier-3';

  // Smooth out the mouse movement
  const smoothX = useSpring(mouseX, { stiffness: 200, damping: 20 });
  const smoothY = useSpring(mouseY, { stiffness: 200, damping: 20 });

  const [isHovered, setIsHovered] = useState(false);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  const maskImage = useMotionTemplate`radial-gradient(300px at ${smoothX}px ${smoothY}px, white, transparent)`;
  const style = useMotionTemplate`radial-gradient(300px circle at ${smoothX}px ${smoothY}px, ${tier.id === 'tier-2' ? 'rgba(0, 255, 157, 0.15)' : isLegendary ? 'rgba(255, 215, 0, 0.25)' : 'rgba(59, 130, 246, 0.15)'}, transparent 80%)`;

  const borderColor = tier.id === 'tier-2' ? 'border-delta-green' : isLegendary ? 'border-delta-gold' : 'border-blue-500';
  const textColor = tier.id === 'tier-2' ? 'text-delta-green' : isLegendary ? 'text-delta-gold' : 'text-blue-500';
  const glowColor = tier.id === 'tier-2' ? '#00FF9D' : isLegendary ? '#FFD700' : '#3B82F6';

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      className={`group relative h-full rounded-xl overflow-hidden border transition-all duration-500 cursor-pointer flex flex-col 
        ${isLegendary ? 'bg-[#080808] border-delta-gold/50 shadow-[0_0_20px_-5px_rgba(255,215,0,0.15)]' : 'bg-[#080808] border-white/10 hover:border-white/30'}
      `}
    >
      {/* Legendary pulsing glow background */}
      {isLegendary && (
        <div className="absolute inset-0 bg-gradient-to-b from-delta-gold/10 via-transparent to-transparent opacity-50 animate-pulse pointer-events-none"></div>
      )}

      {/* 1. Spotlight Effect Layer */}
      <motion.div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 group-hover:opacity-100 z-10"
        style={{ background: style }}
      />

      {/* 2. Grid Background Pattern (Revealed by spotlight) */}
      <div className="absolute inset-0 z-0 opacity-20 group-hover:opacity-40 transition-opacity duration-500">
          <div className={`absolute inset-0 bg-[linear-gradient(to_right,#888_1px,transparent_1px),linear-gradient(to_bottom,#888_1px,transparent_1px)] bg-[size:30px_30px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]`}></div>
      </div>

      {/* 3. Active Border Frame (Animated) */}
      <div className={`absolute inset-0 border-2 ${borderColor} opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl z-20 pointer-events-none mix-blend-screen shadow-[0_0_15px_${glowColor}]`}></div>
      
      {/* 4. Content */}
      <div className="relative z-30 p-8 flex flex-col h-full">
        
        {/* Top Badge & Icon */}
        <div className="flex justify-between items-start mb-6">
            <div className={`p-3 rounded-lg bg-white/5 border border-white/10 group-hover:bg-white/10 transition-colors ${textColor}`}>
                {isLegendary ? <Crown size={24} className="drop-shadow-[0_0_5px_rgba(255,215,0,0.8)]" /> : tier.id === 'tier-2' ? <Hexagon size={24} /> : <Shield size={24} />}
            </div>
            {tier.recommended && (
                <span className="px-3 py-1 bg-delta-green/20 border border-delta-green text-delta-green text-[10px] font-bold uppercase tracking-wider animate-pulse">
                    Recommended
                </span>
            )}
            {isLegendary && !tier.discountLabel && (
                <span className="px-3 py-1 bg-delta-gold/20 border border-delta-gold text-delta-gold text-[10px] font-bold uppercase tracking-wider animate-pulse shadow-[0_0_10px_rgba(255,215,0,0.3)]">
                    Top Secret
                </span>
            )}
        </div>

        {/* Title & Price */}
        <div className="mb-8">
            <h3 className={`text-sm font-mono uppercase tracking-widest mb-2 transition-colors ${isLegendary ? 'text-delta-gold' : 'text-gray-400 group-hover:text-white'}`}>
                {tier.name}
            </h3>
            
            <div className="flex flex-col items-start gap-1">
                <div className="flex items-baseline gap-3">
                    <span className={`text-4xl md:text-5xl font-black tracking-tighter text-white group-hover:${textColor} transition-colors duration-300`}>
                       <ScrambleText text={tier.price} active={isHovered} />
                    </span>
                    {tier.originalPrice && (
                        <div className="relative">
                            <span className="text-lg text-gray-600 font-mono">
                                {tier.originalPrice}
                            </span>
                            <div className="absolute top-1/2 left-0 w-full h-[2px] bg-red-500/80 -rotate-12 transform origin-center"></div>
                        </div>
                    )}
                </div>
                {tier.discountLabel && (
                    <div className="self-start relative group/tag mt-1">
                         <div className="absolute inset-0 bg-red-500 blur-sm opacity-20 animate-pulse"></div>
                         <span className="relative z-10 inline-flex items-center gap-1 px-2 py-0.5 bg-red-950/50 border border-red-500/50 text-red-400 text-[10px] font-bold uppercase tracking-wider">
                            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping"></span>
                            {tier.discountLabel}
                         </span>
                    </div>
                )}
            </div>

            {/* Animated Divider */}
            <div className="w-full h-px bg-white/10 mt-6 relative overflow-hidden">
                <div className={`absolute inset-0 bg-gradient-to-r from-transparent via-${tier.id === 'tier-2' ? 'delta-green' : isLegendary ? 'delta-gold' : 'white'} to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000`}></div>
            </div>
        </div>

        {/* Features */}
        <ul className="space-y-4 mb-8 flex-1">
            {tier.features.map((feature, i) => (
                <li key={i} className="flex items-center gap-3 text-sm text-gray-400 group-hover:text-gray-200 transition-colors">
                    <div className={`w-1.5 h-1.5 rounded-full ${tier.id === 'tier-2' ? 'bg-delta-green' : isLegendary ? 'bg-delta-gold' : 'bg-blue-500'} group-hover:shadow-[0_0_8px_currentColor]`}></div>
                    <span className="font-mono text-xs">{feature}</span>
                </li>
            ))}
        </ul>

        {/* Action Button */}
        <div className="mt-auto">
            <button className={`w-full relative overflow-hidden group/btn py-4 px-6 bg-white/5 border border-white/10 hover:border-${tier.id === 'tier-2' ? 'delta-green' : 'white'} transition-all duration-300`}>
                <div className={`absolute inset-0 bg-${tier.id === 'tier-2' ? 'delta-green' : isLegendary ? 'delta-gold' : 'blue-500'} opacity-0 group-hover/btn:opacity-10 transition-opacity duration-300`}></div>
                
                <div className="flex items-center justify-between relative z-10">
                    <span className={`font-mono text-xs font-bold uppercase tracking-widest group-hover/btn:${textColor}`}>
                        {isHovered ? 'INITIATE PROTOCOL' : 'SELECT PLAN'}
                    </span>
                    {isHovered ? <Unlock size={16} className={textColor} /> : <Lock size={16} className="text-gray-500" />}
                </div>
                
                {/* Progress Bar Effect on Hover */}
                <div className={`absolute bottom-0 left-0 h-1 bg-${tier.id === 'tier-2' ? 'delta-green' : isLegendary ? 'delta-gold' : 'blue-500'} w-0 group-hover/btn:w-full transition-all duration-300 ease-out`}></div>
            </button>
        </div>

      </div>
    </motion.div>
  );
};

const Pricing: React.FC<PricingProps> = ({ onModalChange }) => {
  const [selectedTier, setSelectedTier] = useState<PricingTier | null>(null);

  useEffect(() => {
    if (onModalChange) {
      onModalChange(!!selectedTier);
    }
  }, [selectedTier, onModalChange]);

  return (
    <section id="pricing" className="py-24 bg-black relative overflow-hidden flex flex-col justify-center">
        {/* Dynamic Background */}
        <div className="absolute inset-0 bg-[#030303]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gray-900/50 via-black to-black opacity-80"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
            
            {/* Section Header */}
            <div className="mb-20 flex flex-col items-center text-center">
                <FadeIn direction="down">
                    <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-white/5 border border-white/10 rounded-full backdrop-blur-sm">
                        <Zap size={14} className="text-delta-green animate-pulse" />
                        <span className="text-xs font-mono text-gray-300 tracking-[0.2em]">战术部署</span>
                    </div>
                </FadeIn>
                <FadeIn>
                    <h2 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter mb-6 relative inline-block">
                        部署 <span className="text-transparent bg-clip-text bg-gradient-to-r from-delta-green to-emerald-600">计划</span>
                        <div className="absolute -top-6 -right-6 text-xs font-mono text-gray-600 opacity-50 rotate-12 border border-gray-700 px-2 py-1 rounded">加密通道</div>
                    </h2>
                </FadeIn>
                <FadeIn delay={0.2}>
                     <p className="max-w-xl text-gray-500 font-mono text-sm leading-relaxed">
                        Select your operational tier. All contracts are secured by AES-256 encryption. 
                        Live support is standing by for custom mission profiles.
                    </p>
                </FadeIn>
            </div>

            {/* Pricing Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch perspective-1000">
                {PRICING.map((tier, index) => (
                    <PricingCard 
                        key={tier.id} 
                        tier={tier} 
                        index={index}
                        onClick={() => setSelectedTier(tier)} 
                    />
                ))}
            </div>
            
            <AnimatePresence>
                {selectedTier && (
                    <PricingModal 
                        tier={selectedTier} 
                        onClose={() => setSelectedTier(null)} 
                    />
                )}
            </AnimatePresence>
        </div>
    </section>
  );
};

export default Pricing;
