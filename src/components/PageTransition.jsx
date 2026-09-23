import { motion } from "framer-motion";

const variants = {
  initial: { opacity: 0, y: 16 },
  enter: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } 
  },
  exit: { 
    opacity: 0, 
    y: -16, 
    transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } 
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
