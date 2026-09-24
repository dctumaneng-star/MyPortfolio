import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useState, useEffect } from "react";

export default function Baseline() {
  const [time, setTime] = useState("");
  const [atBottom, setAtBottom] = useState(false);
  const { scrollYProgress } = useScroll();

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    // If the page is scrolled to 99% or more, show the footer
    if (latest >= 0.99) {
      setAtBottom(true);
    } else {
      setAtBottom(false);
    }
  });

  // If the page isn't scrollable (height < viewport), we should show it.
  useEffect(() => {
    const handleResize = () => {
      if (document.body.scrollHeight <= window.innerHeight) {
        setAtBottom(true);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
      initial={{ y: "100%" }}
      animate={{ y: atBottom ? "0%" : "100%" }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
      className="fixed bottom-0 left-0 right-0 z-50 liquid-glass grain-overlay border-t border-line-light dark:border-line-dark transition-colors duration-300"
    >
      <div className="max-w-6xl mx-auto px-4 md:px-6 h-12 flex justify-between items-center relative z-10 w-full overflow-x-auto no-scrollbar gap-8">
        
        {/* Left side: Socials */}
        <nav className="flex items-center gap-4 md:gap-5 shrink-0">
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
              className="mono-label hover:text-neon dark:hover:text-neon transition-colors duration-200 opacity-60 hover:opacity-100 cursor-none"
              data-hover="true"
            >
              {label}
            </a>
          ))}
        </nav>

        {/* Center side: Name & Year */}
        <div className="flex justify-center items-center shrink-0">
          <span className="font-mono text-[10px] md:text-xs text-ink/70 dark:text-chalk/70 tracking-widest uppercase lowercase">
            daryl tumaneng, 2026.
          </span>
        </div>

        {/* Right side: Time & Status */}
        <div className="flex items-center gap-4 shrink-0">
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
