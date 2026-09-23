import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const SKILL_GROUPS = [
  {
    label: "Languages",
    items: ["Java", "JavaScript", "PHP", "Python"],
  },
  {
    label: "Web & Mobile",
    items: ["Firebase", "Laravel", "Node.js", "React", "TailwindCSS", "Android Studio", "Flutter"],
  },
  {
    label: "Databases & Admin",
    items: ["PostgreSQL", "SQL", "Docker", "Kubernetes", "Samba", "Ubuntu Server", "Windows Server", "ADDS"],
  },
  {
    label: "Other",
    items: ["Full-Stack Development", "OOP", "Networking & Security basics", "Game Servers"],
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: (i) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  }),
};

export default function Skills() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="skills" className="section-base py-16 md:py-24" ref={ref}>
      <div className="max-w-5xl mx-auto px-6">

        <motion.p
          className="label mb-12"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
        >
          Skills
        </motion.p>

        <div className="space-y-0">
          {SKILL_GROUPS.map((group, i) => (
            <motion.div
              key={group.label}
              variants={fadeUp}
              custom={i}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              className="grid md:grid-cols-[1fr_2fr] gap-6 md:gap-24 py-6 border-t border-ink-100 dark:border-ink-800"
            >
              <p className="font-mono text-xs text-ink-400 dark:text-ink-500 pt-0.5">
                {group.label}
              </p>
              <p className="text-sm text-ink-700 dark:text-ink-300 leading-relaxed">
                {group.items.join(", ")}.
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

