import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const BOOT_SEQUENCE = [
  "Initializing boot sequence...",
  "Loading core Ubuntu modules...",
  "Mounting root filesystem...",
  "Configuring network interfaces via Netplan...",
  "Starting Docker daemon...",
  "Starting Caddy reverse proxy daemon...",
  "Initializing Laravel backend application...",
  "Establishing secure connections...",
  "Boot sequence complete. Welcome."
];

export default function LoadingScreen({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [displayedLines, setDisplayedLines] = useState([]);

  // Counter Logic
  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      current += Math.floor(Math.random() * 5) + 1;
      if (current >= 100) {
        current = 100;
        clearInterval(interval);
      }
      setProgress(current);
    }, 25);
    return () => clearInterval(interval);
  }, []);

  // Terminal Logic
  useEffect(() => {
    let currentIndex = 0;
    let timeoutId;
    
    const printNextLine = () => {
      if (currentIndex < BOOT_SEQUENCE.length) {
        setDisplayedLines((prev) => [...prev, BOOT_SEQUENCE[currentIndex]]);
        currentIndex++;
        const delay = Math.random() * 100 + 100; 
        timeoutId = setTimeout(printNextLine, delay);
      } else {
        timeoutId = setTimeout(() => {
          onComplete();
        }, 1000);
      }
    };
    
    timeoutId = setTimeout(printNextLine, 200);
    return () => clearTimeout(timeoutId);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] bg-void overflow-hidden"
      exit={{ y: "-100%" }}
      transition={{ duration: 0.9, ease: [0.77, 0, 0.175, 1] }} 
    >
      
      {/* Centered Massive Design (Restored) */}
      <div className="absolute inset-0 flex flex-col justify-center items-center pointer-events-none">
        <div className="overflow-hidden">
          <motion.div
            exit={{ y: "-105%", opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="font-display font-medium text-[clamp(6rem,15vw,12rem)] text-chalk leading-none tracking-tighter lowercase flex flex-col items-center"
          >
            {progress.toString().padStart(2, "0")}
          </motion.div>
        </div>

        <motion.div 
          className="w-48 md:w-64 h-1.5 border border-line-dark mt-8 p-[1px]"
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.div
            className="h-full bg-neon"
            style={{ width: `${progress}%` }}
          />
        </motion.div>
      </div>

      {/* Terminal Sequence */}
      <motion.div 
        className="absolute bottom-12 left-6 md:left-12 font-mono text-neon text-xs md:text-sm leading-relaxed break-words max-w-2xl opacity-70"
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.4 }}
      >
        {displayedLines.map((line, index) => (
          <div key={index} className="mb-1">
            <span className="text-neon/50 mr-2">[OK]</span> {line}
          </div>
        ))}
        <div className="mt-1 flex items-center h-4">
          <span className="w-2 h-3.5 bg-neon animate-pulse block"></span>
        </div>
      </motion.div>

      {/* Razor-thin Neon Progress Baseline */}
      <div className="absolute bottom-0 left-0 w-full h-[2px] bg-void">
        <motion.div
          className="h-full bg-neon"
          style={{ width: `${progress}%` }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        />
      </div>
      
    </motion.div>
  );
}
