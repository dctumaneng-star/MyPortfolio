import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import PageTransition from "../components/PageTransition";

const TICKER_ITEMS = [
  "Java", "JavaScript", "PHP", "Python",
  "Firebase", "Laravel", "Node.js", "React", "TailwindCSS", "Android Studio", "Flutter",
  "PostgreSQL", "SQL", "Docker", "Kubernetes", "Samba", "Ubuntu Server", "Windows Server", "ADDS"
];
const TICKER_DOUBLE = [...TICKER_ITEMS, ...TICKER_ITEMS];

export default function Home() {
  return (
    <PageTransition className="justify-start pt-8 pb-16 overflow-x-hidden">
      
      {/* ── High-speed marquee strip ── */}
      <div className="fade-edges border-b border-line-light dark:border-line-dark pb-4 mb-10 overflow-hidden w-full shrink-0">
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

      <div className="max-w-6xl mx-auto px-6 w-full flex-1 flex flex-col">
        <div className="grid lg:grid-cols-[1fr_auto] gap-12 items-end mb-16">
          
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
            className="w-48 h-64 md:w-64 md:h-80 lg:w-72 lg:h-96 relative grayscale hover:grayscale-0 transition-all duration-700 object-cover shrink-0"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-neon z-10" />
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-neon z-10" />
            <img 
              src="/portrait.jpg" 
              alt="Daryl Tumaneng" 
              className="w-full h-full object-cover"
            />
          </motion.div>

        </div>

        {/* ── Short Containers (Bento Box) ── */}
        <motion.div 
          className="grid md:grid-cols-3 gap-4 lg:gap-6 w-full"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.7 }}
        >
          {/* Card 1: Status */}
          <div className="border border-line-light dark:border-line-dark p-6 bg-chalk dark:bg-void flex flex-col justify-between min-h-[160px] group hover:border-neon dark:hover:border-neon transition-colors duration-300 relative overflow-hidden">
             <div className="absolute top-0 left-0 h-px bg-neon w-0 group-hover:w-full transition-all duration-500 ease-out" />
             <div>
                <span className="mono-label block mb-3">Current Status</span>
                <p className="font-medium text-ink dark:text-chalk">Actively looking for full-time opportunities & internships.</p>
             </div>
             <div className="flex items-center gap-2 mt-4">
                <span className="w-2 h-2 rounded-full bg-neon animate-pulse-dot" />
                <span className="font-mono text-xs text-ink/50 dark:text-chalk/40 uppercase tracking-wider">Available</span>
             </div>
          </div>

          {/* Card 2: Quick Nav - Projects */}
          <Link to="/projects" className="border border-line-light dark:border-line-dark p-6 bg-chalk dark:bg-void flex flex-col justify-between min-h-[160px] group hover:border-neon dark:hover:border-neon transition-colors duration-300 relative overflow-hidden cursor-none" data-hover="true">
             <div className="absolute top-0 left-0 h-px bg-neon w-0 group-hover:w-full transition-all duration-500 ease-out" />
             <div className="flex justify-between items-start">
               <span className="mono-label block mb-3">Featured Work</span>
               <ArrowUpRight size={20} className="text-ink/30 dark:text-chalk/20 group-hover:text-neon transition-colors duration-300" />
             </div>
             <h3 className="font-display text-3xl text-ink dark:text-chalk leading-none uppercase">
                View Projects
             </h3>
          </Link>

          {/* Card 3: Tech Focus */}
          <div className="border border-line-light dark:border-line-dark p-6 bg-chalk dark:bg-void flex flex-col justify-between min-h-[160px] group hover:border-neon dark:hover:border-neon transition-colors duration-300 relative overflow-hidden">
             <div className="absolute top-0 left-0 h-px bg-neon w-0 group-hover:w-full transition-all duration-500 ease-out" />
             <span className="mono-label block mb-3">Core Stack</span>
             <div className="flex flex-wrap gap-2 mt-auto">
               {["React", "Laravel", "TailwindCSS"].map(tech => (
                 <span key={tech} className="neon-tag !py-1 !px-2 !text-[10px]">{tech}</span>
               ))}
             </div>
          </div>
        </motion.div>

      </div>
    </PageTransition>
  );
}
