import { motion, useScroll, useTransform } from "framer-motion";
import PageTransition from "../components/PageTransition";
import { KineticText, TE_EASE } from "../components/KineticText";

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

const gridContainer = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.1 } }
};
const gridItem = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: TE_EASE } }
};

function Entry({ id, left, right, description, tags, delay }) {
  return (
    <motion.div
      variants={gridItem}
      className="grid md:grid-cols-[1.2fr_2fr] gap-6 md:gap-16 py-8 border-t border-line-light dark:border-line-dark group"
    >
      <div>
        <span className="mono-label block mb-2 group-hover:text-neon transition-colors duration-150">{id}</span>
        <p className="font-mono text-xs text-ink/40 dark:text-chalk/30 mb-1">{left.period}</p>
        <p className="font-medium text-sm text-ink dark:text-chalk leading-snug">{left.name}</p>
      </div>
      <div>
        <p className="font-semibold text-sm text-ink dark:text-chalk mb-2">{right}</p>
        {description && (
          <p className="text-sm text-ink/55 dark:text-chalk/40 leading-relaxed mb-4">{description}</p>
        )}
        <div className="flex flex-wrap gap-2">
          {tags.map((t) => <span key={t} className="neon-tag lowercase group-hover:bg-void group-hover:text-neon transition-colors duration-150">{t}</span>)}
        </div>
      </div>
    </motion.div>
  );
}

export default function About() {
  const { scrollYProgress } = useScroll();
  const yParallaxHobby = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const yParallaxLists = useTransform(scrollYProgress, [0, 1], [0, -80]);

  return (
    <PageTransition className="pt-8 pb-16 lowercase">
      <div className="max-w-6xl mx-auto px-6 w-full">
        
        {/* Header */}
        <div className="mb-16">
          <KineticText 
            text="beyond the code" 
            className="font-display font-medium text-display-lg text-ink dark:text-chalk leading-none mb-0" 
          />
        </div>

        {/* Hobbies / Interests Bento Grid */}
        <motion.div 
          style={{ y: yParallaxHobby }}
          variants={gridContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-15%" }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-line-light dark:bg-line-dark border-y border-line-light dark:border-line-dark mb-24"
        >
          {HOBBIES.map((hobby) => (
            <motion.div
              key={hobby.id}
              variants={gridItem}
              className={`bg-chalk dark:bg-void p-6 md:p-8 flex flex-col justify-between group hover:border-neon dark:hover:border-neon transition-colors duration-150 relative overflow-hidden min-h-[220px] ${hobby.colSpan}`}
            >
              <div className="absolute top-0 left-0 h-px bg-neon w-0 group-hover:w-full transition-all duration-150 ease-out" />
              
              <div className="flex flex-col flex-1">
                <span className="mono-label block mb-4 group-hover:text-neon transition-colors duration-150">{hobby.id}</span>
                <h3 className="font-display font-medium text-3xl md:text-4xl text-ink dark:text-chalk leading-none mb-4 break-words">
                  {hobby.title}
                </h3>
                <p className="font-body text-sm text-ink/70 dark:text-chalk/60 leading-relaxed mb-6">
                  {hobby.description}
                </p>
              </div>

              <div className="flex flex-wrap gap-2 mt-auto">
                {hobby.tags.map(tag => (
                  <span key={tag} className="neon-tag lowercase group-hover:bg-void group-hover:text-neon transition-colors duration-150">{tag}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Lists Container */}
        <motion.div 
          style={{ y: yParallaxLists }}
          className="grid lg:grid-cols-[1fr_2.5fr] gap-12 lg:gap-24 items-start border-t border-line-light dark:border-line-dark pt-16"
        >
          
          {/* Experience */}
          <div className="border-t border-line-light dark:border-line-dark lg:border-none lg:pt-0 pt-12">
            <span className="mono-label block mb-12">experience</span>
            <motion.div 
              variants={gridContainer} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-15%" }}
            >
              {EXPERIENCE.map((item, i) => (
                <Entry 
                  key={item.id}
                  id={item.id}
                  left={{ name: item.company, period: item.period }}
                  right={item.role}
                  description={item.description}
                  tags={item.tags}
                  delay={i * 0.1}
                />
              ))}
            </motion.div>
          </div>

          {/* Education */}
          <div>
            <span className="mono-label block mb-12">education & certs</span>
            <motion.div 
              variants={gridContainer} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-15%" }}
            >
              {EDUCATION.map((item, i) => (
                <Entry 
                  key={item.id}
                  id={item.id}
                  left={{ name: item.institution, period: item.period }}
                  right={item.credential}
                  tags={item.tags}
                  delay={i * 0.1}
                />
              ))}
            </motion.div>
          </div>

        </motion.div>

      </div>
    </PageTransition>
  );
}
