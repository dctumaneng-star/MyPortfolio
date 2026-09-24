import { motion } from "framer-motion";

const vacuumVariants = {
  initial: { opacity: 0, scale: 0.5, y: "10vh" },
  enter: { 
    opacity: 1, 
    scale: 1, 
    y: 0,
    transition: { 
      type: "spring", 
      damping: 12, 
      stiffness: 100,
      staggerChildren: 0.05, 
      delayChildren: 0.1 
    } 
  },
  exit: { 
    opacity: 0, 
    scale: 0.8, 
    y: "10vh",
    transition: { 
      type: "spring", 
      damping: 20, 
      stiffness: 300,
      staggerChildren: 0.03, 
      staggerDirection: -1 
    } 
  }
};

export default function PageTransition({ children, className = "" }) {
  return (
    <motion.div
      variants={vacuumVariants}
      initial="initial"
      animate="enter"
      exit="exit"
      className={`flex-1 flex flex-col transform-gpu ${className}`}
    >
      {children}
    </motion.div>
  );
}
