import { motion } from "framer-motion";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative bg-dark border-t border-white/5 overflow-hidden">
      {/* Giant name watermark */}
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none">
        <span className="font-display text-[20vw] text-white/[0.015] leading-none select-none whitespace-nowrap">
          TUMANENG
        </span>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-16 lg:px-24 py-16">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="font-display text-3xl tracking-widest uppercase text-white">DCT</span>
              <span className="w-2 h-2 rounded-full bg-neon animate-pulse" />
            </div>
            <p className="text-ash text-xs font-mono">Daryl Cruz Tumaneng · Full-Stack Developer</p>
          </div>

          {/* Nav */}
          <nav className="flex flex-wrap gap-x-8 gap-y-3">
            {["About", "Experience", "Projects", "Contact"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="font-mono text-xs text-ash hover:text-neon transition-colors duration-200 tracking-widest uppercase"
              >
                {item}
              </a>
            ))}
          </nav>
        </div>

        {/* Divider */}
        <div className="my-10 h-px bg-gradient-to-r from-transparent via-neon/30 to-transparent" />

        {/* Bottom row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-ash/50 text-xs font-mono">
          <p>© {year} Daryl Cruz Tumaneng. All rights reserved.</p>
          <div className="flex items-center gap-1.5">
            <span>Built with</span>
            <span className="text-neon">React</span>
            <span>·</span>
            <span className="text-neon">Tailwind</span>
            <span>·</span>
            <span className="text-neon">Framer Motion</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

