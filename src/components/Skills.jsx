import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const TICKER_ITEMS = [
  "Java", "JavaScript", "PHP", "Python",
  "Firebase", "Laravel", "Node.js", "React", "TailwindCSS", "Android Studio", "Flutter",
  "PostgreSQL", "SQL", "Docker", "Kubernetes", "Samba", "Ubuntu Server", "Windows Server", "ADDS",
  "Full-Stack Development", "OOP", "Networking & Security", "Game Servers",
];
// Duplicate for seamless loop
const TICKER_DOUBLE = [...TICKER_ITEMS, ...TICKER_ITEMS];

const SKILL_GROUPS = [
  { label: "Languages",         items: ["Java", "JavaScript", "PHP", "Python"] },
  { label: "Web & Mobile",      items: ["Firebase", "Laravel", "Node.js", "React", "TailwindCSS", "Android Studio", "Flutter"] },
  { label: "Databases & Admin", items: ["PostgreSQL", "SQL", "Docker", "Kubernetes", "Samba", "Ubuntu Server", "Windows Server", "ADDS"] },
  { label: "Other",             items: ["Full-Stack Development", "OOP", "Networking & Security basics", "Game Servers"] },
];

export default function Skills() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="skills" className="section-rule py-20 md:py-28 overflow-hidden">

      {/* ── High-speed marquee strip ── */}
      <div className="fade-edges border-y border-line-light dark:border-line-dark py-4 mb-20 overflow-hidden">
        <div className="ticker-track">
          {TICKER_DOUBLE.map((item, i) => (
            <span key={i} className="inline-flex items-center">
              <span className="font-display text-xl md:text-2xl text-ink dark:text-chalk px-6 whitespace-nowrap tracking-tight">
                {item}
              </span>
              <span className="text-neon font-mono text-sm px-2">✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* ── Skill table ── */}
      <div ref={ref} className="max-w-6xl mx-auto px-6">
        <div className="mb-16 overflow-hidden">
          <motion.h2
            className="font-display text-display-lg text-ink dark:text-chalk leading-none"
            initial={{ y: "105%" }}
            animate={inView ? { y: "0%" } : {}}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          >
            SKILL SET
          </motion.h2>
        </div>

        <div className="space-y-0">
          {SKILL_GROUPS.map((group, i) => (
            <motion.div
              key={group.label}
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="grid md:grid-cols-[200px_1fr] gap-6 md:gap-16 py-6 border-t border-line-light dark:border-line-dark group"
            >
              <p className="mono-label pt-0.5 group-hover:text-ink dark:group-hover:text-ink dark:hover:text-neon transition-colors duration-300">
                {group.label}
              </p>
              <p className="text-sm text-ink/60 dark:text-chalk/45 leading-relaxed">
                {group.items.join(",  ")}.
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
