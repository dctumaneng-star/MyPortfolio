import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const STACK = [
  "React", "⬡", "Tailwind CSS", "⬡", "Flutter", "⬡", "Laravel", "⬡",
  "PHP", "⬡", "MySQL", "⬡", "Docker", "⬡", "Ubuntu Server", "⬡",
  "ZFS", "⬡", "Git", "⬡", "Caddy", "⬡", "Tailscale", "⬡",
  // Duplicated for seamless loop
  "React", "⬡", "Tailwind CSS", "⬡", "Flutter", "⬡", "Laravel", "⬡",
  "PHP", "⬡", "MySQL", "⬡", "Docker", "⬡", "Ubuntu Server", "⬡",
  "ZFS", "⬡", "Git", "⬡", "Caddy", "⬡", "Tailscale", "⬡",
];

const STACK_REVERSE = [...STACK].reverse();

export default function TechTicker() {
  return (
    <div className="relative py-6 border-y border-white/5 overflow-hidden bg-dark-100">
      {/* Fade edges */}
      <div className="absolute left-0 top-0 h-full w-24 z-10 pointer-events-none"
        style={{ background: "linear-gradient(to right, #111111, transparent)" }}
      />
      <div className="absolute right-0 top-0 h-full w-24 z-10 pointer-events-none"
        style={{ background: "linear-gradient(to left, #111111, transparent)" }}
      />

      {/* Track 1 – left to right */}
      <div className="ticker-wrapper mb-3">
        <div className="ticker-track">
          {STACK.map((item, i) => (
            <span key={i} className={`px-4 whitespace-nowrap font-mono text-sm ${item === "⬡" ? "text-neon/60 text-xs" : "text-ash-light tracking-wider"}`}>
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* Track 2 – right to left (reversed) */}
      <div className="ticker-wrapper">
        <div className="ticker-track" style={{ animationDirection: "reverse", animationDuration: "30s" }}>
          {STACK_REVERSE.map((item, i) => (
            <span key={i} className={`px-4 whitespace-nowrap font-mono text-sm ${item === "⬡" ? "text-neon/30 text-xs" : "text-ash/60 tracking-wider"}`}>
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

