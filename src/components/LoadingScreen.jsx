import { motion, AnimatePresence, useAnimate } from "framer-motion";
import { useEffect, useState } from "react";

const TELEMETRY = [
  "INITIALIZING AUDIO ENGINE_v2.4",
  "MOUNTING ZFS POOL (DATA_01)",
  "LOADING CORE MODULES...",
  "ESTABLISHING UPLINK :: 0x8F9B"
];

function TelemetryLine({ text, delay }) {
  const [displayText, setDisplayText] = useState("");
  useEffect(() => {
    let i = 0;
    const to = setTimeout(() => {
      const int = setInterval(() => {
        setDisplayText(text.slice(0, i));
        i++;
        if (i > text.length) clearInterval(int);
      }, 20);
      return () => clearInterval(int);
    }, delay);
    return () => clearTimeout(to);
  }, [text, delay]);
  return <span>{displayText}</span>;
}

export default function LoadingScreen({ onComplete, fullSequence = true }) {
  const [phase, setPhase] = useState(fullSequence ? 1 : 2);
  const [progress, setProgress] = useState(0);
  const [counterScope, animateCounter] = useAnimate();

  // Phase 1 -> 2
  useEffect(() => {
    if (phase !== 1) return;
    const t = setTimeout(() => setPhase(2), 1200);
    return () => clearTimeout(t);
  }, [phase]);

  // Phase 2: Counting
  useEffect(() => {
    if (phase !== 2) return;
    
    let current = 0;
    const tickRate = fullSequence ? 20 : 10; 
    
    const interval = setInterval(() => {
      current += Math.floor(Math.random() * 8) + 2;
      
      if (current >= 100) {
        current = 100;
        clearInterval(interval);
        
        // Glitch effect on counter
        if (fullSequence && counterScope.current) {
          animateCounter(counterScope.current, {
            x: [-5, 5, -3, 3, 0],
            y: [2, -2, 2, -1, 0],
            textShadow: [
              "-3px 0 red, 3px 0 cyan",
              "3px 0 red, -3px 0 cyan",
              "-2px 0 red, 2px 0 cyan",
              "0px 0 transparent, 0px 0 transparent"
            ],
            opacity: [1, 0.5, 1, 0.8, 1]
          }, { duration: 0.3, times: [0, 0.25, 0.5, 0.75, 1] }).then(() => {
            setTimeout(() => setPhase(3), 200);
          });
        } else {
          setTimeout(() => onComplete(), 100);
        }
      }
      setProgress(current);
    }, tickRate); 
    
    return () => clearInterval(interval);
  }, [phase, fullSequence, onComplete, animateCounter, counterScope]);

  // Phase 3: Name Drop
  useEffect(() => {
    if (phase !== 3) return;
    const t = setTimeout(() => onComplete(), 1000);
    return () => clearTimeout(t);
  }, [phase, onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] overflow-hidden flex flex-col justify-center items-center pointer-events-none"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.1 }} 
    >
      <AnimatePresence mode="wait">
        
        {(phase === 1 || phase === 2) && (
          <motion.div
            key="preloader-bg"
            exit={{ y: "-100%", opacity: 0 }} // Masks away upwards, fast
            transition={{ duration: 0.6, ease: [0.77, 0, 0.175, 1] }}
            className="absolute inset-0 bg-void flex flex-col items-center justify-center w-full"
          >
            {/* Phase 1 Structural Grid Lines */}
            <motion.div 
              initial={{ scaleX: 0 }} 
              animate={{ scaleX: 1 }} 
              transition={{ duration: 0.8, ease: "circOut" }} 
              className="absolute top-1/2 left-0 w-full h-px bg-neon/20 origin-left" 
            />
            <motion.div 
              initial={{ scaleY: 0 }} 
              animate={{ scaleY: 1 }} 
              transition={{ duration: 0.8, ease: "circOut", delay: 0.2 }} 
              className="absolute top-0 left-1/2 w-px h-full bg-neon/20 origin-top" 
            />

            {/* Phase 1 Telemetry Corners */}
            <div className="absolute top-6 left-6 font-mono text-[10px] md:text-xs text-neon/70 tracking-widest uppercase">
              <TelemetryLine text={TELEMETRY[0]} delay={100} />
            </div>
            <div className="absolute top-6 right-6 font-mono text-[10px] md:text-xs text-neon/70 tracking-widest uppercase text-right">
              <TelemetryLine text={TELEMETRY[1]} delay={300} />
            </div>
            <div className="absolute bottom-10 left-6 font-mono text-[10px] md:text-xs text-neon/70 tracking-widest uppercase">
              <TelemetryLine text={TELEMETRY[2]} delay={500} />
            </div>
            <div className="absolute bottom-10 right-6 font-mono text-[10px] md:text-xs text-neon/70 tracking-widest uppercase text-right">
              <TelemetryLine text={TELEMETRY[3]} delay={200} />
            </div>

            {/* Phase 2 Counter & Baseline */}
            {phase === 2 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ type: "spring", damping: 20, stiffness: 200 }}
                className="absolute inset-0 flex flex-col items-center justify-center w-full"
              >
                <div 
                  ref={counterScope}
                  className="font-mono text-neon text-7xl md:text-9xl font-bold tracking-tighter"
                  style={{ textShadow: "0px 0px transparent" }}
                >
                  {progress < 10 ? `0${progress}` : progress}
                </div>
                
                {/* Razor thin neon baseline progress */}
                <div className="absolute bottom-0 left-0 w-full h-[2px] bg-void">
                  <motion.div
                    className="h-full bg-neon"
                    style={{ width: `${progress}%` }}
                    transition={{ ease: "linear", duration: 0.1 }}
                  />
                </div>
              </motion.div>
            )}
          </motion.div>
        )}

        {/* Phase 3: Name Drop on Bare Screen */}
        {phase === 3 && (
          <motion.div
            key="phase-3"
            initial={{ scale: 2, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 250, damping: 15, mass: 1 }}
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
