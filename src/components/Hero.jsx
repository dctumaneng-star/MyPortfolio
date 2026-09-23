import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { useRef } from "react";
import { ArrowDown, MapPin, GraduationCap } from "lucide-react";

const CHAR_VARIANTS = {
  hidden: { y: "110%", opacity: 0 },
  visible: (i) => ({
    y: "0%",
    opacity: 1,
    transition: {
      delay: i * 0.04,
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};

function SplitText({ text, className, delay = 0 }) {
  return (
    <span className="inline-flex flex-wrap overflow-hidden">
      {text.split("").map((char, i) => (
        <motion.span
          key={i}
          className={`inline-block ${char === " " ? "mr-[0.25em]" : ""} ${className}`}
          variants={CHAR_VARIANTS}
          custom={i + delay}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </span>
  );
}

export default function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

  const y1 = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const y2 = useTransform(scrollYProgress, [0, 1], ["0%", "60%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex flex-col justify-end overflow-hidden bg-dark noise-overlay"
    >
      {/* Radial neon glow behind heading */}
      <motion.div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[80vw] h-[60vh] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at center, rgba(200,255,0,0.08) 0%, transparent 70%)",
          y: y1,
        }}
      />

      {/* Decorative grid lines */}
      <div className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(200,255,0,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(200,255,0,0.03) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      {/* Floating number tags */}
      <motion.div
        style={{ y: y2, opacity }}
        className="absolute top-16 right-10 md:right-20 text-right pointer-events-none"
      >
        <p className="font-mono text-xs text-ash/50 tracking-widest">PORTFOLIO</p>
        <p className="font-mono text-xs text-neon tracking-widest">2026</p>
      </motion.div>

      {/* Corner bracket decorations */}
      <div className="absolute top-8 left-8 w-10 h-10 border-t-2 border-l-2 border-neon/40" />
      <div className="absolute bottom-8 right-8 w-10 h-10 border-b-2 border-r-2 border-neon/40" />

      {/* Main content */}
      <motion.div
        style={{ opacity }}
        className="relative z-10 px-6 md:px-16 lg:px-24 pb-20 md:pb-32"
        initial="hidden"
        animate="visible"
      >
        {/* Status badge */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="neon-pill">
            <span className="w-1.5 h-1.5 rounded-full bg-neon animate-pulse" />
            Available for opportunities
          </span>
        </motion.div>

        {/* Giant name */}
        <div className="mb-4 overflow-hidden">
          <div className="font-display text-[clamp(3.5rem,10vw,10rem)] leading-none tracking-tightest uppercase text-white">
            <motion.div initial="hidden" animate="visible">
              <SplitText text="Daryl Cruz" className="" delay={0} />
            </motion.div>
          </div>
          <div className="font-display text-[clamp(3.5rem,10vw,10rem)] leading-none tracking-tightest uppercase flex flex-wrap gap-x-5 items-baseline">
            <motion.div initial="hidden" animate="visible">
              <SplitText text="Tumaneng" className="text-stroke" delay={8} />
            </motion.div>
            <motion.div
              className="text-neon font-display text-[clamp(1rem,3.5vw,3.5rem)] leading-none tracking-tighter uppercase self-end mb-2 md:mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.7 }}
            >
              .dev
            </motion.div>
          </div>
        </div>

        {/* Headline */}
        <motion.div
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mt-10 border-t border-white/10 pt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.8 }}
        >
          <div>
            <p className="section-label mb-2">/ Role</p>
            <p className="text-xl md:text-2xl font-body font-light text-ash-light">
              Full-Stack Developer{" "}
              <span className="text-neon font-medium">&amp;</span>{" "}
              UI/UX Engineer
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 text-ash text-sm">
              <GraduationCap size={14} className="text-neon" />
              <span>BSIT · University of Santo Tomas</span>
            </div>
            <div className="flex items-center gap-2 text-ash text-sm">
              <MapPin size={14} className="text-neon" />
              <span>Manila, Philippines</span>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-ash/60"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        style={{ opacity }}
      >
        <span className="font-mono text-[10px] tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
        >
          <ArrowDown size={14} className="text-neon" />
        </motion.div>
      </motion.div>
    </section>
  );
}

