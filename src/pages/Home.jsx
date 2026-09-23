import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useRef } from "react";
import PageTransition from "../components/PageTransition";
import DraggableMarquee from "../components/DraggableMarquee";
import { KineticText, TE_EASE } from "../components/KineticText";

const TICKER_ITEMS = [
  "Java", "JavaScript", "PHP", "Python",
  "Firebase", "Laravel", "Node.js", "React", "TailwindCSS", "Android Studio", "Flutter",
  "PostgreSQL", "SQL", "Docker", "Kubernetes", "Samba", "Ubuntu Server", "Windows Server", "ADDS"
];
const TICKER_QUAD = [...TICKER_ITEMS, ...TICKER_ITEMS, ...TICKER_ITEMS, ...TICKER_ITEMS];

let isFirstLoad = true;

const bentoContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const bentoItem = {
  hidden: { y: 40, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { duration: 0.6, ease: TE_EASE } }
};

export default function Home() {
  const { scrollYProgress } = useScroll();
  const yParallaxBento = useTransform(scrollYProgress, [0, 1], [0, -40]);
  const yParallaxImage = useTransform(scrollYProgress, [0, 1], [0, 40]);

  useEffect(() => {
    const timer = setTimeout(() => {
      isFirstLoad = false;
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const delayCascade = isFirstLoad ? 1.8 : 0.4;

  return (
    <PageTransition className="justify-start pt-8 pb-16 overflow-x-hidden lowercase">
      
      {/* ── High-speed marquee strip ── */}
      <motion.div 
        className="fade-edges border-b border-line-light dark:border-line-dark pb-4 mb-10 overflow-hidden w-full shrink-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: delayCascade, duration: 0.8 }}
      >
        <DraggableMarquee items={TICKER_QUAD} baseVelocity={-0.04} />
      </motion.div>

      <div className="max-w-6xl mx-auto px-6 w-full flex-1 flex flex-col">
        <div className="grid lg:grid-cols-[1fr_auto] gap-12 items-end mb-16">
          
          {/* Typography & Intro */}
          <div>
            <motion.div
              className="mb-6"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: delayCascade, duration: 0.6, ease: TE_EASE }}
            >
              <span className="neon-tag lowercase">software engineer</span>
            </motion.div>

            <div aria-label="daryl tumaneng">
              <KineticText 
                text="daryl" 
                className="font-display font-medium leading-[0.8] text-display-xl text-ink dark:text-chalk mb-0" 
                delay={isFirstLoad ? 0.8 : 0.1} 
              />
              <KineticText 
                text="tumaneng" 
                className="font-display font-medium leading-[0.8] text-display-xl text-stroke text-ink dark:text-chalk -mt-2 md:-mt-6 mb-0" 
                delay={isFirstLoad ? 0.92 : 0.2} 
              />
            </div>

            <motion.p
              className="text-base md:text-lg text-ink/70 dark:text-chalk/60 leading-relaxed max-w-xl mt-8 pt-6 border-t border-line-light dark:border-line-dark"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: delayCascade + 0.1, duration: 0.7, ease: TE_EASE }}
            >
              full-stack developer. bare-metal linux builder. electronic music producer. pickleball player.
            </motion.p>
          </div>

          {/* Portrait Image */}
          <motion.div 
            style={{ y: yParallaxImage }}
            className="w-48 h-64 md:w-64 md:h-80 lg:w-72 lg:h-96 relative grayscale hover:grayscale-0 transition-all duration-150 object-cover shrink-0"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: delayCascade + 0.2, duration: 0.8, ease: TE_EASE }}
          >
            <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-neon z-10" />
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-neon z-10" />
            <img 
              src="/portrait.jpg" 
              alt="daryl tumaneng" 
              className="w-full h-full object-cover"
            />
          </motion.div>

        </div>

        {/* ── Short Containers (Bento Box) ── */}
        <motion.div 
          style={{ y: yParallaxBento }}
          variants={bentoContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-15%" }}
          className="grid md:grid-cols-3 gap-4 lg:gap-6 w-full"
        >
          {/* Card 1: Status */}
          <motion.div variants={bentoItem} className="border border-line-light dark:border-line-dark p-6 bg-chalk dark:bg-void flex flex-col justify-between min-h-[160px] group hover:border-neon dark:hover:border-neon transition-colors duration-150 relative overflow-hidden">
             <div className="absolute top-0 left-0 h-px bg-neon w-0 group-hover:w-full transition-all duration-150 ease-out" />
             <div>
                <span className="mono-label block mb-3 lowercase">current status</span>
                <p className="font-body font-medium text-ink dark:text-chalk">actively looking for full-time opportunities & internships.</p>
             </div>
             <div className="flex items-center gap-2 mt-4">
                <span className="w-2 h-2 rounded-full bg-neon animate-pulse-dot" />
                <span className="font-mono text-xs text-ink/50 dark:text-chalk/40 uppercase tracking-wider lowercase">available</span>
             </div>
          </motion.div>

          {/* Card 2: Quick Nav - Projects */}
          <motion.div variants={bentoItem}>
            <Link to="/projects" className="border border-line-light dark:border-line-dark p-6 bg-chalk dark:bg-void flex flex-col justify-between min-h-[160px] group hover:bg-neon dark:hover:bg-neon hover:border-neon dark:hover:border-neon transition-colors duration-150 relative overflow-hidden cursor-none" data-hover="true">
               <div className="flex justify-between items-start">
                 <span className="mono-label block mb-3 lowercase group-hover:text-void transition-colors duration-150">featured work</span>
                 <ArrowUpRight size={24} className="text-ink/30 dark:text-chalk/20 group-hover:text-void group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-150" />
               </div>
               <h3 className="font-display font-medium text-3xl text-ink dark:text-chalk group-hover:text-void leading-none lowercase transition-colors duration-150">
                  view projects
               </h3>
            </Link>
          </motion.div>

          {/* Card 3: Tech Focus */}
          <motion.div variants={bentoItem} className="border border-line-light dark:border-line-dark p-6 bg-chalk dark:bg-void flex flex-col justify-between min-h-[160px] group hover:border-neon dark:hover:border-neon transition-colors duration-150 relative overflow-hidden">
             <div className="absolute top-0 left-0 h-px bg-neon w-0 group-hover:w-full transition-all duration-150 ease-out" />
             <span className="mono-label block mb-3 lowercase">core stack</span>
             <div className="flex flex-wrap gap-2 mt-auto">
               {["React", "Laravel", "TailwindCSS"].map(tech => (
                 <span key={tech} className="neon-tag !py-1 !px-2 !text-[10px] lowercase group-hover:bg-void group-hover:text-neon transition-colors duration-150">{tech}</span>
               ))}
             </div>
          </motion.div>

          {/* Card 4: Short Info / Beyond the Code */}
          <motion.div variants={bentoItem} className="md:col-span-3 border border-line-light dark:border-line-dark p-6 md:p-8 bg-chalk dark:bg-void flex flex-col justify-between group hover:border-neon dark:hover:border-neon transition-colors duration-150 relative overflow-hidden">
             <div className="absolute top-0 left-0 h-px bg-neon w-0 group-hover:w-full transition-all duration-150 ease-out" />
             <span className="mono-label block mb-4 lowercase">short info</span>
             <p className="font-body text-sm md:text-base text-ink/70 dark:text-chalk/60 leading-relaxed max-w-4xl lowercase">
               self-assured and motivated aspiring software engineer prepared to apply knowledge to real-world projects.
             </p>
          </motion.div>
        </motion.div>

      </div>
    </PageTransition>
  );
}
