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



  useEffect(() => {
    const handleMouseMove = (e) => {
      // Normalize to 0-1 across viewport
      mouseX.set(e.clientX / window.innerWidth);
      mouseY.set(e.clientY / window.innerHeight);
      
      // Update global CSS vars for components to use
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



      <main className="pt-12 min-h-[calc(100vh-48px)] flex flex-col relative z-10">
        {children}
      </main>

      <Baseline />
    </div>
  );
}

