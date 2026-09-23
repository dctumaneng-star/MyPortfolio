import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative bg-dark border-t border-white/5 overflow-hidden">
      {/* Giant watermark — OFF+BRAND style */}
      <div
        className="absolute bottom-0 left-0 right-0 font-display text-[25vw] text-white/[0.018] leading-none select-none pointer-events-none text-center whitespace-nowrap overflow-hidden pb-0"
        style={{ letterSpacing: "-0.05em" }}
      >
        DCT
      </div>

      <div className="relative z-10 max-w-none px-6 md:px-16 lg:px-24 pt-16 pb-10">
        {/* Top row */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-10 mb-16">

          {/* Brand mark */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="font-display text-4xl tracking-widest uppercase text-white">DCT</span>
              <span className="text-neon font-mono text-xl leading-none">+</span>
            </div>
            <p className="font-mono text-xs text-ash/50 tracking-wider">
              Daryl Cruz Tumaneng<br />Full-Stack Developer · Manila, PH
            </p>
          </div>

          {/* Nav links — OFF+BRAND link-track style */}
          <nav className="flex flex-col sm:flex-row gap-x-10 gap-y-3">
            {["About", "Experience", "Projects", "Contact"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="group relative flex items-center gap-1.5 font-mono text-xs text-ash hover:text-white transition-colors duration-300 tracking-widest uppercase py-1 w-fit"
              >
                {item}
                <span className="text-neon opacity-0 group-hover:opacity-100 transition-opacity duration-200">→</span>
                <span className="absolute bottom-0 left-0 h-px w-full bg-white/10">
                  <span className="absolute inset-0 bg-neon origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"
                    style={{ transitionTimingFunction: "cubic-bezier(0.165,0.84,0.44,1)" }}
                  />
                </span>
              </a>
            ))}
          </nav>

          {/* CTA */}
          <a
            href="#contact"
            className="group inline-flex items-center gap-2 px-6 py-3 rounded-full border border-neon/30 hover:border-neon font-mono text-xs text-white tracking-widest uppercase transition-all duration-300 hover:bg-neon/5 hover:shadow-neon-sm"
          >
            Hire Me
            <ArrowRight size={12} className="text-neon group-hover:translate-x-0.5 transition-transform" />
          </a>
        </div>

        {/* Divider — neon gradient */}
        <div className="h-px bg-gradient-to-r from-transparent via-neon/40 to-transparent mb-8" />

        {/* Bottom row */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-ash/40 text-[10px] font-mono tracking-wider">
          <p>© {year} Daryl Cruz Tumaneng. All rights reserved.</p>
          <div className="flex items-center gap-2 flex-wrap">
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
