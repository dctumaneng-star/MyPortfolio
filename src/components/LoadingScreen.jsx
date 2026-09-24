import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function LoadingScreen({ onComplete, fullSequence = true }) {
  const [phase, setPhase] = useState(1);
  const [progress, setProgress] = useState(0);

  // Phase 1: 0 to 100%
  useEffect(() => {
    if (phase !== 1) return;
    
    let current = 0;
    const tickRate = fullSequence ? 25 : 15; 
    
    const interval = setInterval(() => {
      current += Math.floor(Math.random() * (fullSequence ? 5 : 15)) + 1;
      
      if (current >= 100) {
        current = 100;
        clearInterval(interval);
        
        if (fullSequence) {
          setTimeout(() => setPhase(2), 200);
        } else {
          setTimeout(() => onComplete(), 100);
        }
      }
      setProgress(current);
    }, tickRate); 
    
    return () => clearInterval(interval);
  }, [phase, fullSequence, onComplete]);

  // Phase 2: Name Drop
  useEffect(() => {
    if (phase !== 2) return;
    
    const timeoutId = setTimeout(() => {
      onComplete(); // Triggers unmount and Phase 3 Morph
    }, 1200);
    
    return () => clearTimeout(timeoutId);
  }, [phase, onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] overflow-hidden flex flex-col justify-center items-center pointer-events-none"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.1 }} 
    >
      <AnimatePresence mode="wait">
        
        {/* PHASE 1: Percentage Load (Pitch Black Background) */}
        {phase === 1 && (
          <motion.div
            key="phase-1"
            initial={{ opacity: 1 }}
            exit={{ y: "-100%" }} // Masks away upwards
            transition={{ duration: 0.6, ease: [0.77, 0, 0.175, 1] }}
            className="absolute inset-0 bg-void flex flex-col items-center justify-center w-full"
          >
            <div className="flex flex-col items-center justify-center w-full max-w-sm px-6">
              <div className="font-mono text-neon text-6xl md:text-8xl font-bold tracking-tighter">
                {progress}%
              </div>
              <div className="w-full h-px bg-line-dark mt-6 overflow-hidden">
                <motion.div
                  className="h-full bg-neon"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </motion.div>
        )}

        {/* PHASE 2: Name Drop on Bare Screen */}
        {phase === 2 && (
          <motion.div
            key="phase-2"
            initial={{ scale: 1.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
            className="flex flex-col items-center justify-center absolute inset-0"
          >
            <h1 className="font-display font-medium text-5xl md:text-7xl text-ink dark:text-chalk tracking-tight lowercase">
              <motion.span layoutId="brand-name" className="inline-block">daryl tumaneng.</motion.span>
            </h1>
          </motion.div>
        )}
        
      </AnimatePresence>
    </motion.div>
  );
}
