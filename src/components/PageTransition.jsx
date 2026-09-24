import { motion } from "framer-motion";

const fluidVariants = {
  initial: { opacity: 0, scale: 0.96, filter: "blur(10px)", y: 20 },
  enter: { 
    opacity: 1, 
    scale: 1, 
    filter: "blur(0px)",
    y: 0,
    transition: { 
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
      staggerChildren: 0.05, 
      delayChildren: 0.1 
    } 
  },
  exit: { 
    opacity: 0, 
    scale: 0.96, 
    filter: "blur(10px)",
    transition: { 
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
      staggerChildren: 0.03, 
      staggerDirection: -1 
    } 
  }
};

export default function PageTransition({ children, className = "" }) {
  return (
    <motion.div
      variants={fluidVariants}
      initial="initial"
      animate="enter"
      exit="exit"
      className={`flex-1 flex flex-col transform-gpu ${className}`}
    >
      {children}
    </motion.div>
  );
}
