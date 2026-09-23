import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  }),
};

export default function Hero() {
  return (
    <section
      id="about"
      className="section-base pt-28 pb-16 md:pt-36 md:pb-24"
    >
      <div className="max-w-5xl mx-auto px-6">
        <div className="grid md:grid-cols-[1fr_2fr] gap-12 md:gap-24 items-start">

          {/* Left — identity */}
          <motion.div
            variants={fadeUp}
            custom={0}
            initial="hidden"
            animate="visible"
          >
            <p className="label mb-3">Web Developer</p>
            <h1 className="font-sans font-semibold text-3xl md:text-4xl leading-tight tracking-tightest text-ink-900 dark:text-ink-50">
              Daryl<br />Tumaneng.
            </h1>
          </motion.div>

          {/* Right — statement */}
          <motion.div
            variants={fadeUp}
            custom={1}
            initial="hidden"
            animate="visible"
          >
            <p className="text-ink-700 dark:text-ink-300 text-base md:text-lg font-light leading-relaxed mb-6 text-balance">
              Self-assured and motivated aspiring software engineer prepared to apply
              knowledge to real-world projects. Trained in Web and Mobile Application
              Development from the University of Santo Tomas.
            </p>
            <div className="flex flex-col gap-1 font-mono text-xs text-ink-400 dark:text-ink-500">
              <span>0969-596-7105</span>
              <a href="mailto:dctumaneng13@gmail.com" className="link-bare">dctumaneng13@gmail.com</a>
              <span>Rocka Village, Tabang, Plaridel, Bulacan</span>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
