
import React, { useState, useEffect } from 'react';
import { Crosshair, Home, Target, Users, Zap, Rocket } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface NavbarProps {
  isVisible?: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ isVisible = true }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [hideMobileLogo, setHideMobileLogo] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  // Scroll detection for Navbar styling
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 50);
      setHideMobileLogo(currentScrollY > 250);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Active Section Spy (Logic to highlight icons based on scroll position)
  useEffect(() => {
    const sections = ['hero', 'mission', 'operators', 'pricing'];
    
    const handleScrollSpy = () => {
      const scrollPosition = window.scrollY + window.innerHeight * 0.4; // Trigger point

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(section);
          }
        }
      }
    };

    window.addEventListener('scroll', handleScrollSpy);
    handleScrollSpy(); // Initial check
    return () => window.removeEventListener('scroll', handleScrollSpy);
  }, []);

  const navLinks = [
    { name: '作战任务', href: '#mission' },
    { name: '精英干员', href: '#operators' },
    { name: '部署计划', href: '#pricing' },
  ];

  const mobileNavItems = [
    { id: 'hero', icon: Home, label: '首页', href: '#hero' },
    { id: 'mission', icon: Target, label: '任务', href: '#mission' },
    { id: 'operators', icon: Users, label: '干员', href: '#operators' },
    { id: 'pricing', icon: Zap, label: '部署', href: '#pricing' },
  ];

  const scrollToSection = (e: React.MouseEvent | React.TouchEvent, href: string) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId === 'top' ? 'hero' : targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    // Manually set active for instant feedback
    setActiveSection(targetId === 'top' ? 'hero' : targetId);
  };

  return (
    <>
      {/* ================= DESKTOP TOP BAR ================= */}
      <nav 
        className={`fixed top-0 left-0 w-full z-[40] hidden md:flex justify-center pt-6 px-4 pointer-events-none transition-all duration-500 transform ${
          isVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
        }`}
      >
        <div className={`pointer-events-auto transition-all duration-500 ease-out border backdrop-blur-xl rounded-sm px-4 py-3 flex items-center justify-between ${
          isScrolled 
            ? 'bg-black/90 border-delta-green/20 shadow-[0_0_30px_-10px_rgba(0,255,157,0.3)] min-w-[320px] max-w-4xl skew-x-[-10deg]' 
            : 'bg-transparent border-transparent w-full max-w-7xl'
        }`}>
          
          {/* Logo */}
          <div className={`flex items-center gap-2 group cursor-pointer pointer-events-auto ${isScrolled ? 'skew-x-[10deg]' : ''}`} onClick={(e) => scrollToSection(e, '#hero')}>
            <div className="relative">
              <Crosshair className="w-6 h-6 text-delta-green transition-transform duration-700 group-hover:rotate-180" />
              <div className="absolute inset-0 bg-delta-green blur-md opacity-50 animate-pulse"></div>
            </div>
            <span className="font-bold tracking-tighter text-xl text-white">
              DELTA<span className="text-delta-green">.OPS</span>
            </span>
          </div>

          {/* Links */}
          <div className={`flex items-center gap-8 ${isScrolled ? 'skew-x-[10deg]' : ''}`}>
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => scrollToSection(e, link.href)}
                className="relative text-sm font-bold text-gray-400 hover:text-delta-green transition-colors tracking-wider group px-2 py-1"
              >
                <span className="relative z-10 group-hover:hidden">{link.name}</span>
                <span className="relative z-10 hidden group-hover:inline-block font-mono text-delta-green">
                    [{link.name}]
                </span>
              </a>
            ))}
          </div>

          {/* CTA */}
          <div className={`${isScrolled ? 'skew-x-[10deg]' : ''}`}>
            <button 
              onClick={(e) => scrollToSection(e, '#pricing')}
              className="relative bg-white text-black px-6 py-2 text-sm font-black tracking-widest overflow-hidden group hover:bg-delta-green transition-colors"
            >
              <span className="relative z-10">立即加入</span>
              <div className="absolute inset-0 bg-delta-green transform translate-y-full group-hover:translate-y-0 transition-transform duration-200"></div>
            </button>
          </div>
        </div>
      </nav>

      {/* ================= MOBILE BOTTOM FLOATING DOCK ================= */}
      {/* Mobile Logo Top Left (Since top bar is hidden) - Animates out on scroll */}
      <div 
        className={`md:hidden fixed top-4 left-4 z-40 mix-blend-difference pointer-events-none transition-transform duration-500 ease-in-out ${
          hideMobileLogo ? '-translate-x-[200%]' : 'translate-x-0'
        }`}
      >
          <div className="flex items-center gap-2">
            <Crosshair className="w-5 h-5 text-delta-green" />
            <span className="font-bold tracking-tighter text-lg text-white">DELTA.OPS</span>
          </div>
      </div>

      <nav 
        className={`md:hidden fixed bottom-6 left-4 right-4 z-[50] transition-transform duration-500 ease-spring ${
           isVisible ? 'translate-y-0' : 'translate-y-[150%]'
        }`}
      >
        <div className="bg-[#0a0a0a]/80 backdrop-blur-xl border border-white/10 rounded-2xl shadow-[0_10px_30px_-10px_rgba(0,0,0,0.8)] relative overflow-hidden">
            
            {/* Glossy Reflection Effect */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none"></div>

            <div className="flex justify-between items-center p-2 relative z-10">
                {mobileNavItems.map((item) => {
                    const isActive = activeSection === item.id;
                    const Icon = item.icon;

                    return (
                        <button 
                            key={item.id}
                            onClick={(e) => scrollToSection(e, item.href)}
                            className={`relative flex flex-col items-center justify-center w-full py-2 transition-colors duration-300 ${isActive ? 'text-black' : 'text-gray-400'}`}
                        >
                            {/* Fluid Active Background */}
                            {isActive && (
                                <motion.div
                                    layoutId="mobileNavHighlight"
                                    className="absolute inset-0 bg-delta-green rounded-xl z-0 shadow-[0_0_15px_rgba(0,255,157,0.4)]"
                                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                />
                            )}
                            
                            {/* Icon & Label */}
                            <div className="relative z-10 flex flex-col items-center gap-1">
                                <Icon size={20} strokeWidth={isActive ? 2.5 : 2} className="transition-all duration-300" />
                                <span className={`text-[9px] font-bold tracking-wide transition-all duration-300 ${isActive ? 'scale-105' : 'scale-100'}`}>
                                    {item.label}
                                </span>
                            </div>
                        </button>
                    )
                })}

                {/* Separate CTA Button in Dock */}
                <button 
                    onClick={(e) => scrollToSection(e, '#pricing')}
                    className="relative flex flex-col items-center justify-center w-full py-2 ml-1"
                >
                     <div className="bg-white/10 p-2 rounded-xl border border-white/10 text-white active:scale-95 transition-transform">
                        <Rocket size={20} className={activeSection === 'pricing' ? 'text-delta-green' : ''} />
                     </div>
                </button>
            </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
