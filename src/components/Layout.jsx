import CustomCursor from "./CustomCursor";
import Navbar from "./Navbar";
import Baseline from "./Footer";
import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useAnimate, stagger } from "framer-motion";
import { isFirstLoad } from "../utils/firstLoad";

export default function Layout({ dark, onToggle, onReboot, children }) {
  const [scope, animate] = useAnimate();
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { damping: 20, stiffness: 100 });
  const smoothY = useSpring(mouseY, { damping: 20, stiffness: 100 });

  // Cursor tracking for Parallax Orb
  const cursorRawX = useMotionValue(0);
  const cursorRawY = useMotionValue(0);
  const orbX = useSpring(cursorRawX, { damping: 100, stiffness: 10 });
  const orbY = useSpring(cursorRawY, { damping: 100, stiffness: 10 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      // Normalize to 0-1 across viewport
      mouseX.set(e.clientX / window.innerWidth);
      mouseY.set(e.clientY / window.innerHeight);
      
      // Update global CSS vars for components to use
      document.documentElement.style.setProperty('--mouse-norm-x', e.clientX / window.innerWidth);
      document.documentElement.style.setProperty('--mouse-norm-y', e.clientY / window.innerHeight);

      // Raw pixel offset from center for the orb
      cursorRawX.set(e.clientX - window.innerWidth / 2);
      cursorRawY.set(e.clientY - window.innerHeight / 2);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY, cursorRawX, cursorRawY]);

  useEffect(() => {
    async function runSequence() {
      if (isFirstLoad) {
        // Timeline Orchestration: Resolves the component mount sequence dynamically
        // Immediately hide elements that will be revealed later
        animate(".nav-item", { opacity: 0, x: -15 }, { duration: 0 });
        animate("footer", { y: 20, opacity: 0 }, { duration: 0 });

        // Wait for the Phase 4 layout morph (Pill -> Navbar) to settle (approx 0.8s spring)
        await new Promise(r => setTimeout(r, 800));

        // Phase 5: Cascade Reveal
        animate(".nav-item", { opacity: 1, x: 0 }, { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: stagger(0.1) });
        animate("footer", { y: 0, opacity: 1 }, { duration: 0.8, ease: [0.22, 1, 0.36, 1] });
      } else {
        // Normal fast entrance for subsequent navigations
        animate(".nav-item", { opacity: 1, x: 0 }, { duration: 0 });
        animate("footer", { y: 0, opacity: 1 }, { duration: 0 });
      }
    }
    runSequence();
  }, [animate]);

  return (
    <div ref={scope}>
      <CustomCursor />
      <Navbar dark={dark} onToggle={onToggle} onReboot={onReboot} />

      {/* Ambient Fluid Mesh Background & Grid Overlay */}
      <div className="fixed inset-0 z-[-1] pointer-events-none overflow-hidden bg-chalk dark:bg-void">
        {/* Orb 1: Slate/Silver (Drifting) */}
        <motion.div
          animate={{ x: ["-10%", "10%", "-10%"], y: ["0%", "20%", "0%"], scale: [1, 1.1, 1] }}
          transition={{ duration: 22, ease: "linear", repeat: Infinity, repeatType: "mirror" }}
          className="absolute top-[-10%] left-[-10%] w-[60vw] h-[60vw] rounded-full mix-blend-normal opacity-20 dark:opacity-40 blur-[120px] md:blur-[160px]"
          style={{ backgroundColor: dark ? "#1F2229" : "#E2E4E6" }}
        />
        
        {/* Orb 2: Petronas Green (Drifting) */}
        <motion.div
          animate={{ x: ["20%", "-20%", "20%"], y: ["-10%", "30%", "-10%"], scale: [1.2, 0.9, 1.2] }}
          transition={{ duration: 18, ease: "linear", repeat: Infinity, repeatType: "mirror" }}
          className="absolute bottom-[-20%] right-[-10%] w-[50vw] h-[50vw] rounded-full mix-blend-normal opacity-20 dark:opacity-30 blur-[120px] md:blur-[160px]"
          style={{ backgroundColor: "#00E5C0" }}
        />

        {/* Orb 3: Slate/Silver (Drifting) */}
        <motion.div
          animate={{ x: ["-20%", "30%", "-20%"], y: ["30%", "-20%", "30%"], scale: [0.8, 1.3, 0.8] }}
          transition={{ duration: 25, ease: "linear", repeat: Infinity, repeatType: "mirror" }}
          className="absolute top-[20%] right-[10%] w-[55vw] h-[55vw] rounded-full mix-blend-normal opacity-20 dark:opacity-40 blur-[120px] md:blur-[160px]"
          style={{ backgroundColor: dark ? "#1F2229" : "#E2E4E6" }}
        />

        {/* Orb 4: Petronas Green (Cursor Tracking Parallax) */}
        <motion.div
          className="absolute top-1/2 left-1/2 w-[60vw] h-[60vw] rounded-full mix-blend-normal opacity-20 dark:opacity-40 blur-[120px] md:blur-[160px]"
          style={{ 
            backgroundColor: "#00E5C0",
            x: orbX,
            y: orbY,
            translateX: "-50%",
            translateY: "-50%"
          }}
        />

        {/* Structural Grid Overlay */}
        <div 
          className="absolute inset-0 z-10 pointer-events-none opacity-[0.03] dark:opacity-[0.05]"
          style={{
            backgroundImage: `
              linear-gradient(to right, currentColor 1px, transparent 1px),
              linear-gradient(to bottom, currentColor 1px, transparent 1px)
            `,
            backgroundSize: "40px 40px",
            color: dark ? "#FFFFFF" : "#000000"
          }}
        />
      </div>

      <main className="pt-12 min-h-[calc(100vh-48px)] flex flex-col relative z-10">
        {children}
      </main>

      <Baseline />
    </div>
  );
}

