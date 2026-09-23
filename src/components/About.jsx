import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  Code2, Layers, Server, Database, Globe, Cpu,
  Layout, Terminal, Cloud, GitBranch
} from "lucide-react";

const SKILLS = [
  {
    category: "Frontend",
    icon: <Layout size={16} />,
    items: [
      { name: "React.js", level: 90 },
      { name: "Tailwind CSS", level: 95 },
      { name: "Flutter", level: 75 },
    ],
  },
  {
    category: "Backend",
    icon: <Server size={16} />,
    items: [
      { name: "Laravel / PHP", level: 88 },
      { name: "MySQL", level: 85 },
      { name: "REST API Design", level: 87 },
    ],
  },
  {
    category: "Infrastructure",
    icon: <Cloud size={16} />,
    items: [
      { name: "Ubuntu Server", level: 82 },
      { name: "Docker", level: 80 },
      { name: "ZFS / Storage", level: 75 },
    ],
  },
  {
    category: "Tooling",
    icon: <Terminal size={16} />,
    items: [
      { name: "Git / GitHub", level: 92 },
      { name: "Caddy Proxy", level: 78 },
      { name: "Tailscale", level: 80 },
    ],
  },
];

const BAR_VARIANTS = {
  hidden: { width: "0%" },
  visible: (level) => ({
    width: `${level}%`,
    transition: {
      duration: 1.2,
      ease: [0.16, 1, 0.3, 1],
      delay: 0.3,
    },
  }),
};

function SkillGroup({ group, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="glass-card rounded-2xl p-6 hover:border-neon/20 transition-colors duration-300"
    >
      <div className="flex items-center gap-2 mb-6">
        <span className="text-neon">{group.icon}</span>
        <p className="section-label">{group.category}</p>
      </div>
      <div className="space-y-5">
        {group.items.map((skill) => (
          <div key={skill.name}>
            <div className="flex justify-between items-center mb-1.5">
              <span className="text-ash-light text-sm font-mono">{skill.name}</span>
              <span className="text-neon text-xs font-mono font-bold">{skill.level}%</span>
            </div>
            <div className="h-1 bg-dark-500 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-neon rounded-full"
                variants={BAR_VARIANTS}
                custom={skill.level}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                style={{ boxShadow: "0 0 6px rgba(200,255,0,0.6)" }}
              />
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

const STAT_VARIANTS = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: (i) => ({
    opacity: 1,
    scale: 1,
    transition: { delay: i * 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  }),
};

const STATS = [
  { value: "500+", label: "Hours Interned" },
  { value: "2", label: "Major Projects" },
  { value: "10+", label: "Technologies" },
  { value: "1", label: "Certification" },
];

export default function About() {
  const headingRef = useRef(null);
  const inView = useInView(headingRef, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-32 px-6 md:px-16 lg:px-24 bg-dark relative overflow-hidden">
      <div className="absolute top-16 left-10 font-display text-[12rem] text-white/[0.02] leading-none select-none pointer-events-none">
        01
      </div>

      <div className="max-w-6xl mx-auto">
        {/* Heading row */}
        <div ref={headingRef} className="mb-20 grid lg:grid-cols-2 gap-12 items-end">
          <div>
            <motion.p
              className="section-label mb-4"
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5 }}
            >
              / About
            </motion.p>
            <div className="overflow-hidden">
              <motion.h2
                className="font-display text-[clamp(3rem,6vw,6rem)] leading-none tracking-tightest uppercase text-white"
                initial={{ y: "100%" }}
                animate={inView ? { y: "0%" } : {}}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              >
                Full-Stack
                <br />
                <span className="text-stroke">Developer</span>
              </motion.h2>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.7 }}
          >
            <p className="text-ash leading-relaxed mb-6">
              I'm a BSIT student at the University of Santo Tomas with a passion for building
              end-to-end web applications — from database architecture and server infrastructure
              to pixel-perfect, performant frontend interfaces.
            </p>
            <p className="text-ash leading-relaxed">
              My experience spans telco-grade network operations at Globe Telecom and hands-on
              homelab infrastructure. I build things that are fast, reliable, and look great.
            </p>
          </motion.div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              variants={STAT_VARIANTS}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="glass-card rounded-2xl p-6 text-center group hover:border-neon/30 transition-colors duration-300"
            >
              <p className="font-display text-4xl text-neon group-hover:shadow-neon-sm transition-all duration-300 mb-1">
                {stat.value}
              </p>
              <p className="text-ash text-xs font-mono tracking-wider">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Skills */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {SKILLS.map((group, i) => (
            <SkillGroup key={group.category} group={group} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

