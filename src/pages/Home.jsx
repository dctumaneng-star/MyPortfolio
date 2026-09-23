import { motion } from "framer-motion";
import PageTransition from "../components/PageTransition";

const TICKER_ITEMS = [
  "Java", "JavaScript", "PHP", "Python",
  "Firebase", "Laravel", "Node.js", "React", "TailwindCSS", "Android Studio", "Flutter",
  "PostgreSQL", "SQL", "Docker", "Kubernetes", "Samba", "Ubuntu Server", "Windows Server", "ADDS"
];
const TICKER_DOUBLE = [...TICKER_ITEMS, ...TICKER_ITEMS];

export default function Home() {
  return (
    <PageTransition className="justify-center pt-8 pb-16 overflow-hidden">
      
      {/* ── High-speed marquee strip (Moved to top for energy) ── */}
      <div className="fade-edges border-b border-line-light dark:border-line-dark pb-4 mb-10 overflow-hidden w-full">
        <div className="ticker-track">
          {TICKER_DOUBLE.map((item, i) => (
            <span key={i} className="inline-flex items-center">
              <span className="font-display text-xl md:text-2xl text-ink dark:text-chalk px-6 whitespace-nowrap tracking-tight">
                {item}
              </span>
              <span className="text-neon font-mono text-sm px-2">✦</span>
            </span>
          ))}
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 w-full flex-1 flex flex-col justify-center">
        <div className="grid lg:grid-cols-[1fr_auto] gap-12 items-end">
          
          {/* Typography & Intro */}
          <div>
            <motion.div
              className="mb-6"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1, duration: 0.6 }}
            >
              <span className="neon-tag">Software Engineer</span>
            </motion.div>

            <h1 className="font-display leading-none text-ink dark:text-chalk mb-0" aria-label="Daryl Tumaneng">
              <div className="overflow-hidden">
                <motion.span
                  className="block text-display-xl"
                  initial={{ y: "105%" }}
                  animate={{ y: "0%" }}
                  transition={{ delay: 0.2, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                >
                  DARYL
                </motion.span>
              </div>
              <div className="overflow-hidden -mt-2 md:-mt-6">
                <motion.span
                  className="block text-display-xl text-stroke text-ink dark:text-chalk"
                  initial={{ y: "105%" }}
                  animate={{ y: "0%" }}
                  transition={{ delay: 0.32, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                >
                  TUMANENG
                </motion.span>
              </div>
            </h1>

            <motion.p
              className="text-base md:text-lg text-ink/70 dark:text-chalk/60 leading-relaxed max-w-xl mt-8 pt-6 border-t border-line-light dark:border-line-dark"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.7 }}
            >
              Self-assured and motivated aspiring software engineer prepared to apply knowledge to real-world projects.
            </motion.p>
          </div>

          {/* Portrait Image */}
          <motion.div 
            className="w-48 h-64 md:w-64 md:h-80 lg:w-72 lg:h-96 relative grayscale hover:grayscale-0 transition-all duration-700 object-cover"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Corner accents for the image */}
            <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-neon z-10" />
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-neon z-10" />
            <img 
              src="/portrait.jpg" 
              alt="Daryl Tumaneng" 
              className="w-full h-full object-cover"
            />
          </motion.div>

        </div>
      </div>
    </PageTransition>
  );
}

