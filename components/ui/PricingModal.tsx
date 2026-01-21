
import React from 'react';
import { createPortal } from 'react-dom';
import { motion } from 'framer-motion';
import { X, ShieldCheck, Zap, Briefcase, Crosshair } from 'lucide-react';
import { PricingTier } from '../../types';

interface PricingModalProps {
  tier: PricingTier;
  onClose: () => void;
}

const PricingModal: React.FC<PricingModalProps> = ({ tier, onClose }) => {
  if (typeof document === 'undefined') return null;

  return createPortal(
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0, y: 30 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 30 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className={`relative w-full max-w-2xl bg-[#080808] border ${tier.color} overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.8)]`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Decorative Grid Background */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none"></div>

        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-50 p-2 text-gray-500 hover:text-white transition-colors bg-black/50 rounded-full border border-white/10"
        >
          <X size={20} />
        </button>

        {/* Header */}
        <div className="relative p-8 border-b border-white/10 bg-gradient-to-r from-white/5 to-transparent">
            <div className="flex items-center gap-2 mb-2">
                <span className={`inline-block w-2 h-2 rounded-full ${tier.recommended ? 'bg-delta-green animate-pulse' : 'bg-gray-500'}`}></span>
                <span className="text-xs font-mono text-gray-400 tracking-widest uppercase">Contract Details</span>
                {tier.discountLabel && (
                    <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded bg-red-900/30 border border-red-500/50 text-red-400 text-[10px] font-bold uppercase tracking-wider">
                        {tier.discountLabel}
                    </span>
                )}
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-white uppercase italic tracking-tighter mb-2">{tier.name}</h2>
            <div className="flex items-baseline gap-2">
                 <p className="text-xl font-mono text-gray-400">
                    <span className={tier.recommended ? 'text-delta-green' : 'text-white'}>{tier.price}</span> 
                    <span className="text-sm ml-2">/ OPERATION</span>
                </p>
                {tier.originalPrice && (
                    <span className="text-sm text-gray-600 line-through font-mono decoration-red-500/50">
                        {tier.originalPrice}
                    </span>
                )}
            </div>
           
        </div>

        {/* Body Content */}
        <div className="p-8 space-y-8 relative z-10">
            
            {/* Description Section */}
            <div>
                <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3 flex items-center gap-2">
                    <Briefcase size={14} /> Mission Profile
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed border-l-2 border-white/20 pl-4">
                    {tier.description}
                </p>
            </div>

            {/* Two Column Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Service Level & Equipment */}
                <div className="space-y-6">
                    <div>
                        <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Service Level</h3>
                        <div className="inline-flex items-center px-3 py-1 bg-white/5 border border-white/10 text-xs font-mono text-delta-green">
                            {tier.serviceLevel}
                        </div>
                    </div>
                    <div>
                        <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Equipment Protocol</h3>
                         <div className="inline-flex items-center px-3 py-1 bg-white/5 border border-white/10 text-xs font-mono text-white">
                            {tier.equipmentPolicy}
                        </div>
                    </div>
                </div>

                {/* Exclusive Perks */}
                <div>
                    <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3 flex items-center gap-2">
                        <Zap size={14} /> Exclusive Perks
                    </h3>
                    <ul className="space-y-2">
                        {tier.exclusivePerks.map((perk, idx) => (
                            <li key={idx} className="flex items-center text-sm text-gray-300">
                                <Crosshair size={12} className="text-delta-green mr-2" />
                                {perk}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* Guarantee Box */}
            <div className="bg-delta-green/5 border border-delta-green/20 p-4 rounded-sm flex items-start gap-3">
                <ShieldCheck className="text-delta-green shrink-0 mt-0.5" size={18} />
                <div>
                    <h4 className="text-delta-green text-xs font-bold uppercase mb-1">Delta Ops Guarantee</h4>
                    <p className="text-gray-400 text-xs leading-relaxed">
                        Verification required for all operators. Payment is held in escrow until mission completion. Disconnection or operator error results in full refund.
                    </p>
                </div>
            </div>

        </div>

      </motion.div>
    </motion.div>,
    document.body
  );
};

export default PricingModal;
