import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect } from "react";

export default function AmbientBackground({ dark }) {
  const cursorRawX = useMotionValue(0);
  const cursorRawY = useMotionValue(0);
  const orbX = useSpring(cursorRawX, { damping: 100, stiffness: 10 });
  const orbY = useSpring(cursorRawY, { damping: 100, stiffness: 10 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      cursorRawX.set(e.clientX - window.innerWidth / 2);
      cursorRawY.set(e.clientY - window.innerHeight / 2);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [cursorRawX, cursorRawY]);

  return (
    <div className="fixed inset-0 z-[-10] pointer-events-none overflow-hidden bg-chalk dark:bg-void">
      {/* Orb 1: Slate/Silver (Drifting) */}
      <motion.div
        animate={{ x: ["-10%", "10%", "-10%"], y: ["0%", "20%", "0%"], scale: [1, 1.1, 1] }}
        transition={{ duration: 22, ease: "linear", repeat: Infinity, repeatType: "mirror" }}
        className="absolute top-[-10%] left-[-10%] w-[60vw] h-[60vw] rounded-full mix-blend-normal opacity-10 dark:opacity-40 blur-[120px] md:blur-[160px] transform-gpu will-change-transform"
        style={{ backgroundColor: dark ? "#1F2229" : "#E2E4E6" }}
      />
      
      {/* Orb 2: Petronas Green (Drifting) */}
      <motion.div
        animate={{ x: ["20%", "-20%", "20%"], y: ["-10%", "30%", "-10%"], scale: [1.2, 0.9, 1.2] }}
        transition={{ duration: 18, ease: "linear", repeat: Infinity, repeatType: "mirror" }}
        className="absolute bottom-[-20%] right-[-10%] w-[50vw] h-[50vw] rounded-full mix-blend-normal opacity-[0.08] dark:opacity-30 blur-[120px] md:blur-[160px] transform-gpu will-change-transform"
        style={{ backgroundColor: "#00E5C0" }}
      />

      {/* Orb 3: Slate/Silver (Drifting) */}
      <motion.div
        animate={{ x: ["-20%", "30%", "-20%"], y: ["30%", "-20%", "30%"], scale: [0.8, 1.3, 0.8] }}
        transition={{ duration: 25, ease: "linear", repeat: Infinity, repeatType: "mirror" }}
        className="absolute top-[20%] right-[10%] w-[55vw] h-[55vw] rounded-full mix-blend-normal opacity-10 dark:opacity-40 blur-[120px] md:blur-[160px] transform-gpu will-change-transform"
        style={{ backgroundColor: dark ? "#1F2229" : "#E2E4E6" }}
      />

      {/* Orb 4: Petronas Green (Cursor Tracking Parallax) */}
      <motion.div
        className="absolute top-1/2 left-1/2 w-[60vw] h-[60vw] rounded-full mix-blend-normal opacity-10 dark:opacity-40 blur-[120px] md:blur-[160px] transform-gpu will-change-transform"
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
  );
}
