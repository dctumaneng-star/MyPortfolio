import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowDown } from "lucide-react";

/* ── Kinetic word reveal — each word slides up from clip ── */
function WordReveal({ text, className = "", stagger = 0 }) {
  const words = text.split(" ");
  return (
    <span className="inline-flex flex-wrap gap-x-[0.25em]">
      {words.map((word, i) => (
        <span key={i} className="overflow-hidden inline-block">
          <motion.span
            className={`inline-block ${className}`}
            initial={{ y: "110%" }}
            animate={{ y: "0%" }}
            transition={{
              delay: stagger + i * 0.08,
              duration: 0.9,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

export default function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y       = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section
      id="about"
      ref={ref}
      className="section-rule relative min-h-screen flex flex-col justify-between pt-12 overflow-hidden"
    >
      {/* Background accent line — motorsport vertical rule */}
      <div className="absolute top-0 bottom-0 left-[62%] w-px bg-line-light dark:bg-line-dark pointer-events-none hidden lg:block" />

      <motion.div style={{ y, opacity }} className="flex-1 flex flex-col justify-end px-6 max-w-6xl mx-auto w-full pb-10 md:pb-16">

        {/* Eyebrow */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
        >
          <span className="neon-tag">Web Developer · Manila, PH</span>
        </motion.div>

        {/* Main headline — full-width display type */}
        <h1 className="font-display leading-none text-ink dark:text-chalk mb-0" aria-label="Daryl Tumaneng">
          {/* Line 1: massive */}
          <div className="overflow-hidden">
            <motion.span
              className="block text-display-xl"
              initial={{ y: "105%" }}
              animate={{ y: "0%" }}
              transition={{ delay: 0.2, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            >
              DARYL
            </motion.span>
          </div>
          {/* Line 2: stroke (hollow) */}
          <div className="overflow-hidden -mt-2">
            <motion.span
              className="block text-display-xl text-stroke text-ink dark:text-chalk"
              initial={{ y: "105%" }}
              animate={{ y: "0%" }}
              transition={{ delay: 0.32, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            >
              TUMANENG
            </motion.span>
          </div>
        </h1>

        {/* Statement + contact row */}
        <div className="mt-10 grid md:grid-cols-2 gap-8 border-t border-line-light dark:border-line-dark pt-8">
          <motion.p
            className="text-sm text-ink/60 dark:text-chalk/50 leading-relaxed max-w-sm"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.7 }}
          >
            Self-assured and motivated aspiring software engineer prepared to apply knowledge to
            real-world projects. Trained in Web and Mobile Application Development from the
            University of Santo Tomas.
          </motion.p>

          <motion.div
            className="flex flex-col gap-1 font-mono text-xs text-ink/40 dark:text-chalk/30"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.95, duration: 0.7 }}
          >
            <span>0969-596-7105</span>
            <a href="mailto:dctumaneng13@gmail.com"
               className="hover:text-ink dark:hover:text-neon transition-colors duration-200">
              dctumaneng13@gmail.com
            </a>
            <span>Rocka Village, Tabang, Plaridel, Bulacan</span>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        className="absolute bottom-16 right-6 flex flex-col items-center gap-2 text-ink/30 dark:text-chalk/20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        style={{ opacity }}
      >
        <span className="mono-label" style={{ writingMode: "vertical-rl" }}>scroll</span>
        <motion.div animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 1.6 }}>
          <ArrowDown size={12} className="text-neon" />
        </motion.div>
      </motion.div>
    </section>
  );
}
