import { motion, useMotionTemplate, useMotionValue, useSpring } from "framer-motion";
import { useRef } from "react";

export default function FluidCard({ children, className = "", as: Component = motion.div, ...props }) {
  const ref = useRef(null);
  
  // Mouse coordinates relative to card
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Spring physics for smooth tilt
  const springConfig = { damping: 20, stiffness: 100, mass: 0.5 };
  const rotateX = useSpring(useMotionValue(0), springConfig);
  const rotateY = useSpring(useMotionValue(0), springConfig);

  function handleMouseMove(e) {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Update raw mouse values for the proximity glow
    mouseX.set(x);
    mouseY.set(y);
    
    // Calculate tilt angles (max 5 degrees)
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateXVal = ((y - centerY) / centerY) * -5;
    const rotateYVal = ((x - centerX) / centerX) * 5;
    
    rotateX.set(rotateXVal);
    rotateY.set(rotateYVal);
  }

  function handleMouseLeave() {
    rotateX.set(0);
    rotateY.set(0);
  }
  
  return (
    <Component
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.98 }}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className={`relative overflow-hidden ${className}`}
      {...props}
    >
      {/* Proximity Glow */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-100 mix-blend-overlay z-10"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              400px circle at ${mouseX}px ${mouseY}px,
              rgba(255, 255, 255, 0.4),
              transparent 80%
            )
          `,
        }}
      />
      
      {/* Content */}
      <div className="relative z-20 h-full w-full" style={{ transform: "translateZ(10px)" }}>
        {children}
      </div>
    </Component>
  );
}
