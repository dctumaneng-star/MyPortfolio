import "./index.css";
import CustomCursor from "./components/CustomCursor";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import TechTicker from "./components/TechTicker";
import About from "./components/About";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import HudScroll from "./components/HudScroll";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";

/* ─── Loader ─── */
function Loader({ onComplete }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCount((c) => {
        if (c >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 500);
          return 100;
        }
        return Math.min(c + Math.floor(Math.random() * 5) + 2, 100);
      });
    }, 35);
    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] bg-dark flex flex-col"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Corner marks */}
      <div className="absolute top-8 left-8 w-6 h-6 border-t border-l border-neon/50" />
      <div className="absolute top-8 right-8 w-6 h-6 border-t border-r border-neon/50" />
      <div className="absolute bottom-8 left-8 w-6 h-6 border-b border-l border-neon/50" />
      <div className="absolute bottom-8 right-8 w-6 h-6 border-b border-r border-neon/50" />

      {/* Percentage guides — OFF+BRAND inspired */}
      <div className="absolute left-8 top-0 bottom-0 flex flex-col justify-between py-8 pointer-events-none">
        {[0, 25, 50, 75, 100].map((p) => (
          <span key={p} className="font-mono text-[10px] text-white/10 tracking-widest">{p}%</span>
        ))}
      </div>

      {/* Center content */}
      <div className="flex-1 flex flex-col items-center justify-center gap-12">
        {/* Animated cross / logo mark — OFF+BRAND inspired */}
        <motion.div
          className="relative w-16 h-16"
          animate={{ rotate: 90 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        >
          <div className="absolute inset-0 border border-neon/20 rounded-full" />
          <div className="absolute top-1/2 left-0 right-0 h-px bg-neon/40 -translate-y-1/2" />
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-neon/40 -translate-x-1/2" />
          <div className="absolute top-1/2 left-1/2 w-2 h-2 bg-neon rounded-full -translate-x-1/2 -translate-y-1/2" />
        </motion.div>

        {/* Name */}
        <div className="text-center">
          <motion.p
            className="font-display text-6xl md:text-8xl tracking-tightest text-white leading-none uppercase"
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            DCT
          </motion.p>
          <p className="font-mono text-[10px] text-ash/50 tracking-widest mt-3 uppercase">
            Portfolio · Loading
          </p>
        </div>

        {/* Progress */}
        <div className="flex flex-col items-center gap-3 w-48">
          <div className="w-full h-px bg-dark-500 relative overflow-hidden">
            <motion.div
              className="absolute top-0 left-0 h-full bg-neon"
              style={{ width: `${count}%`, boxShadow: "0 0 8px #C8FF00, 0 0 20px rgba(200,255,0,0.4)" }}
            />
          </div>
          <p className="font-mono text-neon text-xs tracking-widest tabular-nums">
            {String(count).padStart(3, "0")}%
          </p>
        </div>
      </div>

      {/* Bottom tagline */}
      <div className="px-8 pb-8 flex justify-between items-end">
        <p className="font-mono text-[10px] text-ash/30 tracking-wider">FULL-STACK DEVELOPER</p>
        <p className="font-mono text-[10px] text-ash/30 tracking-wider">MANILA · PH</p>
      </div>
    </motion.div>
  );
}

/* ─── Scroll Progress ─── */
function ScrollProgress() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const handler = () => {
      const el = document.documentElement;
      setProgress((el.scrollTop / (el.scrollHeight - el.clientHeight)) * 100);
    };
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);
  return (
    <div className="fixed top-0 left-0 right-0 h-[2px] z-[60] bg-dark-400">
      <div
        className="h-full bg-neon transition-[width] duration-75"
        style={{ width: `${progress}%`, boxShadow: "0 0 10px #C8FF00" }}
      />
    </div>
  );
}

/* ─── App ─── */
export default function App() {
  const [loading, setLoading] = useState(true);

  return (
    <>
      <CustomCursor />
      <ScrollProgress />

      <AnimatePresence mode="wait">
        {loading && <Loader key="loader" onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      {!loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <Navbar />
          <HudScroll />
          <main>
            <Hero />
            <TechTicker />
            <About />
            <Experience />
            <Projects />
            <Contact />
          </main>
          <Footer />
        </motion.div>
      )}
    </>
  );
}
