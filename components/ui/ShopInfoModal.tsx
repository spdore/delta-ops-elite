
import React from 'react';
import { createPortal } from 'react-dom';
import { motion } from 'framer-motion';
import { X, ShieldCheck, Star, Users, Award, Radio } from 'lucide-react';

interface ShopInfoModalProps {
  onClose: () => void;
}

const ShopInfoModal: React.FC<ShopInfoModalProps> = ({ onClose }) => {
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
        className="relative w-full max-w-3xl bg-[#080808] border border-delta-green/30 overflow-hidden shadow-[0_0_50px_rgba(0,255,157,0.1)]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Background Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,157,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,157,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none"></div>

        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-50 p-2 text-gray-500 hover:text-white transition-colors bg-black/50 rounded-full border border-white/10"
        >
          <X size={20} />
        </button>

        <div className="flex flex-col md:flex-row h-full">
            {/* Left Brand Panel */}
            <div className="w-full md:w-1/3 bg-delta-green/5 border-r border-delta-green/10 p-8 flex flex-col justify-between relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-delta-green to-transparent"></div>
                
                <div>
                    <h2 className="text-3xl font-black text-white italic tracking-tighter mb-2">DELTA<span className="text-delta-green">.OPS</span></h2>
                    <p className="text-xs font-mono text-delta-green/70 tracking-widest uppercase mb-8">Elite Task Force</p>
                    
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <ShieldCheck className="text-delta-green" size={20} />
                            <div>
                                <div className="text-white font-bold text-sm">官方认证</div>
                                <div className="text-gray-500 text-[10px]">VERIFIED AGENCY</div>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <Users className="text-delta-green" size={20} />
                            <div>
                                <div className="text-white font-bold text-sm">顶级打手</div>
                                <div className="text-gray-500 text-[10px]">TOP 0.1% OPERATORS</div>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <Award className="text-delta-green" size={20} />
                            <div>
                                <div className="text-white font-bold text-sm">五星好评</div>
                                <div className="text-gray-500 text-[10px]">100% SATISFACTION</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-8 pt-8 border-t border-delta-green/10">
                    <div className="flex items-center gap-2 text-delta-green animate-pulse">
                        <Radio size={14} />
                        <span className="text-[10px] font-mono">STATUS: ONLINE</span>
                    </div>
                </div>
            </div>

            {/* Right Content Panel */}
            <div className="w-full md:w-2/3 p-8 relative z-10">
                <h3 className="text-xl font-bold text-white uppercase tracking-wider mb-6 flex items-center gap-2">
                    <span className="w-2 h-8 bg-delta-green block"></span>
                    关于我们 // About Us
                </h3>

                <div className="space-y-6 text-sm text-gray-300 leading-relaxed font-sans">
                    <p>
                        <strong className="text-white">DELTA OPS</strong> 成立于三角洲行动S1赛季，是由一群前职业选手、高分路人和战术指挥官组成的顶级陪玩公会。
                    </p>
                    <p>
                        我们深知《三角洲行动》不仅仅是一款射击游戏，更是一场关于资源、信息与战术的博弈。无论您是想在烽火地带（撤离模式）中满载而归，还是在全面战场中体验统治级的宰治力，我们都能提供最专业的战术支持。
                    </p>
                    
                    <div className="grid grid-cols-2 gap-4 mt-6">
                        <div className="bg-white/5 p-4 border border-white/5 rounded-sm">
                            <h4 className="text-delta-green font-bold text-xs uppercase mb-2">安全保障</h4>
                            <p className="text-xs text-gray-500">所有打手均经过实名认证与严格的技术考核。严禁任何科技与脚本，保障您的账号绝对安全。</p>
                        </div>
                        <div className="bg-white/5 p-4 border border-white/5 rounded-sm">
                            <h4 className="text-delta-green font-bold text-xs uppercase mb-2">极速响应</h4>
                            <p className="text-xs text-gray-500">7x24小时客服在线，下单即刻安排发车。战损包赔，撤离失败全额退款或免费补打。</p>
                        </div>
                    </div>
                </div>

                <div className="mt-8 flex justify-end">
                    <div className="text-right">
                        <p className="text-[10px] font-mono text-gray-600 uppercase">Current Operation</p>
                        <p className="text-xl font-black text-white italic">GLOBAL DOMINATION</p>
                    </div>
                </div>
            </div>
        </div>
      </motion.div>
    </motion.div>,
    document.body
  );
};

export default ShopInfoModal;
