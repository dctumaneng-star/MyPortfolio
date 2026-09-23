import { motion } from "framer-motion";
import PageTransition from "../components/PageTransition";

const EXPERIENCE = [
  {
    id: "01",
    company: "Globe Telecom",
    role: "Territory Service Quality Assurance Intern",
    period: "2024 – 2025",
    description: "Collaborated with the assigned TSQA for checking the Customer Experience and Availability of cell towers within parts of Region 1, CAR, Region 3 and most of Region 2.",
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
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ delay, duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
      className="grid md:grid-cols-[1.2fr_2fr] gap-6 md:gap-16 py-8 border-t border-line-light dark:border-line-dark group"
    >
      <div>
        <span className="mono-label block mb-2 group-hover:text-neon transition-colors duration-300">{id}</span>
        <p className="font-mono text-xs text-ink/40 dark:text-chalk/30 mb-1">{left.period}</p>
        <p className="font-medium text-sm text-ink dark:text-chalk leading-snug">{left.name}</p>
      </div>
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

export default function About() {
  return (
    <PageTransition className="pt-8 pb-16">
      <div className="max-w-6xl mx-auto px-6 w-full">
        
        {/* Header */}
        <div className="mb-16 overflow-hidden">
          <motion.h1 
            className="font-display text-display-lg text-ink dark:text-chalk leading-none"
            initial={{ y: "105%" }}
            animate={{ y: "0%" }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          >
            BACKGROUND
          </motion.h1>
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
            delay={0.1 + i * 0.1}
          />
        ))}

        {/* Education */}
        <div className="mt-16 mb-4">
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
            delay={0.1 + i * 0.1}
          />
        ))}
      </div>
    </PageTransition>
  );
}

