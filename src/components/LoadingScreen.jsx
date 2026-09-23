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
  const [displayedLines, setDisplayedLines] = useState([]);
  
  useEffect(() => {
    let currentIndex = 0;
    let timeoutId;
    
    const printNextLine = () => {
      if (currentIndex < BOOT_SEQUENCE.length) {
        setDisplayedLines((prev) => [...prev, BOOT_SEQUENCE[currentIndex]]);
        currentIndex++;
        
        // Randomize the delay slightly for a more realistic terminal feel
        // but keep it around the requested 250ms mark.
        const delay = Math.random() * 150 + 150; 
        timeoutId = setTimeout(printNextLine, delay);
      } else {
        // Exactly 1 second after the final line prints, trigger onComplete
        timeoutId = setTimeout(() => {
          onComplete();
        }, 1000);
      }
    };
    
    // Start the boot sequence
    timeoutId = setTimeout(printNextLine, 200);
    
    return () => clearTimeout(timeoutId);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] bg-black w-full h-screen p-6 md:p-12 flex flex-col justify-end overflow-hidden"
      exit={{ opacity: 0, y: "-100%" }}
      transition={{ duration: 0.8, ease: [0.77, 0, 0.175, 1] }}
    >
      <div className="font-mono text-neon text-sm md:text-base leading-relaxed break-words max-w-4xl">
        {displayedLines.map((line, index) => (
          <div key={index} className="mb-1">
            <span className="text-neon/50 mr-2">[OK]</span> {line}
          </div>
        ))}
        {/* Blinking cursor block */}
        <div className="mt-1 flex items-center h-5">
          <span className="w-2.5 h-4 bg-neon animate-pulse block"></span>
        </div>
      </div>
    </motion.div>
  );
}
