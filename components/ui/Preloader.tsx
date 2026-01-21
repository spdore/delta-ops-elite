import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Preloader: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [log, setLog] = useState<string[]>([]);

  const bootLogs = [
    "INITIALIZING KERNEL...",
    "LOADING TACTICAL ASSETS...",
    "CONNECTING TO SATELLITE UPLINK...",
    "ENCRYPTING CONNECTION...",
    "CALIBRATING OPTICS...",
    "DELTA OPS SYSTEM: ONLINE"
  ];

  useEffect(() => {
    // Adjusted Progress Bar for ~1.5s duration
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          return 100;
        }
        // Increment avg ~2.5% per tick. 40ms * 40 ticks = 1600ms
        return prev + Math.random() * 4 + 0.5; 
      });
    }, 40); // Update every 40ms

    // Adjusted Logs for readability
    let logIndex = 0;
    const logInterval = setInterval(() => {
      if (logIndex < bootLogs.length) {
        setLog(prev => [...prev, bootLogs[logIndex]]);
        logIndex++;
      } else {
        clearInterval(logInterval);
      }
    }, 220); // New log every 220ms (roughly covers the 1.5s span)

    // Complete in ~1.6s to ensure animation finishes gracefully
    const timeout = setTimeout(() => {
      clearInterval(interval);
      clearInterval(logInterval);
      setProgress(100); 
      onComplete();
    }, 1600); 

    return () => {
      clearInterval(interval);
      clearInterval(logInterval);
      clearTimeout(timeout);
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, y: -20, filter: "blur(10px)" }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="fixed inset-0 z-[10000] bg-black flex flex-col items-center justify-center font-mono p-4"
    >
      <div className="w-full max-w-md">
        <div className="flex justify-between items-end mb-2">
            <span className="text-delta-green text-xs tracking-widest">SYSTEM BOOT</span>
            <span className="text-delta-green text-3xl font-bold">{Math.min(100, Math.floor(progress))}%</span>
        </div>
        
        {/* Progress Bar */}
        <div className="w-full h-1 bg-gray-900 mb-8 relative overflow-hidden">
            <motion.div 
                className="h-full bg-delta-green"
                style={{ width: `${progress}%` }}
                layoutId="progress"
            />
        </div>

        {/* Logs */}
        <div className="h-32 flex flex-col justify-end overflow-hidden">
            {log.map((line, i) => (
                <motion.div 
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2 }}
                    className="text-xs text-gray-500 mb-1"
                >
                    <span className="text-delta-green mr-2">{'>'}</span>{line}
                </motion.div>
            ))}
        </div>
      </div>

      {/* Background Decor */}
      <div className="absolute inset-0 pointer-events-none opacity-10 flex items-center justify-center">
          <div className="w-[80vw] h-[80vw] border border-delta-green rounded-full animate-spin-slow border-dashed" style={{ animationDuration: '4s' }}></div>
          <div className="absolute w-[60vw] h-[60vw] border border-delta-green rounded-full animate-spin-slow border-dotted" style={{ animationDirection: 'reverse', animationDuration: '4s' }}></div>
      </div>
    </motion.div>
  );
};

export default Preloader;