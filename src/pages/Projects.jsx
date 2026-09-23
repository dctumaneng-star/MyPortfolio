import { motion } from "framer-motion";
import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import PageTransition from "../components/PageTransition";

const PROJECTS = [
  {
    index: "01",
    name: "The Bottom Baseline",
    subtitle: "Financial Tracking & Player Management",
    description: "A web application custom-built to completely automate financial tracking and player management for court organizers. Designed to eliminate manual spreadsheet calculations, it is the perfect solution for streamlining weekly badminton sessions, pickleball meetups, and other open play events into a clean, mobile-friendly dashboard.",
    stack: ["Web App", "Dashboard", "Automation"],
    size: "large",
    status: "In Development",
    href: "https://opfintracker.vercel.app/?utm_source=gemini",
  },
  {
    index: "02",
    name: "ProfConnect",
    subtitle: "Digital Consultation Logbook for UST-CICS Faculty Appointments",
    description: "Collaborated on front-end design and created fundamental back-end application logic using MySQL for persistent storage.",
    stack: ["Laravel", "React.js", "MySQL"],
    size: "small",
    href: "https://profconnect-cics.com/login",
  },
  {
    index: "03",
    name: "Austin's Cafe IMS-POS",
    subtitle: "Inventory & Point-of-Sale System",
    description: "Developed functional UAT protocol, oversaw post-deployment troubleshooting, and trained end users.",
    stack: ["UAT", "Systems", "Training"],
    size: "small",
  },
  {
    index: "04",
    name: "Roar Call",
    subtitle: "Responsive Web Application",
    description: "Engineered complete website flow and crafted engaging, responsive UI/UX using React.js.",
    stack: ["React.js", "UI/UX"],
    size: "large",
  },
];

function ProjectCard({ project, index }) {
  const [hovered, setHovered] = useState(false);

  const Component = project.href ? motion.a : motion.article;
  const linkProps = project.href ? { href: project.href, target: "_blank", rel: "noopener noreferrer", "data-hover": "true" } : {};

  return (
    <Component
      {...linkProps}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ delay: 0.1 + index * 0.12, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className={`relative border border-line-light dark:border-line-dark p-8 flex flex-col justify-between
        min-h-[220px] md:min-h-[260px] transition-colors duration-300 group
        hover:border-neon dark:hover:border-neon bg-chalk dark:bg-void block
        ${project.size === "large" ? "md:col-span-2" : "md:col-span-1"}
        ${project.href ? "cursor-none" : ""}`}
    >
      <motion.div
        className="absolute top-0 left-0 h-px bg-neon"
        animate={{ width: hovered ? "100%" : "0%" }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      />
      
      <div className="flex items-start justify-between mb-auto">
        <div className="pr-4">
          <span className="mono-label block mb-3 group-hover:text-neon transition-colors duration-300">
            {project.index}
          </span>
          <div className="flex flex-wrap items-center gap-3 mb-1">
            <h3 className="font-display font-medium text-display-md text-ink dark:text-chalk leading-none lowercase">
              {project.name}
            </h3>
            {project.status && (
              <span className="neon-tag !py-0.5 !px-1.5 !text-[10px] self-start mt-1 lowercase">
                {project.status}
              </span>
            )}
          </div>
          <p className="font-mono text-xs text-ink/40 dark:text-chalk/30 lowercase">{project.subtitle}</p>
        </div>
        <motion.div
          animate={{ rotate: hovered ? 45 : 0, color: hovered ? "#C8FF00" : "inherit" }}
          transition={{ duration: 0.3 }}
          className="text-ink/30 dark:text-chalk/20 mt-1 shrink-0"
        >
          <ArrowUpRight size={18} />
        </motion.div>
      </div>

      <p className="text-sm text-ink/50 dark:text-chalk/35 leading-relaxed mt-6 mb-5">
        {project.description}
      </p>

      <div className="flex flex-wrap gap-2">
        {project.stack.map((s) => (
          <span key={s} className="neon-tag">{s}</span>
        ))}
      </div>
    </Component>
  );
}

export default function Projects() {
  return (
    <PageTransition className="pt-8 pb-16">
      <div className="max-w-6xl mx-auto px-6 w-full">
        
        {/* Heading */}
        <div className="mb-16">
          <div className="overflow-hidden">
            <motion.h1 
              className="font-display font-medium text-display-lg text-ink dark:text-chalk leading-none lowercase"
              initial={{ y: "105%" }}
              animate={{ y: "0%" }}
              transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
            >
              selected work
            </motion.h1>
          </div>
        </div>

        {/* Asymmetric grid */}
        <div className="grid md:grid-cols-3 gap-px bg-line-light dark:bg-line-dark border-y border-line-light dark:border-line-dark">
          {PROJECTS.map((p, i) => (
            <ProjectCard key={p.index} project={p} index={i} />
          ))}
        </div>

      </div>
    </PageTransition>
  );
}
