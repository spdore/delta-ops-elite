
import React, { useState } from 'react';
import { ShieldAlert, Check, Github } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Footer: React.FC = () => {
  const [toast, setToast] = useState<{ show: boolean; message: string }>({ show: false, message: '' });

  const handleCopy = async (label: string) => {
    const url = "https://search.bilibili.com/all?keyword=%E4%BD%A0%E8%A2%AB%E9%AA%97%E4%BA%86&from_source=webtop_search&spm_id_from=333.1007&search_source=2";
    
    try {
      await navigator.clipboard.writeText(url);
      setToast({ show: true, message: `已复制${label}` });
      
      setTimeout(() => {
        setToast(prev => ({ ...prev, show: false }));
      }, 2000);
    } catch (err) {
      console.error('Copy failed:', err);
    }
  };

  return (
    <footer id="contact" className="bg-black border-t border-white/10 py-12 pb-32 md:pb-12 relative">
      {/* Toast Notification */}
      <AnimatePresence>
        {toast.show && (
          <motion.div
            initial={{ opacity: 0, y: 50, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: 20, x: "-50%" }}
            className="fixed bottom-24 md:bottom-10 left-1/2 z-[9999] bg-delta-green text-black px-6 py-3 rounded-sm font-bold flex items-center gap-2 shadow-[0_0_20px_rgba(0,255,157,0.5)] border border-white/20"
          >
            <Check size={18} />
            <span className="font-mono text-sm tracking-wide uppercase">{toast.message}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="text-2xl font-black text-white italic mb-4">
              DELTA<span className="text-delta-green">.OPS</span>
            </div>
            <p className="text-gray-500 text-sm max-w-sm mb-6">
              专业的游戏陪玩服务平台。致力于为每一位指挥官提供最优质的战术支援。
              这不是游戏，是战场。
            </p>
            <div className="flex space-x-4">
                <button onClick={() => handleCopy('微信号')} className="text-gray-400 hover:text-delta-green text-sm uppercase tracking-wider transition-colors">
                    WeChat
                </button>
                <button onClick={() => handleCopy('QQ号')} className="text-gray-400 hover:text-delta-green text-sm uppercase tracking-wider transition-colors">
                    QQ
                </button>
                <button onClick={() => handleCopy('Discord ID')} className="text-gray-400 hover:text-delta-green text-sm uppercase tracking-wider transition-colors">
                    Discord
                </button>
            </div>
          </div>
          
          <div>
            <h4 className="text-white font-bold uppercase mb-4 tracking-widest text-sm">服务</h4>
            <ul className="space-y-2 text-gray-500 text-sm">
                <li><span className="hover:text-delta-green transition-colors cursor-default">烽火地带陪练</span></li>
                <li><span className="hover:text-delta-green transition-colors cursor-default">全面战场指挥</span></li>
                <li><span className="hover:text-delta-green transition-colors cursor-default">战术复盘教学</span></li>
            </ul>
          </div>

          <div>
             <h4 className="text-white font-bold uppercase mb-4 tracking-widest text-sm">联系我们</h4>
             <div className="bg-delta-gray p-4 border border-white/5">
                <p className="text-delta-green font-mono mb-2">OPERATOR_ID: ADMIN</p>
                <button 
                    onClick={() => handleCopy('微信号')}
                    className="w-full bg-white/5 hover:bg-white/10 text-white text-xs py-2 border border-white/10 transition-colors"
                >
                    复制微信号
                </button>
             </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-xs text-gray-600">
            <div className="flex flex-col md:flex-row items-center gap-2">
                <p>© 2024 DELTA OPS ELITE. All rights reserved.</p>
                <span className="hidden md:inline text-gray-800">|</span>
                <a 
                    href="https://github.com/spdore" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="flex items-center gap-1 hover:text-delta-green transition-colors"
                >
                    <Github size={12} />
                    <span>spdore</span>
                </a>
            </div>
            <div className="flex items-center mt-4 md:mt-0 space-x-2">
                <ShieldAlert className="w-4 h-4" />
                <span>拒绝外挂，绿色游戏，从我做起</span>
            </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
