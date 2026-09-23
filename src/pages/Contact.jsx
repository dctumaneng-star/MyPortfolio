import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import PageTransition from "../components/PageTransition";

export default function Contact() {
  return (
    <PageTransition className="pt-8 pb-16 justify-center">
      <div className="max-w-6xl mx-auto px-6 w-full flex-1 flex flex-col justify-center">
        
        <div className="overflow-hidden mb-6">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
          >
            <span className="neon-tag">Open for Opportunities</span>
          </motion.div>
        </div>

        <div className="mb-12">
          {["LET'S BUILD", "SOMETHING", "GREAT."].map((line, i) => (
            <div key={i} className="overflow-hidden">
              <motion.h1
                className={`font-display text-display-xl leading-none ${i === 1 ? 'text-stroke text-ink dark:text-chalk' : 'text-ink dark:text-chalk'}`}
                initial={{ y: "105%" }}
                animate={{ y: "0%" }}
                transition={{ delay: 0.2 + i * 0.1, duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
              >
                {line}
              </motion.h1>
            </div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <a
            href="mailto:dctumaneng13@gmail.com"
            className="group inline-flex items-center gap-4 border border-line-light dark:border-line-dark px-8 py-6 hover:border-neon dark:hover:border-neon transition-colors duration-300 relative overflow-hidden"
          >
            <motion.div
              className="absolute top-0 left-0 h-full bg-neon z-0"
              initial={{ width: "0%" }}
              whileHover={{ width: "100%" }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            />
            <span className="font-display text-3xl md:text-5xl text-ink dark:text-chalk group-hover:text-void transition-colors duration-300 relative z-10">
              SAY HELLO
            </span>
            <ArrowUpRight size={32} className="text-ink dark:text-chalk group-hover:text-void transition-colors duration-300 relative z-10" />
          </a>
        </motion.div>

        <motion.div 
          className="mt-16 pt-8 border-t border-line-light dark:border-line-dark grid md:grid-cols-2 gap-8"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.7 }}
        >
          <div>
            <p className="mono-label mb-2">Location</p>
            <p className="font-mono text-sm text-ink/70 dark:text-chalk/60">
              Rocka Village, Tabang, Plaridel, Bulacan
            </p>
          </div>
          <div>
            <p className="mono-label mb-2">Phone</p>
            <p className="font-mono text-sm text-ink/70 dark:text-chalk/60">
              0969-596-7105
            </p>
          </div>
        </motion.div>

      </div>
    </PageTransition>
  );
}

