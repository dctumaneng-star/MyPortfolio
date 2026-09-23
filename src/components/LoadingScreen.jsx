import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const BOOT_SEQUENCE = [
  "Initializing boot sequence...",
  "Mounting virtual file systems...",
  "Loading core Ubuntu modules...",
  "Mounting root filesystem...",
  "Checking storage integrity (ZFS pool)...",
  "Configuring Netplan interfaces...",
  "Starting Docker daemon...",
  "Initializing container orchestrator...",
  "Starting Caddy reverse proxy daemon...",
  "Loading TLS certificates...",
  "Booting Laravel core...",
  "Connecting to PostgreSQL database...",
  "Establishing secure connections...",
  "Injecting motion libraries (framer-motion)...",
  "Compiling Tailwind utility classes...",
  "> System ready."
];

export default function LoadingScreen({ onComplete, fullSequence = true }) {
  // phase 1: Percentage Load
  // phase 2: Terminal Boot
  // phase 3: Name Reveal
  const [phase, setPhase] = useState(1);
  const [progress, setProgress] = useState(0);
  const [displayedLines, setDisplayedLines] = useState([]);

  // Phase 1 Logic: 0 to 100%
  useEffect(() => {
    if (phase !== 1) return;
    
    let current = 0;
    // Speed up the interval significantly if we're skipping the cinematic sequence
    const tickRate = fullSequence ? 45 : 15; 
    
    const interval = setInterval(() => {
      // Slower increments to make loading time longer
      current += Math.floor(Math.random() * (fullSequence ? 3 : 8)) + 1;
      
      if (current >= 100) {
        current = 100;
        clearInterval(interval);
        
        if (fullSequence) {
          setTimeout(() => setPhase(2), 600); // Trigger Phase 2 after a pause
        } else {
          setTimeout(() => onComplete(), 400); // Skip straight to Main UI
        }
      }
      setProgress(current);
    }, tickRate); 
    
    return () => clearInterval(interval);
  }, [phase, fullSequence, onComplete]);

  // Phase 2 Logic: Terminal Sequence
  useEffect(() => {
    if (phase !== 2) return;
    
    let currentIndex = 0;
    let timeoutId;
    
    const printNextLine = () => {
      if (currentIndex < BOOT_SEQUENCE.length) {
        setDisplayedLines((prev) => [...prev, BOOT_SEQUENCE[currentIndex]]);
        currentIndex++;
        // Slower terminal line delays (150ms to 350ms)
        const delay = Math.random() * 200 + 150; 
        timeoutId = setTimeout(printNextLine, delay);
      } else {
        // Once the last line prints, wait 1000ms and trigger Phase 3
        timeoutId = setTimeout(() => {
          setPhase(3);
        }, 1000);
      }
    };
    
    timeoutId = setTimeout(printNextLine, 400);
    return () => clearTimeout(timeoutId);
  }, [phase]);

  // Phase 3 Logic: Name Reveal -> Phase 4 (Complete)
  useEffect(() => {
    if (phase !== 3) return;
    
    // Hold centered name for 1.5 seconds, then trigger Phase 4
    const timeoutId = setTimeout(() => {
      onComplete(); // Phase 4: Full Page Reveal
    }, 1500);
    
    return () => clearTimeout(timeoutId);
  }, [phase, onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] bg-void overflow-hidden flex flex-col justify-center items-center"
      exit={{ opacity: 0, y: "-10%" }}
      transition={{ duration: 0.8, ease: [0.77, 0, 0.175, 1] }} 
    >
      <AnimatePresence mode="wait">
        
        {/* PHASE 1: Percentage Load */}
        {phase === 1 && (
          <motion.div
            key="phase-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col items-center justify-center w-full max-w-sm px-6"
          >
            <div className="font-mono text-neon text-6xl md:text-8xl font-bold tracking-tighter">
              {progress}%
            </div>
            <div className="w-full h-1 bg-line-dark mt-6 overflow-hidden">
              <motion.div
                className="h-full bg-neon"
                style={{ width: `${progress}%` }}
              />
            </div>
          </motion.div>
        )}

        {/* PHASE 2: Terminal Boot */}
        {phase === 2 && (
          <motion.div
            key="phase-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 p-6 md:p-12 flex flex-col justify-end"
          >
            <div className="font-mono text-neon text-sm md:text-base leading-relaxed break-words max-w-3xl">
              {displayedLines.map((line, index) => (
                <div key={index} className="mb-1">
                  {line}
                </div>
              ))}
              <div className="mt-1 flex items-center h-5">
                <span className="w-2.5 h-4 bg-neon animate-pulse block"></span>
              </div>
            </div>
          </motion.div>
        )}

        {/* PHASE 3: Name Reveal */}
        {phase === 3 && (
          <motion.div
            key="phase-3"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, y: -40 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center justify-center"
          >
            <h1 className="font-display font-medium text-4xl md:text-5xl text-chalk tracking-tight lowercase">
              <motion.span layoutId="brand-name" className="inline-block">daryl tumaneng.</motion.span>
            </h1>
          </motion.div>
        )}
        
      </AnimatePresence>
    </motion.div>
  );
}
