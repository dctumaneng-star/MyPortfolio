import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const EDUCATION = [
  {
    institution: "University of Santo Tomas",
    degree: "Bachelor of Science in Information Technology",
    track: "Web and Mobile Application Development Track",
    period: "08/2022 – 06/2026",
  },
  {
    institution: "PhilNITS / ITPEC",
    degree: "IT Passport Certification",
    track: "IT Professional Certification",
    period: "10/2025 – Present",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: (i) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  }),
};

export default function Education() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="education" className="section-base py-16 md:py-24" ref={ref}>
      <div className="max-w-5xl mx-auto px-6">

        <motion.p
          className="label mb-12"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
        >
          Education & Certifications
        </motion.p>

        {EDUCATION.map((edu, i) => (
          <motion.div
            key={edu.institution}
            variants={fadeUp}
            custom={i}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="grid md:grid-cols-[1fr_2fr] gap-6 md:gap-24 py-8 border-t border-ink-100 dark:border-ink-800"
          >
            {/* Left */}
            <div>
              <p className="font-mono text-xs text-ink-400 dark:text-ink-500 mb-1">{edu.period}</p>
              <p className="font-medium text-sm text-ink-900 dark:text-ink-100">{edu.institution}</p>
            </div>

            {/* Right */}
            <div>
              <p className="font-medium text-sm text-ink-900 dark:text-ink-100 mb-0.5">{edu.degree}</p>
              <p className="text-sm text-ink-500 dark:text-ink-400">{edu.track}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
