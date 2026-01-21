
import React, { useEffect, useState, createContext, useContext } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Mission from './components/Mission';
import Operators from './components/Operators';
import Pricing from './components/Pricing';
import Footer from './components/Footer';
import ChatWidget from './components/ChatWidget';
import Preloader from './components/ui/Preloader';
import ShopInfoModal from './components/ui/ShopInfoModal';
import { AnimatePresence, motion } from 'framer-motion';

// --- Sound System Setup ---
// Short subtle UI sounds (Base64 placeholders for demo purposes)
const HOVER_SFX = "data:audio/wav;base64,UklGRl9vT1BXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YU"; // Very short empty/click placeholder
const CLICK_SFX = "data:audio/wav;base64,UklGRl9vT1BXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YU"; 

interface SoundContextType {
  playHover: () => void;
  playClick: () => void;
}

export const SoundContext = createContext<SoundContextType>({ playHover: () => {}, playClick: () => {} });

export const useUiSound = () => useContext(SoundContext);

interface Ripple {
  x: number;
  y: number;
  id: number;
}

const App: React.FC = () => {
  const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 });
  const [isClicking, setIsClicking] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isAnyModalOpen, setIsAnyModalOpen] = useState(false);
  const [isShopModalOpen, setIsShopModalOpen] = useState(false);
  const [ripples, setRipples] = useState<Ripple[]>([]);

  // Simple Sound Logic
  const playHover = () => {
    // In a real app, use Audio API with real buffers. 
    // This is a stub to show where integration happens.
    // const audio = new Audio(HOVER_SFX);
    // audio.volume = 0.2;
    // audio.play().catch(() => {});
  };

  const playClick = () => {
    // const audio = new Audio(CLICK_SFX);
    // audio.volume = 0.3;
    // audio.play().catch(() => {});
  };

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
      
      const target = e.target as HTMLElement;
      const isClickable = target.closest('a, button, [role="button"], .cursor-pointer');
      setIsHovering(!!isClickable);
    };
    
    const mouseDown = (e: MouseEvent) => {
      setIsClicking(true);
      playClick(); // Trigger sound
      const newRipple = { x: e.clientX, y: e.clientY, id: Date.now() };
      setRipples(prev => [...prev, newRipple]);
      setTimeout(() => {
        setRipples(prev => prev.filter(r => r.id !== newRipple.id));
      }, 1000);
    };
    
    const mouseUp = () => setIsClicking(false);

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mousedown', mouseDown);
    window.addEventListener('mouseup', mouseUp);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mousedown', mouseDown);
      window.removeEventListener('mouseup', mouseUp);
    };
  }, []);

  useEffect(() => {
    setIsAnyModalOpen(isShopModalOpen);
  }, [isShopModalOpen]);

  useEffect(() => {
    if (isAnyModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isAnyModalOpen]);

  return (
    <SoundContext.Provider value={{ playHover, playClick }}>
      <div className="bg-delta-dark min-h-screen text-white font-sans selection:bg-delta-green selection:text-black overflow-x-hidden cursor-none">
        
        <AnimatePresence>
          {loading && <Preloader onComplete={() => setLoading(false)} />}
        </AnimatePresence>

        {!loading && (
          <>
            {/* Click Ripples */}
            {ripples.map(ripple => (
              <motion.div
                key={ripple.id}
                initial={{ scale: 0, opacity: 0.8, borderColor: "rgba(0, 255, 157, 1)" }}
                animate={{ scale: 2.5, opacity: 0, borderColor: "rgba(0, 255, 157, 0)" }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="fixed pointer-events-none rounded-full border border-delta-green z-[9998]"
                style={{
                  left: ripple.x,
                  top: ripple.y,
                  width: 40,
                  height: 40,
                  x: "-50%",
                  y: "-50%",
                  backgroundColor: 'rgba(0, 255, 157, 0.1)'
                }}
              />
            ))}

            {/* Global Scanlines */}
            <div className="scanlines"></div>
            
            {/* Animated Grain Overlay */}
            <div className="grain-overlay"></div>

            {/* Custom Cursor */}
            <div 
              className="fixed pointer-events-none z-[9999] hidden md:block mix-blend-exclusion"
              style={{ 
                left: cursorPos.x, 
                top: cursorPos.y,
                transform: 'translate(-50%, -50%)' 
              }}
            >
              {/* Center dot */}
              <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-delta-green rounded-full transition-all duration-200 ${isClicking ? 'w-1 h-1' : 'w-2 h-2'} ${isHovering ? 'bg-white shadow-[0_0_10px_#fff]' : ''}`}></div>
              
              {/* Outer Ring */}
              <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border transition-all duration-300 
                ${isClicking ? 'w-6 h-6 opacity-80 border-delta-green/80 bg-delta-green/20' : 
                  isHovering ? 'w-12 h-12 opacity-80 border-white bg-white/5' : 'w-10 h-10 opacity-30 border-delta-green/50'}
              `}></div>
              
              {/* Crosshair lines for idle state */}
              {!isHovering && !isClicking && (
                <>
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-[1px] bg-delta-green/20"></div>
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1px] h-14 bg-delta-green/20"></div>
                </>
              )}

              {/* Hover Indicator */}
              {isHovering && (
                <div className="absolute top-8 left-8 text-[9px] font-mono text-white tracking-widest whitespace-nowrap bg-black/50 px-1 border border-white/20">
                  LINK DETECTED
                </div>
              )}
            </div>

            <Navbar isVisible={!isAnyModalOpen} />
            <main className="relative z-10">
              <Hero onOpenShopInfo={() => setIsShopModalOpen(true)} />
              <Mission />
              <Operators onModalChange={(isOpen) => setIsAnyModalOpen(isOpen || isShopModalOpen)} />
              <Pricing onModalChange={(isOpen) => setIsAnyModalOpen(isOpen || isShopModalOpen)} />
            </main>
            <Footer />
            <ChatWidget />
            
            <AnimatePresence>
              {isShopModalOpen && <ShopInfoModal onClose={() => setIsShopModalOpen(false)} />}
            </AnimatePresence>
          </>
        )}
      </div>
    </SoundContext.Provider>
  );
};

export default App;
