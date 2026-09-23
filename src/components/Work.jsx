import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const EXPERIENCE = [
  {
    role: "Territory Service Quality Assurance Intern",
    company: "Globe Telecom",
    period: "2024 – 2025",
    description:
      "Collaborated with the assigned TSQA for checking the Customer Experience and Availability of cell towers within parts of Region 1, CAR, Region 3 and most of Region 2.",
    tags: ["Network QA", "Field Operations", "Telco"],
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.08, duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  }),
};

export default function Work() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="work" className="section-base py-16 md:py-24" ref={ref}>
      <div className="max-w-5xl mx-auto px-6">

        {/* Section header */}
        <div className="grid md:grid-cols-[1fr_2fr] gap-12 md:gap-24 mb-12">
          <motion.p
            className="label"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.4 }}
          >
            Work Experience
          </motion.p>
          <div /> {/* spacer */}
        </div>

        {/* Entries */}
        {EXPERIENCE.map((exp, i) => (
          <motion.div
            key={exp.company}
            className="grid md:grid-cols-[1fr_2fr] gap-6 md:gap-24 py-8 border-t border-ink-100 dark:border-ink-800 first:border-t-0"
            variants={fadeUp}
            custom={i}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            {/* Left */}
            <div>
              <p className="font-mono text-xs text-ink-400 dark:text-ink-500 mb-1">{exp.period}</p>
              <p className="font-medium text-sm text-ink-900 dark:text-ink-100">{exp.company}</p>
            </div>

            {/* Right */}
            <div>
              <p className="font-medium text-sm text-ink-900 dark:text-ink-100 mb-3">{exp.role}</p>
              <p className="text-sm text-ink-500 dark:text-ink-400 leading-relaxed mb-4">
                {exp.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {exp.tags.map((t) => (
                  <span
                    key={t}
                    className="font-mono text-2xs text-ink-400 dark:text-ink-500 tracking-wider-xl uppercase"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

