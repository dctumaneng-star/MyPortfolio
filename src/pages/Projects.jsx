import { motion, useScroll, useTransform } from "framer-motion";
import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import PageTransition from "../components/PageTransition";
import { KineticText, TE_EASE } from "../components/KineticText";

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

const gridContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1
    }
  }
};

const cardItem = {
  hidden: { opacity: 0, y: 50 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: TE_EASE } }
};

function ProjectCard({ project }) {
  const [hovered, setHovered] = useState(false);
  const Component = project.href ? motion.a : motion.article;
  const linkProps = project.href ? { href: project.href, target: "_blank", rel: "noopener noreferrer", "data-hover": "true" } : {};

  return (
    <Component
      {...linkProps}
      layout
      transition={{ layout: { type: "spring", stiffness: 400, damping: 30, mass: 0.8 } }}
      variants={cardItem}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className={`relative liquid-glass hoverable p-8 flex flex-col justify-between
        min-h-[220px] md:min-h-[260px] transition-colors duration-150 group
        hover:border-neon dark:hover:border-neon hover:bg-neon/5 block
        ${project.size === "large" ? "md:col-span-2" : "md:col-span-1"}
        ${project.href ? "cursor-none" : ""}`}
    >
      <div 
        className="absolute top-0 left-0 h-px bg-neon transition-all duration-150 ease-out"
        style={{ width: hovered ? "100%" : "0%" }}
      />
      
      <div className="flex flex-col flex-1">
        <div className="flex items-start justify-between min-w-0">
          <div className="pr-4 min-w-0 flex-1">
            <span className="mono-label block mb-3 group-hover:text-ink dark:group-hover:text-ink dark:hover:text-neon transition-colors duration-150">
              {project.index}
            </span>
            <div className="flex flex-wrap items-center gap-3 mb-1 min-w-0">
              <h3 className={`font-display font-medium text-ink dark:text-chalk leading-none lowercase break-words ${project.size === 'large' ? 'text-display-md' : 'text-4xl lg:text-5xl tracking-tight'}`}>
                {project.name}
              </h3>
              {project.status && (
                <span className="neon-tag !py-0.5 !px-1.5 !text-[10px] self-start mt-1 lowercase group-hover:bg-void group-hover:text-neon transition-colors duration-150">
                  {project.status}
                </span>
              )}
            </div>
            <p className="font-mono text-xs text-ink/70 dark:text-chalk/30 lowercase break-words">{project.subtitle}</p>
          </div>
          <div className="text-ink/30 dark:text-chalk/20 mt-1 shrink-0 ml-2 overflow-hidden">
            <motion.div
              animate={{ x: hovered ? 4 : 0, y: hovered ? -4 : 0, color: hovered ? "#C8FF00" : "inherit" }}
              transition={{ duration: 0.15, ease: "linear" }}
            >
              <ArrowUpRight size={24} />
            </motion.div>
          </div>
        </div>

        <p className="text-sm text-ink/50 dark:text-chalk/35 leading-relaxed mt-6 mb-8 group-hover:text-ink/80 dark:group-hover:text-chalk/80 transition-colors duration-150">
          {project.description}
        </p>
      </div>

      <div className="flex flex-wrap gap-2 mt-auto">
        {project.stack.map((s) => (
          <span key={s} className="neon-tag group-hover:bg-void group-hover:text-neon transition-colors duration-150">{s}</span>
        ))}
      </div>
    </Component>
  );
}

import { isFirstLoad } from "../utils/firstLoad";

export default function Projects() {
  const { scrollYProgress } = useScroll();
  const yParallaxGrid = useTransform(scrollYProgress, [0, 1], [0, -60]);

  const delayCascade = isFirstLoad ? 1.8 : 0.1;

  const dynamicGridContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: delayCascade + 0.1
      }
    }
  };

  return (
    <PageTransition className="pt-8 pb-16">
      <div className="max-w-6xl mx-auto px-6 w-full">
        
        {/* Heading */}
        <div className="mb-16">
          <KineticText 
            text="selected work." 
            className="font-display font-medium text-display-lg text-ink dark:text-chalk leading-none lowercase mb-0" 
            delay={delayCascade}
          />
        </div>

        {/* Asymmetric grid */}
        <motion.div 
          layout
          transition={{ layout: { type: "spring", stiffness: 400, damping: 30, mass: 0.8 } }}
          style={{ y: yParallaxGrid }}
          variants={dynamicGridContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, margin: "-15%" }}
          className="grid md:grid-cols-3 gap-px bg-line-light dark:bg-line-dark border-y border-line-light dark:border-line-dark"
        >
          {PROJECTS.map((p) => (
            <ProjectCard key={p.index} project={p} />
          ))}
        </motion.div>

      </div>
    </PageTransition>
  );
}
