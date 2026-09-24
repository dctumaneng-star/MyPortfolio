import { motion, useInView } from "framer-motion";
import { useRef } from "react";

/* ── Animated line reveal for headings ── */
function LineReveal({ children, delay = 0, className = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <div ref={ref} className="overflow-hidden">
      <motion.div
        className={className}
        initial={{ y: "105%" }}
        animate={inView ? { y: "0%" } : {}}
        transition={{ delay, duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </motion.div>
    </div>
  );
}

/* ── Fade-in row ── */
function FadeRow({ children, delay = 0, className = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay, duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* ─────────────────────────────────── */

const EXPERIENCE = [
  {
    id: "01",
    company: "Globe Telecom",
    role: "Territory Service Quality Assurance Intern",
    period: "2024 – 2025",
    description:
      "Collaborated with the assigned TSQA for checking the Customer Experience and Availability of cell towers within parts of Region 1, CAR, Region 3 and most of Region 2.",
    tags: ["Network QA", "Field Ops", "Telco"],
  },
];

const EDUCATION = [
  {
    id: "EDU",
    institution: "University of Santo Tomas",
    credential: "BS Information Technology — Web & Mobile Application Development",
    period: "08/2022 – 06/2026",
    tags: ["BSIT", "UST"],
  },
  {
    id: "CERT",
    institution: "PhilNITS / ITPEC",
    credential: "IT Passport Certification",
    period: "10/2025 – Present",
    tags: ["Certification"],
  },
];

function Entry({ id, left, right, description, tags, delay }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay, duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
      className="grid md:grid-cols-[1.2fr_2fr] gap-6 md:gap-16 py-8 border-t border-line-light dark:border-line-dark group"
    >
      {/* Left */}
      <div>
        <span className="mono-label block mb-2 group-hover:text-ink dark:group-hover:text-ink dark:hover:text-neon transition-colors duration-300">{id}</span>
        <p className="font-mono text-xs text-ink/40 dark:text-chalk/30 mb-1">{left.period}</p>
        <p className="font-medium text-sm text-ink dark:text-chalk leading-snug">{left.name}</p>
      </div>
      {/* Right */}
      <div>
        <p className="font-semibold text-sm text-ink dark:text-chalk mb-2">{right}</p>
        {description && (
          <p className="text-sm text-ink/55 dark:text-chalk/40 leading-relaxed mb-4">{description}</p>
        )}
        <div className="flex flex-wrap gap-2">
          {tags.map((t) => <span key={t} className="neon-tag">{t}</span>)}
        </div>
      </div>
    </motion.div>
  );
}

export default function Work() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="work" className="section-rule py-20 md:py-28">
      <div className="max-w-6xl mx-auto px-6">

        {/* Section heading */}
        <div className="mb-16">
          <LineReveal delay={0} className="mono-label mb-4">Experience & Education</LineReveal>
          <LineReveal delay={0.1}>
            <h2 className="font-display text-display-lg text-ink dark:text-chalk leading-none">
              TRACK RECORD
            </h2>
          </LineReveal>
        </div>

        {/* Experience */}
        <div className="mb-4">
          <span className="mono-label">— Work Experience</span>
        </div>
        {EXPERIENCE.map((exp, i) => (
          <Entry
            key={exp.id}
            id={exp.id}
            left={{ period: exp.period, name: exp.company }}
            right={exp.role}
            description={exp.description}
            tags={exp.tags}
            delay={i * 0.1}
          />
        ))}

        {/* Education */}
        <div className="mt-12 mb-4">
          <span className="mono-label">— Education & Certifications</span>
        </div>
        {EDUCATION.map((edu, i) => (
          <Entry
            key={edu.id}
            id={edu.id}
            left={{ period: edu.period, name: edu.institution }}
            right={edu.credential}
            description={null}
            tags={edu.tags}
            delay={i * 0.1}
          />
        ))}
      </div>
    </section>
  );
}
