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
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

// Loading screen
function Loader({ onComplete }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCount((c) => {
        if (c >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 400);
          return 100;
        }
        return c + Math.floor(Math.random() * 6) + 2;
      });
    }, 40);
    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 bg-dark z-[100] flex flex-col items-center justify-center gap-8"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Corner decorations */}
      <div className="absolute top-8 left-8 w-8 h-8 border-t-2 border-l-2 border-neon/40" />
      <div className="absolute bottom-8 right-8 w-8 h-8 border-b-2 border-r-2 border-neon/40" />

      <div className="text-center">
        <motion.p
          className="font-display text-7xl md:text-9xl tracking-tightest text-white leading-none"
          animate={{ opacity: [1, 0.5, 1] }}
          transition={{ repeat: Infinity, duration: 1.2 }}
        >
          DCT
        </motion.p>
        <p className="font-mono text-xs text-ash tracking-widest mt-2">INITIALIZING PORTFOLIO</p>
      </div>

      {/* Progress bar */}
      <div className="w-64 h-px bg-dark-500 relative">
        <motion.div
          className="absolute top-0 left-0 h-full bg-neon"
          style={{ width: `${Math.min(count, 100)}%`, boxShadow: "0 0 8px #C8FF00" }}
        />
      </div>

      <p className="font-mono text-neon text-sm tracking-widest">
        {String(Math.min(count, 100)).padStart(3, "0")}%
      </p>
    </motion.div>
  );
}

// Scroll progress bar
function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handler = () => {
      const el = document.documentElement;
      const pct = (el.scrollTop / (el.scrollHeight - el.clientHeight)) * 100;
      setProgress(pct);
    };
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 h-0.5 z-[60] bg-dark-500">
      <div
        className="h-full bg-neon transition-all duration-75"
        style={{ width: `${progress}%`, boxShadow: "0 0 8px #C8FF00" }}
      />
    </div>
  );
}

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
          transition={{ duration: 0.6 }}
        >
          <Navbar />
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
