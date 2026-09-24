import CustomCursor from "./CustomCursor";
import Navbar from "./Navbar";
import Baseline from "./Footer";
import { useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function Layout({ dark, onToggle, children }) {
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

  return (
    <>
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

      <main className="pt-12 min-h-[calc(100vh-48px)] flex flex-col relative z-10">
        {children}
      </main>

      <Baseline />
    </>
  );
}

