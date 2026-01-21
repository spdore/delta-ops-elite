
import React from 'react';
import { createPortal } from 'react-dom';
import { motion } from 'framer-motion';
import { X, Crosshair, Shield, Zap, Target } from 'lucide-react';
import { Operator } from '../../types';

interface OperatorModalProps {
  operator: Operator;
  onClose: () => void;
}

const StatBar: React.FC<{ label: string; value: number; delay: number }> = ({ label, value, delay }) => (
  <div className="mb-4">
    <div className="flex justify-between mb-1 text-[10px] font-mono text-gray-400 uppercase">
      <span>{label}</span>
      <span className="text-delta-green">{value}%</span>
    </div>
    <div className="h-1 w-full bg-white/10 overflow-hidden">
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${value}%` }}
        transition={{ duration: 1, delay: delay, ease: "easeOut" }}
        className="h-full bg-delta-green"
      />
    </div>
  </div>
);

const OperatorModal: React.FC<OperatorModalProps> = ({ operator, onClose }) => {
  if (typeof document === 'undefined') return null;

  return createPortal(
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="relative w-full max-w-5xl bg-[#050505] border border-delta-green/30 overflow-hidden shadow-[0_0_100px_rgba(0,255,157,0.1)] flex flex-col md:flex-row max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-50 p-2 text-gray-500 hover:text-white hover:bg-white/10 transition-colors"
        >
          <X size={24} />
        </button>

        {/* Decorative Lines */}
        <div className="absolute top-0 left-0 w-32 h-32 border-l-2 border-t-2 border-delta-green/50 pointer-events-none z-20"></div>
        <div className="absolute bottom-0 right-0 w-32 h-32 border-r-2 border-b-2 border-delta-green/50 pointer-events-none z-20"></div>

        {/* Left Column: Image & Basic Info */}
        <div className="w-full md:w-5/12 relative group h-[400px] md:h-auto">
           <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-delta-green/10 to-transparent opacity-50"></div>
           <img 
              src={operator.image} 
              alt={operator.name}
              onError={(e) => {
                  e.currentTarget.src = "https://images.unsplash.com/photo-1595590424283-b8f17842773f?q=80&w=800&auto=format&fit=crop";
                  e.currentTarget.onerror = null;
              }}
              className="w-full h-full object-cover grayscale mix-blend-luminosity opacity-80"
           />
           <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent"></div>
           
           <div className="absolute bottom-8 left-8">
              <h2 className="text-6xl font-black text-white tracking-tighter uppercase italic">{operator.name}</h2>
              <div className="flex items-center gap-2 mt-2">
                  <span className="px-2 py-1 bg-delta-green text-black text-xs font-bold uppercase">{operator.role}</span>
                  <span className="text-delta-green font-mono text-xs">{operator.rank}</span>
              </div>
           </div>
        </div>

        {/* Right Column: Detailed Intel */}
        <div className="w-full md:w-7/12 p-8 md:p-12 overflow-y-auto scrollbar-thin">
            
            {/* Header */}
            <div className="mb-8 border-b border-white/10 pb-4">
                <div className="flex items-center gap-2 text-delta-green mb-2 opacity-70">
                    <Crosshair size={14} className="animate-spin-slow" />
                    <span className="text-xs font-mono tracking-widest">CLASSIFIED DOSSIER // LEVEL 5 CLEARANCE</span>
                </div>
            </div>

            {/* Description */}
            <div className="mb-8">
                <h3 className="text-sm font-bold text-white uppercase tracking-widest mb-3 flex items-center gap-2">
                    <Target size={14} /> Tactical Analysis
                </h3>
                <p className="text-gray-400 font-mono text-sm leading-relaxed border-l-2 border-delta-green/30 pl-4">
                    {operator.description}
                </p>
            </div>

            {/* Loadout & Tactics */}
            <div className="grid grid-cols-2 gap-8 mb-8">
                <div>
                    <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">Main Loadout</h3>
                    <div className="flex flex-wrap gap-2">
                        {operator.mainWeapons.map(weapon => (
                            <span key={weapon} className="px-3 py-1 border border-white/10 text-xs text-white bg-white/5 font-mono">
                                {weapon}
                            </span>
                        ))}
                    </div>
                </div>
                <div>
                    <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">Tactical Style</h3>
                    <div className="flex flex-wrap gap-2">
                        {operator.tacticalStyle.map(style => (
                            <span key={style} className="px-3 py-1 border border-delta-green/20 text-xs text-delta-green/80 bg-delta-green/5 font-mono">
                                {style}
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            {/* Stats Radar/Bars */}
            <div className="mb-8 bg-white/5 p-6 border border-white/5 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-2 opacity-20">
                    <Shield size={40} />
                </div>
                <h3 className="text-xs font-bold text-white uppercase tracking-widest mb-4">Performance Metrics</h3>
                
                <div className="grid grid-cols-2 gap-x-8">
                    <StatBar label="Aim / Accuracy" value={operator.radarStats.aim} delay={0.2} />
                    <StatBar label="Survival Rate" value={operator.radarStats.survival} delay={0.3} />
                    <StatBar label="Team Support" value={operator.radarStats.support} delay={0.4} />
                    <StatBar label="Map Awareness" value={operator.radarStats.awareness} delay={0.5} />
                </div>
            </div>

            {/* Action */}
            <div className="flex gap-4">
                <button className="flex-1 bg-delta-green text-black font-black uppercase py-4 tracking-widest hover:bg-white transition-colors relative overflow-hidden group">
                    <span className="relative z-10">Deploy Contract</span>
                    <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-200"></div>
                </button>
                <div className="flex flex-col justify-center px-4 border border-white/10 bg-white/5">
                    <span className="text-[10px] text-gray-500 font-mono uppercase">Combat Rating</span>
                    <span className="text-xl font-bold text-white">{operator.kd} KD</span>
                </div>
            </div>

        </div>
      </motion.div>
    </motion.div>,
    document.body
  );
};

export default OperatorModal;
