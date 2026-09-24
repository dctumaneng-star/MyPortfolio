import { motion } from "framer-motion";

export const TE_EASE = [0.22, 1, 0.36, 1];
export const TE_LAYOUT = { type: "spring", stiffness: 400, damping: 30, mass: 0.8 };

export function KineticText({ text, className = "", delay = 0, as: Component = "h1" }) {
  // Split into letters, preserving spaces as components or margins
  const chars = text.split("");
  
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.04,
        delayChildren: delay,
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20, filter: "blur(8px)" },
    show: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { type: "spring", stiffness: 100, damping: 20 }
    }
  };

  return (
    <Component className={className}>
      <motion.span
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, margin: "-10%" }}
        className="inline-flex flex-wrap overflow-visible"
      >
        {chars.map((char, i) => (
          <motion.span 
            key={i} 
            variants={item} 
            className={char === " " ? "w-[0.25em]" : "inline-block"}
          >
            {char}
          </motion.span>
        ))}
      </motion.span>
    </Component>
  );
}

