import { motion } from "framer-motion";

export const TE_EASE = [0.22, 1, 0.36, 1];

export function KineticText({ text, className = "", delay = 0, as: Component = "h1" }) {
  // Split into words, but preserve spaces
  const words = text.split(" ");
  
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
    hidden: { y: "140%" },
    show: {
      y: "0%",
      transition: { duration: 0.8, ease: TE_EASE }
    }
  };

  return (
    <Component className={className}>
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-15%" }}
        className="flex flex-wrap"
      >
        {words.map((word, i) => (
          <div key={i} className="overflow-hidden inline-block mr-[0.25em] pb-[0.3em] -mb-[0.3em] pt-[0.2em] -mt-[0.2em]">
            <motion.span variants={item} className="inline-block">
              {word}
            </motion.span>
          </div>
        ))}
      </motion.div>
    </Component>
  );
}

