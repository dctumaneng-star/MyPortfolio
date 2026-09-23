import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  Code2, Layers, Server, Database,
  Cloud, Terminal, Layout
} from "lucide-react";

const SKILLS = [
  {
    category: "Frontend",
    icon: <Layout size={14} />,
    items: [
      { name: "React.js", level: 90 },
      { name: "Tailwind CSS", level: 95 },
      { name: "Flutter", level: 75 },
    ],
  },
  {
    category: "Backend",
    icon: <Server size={14} />,
    items: [
      { name: "Laravel / PHP", level: 88 },
      { name: "MySQL", level: 85 },
      { name: "REST API Design", level: 87 },
    ],
  },
  {
    category: "Infrastructure",
    icon: <Cloud size={14} />,
    items: [
      { name: "Ubuntu Server", level: 82 },
      { name: "Docker", level: 80 },
      { name: "ZFS Storage", level: 75 },
    ],
  },
  {
    category: "Tooling",
    icon: <Terminal size={14} />,
    items: [
      { name: "Git / GitHub", level: 92 },
      { name: "Caddy Proxy", level: 78 },
      { name: "Tailscale", level: 80 },
    ],
  },
];

const STATS = [
  { value: "500+", label: "Hours Interned", sub: "Globe Telecom" },
  { value: "2", label: "Major Projects", sub: "Shipped & live" },
  { value: "10+", label: "Technologies", sub: "Full-stack toolkit" },
  { value: "1", label: "Certification", sub: "PhilNITS IT Pro" },
];

// OFF+BRAND style: bold statement text with stagger line reveal
function StatementText({ inView }) {
  const lines = [
    { text: "With precision", muted: false },
    { text: "and creativity,", muted: false },
    { text: "I build digital", muted: true },
    { text: "experiences.", muted: true },
  ];

  return (
    <div>
      {lines.map((line, i) => (
        <div key={i} className="overflow-hidden">
          <motion.p
            className={`font-display text-[clamp(2rem,5vw,5rem)] leading-none tracking-tightest uppercase ${
              line.muted ? "text-white/20" : "text-white"
            }`}
            initial={{ y: "105%" }}
            animate={inView ? { y: "0%" } : {}}
            transition={{ delay: i * 0.1 + 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            {line.text}
          </motion.p>
        </div>
      ))}
    </div>
  );
}

function SkillBar({ name, level, inView, delay }) {
  return (
    <div className="group border-b border-white/5 py-3 flex items-center justify-between gap-4 hover:border-neon/20 transition-colors duration-300">
      <div className="flex items-center gap-3 min-w-0">
        <Code2 size={11} className="text-neon shrink-0" />
        <span className="font-mono text-xs text-ash-light truncate">{name}</span>
      </div>
      <div className="flex items-center gap-3 shrink-0">
        <div className="w-24 h-px bg-dark-500 relative overflow-hidden">
          <motion.div
            className="absolute top-0 left-0 h-full bg-neon"
            initial={{ width: 0 }}
            animate={inView ? { width: `${level}%` } : {}}
            transition={{ delay, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            style={{ boxShadow: "0 0 6px rgba(200,255,0,0.7)" }}
          />
        </div>
        <span className="font-mono text-[10px] text-neon w-8 text-right">{level}%</span>
      </div>
    </div>
  );
}

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const skillsRef = useRef(null);
  const skillsInView = useInView(skillsRef, { once: true, margin: "-60px" });

  return (
    <section id="about" className="py-24 md:py-32 bg-dark relative overflow-hidden">
      {/* Section number watermark */}
      <div className="absolute top-16 right-0 font-display text-[18vw] text-white/[0.02] leading-none select-none pointer-events-none pr-4">
        01
      </div>

      {/* ─ Statement section — OFF+BRAND bold statement style ─ */}
      <div ref={ref} className="px-6 md:px-16 lg:px-24 mb-20 md:mb-28">
        <motion.p
          className="section-label mb-8"
          initial={{ opacity: 0, x: -20 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          / About
        </motion.p>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          <StatementText inView={inView} />

          <motion.div
            className="pt-2 lg:pt-16"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <p className="text-ash text-sm leading-relaxed mb-5">
              I'm a BSIT student at the University of Santo Tomas with a passion for building
              end-to-end web applications — from database architecture and server infrastructure
              to pixel-perfect, performant frontend interfaces.
            </p>
            <p className="text-ash text-sm leading-relaxed mb-8">
              My experience spans telco-grade network operations at Globe Telecom and hands-on
              homelab infrastructure engineering. I build things that are fast, reliable, and look
              exceptional.
            </p>
            {/* OFF+BRAND style link button */}
            <a
              href="#projects"
              className="group inline-flex items-center gap-2 font-mono text-xs text-white tracking-widest uppercase relative py-1"
            >
              <span>View my work</span>
              <span className="text-neon group-hover:translate-x-1 transition-transform duration-300">→</span>
              <span className="absolute bottom-0 left-0 h-px w-full bg-white/10">
                <span className="absolute inset-0 bg-neon origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"
                  style={{ transitionTimingFunction: "cubic-bezier(0.165,0.84,0.44,1)" }}
                />
              </span>
            </a>
          </motion.div>
        </div>
      </div>

      {/* ─ Stats strip — full-width border rows ─ */}
      <div className="border-y border-white/5 mb-20">
        <div className="grid grid-cols-2 md:grid-cols-4">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              className="border-r border-white/5 last:border-r-0 px-6 md:px-12 py-8 group hover:bg-neon/[0.03] transition-colors duration-500"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
            >
              <p className="font-display text-5xl text-neon leading-none mb-2 group-hover:text-white transition-colors duration-300">
                {stat.value}
              </p>
              <p className="text-white text-sm font-medium">{stat.label}</p>
              <p className="text-ash text-xs font-mono mt-0.5">{stat.sub}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ─ Skills — horizontal list with bar fills ─ */}
      <div ref={skillsRef} className="px-6 md:px-16 lg:px-24">
        <motion.p
          className="section-label mb-10"
          initial={{ opacity: 0 }}
          animate={skillsInView ? { opacity: 1 } : {}}
        >
          / Technical Skills
        </motion.p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {SKILLS.map((group, gi) => (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, y: 20 }}
              animate={skillsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: gi * 0.1, duration: 0.6 }}
            >
              <div className="flex items-center gap-2 mb-4">
                <span className="text-neon">{group.icon}</span>
                <p className="font-mono text-xs text-ash tracking-widest uppercase">{group.category}</p>
              </div>
              {group.items.map((skill, si) => (
                <SkillBar
                  key={skill.name}
                  {...skill}
                  inView={skillsInView}
                  delay={gi * 0.1 + si * 0.12 + 0.3}
                />
              ))}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
