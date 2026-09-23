import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { ArrowDown } from "lucide-react";

/* ── Character split animation ── */
const WORD_VARIANTS = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};
const CHAR_VARIANTS = {
  hidden: { y: "110%", opacity: 0 },
  visible: {
    y: "0%",
    opacity: 1,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

function AnimWord({ text, className = "", delay = 0 }) {
  return (
    <motion.span
      className={`inline-flex overflow-hidden ${className}`}
      variants={WORD_VARIANTS}
      style={{ transition: `opacity ${delay}s` }}
    >
      {text.split("").map((c, i) => (
        <motion.span key={i} variants={CHAR_VARIANTS} className="inline-block">
          {c === " " ? "\u00A0" : c}
        </motion.span>
      ))}
    </motion.span>
  );
}

/* ── Line reveal ── */
function LineReveal({ children, delay = 0, className = "" }) {
  return (
    <div className="overflow-hidden">
      <motion.div
        className={className}
        initial={{ y: "105%" }}
        animate={{ y: "0%" }}
        transition={{ delay, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </motion.div>
    </div>
  );
}

export default function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y1 = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const y2 = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex flex-col justify-between overflow-hidden bg-dark"
    >
      {/* ─ Animated background cross grid ─ */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ y: y1 }}
      >
        {/* Vertical lines */}
        {[20, 40, 60, 80].map((p) => (
          <div
            key={p}
            className="absolute top-0 bottom-0 w-px"
            style={{ left: `${p}%`, background: "rgba(200,255,0,0.03)" }}
          />
        ))}
        {/* Horizontal lines */}
        {[25, 50, 75].map((p) => (
          <div
            key={p}
            className="absolute left-0 right-0 h-px"
            style={{ top: `${p}%`, background: "rgba(200,255,0,0.03)" }}
          />
        ))}
      </motion.div>

      {/* ─ Neon orb / radial glow ─ */}
      <motion.div
        className="absolute pointer-events-none"
        style={{
          top: "30%", left: "60%",
          width: "600px", height: "600px",
          transform: "translate(-50%, -50%)",
          background: "radial-gradient(circle, rgba(200,255,0,0.07) 0%, transparent 65%)",
          y: y2,
        }}
      />

      {/* ─ Top bar ─ */}
      <motion.div
        className="relative z-10 flex items-center justify-between px-6 md:px-16 lg:px-24 pt-28"
        style={{ opacity }}
      >
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="flex items-center gap-2"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-neon animate-pulse" />
          <span className="neon-pill">Available for opportunities</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="font-mono text-xs text-ash/40 tracking-widest text-right hidden md:block"
        >
          <p>PORTFOLIO</p>
          <p className="text-neon">2026</p>
        </motion.div>
      </motion.div>

      {/* ─ Main hero text — OFF+BRAND full-width stacked lines ─ */}
      <motion.div
        style={{ opacity }}
        className="relative z-10 px-6 md:px-16 lg:px-24 pt-8 pb-4"
        initial="hidden"
        animate="visible"
      >
        {/* Giant name lines */}
        <div className="mb-6">
          {/* Line 1: DARYL */}
          <LineReveal delay={0.3}>
            <h1
              className="font-display uppercase leading-none tracking-tightest"
              style={{
                fontSize: "clamp(4rem,14vw,14rem)",
                /* OFF+BRAND mix-blend trick — text is white over dark,
                   but where it overlaps a light element it inverts */
                mixBlendMode: "difference",
                color: "#fff",
              }}
            >
              Daryl
            </h1>
          </LineReveal>

          {/* Line 2: CRUZ — hollow stroke */}
          <LineReveal delay={0.45}>
            <h1
              className="font-display uppercase leading-none tracking-tightest"
              style={{
                fontSize: "clamp(4rem,14vw,14rem)",
                WebkitTextStroke: "1.5px rgba(200,255,0,0.7)",
                color: "transparent",
              }}
            >
              Cruz
            </h1>
          </LineReveal>

          {/* Line 3: TUMANENG + label pill inline */}
          <LineReveal delay={0.6}>
            <div className="flex items-baseline gap-4 md:gap-8 flex-wrap">
              <h1
                className="font-display uppercase leading-none tracking-tightest text-white"
                style={{ fontSize: "clamp(4rem,14vw,14rem)", mixBlendMode: "difference", color: "#fff" }}
              >
                Tumaneng
              </h1>
              <span
                className="font-display text-neon uppercase self-end mb-3 hidden sm:block"
                style={{ fontSize: "clamp(1.2rem,3vw,3rem)", letterSpacing: "-0.02em" }}
              >
                .dev
              </span>
            </div>
          </LineReveal>
        </div>
      </motion.div>

      {/* ─ Bottom info strip — OFF+BRAND footer-of-hero style ─ */}
      <motion.div
        style={{ opacity }}
        className="relative z-10 px-6 md:px-16 lg:px-24 pb-10 md:pb-16"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.7 }}
      >
        <div className="border-t border-white/10 pt-6 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div>
            <p className="section-label mb-1">/ Role</p>
            <p className="text-white text-sm font-medium leading-snug">
              Full-Stack Developer<br />
              <span className="text-neon">&amp; UI/UX Engineer</span>
            </p>
          </div>
          <div>
            <p className="section-label mb-1">/ Education</p>
            <p className="text-ash text-sm leading-snug">
              BSIT<br />
              <span className="text-ash-light">Univ. of Santo Tomas</span>
            </p>
          </div>
          <div className="hidden md:block">
            <p className="section-label mb-1">/ Location</p>
            <p className="text-ash text-sm">Manila, Philippines</p>
          </div>
          <div className="hidden md:flex items-end justify-end">
            <motion.div
              className="flex flex-col items-center gap-1 text-ash/50"
              animate={{ y: [0, 6, 0] }}
              transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
            >
              <span className="font-mono text-[10px] tracking-widest">SCROLL</span>
              <ArrowDown size={12} className="text-neon" />
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* ─ Decorative corner brackets ─ */}
      <div className="absolute top-24 left-6 w-5 h-5 border-t border-l border-neon/30 pointer-events-none" />
      <div className="absolute bottom-6 right-6 w-5 h-5 border-b border-r border-neon/30 pointer-events-none" />
    </section>
  );
}
