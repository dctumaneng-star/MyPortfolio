import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Network, ShieldCheck, Clock, ChevronRight } from "lucide-react";

const FADE_UP = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  }),
};

const experiences = [
  {
    id: "01",
    company: "Globe Telecom",
    role: "Network Technical Intern",
    team: "Territory Service Quality Assurance Network Technical Group",
    duration: "500-Hour Internship",
    year: "2025",
    icon: <Network size={20} />,
    tags: ["Network Ops", "QA", "Telco", "NOC"],
    description:
      "Embedded with the Territory SQANTG team, focusing on network technical operations and quality assurance across Globe's territory service areas. Hands-on exposure to real-world telecom infrastructure monitoring, fault analysis, and SLA-driven incident resolution.",
    highlights: [
      "Network fault detection & escalation workflows",
      "Service quality KPI monitoring & reporting",
      "Coordination with field operations teams",
    ],
  },
  {
    id: "02",
    company: "PhilNITS",
    role: "Certified IT Professional",
    team: "Philippine National IT Standards Foundation",
    duration: "Certification",
    year: "2024",
    icon: <ShieldCheck size={20} />,
    tags: ["IT Fundamentals", "Systems", "Certification"],
    description:
      "Attained the PhilNITS IT Passport certification — the Philippine adaptation of Japan's JITEC national IT certification standard, validating comprehensive knowledge of IT fundamentals, computer architecture, networking, databases, security, and software development methodologies.",
    highlights: [
      "IT Passport (IP) level qualification",
      "Systems architecture & algorithm fundamentals",
      "Security, networks & database principles",
    ],
  },
];

function ExperienceCard({ exp, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      variants={FADE_UP}
      custom={index}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className="group relative glass-card rounded-2xl p-8 overflow-hidden hover:border-neon/30 transition-all duration-500"
    >
      {/* Neon hover glow */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-2xl"
        style={{ background: "radial-gradient(ellipse at top left, rgba(200,255,0,0.06) 0%, transparent 60%)" }}
      />

      {/* Top row */}
      <div className="flex items-start justify-between gap-4 mb-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-neon/10 border border-neon/20 flex items-center justify-center text-neon group-hover:bg-neon/20 transition-colors duration-300">
            {exp.icon}
          </div>
          <div>
            <p className="section-label">{exp.id} / EXPERIENCE</p>
            <h3 className="text-xl font-display tracking-wide text-white mt-0.5">{exp.company}</h3>
          </div>
        </div>
        <div className="text-right shrink-0">
          <p className="font-mono text-xs text-ash">{exp.duration}</p>
          <p className="font-mono text-sm text-neon font-bold">{exp.year}</p>
        </div>
      </div>

      {/* Role */}
      <div className="mb-4">
        <p className="text-white font-semibold text-base">{exp.role}</p>
        <p className="text-ash text-sm mt-0.5">{exp.team}</p>
      </div>

      {/* Description */}
      <p className="text-ash text-sm leading-relaxed mb-6">{exp.description}</p>

      {/* Highlights */}
      <ul className="space-y-2 mb-6">
        {exp.highlights.map((h, i) => (
          <li key={i} className="flex items-start gap-2 text-ash-light text-sm">
            <ChevronRight size={14} className="text-neon mt-0.5 shrink-0" />
            {h}
          </li>
        ))}
      </ul>

      {/* Tags */}
      <div className="flex flex-wrap gap-2">
        {exp.tags.map((t) => (
          <span key={t} className="neon-pill">{t}</span>
        ))}
      </div>
    </motion.div>
  );
}

export default function Experience() {
  const headingRef = useRef(null);
  const headingInView = useInView(headingRef, { once: true, margin: "-100px" });

  return (
    <section id="experience" className="py-32 px-6 md:px-16 lg:px-24 bg-dark-100 relative overflow-hidden">
      {/* Section number watermark */}
      <div className="absolute top-16 right-10 font-display text-[12rem] text-white/[0.02] leading-none select-none pointer-events-none">
        02
      </div>

      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <div ref={headingRef} className="mb-20 overflow-hidden">
          <motion.p
            className="section-label mb-4"
            initial={{ opacity: 0, x: -20 }}
            animate={headingInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            / Track Record
          </motion.p>
          <div className="overflow-hidden">
            <motion.h2
              className="font-display text-[clamp(3rem,7vw,7rem)] leading-none tracking-tightest uppercase text-white"
              initial={{ y: "100%" }}
              animate={headingInView ? { y: "0%" } : {}}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            >
              Experience &amp;{" "}
              <span className="text-stroke">Credentials</span>
            </motion.h2>
          </div>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 gap-6">
          {experiences.map((exp, i) => (
            <ExperienceCard key={exp.id} exp={exp} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

