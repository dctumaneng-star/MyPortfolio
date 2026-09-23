import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const PROJECTS = [
  {
    index: "01",
    name: "ProfConnect",
    subtitle: "Digital Consultation Logbook",
    description:
      "Collaborated on front-end design and created fundamental back-end application logic using MySQL for persistent storage.",
    stack: ["Laravel", "React.js", "MySQL"],
    link: null,
  },
  {
    index: "02",
    name: "Austin's Cafe & Gastro Pub IMS-POS",
    subtitle: "Inventory & Point-of-Sale System",
    description:
      "Developed functional User Acceptance Testing (UAT) protocol, oversaw post-deployment troubleshooting, and trained end users.",
    stack: ["UAT", "Post-deployment", "End-user Training"],
    link: null,
  },
  {
    index: "03",
    name: "Roar Call",
    subtitle: "Responsive Web Application",
    description:
      "Engineered complete website flow and crafted engaging, responsive UI/UX using React.js.",
    stack: ["React.js", "UI/UX Design"],
    link: null,
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  }),
};

export default function Projects() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="projects" className="section-base py-16 md:py-24" ref={ref}>
      <div className="max-w-5xl mx-auto px-6">

        {/* Section label */}
        <motion.p
          className="label mb-12"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
        >
          Selected Projects
        </motion.p>

        {/* Project list */}
        <div>
          {PROJECTS.map((p, i) => (
            <motion.div
              key={p.index}
              variants={fadeUp}
              custom={i}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              className="group grid md:grid-cols-[1fr_2fr] gap-6 md:gap-24 py-8 border-t border-ink-100 dark:border-ink-800"
            >
              {/* Left: index + name */}
              <div>
                <span className="font-mono text-2xs text-ink-300 dark:text-ink-600 block mb-2">
                  {p.index}
                </span>
                <p className="font-medium text-sm text-ink-900 dark:text-ink-100 leading-snug">
                  {p.name}
                </p>
                <p className="font-mono text-xs text-ink-400 dark:text-ink-500 mt-0.5">
                  {p.subtitle}
                </p>
              </div>

              {/* Right: description + stack */}
              <div>
                <p className="text-sm text-ink-500 dark:text-ink-400 leading-relaxed mb-4">
                  {p.description}
                </p>
                <div className="flex flex-wrap gap-x-4 gap-y-1">
                  {p.stack.map((s) => (
                    <span
                      key={s}
                      className="font-mono text-2xs text-ink-300 dark:text-ink-600 tracking-wider-xl uppercase"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
