import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useState, useEffect } from "react";

export default function Baseline() {
  const [time, setTime] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => {
    setScrolled(y > 40);
  });

  useEffect(() => {
    const updateTime = () => {
      setTime(new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', timeZone: 'Asia/Manila' }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.footer
      className="fixed bottom-0 left-0 right-0 z-50 transition-colors duration-300"
    >
      <motion.div 
        animate={{ opacity: scrolled ? 1 : 0 }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        className="absolute inset-0 liquid-glass grain-overlay border-t border-line-light dark:border-line-dark"
      />
      
      <div className="max-w-6xl mx-auto px-6 h-12 grid grid-cols-3 items-center relative z-10 w-full">
        
        {/* Left side: Socials */}
        <nav className="flex items-center gap-5 justify-start">
          {[
            { label: "linkedin", href: "https://linkedin.com/in/daryl-tumaneng-a594a1196" },
            { label: "github",   href: "https://github.com/daryltumaneng" },
            { label: "instagram", href: "https://www.instagram.com/daryltumaneng_?stkn=NnRzZWMyazAwY3lt&utm_source=qr" },
          ].map(({ label, href }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="mono-label hover:text-ink dark:hover:text-neon transition-colors duration-200 opacity-60 hover:opacity-100 cursor-none"
              data-hover="true"
            >
              {label}
            </a>
          ))}
        </nav>

        {/* Center side: Name & Year */}
        <div className="flex justify-center items-center">
          <span className="font-mono text-[10px] md:text-xs text-ink/70 dark:text-chalk/70 tracking-widest uppercase lowercase">
            daryl tumaneng, 2026.
          </span>
        </div>

        {/* Right side: Time & Status */}
        <div className="flex items-center gap-4 justify-end">
          <span className="mono-label hidden md:inline border-r border-ink/10 dark:border-chalk/10 pr-4">{time} pst</span>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-neon animate-pulse-dot" />
            <span className="mono-label hidden sm:inline">available</span>
          </div>
        </div>
      </div>
    </motion.footer>
  );
}
