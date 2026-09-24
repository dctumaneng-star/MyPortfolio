import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export default function Baseline() {
  const [time, setTime] = useState("");

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
      className="fixed bottom-0 left-0 right-0 z-50 liquid-glass border-t border-line-light dark:border-line-dark transition-colors duration-300"
    >
      <div className="max-w-6xl mx-auto px-6 h-12 flex items-center justify-between gap-4 relative z-10">
        
        {/* Status */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-neon animate-pulse-dot" />
            <span className="mono-label hidden sm:inline">available</span>
          </div>
          <span className="mono-label hidden md:inline border-l border-ink/10 dark:border-chalk/10 pl-4">{time} MNL</span>
        </div>

        {/* Socials */}
        <nav className="flex items-center gap-5">
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
              className="mono-label hover:text-ink dark:hover:text-neon transition-colors duration-200 opacity-60 hover:opacity-100"
            >
              {label}
            </a>
          ))}
        </nav>
      </div>
    </motion.footer>
  );
}
