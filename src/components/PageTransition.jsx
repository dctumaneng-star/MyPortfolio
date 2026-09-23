import { motion } from "framer-motion";

const contentVariants = {
  initial: { opacity: 0, y: 20 },
  enter: { 
    opacity: 1, 
    y: 0, 
    transition: { delay: 0.2, duration: 0.6, ease: [0.22, 1, 0.36, 1] } 
  },
  exit: { 
    opacity: 0, 
    y: -20, 
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } 
  }
};

const shutter1 = {
  initial: { scaleY: 1, originY: 0 },
  enter: { 
    scaleY: 0, 
    originY: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } 
  },
  exit: { 
    scaleY: 1, 
    originY: 1,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } 
  }
};

const shutter2 = {
  initial: { scaleY: 1, originY: 0 },
  enter: { 
    scaleY: 0, 
    originY: 0,
    transition: { delay: 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] } 
  },
  exit: { 
    scaleY: 1, 
    originY: 1,
    transition: { delay: 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] } 
  }
};

export default function PageTransition({ children, className = "" }) {
  return (
    <>
      {/* The main page content */}
      <motion.div
        variants={contentVariants}
        initial="initial"
        animate="enter"
        exit="exit"
        className={`flex-1 flex flex-col ${className}`}
      >
        {children}
      </motion.div>

      {/* Layer 1: Neon Green Shutter */}
      <motion.div
        variants={shutter1}
        initial="initial"
        animate="enter"
        exit="exit"
        className="fixed inset-0 z-[60] bg-neon pointer-events-none"
      />

      {/* Layer 2: Black/Void Shutter (Trails the green one) */}
      <motion.div
        variants={shutter2}
        initial="initial"
        animate="enter"
        exit="exit"
        className="fixed inset-0 z-[61] bg-void pointer-events-none"
      />
    </>
  );
}
