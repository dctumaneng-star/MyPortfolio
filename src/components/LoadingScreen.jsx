import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function LoadingScreen({ onComplete }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      // Fast, slightly randomized increments for an engine-revving feel
      current += Math.floor(Math.random() * 5) + 1;
      
      if (current >= 100) {
        current = 100;
        clearInterval(interval);
        // Wait a beat at 100 before triggering the exit animation
        setTimeout(onComplete, 500); 
      }
      setProgress(current);
    }, 25);
    
    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] bg-void flex flex-col justify-center items-center overflow-hidden"
      exit={{ y: "-100%" }}
      transition={{ duration: 0.9, ease: [0.77, 0, 0.175, 1] }} // Cinematic slide up
    >
      {/* Massive Kinetic Counter */}
      <div className="overflow-hidden">
        <motion.div
          exit={{ y: "-105%", opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-[clamp(10rem,25vw,25rem)] text-chalk leading-none tracking-tighter"
        >
          {progress.toString().padStart(2, "0")}
        </motion.div>
      </div>

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

