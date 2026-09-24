import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const TELEMETRY = [
  "INITIALIZING AUDIO ENGINE_v2.4",
  "MOUNTING ZFS POOL (DATA_01)",
  "LOADING CORE MODULES...",
  "ESTABLISHING UPLINK :: 0x8F9B",
  "SYNCING KINETIC TYPOGRAPHY",
  "CALIBRATING FLUID SPRING PHYSICS",
  "INJECTING TE_EASE_CURVES",
  "WARMING UP LIQUID GLASS SHADERS",
  "AESTHETIC ENGINE: ONLINE"
];

function TelemetryLine({ text, delay }) {
  const [displayText, setDisplayText] = useState("");
  
  useEffect(() => {
    let i = 0;
    let timeoutId;
    let mounted = true;

    const typeChar = () => {
      if (!mounted) return;
      setDisplayText(text.slice(0, i));
      i++;
      
      if (i <= text.length) {
        timeoutId = setTimeout(typeChar, 15);
      }
    };

    const initialTimeout = setTimeout(typeChar, delay);

    return () => {
      mounted = false;
      clearTimeout(initialTimeout);
      clearTimeout(timeoutId);
    };
  }, [text, delay]);

  return <span>{displayText}</span>;
}

export default function LoadingScreen({ onComplete, fullSequence = true }) {
  const [phase, setPhase] = useState(1);
  const [progress, setProgress] = useState(0);

  // Auto progression Phase 1 & 2
  useEffect(() => {
    if (phase === 1 || phase === 2) {
      const duration = fullSequence ? 2500 : 500;
      const startTime = Date.now();
      const interval = setInterval(() => {
        const elapsed = Date.now() - startTime;
        const next = Math.min(100, Math.floor((elapsed / duration) * 100));
        setProgress(next);
        if (next === 100) {
          clearInterval(interval);
          setPhase(3);
        }
      }, 30);
      return () => clearInterval(interval);
    }
  }, [phase, fullSequence]);

  // Phase 3 hold
  useEffect(() => {
    if (phase === 3) {
      // Hold the massive centered pill state for 1.5 - 2s
      const t = setTimeout(() => onComplete(), fullSequence ? 1800 : 800);
      return () => clearTimeout(t);
    }
  }, [phase, fullSequence, onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] bg-void overflow-hidden pointer-events-none text-chalk"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "radial-gradient(circle at center, rgba(0, 229, 192, 0.03) 0%, transparent 60%)" }} />

      {/* Telemetry data overlays */}
      <div className="absolute top-6 left-6 font-mono text-[10px] md:text-xs text-chalk/40 uppercase tracking-widest flex flex-col gap-2">
        <span className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 bg-neon rounded-full animate-pulse-dot shadow-[0_0_8px_rgba(0,229,192,0.5)]" />
          SYSTEM_ONLINE
        </span>
        <div className="flex flex-col gap-1 mt-4 opacity-60">
          {TELEMETRY.map((line, i) => (
            <TelemetryLine key={i} text={line} delay={i * 200 + 100} />
          ))}
        </div>
      </div>
      <div className="absolute bottom-6 right-6 font-mono text-[10px] md:text-xs text-chalk/40 uppercase tracking-widest text-right">
        MEMORY: 64.0GB / 128.0GB<br/>
        VRAM: ALLOCATED (ACTIVE)
      </div>

      <div className={`absolute inset-0 flex justify-center ${phase >= 3 ? "items-center" : "items-center"}`}>
        <AnimatePresence>
          {phase <= 2 && (
            <motion.div
              layoutId="navbar-bg"
              className="relative w-48 h-48 rounded-full flex items-center justify-center"
              style={{ borderRadius: 9999 }}
              transition={{ layout: { type: "spring", stiffness: 100, damping: 20 } }}
            >
              {/* The SVG Circle */}
              <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="48" stroke="rgba(255,255,255,0.05)" strokeWidth="1" fill="none" />
                <motion.circle 
                  cx="50" cy="50" r="48" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  fill="none" 
                  className="text-neon drop-shadow-[0_0_8px_rgba(0,229,192,0.5)]"
                  strokeDasharray="301.59"
                  strokeDashoffset={301.59 - (progress / 100) * 301.59}
                  transition={{ ease: "linear", duration: 0.1 }}
                />
              </svg>
              {/* Counter Text */}
              <motion.span 
                className="font-mono text-4xl text-chalk tracking-tighter"
                exit={{ opacity: 0, filter: "blur(10px)", scale: 1.2 }}
                transition={{ duration: 0.3 }}
              >
                {progress.toString().padStart(2, '0')}
              </motion.span>
            </motion.div>
          )}

          {phase === 3 && (
            <div className="relative w-[90vw] md:w-[70vw] max-w-4xl h-24 md:h-32 flex items-center justify-center">
              <motion.div
                layoutId="navbar-bg"
                className="absolute inset-0 rounded-full liquid-glass grain-overlay border border-ink/10 dark:border-chalk/10"
                style={{ borderRadius: 9999 }}
                transition={{ layout: { type: "spring", stiffness: 100, damping: 20 } }}
              />
              <div className="relative z-10 font-display font-medium text-3xl sm:text-4xl md:text-5xl tracking-tight text-ink dark:text-chalk lowercase overflow-visible flex items-center justify-center">
                <motion.span 
                  layoutId="brand-name"
                  className="inline-flex whitespace-nowrap overflow-visible"
                  initial="hidden"
                  animate="visible"
                  transition={{ layout: { type: "spring", stiffness: 100, damping: 20 } }}
                  variants={{
                    hidden: {},
                    visible: { transition: { staggerChildren: fullSequence ? 0.05 : 0.02 } }
                  }}
                >
                  {"daryl tumaneng.".split("").map((char, index) => (
                    <motion.span
                      key={index}
                      variants={{
                        hidden: { opacity: 0, y: 30, filter: "blur(12px)" },
                        visible: { 
                          opacity: 1, 
                          y: 0, 
                          filter: "blur(0px)",
                          transition: { type: "spring", stiffness: 100, damping: 20 }
                        }
                      }}
                      className={char === " " ? "w-[0.25em]" : "inline-block"}
                    >
                      {char}
                    </motion.span>
                  ))}
                </motion.span>
              </div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
