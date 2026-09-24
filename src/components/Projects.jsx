import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";

const PROJECTS = [
  {
    index: "01",
    name: "ProfConnect",
    subtitle: "Digital Consultation Logbook",
    description:
      "Collaborated on front-end design and created fundamental back-end application logic using MySQL for persistent storage.",
    stack: ["Laravel", "React.js", "MySQL"],
    size: "large", // spans 2 cols on desktop
  },
  {
    index: "02",
    name: "Austin's Cafe IMS-POS",
    subtitle: "Inventory & Point-of-Sale System",
    description:
      "Developed functional UAT protocol, oversaw post-deployment troubleshooting, and trained end users.",
    stack: ["UAT", "Systems", "Training"],
    size: "small",
  },
  {
    index: "03",
    name: "Roar Call",
    subtitle: "Responsive Web Application",
    description:
      "Engineered complete website flow and crafted engaging, responsive UI/UX using React.js.",
    stack: ["React.js", "UI/UX"],
    size: "small",
  },
];

function ProjectCard({ project, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [hovered, setHovered] = useState(false);

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.12, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className={`relative border border-line-light dark:border-line-dark p-8 flex flex-col justify-between
        min-h-[220px] md:min-h-[260px] transition-colors duration-300 group
        hover:border-neon dark:hover:border-neon
        ${project.size === "large" ? "md:col-span-2" : "md:col-span-1"}`}
    >
      {/* Neon accent line — top, animates on hover */}
      <motion.div
        className="absolute top-0 left-0 h-px bg-neon"
        animate={{ width: hovered ? "100%" : "0%" }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      />

      {/* Header */}
      <div className="flex items-start justify-between mb-auto">
        <div>
          <span className="mono-label block mb-3 group-hover:text-ink dark:group-hover:text-ink dark:hover:text-neon transition-colors duration-300">
            {project.index}
          </span>
          <h3 className="font-display text-display-md text-ink dark:text-chalk leading-none mb-1">
            {project.name}
          </h3>
          <p className="font-mono text-xs text-ink/40 dark:text-chalk/30">{project.subtitle}</p>
        </div>
        <motion.div
          animate={{ rotate: hovered ? 45 : 0, color: hovered ? "#C8FF00" : "inherit" }}
          transition={{ duration: 0.3 }}
          className="text-ink/30 dark:text-chalk/20 mt-1 shrink-0"
        >
          <ArrowUpRight size={18} />
        </motion.div>
      </div>

      {/* Description */}
      <p className="text-sm text-ink/50 dark:text-chalk/35 leading-relaxed mt-6 mb-5">
        {project.description}
      </p>

      {/* Stack */}
      <div className="flex flex-wrap gap-2">
        {project.stack.map((s) => (
          <span key={s} className="neon-tag">{s}</span>
        ))}
      </div>
    </motion.article>
  );
}

export default function Projects() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="projects" className="section-rule py-20 md:py-28">
      <div className="max-w-6xl mx-auto px-6">

        {/* Heading */}
        <div className="mb-16">
          <div className="overflow-hidden">
            <motion.p
              className="mono-label mb-4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Selected Projects
            </motion.p>
          </div>
          <div ref={ref} className="overflow-hidden">
            <motion.h2
              className="font-display text-display-lg text-ink dark:text-chalk leading-none"
              initial={{ y: "105%" }}
              animate={inView ? { y: "0%" } : {}}
              transition={{ delay: 0.1, duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
            >
              BUILT, SHIPPED,<br />DELIVERED.
            </motion.h2>
          </div>
        </div>

        {/* Asymmetric grid */}
        <div className="grid md:grid-cols-3 gap-px bg-line-light dark:bg-line-dark">
          {PROJECTS.map((p, i) => (
            <ProjectCard key={p.index} project={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
