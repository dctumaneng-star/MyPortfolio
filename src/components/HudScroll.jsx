import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

// OFF+BRAND-style HUD vertical scroll indicator — fixed left side
export default function HudScroll() {
  const [scrollPct, setScrollPct] = useState(0);

  useEffect(() => {
    const handler = () => {
      const el = document.documentElement;
      setScrollPct((el.scrollTop / (el.scrollHeight - el.clientHeight)) * 100);
    };
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <div className="fixed left-6 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col items-center gap-2 pointer-events-none">
      {/* Line top */}
      <div className="w-px h-16 bg-white/10 relative overflow-hidden">
        <motion.div
          className="absolute bottom-0 left-0 w-full bg-neon"
          style={{ height: `${scrollPct}%`, maxHeight: "100%" }}
        />
      </div>

      {/* Dot */}
      <div className="relative w-2 h-2">
        <div className="w-2 h-2 rounded-full bg-neon shadow-neon-sm animate-pulse" />
      </div>

      {/* Line bottom */}
      <div className="w-px h-16 bg-white/10" />

      {/* Rotated label */}
      <div
        className="font-mono text-[9px] text-ash/40 tracking-widest uppercase mt-2"
        style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
      >
        scroll
      </div>
    </div>
  );
}

