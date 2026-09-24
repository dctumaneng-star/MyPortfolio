import { motion, useScroll, useTransform } from "framer-motion";
import PageTransition from "../components/PageTransition";
import { KineticText, TE_EASE } from "../components/KineticText";
import FluidCard from "../components/FluidCard";

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
      layout
      transition={{ layout: { type: "spring", stiffness: 400, damping: 30, mass: 0.8 } }}
      variants={gridItem}
      className="grid md:grid-cols-[1.2fr_2fr] gap-6 md:gap-16 py-8 border-t border-line-light dark:border-line-dark group"
    >
      <div>
        <span className="mono-label block mb-2 group-hover:text-ink dark:group-hover:text-ink dark:hover:text-neon transition-colors duration-150">{id}</span>
        <p className="font-mono text-xs text-ink/70 dark:text-chalk/30 mb-1">{left.period}</p>
        <p className="font-medium text-sm text-ink dark:text-chalk leading-snug">{left.name}</p>
      </div>
      <div>
        <p className="font-semibold text-sm text-ink dark:text-chalk mb-2">{right}</p>
        {description && (
          <p className="text-sm text-ink/80 dark:text-chalk/40 leading-relaxed mb-4">{description}</p>
        )}
        <div className="flex flex-wrap gap-2">
          {tags.map((t) => <span key={t} className="neon-tag lowercase group-hover:bg-void group-hover:text-neon transition-colors duration-150">{t}</span>)}
        </div>
      </div>
    </motion.div>
  );
}

import { isFirstLoad } from "../utils/firstLoad";

export default function About() {
  const { scrollYProgress } = useScroll();
  const yParallaxHobby = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const yParallaxLists = useTransform(scrollYProgress, [0, 1], [0, -80]);

  const delayCascade = isFirstLoad ? 1.8 : 0.1;

  // We inline the container variant to inject dynamic delay
  const dynamicGridContainer = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: delayCascade + 0.2 } }
  };

  return (
    <PageTransition className="pt-8 pb-16 lowercase">
      <div className="max-w-6xl mx-auto px-6 w-full space-y-24">
        
        {/* Header with Graduation Picture */}
        <div className="flex flex-col md:flex-row md:items-end gap-8 md:gap-12 mb-8">
          <motion.div 
            className="w-48 h-64 md:w-56 md:h-72 lg:w-64 lg:h-80 relative rounded-3xl overflow-hidden liquid-glass border border-ink/10 dark:border-chalk/10 shadow-xl p-1.5 shrink-0"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: delayCascade, duration: 0.8, ease: TE_EASE }}
          >
            {/* The photo itself must remain fully vibrant, no grayscale filters! */}
            <img 
              src="/portrait.jpg" 
              alt="Daryl Tumaneng Graduation" 
              className="w-full h-full object-cover rounded-[1.25rem]"
            />
          </motion.div>
          <div>
            <KineticText 
              text="credentials." 
              className="font-display font-medium text-5xl sm:text-7xl md:text-8xl lg:text-[8rem] text-ink dark:text-chalk leading-none mb-0 tracking-tighter" 
              delay={delayCascade + 0.1}
            />
          </div>
        </div>

        {/* Top Section: Credentials */}
        <motion.div 
          className="grid lg:grid-cols-[1fr_2.5fr] gap-12 lg:gap-24 items-start border-t border-line-light dark:border-line-dark pt-12"
        >
          {/* Experience */}
          <div className="lg:border-none lg:pt-0">
            <span className="mono-label block mb-12">experience</span>
            <motion.div 
              variants={dynamicGridContainer} initial="hidden" whileInView="show" viewport={{ once: false, margin: "-15%" }}
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

          {/* Education & Certs */}
          <div className="border-t border-line-light dark:border-line-dark lg:border-none pt-12 lg:pt-0">
            <span className="mono-label block mb-12">education & certs</span>
            <motion.div 
              variants={dynamicGridContainer} initial="hidden" whileInView="show" viewport={{ once: false, margin: "-15%" }}
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

        {/* Middle Section: Personal Bio */}
        <motion.div 
          style={{ y: yParallaxLists }}
          className="max-w-4xl mx-auto border-t border-line-light dark:border-line-dark pt-24 pb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.8, ease: TE_EASE }}
        >
          <span className="mono-label block mb-8">personal biography</span>
          <p className="font-display text-2xl md:text-4xl lg:text-5xl text-ink dark:text-chalk/90 leading-tight tracking-tight">
            i am a multidimensional developer and designer based in plaridel, bulacan. while my foundation is in full-stack web and mobile application development, my passion lies in bridging the gap between deep backend infrastructure and hyper-fluid user interfaces. i build systems that are as structurally sound as they are visually striking.
          </p>
        </motion.div>

        {/* Bottom Section: Interests Grid */}
        <div className="border-t border-line-light dark:border-line-dark pt-24">
          <span className="mono-label block mb-12">interests module</span>
          <motion.div 
            style={{ y: yParallaxHobby }}
            variants={dynamicGridContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, margin: "-15%" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6"
          >
            {HOBBIES.map((hobby) => (
              <FluidCard
                key={hobby.id}
                variants={gridItem}
                className={`liquid-glass grain-overlay p-8 md:p-10 flex flex-col justify-between group transition-colors duration-300 min-h-[240px] ${hobby.colSpan}`}
              >
                <div className="flex flex-col flex-1 z-20">
                  <span className="font-mono text-[10px] text-ink/50 dark:text-chalk/50 uppercase tracking-widest border border-ink/10 dark:border-chalk/10 px-2 py-1 rounded-sm self-start mb-6">
                    {hobby.id}
                  </span>
                  <h3 className="font-display font-medium text-2xl md:text-3xl text-ink dark:text-chalk leading-none mb-4 break-words">
                    {hobby.title}
                  </h3>
                  <p className="font-body text-sm md:text-base text-ink/70 dark:text-chalk/70 leading-relaxed mb-8">
                    {hobby.description}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2 mt-auto z-20">
                  {hobby.tags.map(tag => (
                    <span key={tag} className="neon-tag lowercase transition-colors duration-150">{tag}</span>
                  ))}
                </div>
              </FluidCard>
            ))}
          </motion.div>
        </div>

      </div>
    </PageTransition>
  );
}
