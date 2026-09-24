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
    let timeoutId;
    let mounted = true;

    const typeChar = () => {
      if (!mounted) return;
      setDisplayText(text.slice(0, i));
      i++;
      
      if (i <= text.length) {
        // Smooth deliberate typing
        timeoutId = setTimeout(typeChar, 30);
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
  const [counterScope, animateCounter] = useAnimate();

  // Phase 1 -> 2
  useEffect(() => {
    if (phase !== 1) return;
    // Fast track: 500ms, Full: 2000ms
    const t = setTimeout(() => setPhase(2), fullSequence ? 2000 : 500);
    return () => clearTimeout(t);
  }, [phase, fullSequence]);

  // Phase 2: Counting
  useEffect(() => {
    if (phase !== 2) return;
    
    let current = 0;
    const tickRate = fullSequence ? 25 : 10; 
    
    const interval = setInterval(() => {
      // Steady counting; fast track jumps by 5
      current += fullSequence ? 1 : 5;
      
      if (current >= 100) {
        current = 100;
        clearInterval(interval);
        
        // Smooth dissolve effect instead of glitch
        if (counterScope.current) {
          animateCounter(counterScope.current, {
            filter: "blur(10px)",
            opacity: 0,
            scale: 1.1
          }, { duration: fullSequence ? 0.8 : 0.3, ease: [0.22, 1, 0.36, 1] }).then(() => {
            setPhase(3);
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
    // Wait for stagger + spring + legibility hold
    const t = setTimeout(() => onComplete(), fullSequence ? 2400 : 1200);
    return () => clearTimeout(t);
  }, [phase, fullSequence, onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] overflow-hidden flex flex-col justify-center items-center pointer-events-none"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.1 }} 
    >
      <AnimatePresence>
        
        {(phase === 1 || phase === 2) && (
          <motion.div
            key="preloader-bg"
            exit={{ y: "-100%", opacity: 0 }} // Masks away upwards, fast
            transition={{ duration: 0.6, ease: [0.77, 0, 0.175, 1] }}
            className="absolute inset-0 bg-chalk dark:bg-void flex flex-col items-center justify-center w-full"
          >
            {/* Phase 1 Structural Grid Lines */}
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }} 
              className="absolute top-1/2 left-0 w-full h-px bg-ink/10 dark:bg-neon/20" 
            />
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1], delay: 0.2 }} 
              className="absolute top-0 left-1/2 w-px h-full bg-ink/10 dark:bg-neon/20" 
            />

            {/* Phase 1 Telemetry Corners */}
            <div className="absolute top-6 left-6 font-mono text-[10px] md:text-xs text-ink/50 dark:text-neon/70 tracking-widest uppercase">
              <TelemetryLine text={TELEMETRY[0]} delay={100} />
            </div>
            <div className="absolute top-6 right-6 font-mono text-[10px] md:text-xs text-ink/50 dark:text-neon/70 tracking-widest uppercase text-right">
              <TelemetryLine text={TELEMETRY[1]} delay={300} />
            </div>
            <div className="absolute bottom-10 left-6 font-mono text-[10px] md:text-xs text-ink/50 dark:text-neon/70 tracking-widest uppercase">
              <TelemetryLine text={TELEMETRY[2]} delay={500} />
            </div>
            <div className="absolute bottom-10 right-6 font-mono text-[10px] md:text-xs text-ink/50 dark:text-neon/70 tracking-widest uppercase text-right">
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
                  className="font-mono text-ink dark:text-neon text-7xl md:text-9xl font-bold tracking-tighter"
                  style={{ textShadow: "0px 0px transparent" }}
                >
                  {progress < 10 ? `0${progress}` : progress}
                </div>
                
                {/* Razor thin neon baseline progress */}
                <div className="absolute bottom-0 left-0 w-full h-[2px] bg-chalk dark:bg-void">
                  <motion.div
                    className="h-full bg-ink dark:bg-neon"
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
            initial={{ scale: 0.96, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: fullSequence ? 0.4 : 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-center justify-center absolute inset-0"
          >
            <h1 className="font-display font-medium text-5xl md:text-7xl text-ink dark:text-chalk tracking-tight lowercase">
              <motion.span 
                layoutId="brand-name" 
                className="inline-flex overflow-visible"
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: {},
                  visible: {
                    transition: { staggerChildren: fullSequence ? 0.05 : 0.02 }
                  }
                }}
              >
                {"daryl tumaneng.".split("").map((char, index) => (
                  <motion.span
                    key={index}
                    variants={{
                      hidden: { opacity: 0, y: 20, filter: "blur(8px)" },
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
            </h1>
          </motion.div>
        )}
        
      </AnimatePresence>
    </motion.div>
  );
}
