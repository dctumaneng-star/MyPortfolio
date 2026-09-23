import { motion } from "framer-motion";

/**
 * Baseline — the "ultimate" persistent footer.
 * Grounded by a single top hairline.
 * Contains: availability · copyright · social links.
 */
export default function Baseline() {
  return (
    <motion.footer
      initial={{ y: "100%" }}
      animate={{ y: "0%" }}
      transition={{ delay: 1.8, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="fixed bottom-0 left-0 right-0 z-50
                 bg-chalk dark:bg-void
                 border-t border-line-light dark:border-line-dark
                 transition-colors duration-300"
    >
      <div className="max-w-6xl mx-auto px-6 h-12 flex items-center justify-between gap-4">

        {/* Status */}
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-neon animate-pulse-dot" />
          <span
            className="font-mono hidden sm:inline"
            style={{ fontSize: "0.6rem", letterSpacing: "0.2em", color: "#707070", textTransform: "uppercase" }}
          >
            AVAILABLE
          </span>
        </div>

        {/* Copyright */}
        <span
          className="font-mono text-ink/40 dark:text-chalk/30"
          style={{ fontSize: "0.6rem", letterSpacing: "0.12em", textTransform: "uppercase" }}
        >
          DARYL TUMANENG, 2026
        </span>

        {/* Socials */}
        <nav className="flex items-center gap-5">
          {[
            { label: "LinkedIn", href: "https://linkedin.com/in/daryl-tumaneng-a594a1196" },
            { label: "GitHub",   href: "https://github.com/daryltumaneng" },
          ].map(({ label, href }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono hover:text-neon transition-colors duration-200"
              style={{ fontSize: "0.6rem", letterSpacing: "0.2em", textTransform: "uppercase",
                       color: "inherit", opacity: 0.4 }}
            >
              {label}
            </a>
          ))}
        </nav>

      </div>
    </motion.footer>
  );
}
