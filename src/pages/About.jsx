import { motion } from "framer-motion";
import PageTransition from "../components/PageTransition";

const HOBBIES = [
  {
    id: "H-01",
    title: "motorsport",
    description: "massive mercedes f1 fan.",
    tags: ["f1", "mercedes amg"],
    colSpan: "md:col-span-1 lg:col-span-1",
  },
  {
    id: "H-02",
    title: "homelab architectures",
    description: "enthusiast of enterprise homelab architectures.",
    tags: ["docker", "zfs", "ubiquiti", "ubuntu server"],
    colSpan: "md:col-span-1 lg:col-span-2",
  },
  {
    id: "H-03",
    title: "music production",
    description: "producing dark house and synthwave utilizing vintage analog synth emulations.",
    tags: ["fl studio", "ableton"],
    colSpan: "md:col-span-1 lg:col-span-1",
  },
  {
    id: "H-04",
    title: "videography",
    description: "cinematic edits utilizing a dji osmo pocket 3 and premiere pro.",
    tags: ["dji", "premiere pro"],
    colSpan: "md:col-span-1 lg:col-span-1",
  },
  {
    id: "H-05",
    title: "sports",
    description: "active pickleball player.",
    tags: ["pickleball", "athletics"],
    colSpan: "md:col-span-1 lg:col-span-1",
  },
];

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
          {tags.map((t) => <span key={t} className="neon-tag lowercase">{t}</span>)}
        </div>
      </div>
    </motion.div>
  );
}

export default function About() {
  return (
    <PageTransition className="pt-8 pb-16 lowercase">
      <div className="max-w-6xl mx-auto px-6 w-full">
        
        {/* Header */}
        <div className="mb-16 overflow-hidden">
          <motion.h1 
            className="font-display font-bold text-display-lg text-ink dark:text-chalk leading-none"
            initial={{ y: "105%" }}
            animate={{ y: "0%" }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          >
            background
          </motion.h1>
        </div>

        {/* Interests & Hobbies (Bento Grid) - Seen First */}
        <div className="mb-4">
          <span className="mono-label">— beyond the code</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-24">
          {HOBBIES.map((hobby, i) => (
            <motion.div
              key={hobby.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: 0.1 + i * 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className={`${hobby.colSpan} border border-line-light dark:border-line-dark p-6 bg-chalk dark:bg-void flex flex-col justify-between group hover:border-neon dark:hover:border-neon transition-colors duration-300 relative overflow-hidden min-h-[180px]`}
            >
              <div className="absolute top-0 left-0 h-px bg-neon w-0 group-hover:w-full transition-all duration-500 ease-out" />
              <div>
                <span className="mono-label block mb-3">{hobby.id}</span>
                <h3 className="font-display font-bold text-2xl text-ink dark:text-chalk leading-none mb-3">{hobby.title}</h3>
                <p className="font-body text-sm text-ink/70 dark:text-chalk/60 leading-relaxed mb-6">
                  {hobby.description}
                </p>
              </div>
              <div className="flex flex-wrap gap-2 mt-auto">
                {hobby.tags.map((tag) => (
                  <span key={tag} className="neon-tag !py-1 !px-2 !text-[10px]">{tag}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Experience */}
        <div className="mb-4">
          <span className="mono-label">— work experience</span>
        </div>
        {EXPERIENCE.map((exp, i) => (
          <Entry
            key={exp.id}
            id={exp.id}
            left={{ period: exp.period, name: exp.company.toLowerCase() }}
            right={exp.role.toLowerCase()}
            description={exp.description.toLowerCase()}
            tags={exp.tags.map(t => t.toLowerCase())}
            delay={0.1 + i * 0.1}
          />
        ))}

        {/* Education */}
        <div className="mt-16 mb-4">
          <span className="mono-label">— education & certifications</span>
        </div>
        {EDUCATION.map((edu, i) => (
          <Entry
            key={edu.id}
            id={edu.id}
            left={{ period: edu.period, name: edu.institution.toLowerCase() }}
            right={edu.credential.toLowerCase()}
            description={null}
            tags={edu.tags.map(t => t.toLowerCase())}
            delay={0.1 + i * 0.1}
          />
        ))}

      </div>
    </PageTransition>
  );
}
