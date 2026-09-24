import CustomCursor from "./CustomCursor";
import Navbar from "./Navbar";
import Baseline from "./Footer";
import { useEffect } from "react";
import { motion, useMotionValue, useSpring, useAnimate } from "framer-motion";
import { isFirstLoad } from "../utils/firstLoad";

export default function Layout({ dark, onToggle, children }) {
  const [scope, animate] = useAnimate();
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { damping: 20, stiffness: 100 });
  const smoothY = useSpring(mouseY, { damping: 20, stiffness: 100 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      // Normalize to 0-1 across viewport
      mouseX.set(e.clientX / window.innerWidth);
      mouseY.set(e.clientY / window.innerHeight);
      
      // Update global CSS vars for components to use (e.g., reactive glare)
      document.documentElement.style.setProperty('--mouse-norm-x', e.clientX / window.innerWidth);
      document.documentElement.style.setProperty('--mouse-norm-y', e.clientY / window.innerHeight);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  useEffect(() => {
    async function runSequence() {
      if (isFirstLoad) {
        // Timeline Orchestration: Resolves the component mount sequence dynamically
        // Immediately hide elements that will be revealed later
        animate(".nav-reveal-bg", { opacity: 0, scaleX: 0.4, scaleY: 0.4 }, { duration: 0 });
        animate(".nav-item", { opacity: 0, y: -10 }, { duration: 0 });
        animate("footer", { y: 100, opacity: 0 }, { duration: 0 });
        animate("main", { opacity: 0, scale: 0.95 }, { duration: 0 });

        // 1. Wait for the text to fly to the navbar (approx 0.7s)
        await new Promise(r => setTimeout(r, 700));

        // 2. The navbar liquid glass pill "opens" around the text
        await animate(".nav-reveal-bg", { opacity: 1, scaleX: 1, scaleY: 1 }, { type: "spring", stiffness: 150, damping: 20 });
        
        // 3. The internal nav items and the footer materialize
        animate(".nav-item", { opacity: 1, y: 0 }, { type: "spring", stiffness: 100, damping: 20 });
        animate("footer", { y: 0, opacity: 1 }, { type: "spring", stiffness: 100, damping: 20 });
        
        // 4. Finally, the main page content bursts outward
        animate("main", { opacity: 1, scale: 1 }, { type: "spring", stiffness: 100, damping: 20 });
      } else {
        // Normal fast entrance for subsequent navigations
        animate(".nav-reveal-bg", { opacity: 1, scale: 1 }, { duration: 0 });
        animate(".nav-item", { opacity: 1, y: 0 }, { duration: 0 });
        animate("header", { y: 0, opacity: 1 }, { duration: 0 });
        animate("footer", { y: 0, opacity: 1 }, { duration: 0 });
        animate("main", { opacity: 1, scale: 1 }, { duration: 0 });
      }
    }
    runSequence();
  }, [animate]);

  return (
    <div ref={scope}>
      <CustomCursor />
      <Navbar dark={dark} onToggle={onToggle} />

      {/* Dynamic Background Bleed (Gradient Orbs) */}
      <div className="fixed inset-0 z-[-1] pointer-events-none overflow-hidden">
        <motion.div
          animate={{ 
            x: ["-20%", "20%", "-20%"],
            y: ["-20%", "20%", "-20%"],
            scale: [1, 1.2, 1]
          }}
          transition={{ duration: 15, ease: "linear", repeat: Infinity }}
          className="absolute top-[10%] left-[20%] w-[50vw] h-[50vw] max-w-[600px] max-h-[600px] rounded-full"
          style={{ 
            background: "radial-gradient(circle, rgba(200, 255, 0, 0.25) 0%, transparent 70%)",
            filter: "blur(80px)"
          }}
        />
        <motion.div
          animate={{ 
            x: ["20%", "-20%", "20%"],
            y: ["20%", "-20%", "20%"],
            scale: [1.2, 1, 1.2]
          }}
          transition={{ duration: 20, ease: "linear", repeat: Infinity }}
          className="absolute bottom-[10%] right-[20%] w-[40vw] h-[40vw] max-w-[500px] max-h-[500px] rounded-full"
          style={{ 
            background: "radial-gradient(circle, rgba(100, 200, 255, 0.2) 0%, transparent 70%)",
            filter: "blur(80px)"
          }}
        />
      </div>

      <main className="pt-12 min-h-[calc(100vh-48px)] flex flex-col relative z-10" style={{ opacity: isFirstLoad ? 0 : 1 }}>
        {children}
      </main>

      <Baseline />
    </div>
  );
}

