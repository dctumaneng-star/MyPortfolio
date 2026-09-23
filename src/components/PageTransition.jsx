import { motion } from "framer-motion";

const variants = {
  initial: { opacity: 0, y: 30 },
  enter: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } 
  },
  exit: { 
    opacity: 0, 
    y: "-100%", 
    transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] } 
  }
};

export default function PageTransition({ children, className = "" }) {
  return (
    <motion.div
      variants={variants}
      initial="initial"
      animate="enter"
      exit="exit"
      className={`flex-1 flex flex-col ${className}`}
    >
      {children}
    </motion.div>
  );
}

