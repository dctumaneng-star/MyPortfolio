import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import {
  ExternalLink, GitBranch, Layers, Server, Database,
  Globe, Container, Shield, ArrowUpRight, Code2
} from "lucide-react";

const projects = [
  {
    id: "01",
    slug: "profconnect",
    title: "ProfConnect",
    category: "Full-Stack Capstone",
    year: "2025",
    status: "Production",
    size: "large", // spans 2 cols
    description:
      "A full-stack professional connection and collaboration platform built as a BSIT capstone project. Features complex multi-table relational schemas, role-based access control, real-time notifications, and a fully custom React UI — no UI kit used.",
    stack: ["Laravel 11", "React.js", "MySQL", "Tailwind CSS", "Sanctum Auth"],
    highlights: [
      "Complex ERD with 14+ relational tables",
      "Custom RBAC: Admin / Professor / Student roles",
      "RESTful API architecture with Laravel Sanctum",
      "Responsive UI with custom design system",
    ],
    icons: [<Layers key="1" size={14} />, <Database key="2" size={14} />, <Globe key="3" size={14} />],
    accentColor: "#C8FF00",
    gradient: "from-neon/10 to-transparent",
  },
  {
    id: "02",
    slug: "homelab",
    title: "Enterprise Homelab",
    category: "Infrastructure / DevOps",
    year: "2025",
    status: "Live",
    size: "medium",
    description:
      "A production-grade bare-metal Linux homelab running a containerized micro-service ecosystem with advanced networking, redundant storage, and remote-access mesh.",
    stack: ["Ubuntu Server", "Docker", "ZFS", "Caddy", "Tailscale"],
    highlights: [
      "ZFS RAIDZ storage pools with snapshots",
      "Caddy v2 reverse proxy + automatic TLS",
      "Tailscale mesh VPN for secure remote access",
      "Docker Compose service orchestration",
    ],
    icons: [<Server key="1" size={14} />, <Container key="2" size={14} />, <Shield key="3" size={14} />],
    accentColor: "#C8FF00",
    gradient: "from-neon/5 to-transparent",
  },
];

const CARD_VARIANTS = {
  hidden: { opacity: 0, y: 60, scale: 0.97 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: i * 0.2,
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};

function ProjectCard({ project, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [hovered, setHovered] = useState(false);

  return (
    <motion.article
      ref={ref}
      variants={CARD_VARIANTS}
      custom={index}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className={`relative group glass-card rounded-2xl overflow-hidden cursor-pointer
        ${project.size === "large" ? "md:col-span-2" : "md:col-span-1"}
        hover:border-neon/30 transition-colors duration-500`}
    >
      {/* Animated neon glow on hover */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.4 }}
        style={{
          background: "radial-gradient(ellipse at 20% 20%, rgba(200,255,0,0.08) 0%, transparent 60%)",
        }}
      />

      {/* Diagonal accent bar */}
      <motion.div
        className="absolute top-0 left-0 w-1 h-full bg-neon"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: hovered ? 1 : 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        style={{ transformOrigin: "top" }}
      />

      <div className="p-8 h-full flex flex-col">
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <p className="section-label">{project.id}</p>
              <span className="text-ash/40 text-xs font-mono">/</span>
              <p className="font-mono text-xs text-ash tracking-wider uppercase">{project.category}</p>
            </div>
            <div className="flex items-center gap-3">
              <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono tracking-wider
                ${project.status === "Production" ? "bg-neon/15 text-neon border border-neon/30" : "bg-emerald-400/15 text-emerald-400 border border-emerald-400/30"}`}>
                <span className={`w-1 h-1 rounded-full ${project.status === "Production" ? "bg-neon" : "bg-emerald-400"} animate-pulse`} />
                {project.status}
              </span>
              <span className="font-mono text-xs text-ash">{project.year}</span>
            </div>
          </div>

          <motion.div
            className="w-10 h-10 rounded-xl border border-white/10 flex items-center justify-center text-ash group-hover:border-neon/40 group-hover:text-neon transition-all duration-300"
            animate={{ rotate: hovered ? 45 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <ArrowUpRight size={18} />
          </motion.div>
        </div>

        {/* Title */}
        <h3 className="font-display text-[clamp(2rem,4vw,3.5rem)] leading-none tracking-tight text-white mb-4 group-hover:text-neon transition-colors duration-300">
          {project.title}
        </h3>

        {/* Description */}
        <p className="text-ash text-sm leading-relaxed mb-6 flex-grow">{project.description}</p>

        {/* Highlights */}
        {project.size === "large" && (
          <ul className="grid sm:grid-cols-2 gap-2 mb-6">
            {project.highlights.map((h, i) => (
              <li key={i} className="flex items-start gap-2 text-ash-light text-xs">
                <Code2 size={12} className="text-neon mt-0.5 shrink-0" />
                {h}
              </li>
            ))}
          </ul>
        )}

        {/* Stack pills */}
        <div className="flex flex-wrap gap-2 mt-auto">
          {project.stack.map((s) => (
            <span key={s} className="px-2.5 py-1 rounded-md bg-dark-400 border border-white/5 text-ash text-xs font-mono">
              {s}
            </span>
          ))}
        </div>
      </div>
    </motion.article>
  );
}

export default function Projects() {
  const headingRef = useRef(null);
  const inView = useInView(headingRef, { once: true, margin: "-100px" });

  return (
    <section id="projects" className="py-32 px-6 md:px-16 lg:px-24 bg-dark relative overflow-hidden">
      {/* Section watermark */}
      <div className="absolute top-16 right-10 font-display text-[12rem] text-white/[0.02] leading-none select-none pointer-events-none">
        03
      </div>

      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <div ref={headingRef} className="mb-20">
          <motion.p
            className="section-label mb-4"
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            / Selected Work
          </motion.p>
          <div className="overflow-hidden">
            <motion.h2
              className="font-display text-[clamp(3rem,7vw,7rem)] leading-none tracking-tightest uppercase"
              initial={{ y: "100%" }}
              animate={inView ? { y: "0%" } : {}}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="text-white">Project</span>{" "}
              <span className="text-stroke">Showcase</span>
            </motion.h2>
          </div>
        </div>

        {/* Bento grid */}
        <div className="grid md:grid-cols-3 gap-5">
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}

          {/* CTA card */}
          <motion.div
            variants={CARD_VARIANTS}
            custom={projects.length}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="glass-card rounded-2xl p-8 flex flex-col items-center justify-center text-center hover:border-neon/30 transition-colors duration-500 group min-h-[200px] cursor-pointer"
          >
            <div className="w-14 h-14 rounded-full border border-neon/30 flex items-center justify-center text-neon mb-4 group-hover:bg-neon/10 transition-colors duration-300 group-hover:shadow-neon-sm">
              <GitBranch size={24} />
            </div>
            <p className="text-white font-semibold mb-1">More on GitHub</p>
            <p className="text-ash text-xs">See all repositories →</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
