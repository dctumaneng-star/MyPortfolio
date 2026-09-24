import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useRef } from "react";
import PageTransition from "../components/PageTransition";
import DraggableMarquee from "../components/DraggableMarquee";
import { KineticText, TE_EASE } from "../components/KineticText";
import FluidCard from "../components/FluidCard";

const TICKER_ITEMS = [
  "Java", "JavaScript", "PHP", "Python",
  "Firebase", "Laravel", "Node.js", "React", "TailwindCSS", "Android Studio", "Flutter",
  "PostgreSQL", "SQL", "Docker", "Kubernetes", "Samba", "Ubuntu Server", "Windows Server", "ADDS"
];
import { isFirstLoad } from "../utils/firstLoad";

const TICKER_QUAD = [...TICKER_ITEMS, ...TICKER_ITEMS, ...TICKER_ITEMS, ...TICKER_ITEMS];

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

  const delayCascade = 0.4;

  return (
    <PageTransition className="justify-start pt-8 pb-16 overflow-x-hidden lowercase">
      
      {/* ── High-speed marquee strip ── */}
      <motion.div 
        className="fade-edges border-b border-line-light dark:border-line-dark pb-4 mb-10 overflow-hidden w-full shrink-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: delayCascade, duration: 0.8 }}
      >
        <DraggableMarquee items={TICKER_QUAD} baseVelocity={-1} />
      </motion.div>

      <div className="max-w-6xl mx-auto px-6 w-full flex-1 flex flex-col">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-8 lg:gap-12 items-end mb-16">
          
          {/* Typography & Intro */}
          <div>
            <motion.div
              className="mb-8 inline-flex items-center gap-3 liquid-glass px-4 py-2 rounded-full border border-ink/5 dark:border-chalk/10 backdrop-blur-3xl"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: delayCascade, duration: 0.6, ease: TE_EASE }}
            >
              <div className="flex items-center gap-2 pr-3 border-r border-ink/10 dark:border-chalk/10">
                <span className="w-2 h-2 rounded-full bg-neon animate-pulse-dot shadow-[0_0_8px_rgba(57,255,20,0.5)]" />
                <span className="font-mono text-[10px] md:text-xs text-ink/70 dark:text-chalk/80 uppercase tracking-widest">available for opportunities</span>
              </div>
              <div className="flex items-center gap-3 pl-1 font-mono text-[10px] md:text-xs text-ink/50 dark:text-chalk/60 uppercase tracking-widest">
                <span>philippine standard time</span>
                <span className="w-1 h-1 bg-ink/20 dark:bg-chalk/20 rounded-full" />
                <span>plaridel, bulacan</span>
              </div>
            </motion.div>

            <div aria-label="daryl tumaneng">
              <KineticText 
                text="daryl" 
                className="font-display font-medium leading-none text-5xl sm:text-7xl md:text-8xl lg:text-[8rem] tracking-tighter text-ink dark:text-chalk mb-0" 
                delay={isFirstLoad ? 0.8 : 0.1} 
              />
              <KineticText 
                text="tumaneng." 
                className="font-display font-medium leading-none text-5xl sm:text-7xl md:text-8xl lg:text-[8rem] tracking-tighter text-stroke text-ink dark:text-chalk mb-0" 
                delay={isFirstLoad ? 0.92 : 0.2} 
              />
            </div>

            <motion.p
              className="font-display text-xl md:text-2xl text-ink dark:text-chalk/90 leading-snug max-w-2xl mt-8 pt-8 border-t border-line-light dark:border-line-dark lowercase"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: delayCascade + 0.1, duration: 0.7, ease: TE_EASE }}
            >
              self-assured and motivated aspiring software engineer prepared to apply knowledge to real-world projects.
            </motion.p>
          </div>

          {/* Abstract Hero Artwork */}
          <motion.div 
            style={{ y: yParallaxImage }}
            className="w-48 h-64 md:w-64 md:h-80 lg:w-72 lg:h-96 relative shrink-0 flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: delayCascade + 0.2, duration: 1.2, ease: TE_EASE }}
          >
            {/* Fluid glowing orb */}
            <motion.div 
              className="absolute w-3/4 h-3/4 rounded-full bg-neon mix-blend-screen blur-[40px] opacity-40 dark:opacity-20"
              animate={{
                scale: [1, 1.2, 0.9, 1.1, 1],
                rotate: [0, 90, 180, 270, 360],
                borderRadius: ["50%", "40% 60% 70% 30%", "30% 70% 40% 60%", "50%"]
              }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            />
            {/* Spinning Wireframe Core */}
            <motion.div 
              className="absolute w-1/2 h-1/2 rounded-full border border-ink/20 dark:border-chalk/20"
              animate={{ rotateX: [0, 360], rotateY: [0, 360] }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              style={{ transformStyle: "preserve-3d" }}
            >
              <motion.div 
                className="absolute inset-0 rounded-full border border-ink/10 dark:border-chalk/10" 
                style={{ transform: "rotateX(90deg)" }} 
              />
              <motion.div 
                className="absolute inset-0 rounded-full border border-ink/10 dark:border-chalk/10" 
                style={{ transform: "rotateY(90deg)" }} 
              />
            </motion.div>
          </motion.div>

        </div>

        {/* ── Short Containers (Bento Box) ── */}
        <motion.div 
          layout
          transition={{ layout: { type: "spring", stiffness: 100, damping: 20 } }}
          style={{ y: yParallaxBento }}
          variants={bentoContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, margin: "-15%" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6 w-full"
        >
          {/* Card 1: Beyond the Code */}
          <FluidCard layout transition={{ layout: { type: "spring", stiffness: 100, damping: 20 } }} variants={bentoItem} className="liquid-glass p-8 md:p-10 flex flex-col justify-between min-h-[240px] group transition-colors duration-300">
             
             <span className="mono-label block mb-6 lowercase">beyond the code</span>
             
             <ul className="space-y-4 font-display text-xl md:text-2xl text-ink dark:text-chalk/90 tracking-tight lowercase">
               <li className="flex items-center gap-4">
                 <span className="w-1.5 h-1.5 rounded-full bg-neon/80" /> full-stack developer.
               </li>
               <li className="flex items-center gap-4">
                 <span className="w-1.5 h-1.5 rounded-full bg-neon/80" /> bare-metal linux builder.
               </li>
               <li className="flex items-center gap-4">
                 <span className="w-1.5 h-1.5 rounded-full bg-neon/80" /> electronic music producer.
               </li>
               <li className="flex items-center gap-4">
                 <span className="w-1.5 h-1.5 rounded-full bg-neon/80" /> pickleball player.
               </li>
             </ul>
          </FluidCard>

          {/* Card 2: Site Architecture */}
          <FluidCard layout transition={{ layout: { type: "spring", stiffness: 100, damping: 20 } }} variants={bentoItem} className="liquid-glass grain-overlay p-8 md:p-10 flex flex-col justify-between min-h-[240px] group transition-colors duration-300">
             
             
             <div className="flex justify-between items-start mb-6">
                <span className="mono-label block lowercase">site architecture</span>
                <span className="font-mono text-[10px] text-ink/40 dark:text-chalk/40 uppercase tracking-widest border border-ink/10 dark:border-chalk/10 px-2 py-1 rounded-sm">spec v1.0</span>
             </div>

             <div className="font-mono text-xs sm:text-sm text-ink/70 dark:text-chalk/70 leading-relaxed uppercase tracking-wider space-y-4">
               <div className="grid grid-cols-1 sm:grid-cols-3 border-b border-ink/10 dark:border-chalk/10 pb-2 gap-2 sm:gap-0">
                 <span className="col-span-1 opacity-50">framework</span>
                 <span className="col-span-1 sm:col-span-2 font-semibold text-ink dark:text-chalk">react.js</span>
               </div>
               <div className="grid grid-cols-1 sm:grid-cols-3 border-b border-ink/10 dark:border-chalk/10 pb-2 gap-2 sm:gap-0">
                 <span className="col-span-1 opacity-50">styling</span>
                 <span className="col-span-1 sm:col-span-2 font-semibold text-ink dark:text-chalk">tailwind css</span>
               </div>
               <div className="grid grid-cols-1 sm:grid-cols-3 border-b border-ink/10 dark:border-chalk/10 pb-2 gap-2 sm:gap-0">
                 <span className="col-span-1 opacity-50">physics</span>
                 <span className="col-span-1 sm:col-span-2 font-semibold text-ink dark:text-chalk">framer motion</span>
               </div>
               <div className="grid grid-cols-1 sm:grid-cols-3 pb-2 gap-2 sm:gap-0">
                 <span className="col-span-1 opacity-50">routing</span>
                 <span className="col-span-1 sm:col-span-2 font-semibold text-ink dark:text-chalk">react router dom</span>
               </div>
             </div>
          </FluidCard>
        </motion.div>

        {/* Navigation Tiles (The Bottom Bento) */}
        <motion.div
          style={{ y: yParallaxBento }}
          variants={bentoContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, margin: "-15%" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6 w-full mt-12 lg:mt-24"
        >
          {["About", "Projects", "Contact"].map((page) => (
            <FluidCard
              as={Link}
              key={page}
              to={`/${page.toLowerCase()}`}
              className="liquid-glass p-8 md:p-10 flex flex-col justify-between min-h-[200px] group transition-colors duration-300 cursor-none"
              data-hover="true"
              variants={bentoItem}
            >
              <div className="flex justify-between items-start">
                <span className="mono-label block lowercase">navigate</span>
                <div className="overflow-hidden">
                  <ArrowUpRight size={24} className="text-ink/30 dark:text-chalk/30 group-hover:text-neon transition-colors duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                </div>
              </div>
              <span className="font-display font-medium text-4xl text-ink dark:text-chalk tracking-tight lowercase mt-8 block transition-colors duration-300 group-hover:text-neon">
                {page}
              </span>
            </FluidCard>
          ))}
        </motion.div>

      </div>
    </PageTransition>
  );
}
