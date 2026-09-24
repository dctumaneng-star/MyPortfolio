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
        <div className="grid lg:grid-cols-[1fr_auto] gap-12 items-end mb-16">
          
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
                className="font-display font-medium leading-none text-display-xl text-ink dark:text-chalk mb-0" 
                delay={isFirstLoad ? 0.8 : 0.1} 
              />
              <KineticText 
                text="tumaneng." 
                className="font-display font-medium leading-none text-display-xl text-stroke text-ink dark:text-chalk mb-0" 
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

          {/* Portrait Image */}
          <motion.div 
            style={{ y: yParallaxImage }}
            className="w-48 h-64 md:w-64 md:h-80 lg:w-72 lg:h-96 relative transition-all duration-150 object-cover shrink-0"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: delayCascade + 0.2, duration: 0.8, ease: TE_EASE }}
          >
            <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-neon z-10" />
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-neon z-10" />
            <img 
              src="/portrait.jpg" 
              alt="daryl tumaneng." 
              className="w-full h-full object-cover"
            />
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
          className="grid md:grid-cols-2 gap-4 lg:gap-6 w-full"
        >
          {/* Card 1: Beyond the Code */}
          <FluidCard layout transition={{ layout: { type: "spring", stiffness: 100, damping: 20 } }} variants={bentoItem} className="liquid-glass p-8 md:p-10 flex flex-col justify-between min-h-[240px] group transition-colors duration-300">
             <div className="absolute top-0 left-0 h-px bg-neon w-0 group-hover:w-full transition-all duration-300 ease-out" />
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
             <div className="absolute top-0 left-0 h-px bg-neon w-0 group-hover:w-full transition-all duration-300 ease-out" />
             
             <div className="flex justify-between items-start mb-6">
                <span className="mono-label block lowercase">site architecture</span>
                <span className="font-mono text-[10px] text-ink/40 dark:text-chalk/40 uppercase tracking-widest border border-ink/10 dark:border-chalk/10 px-2 py-1 rounded-sm">spec v1.0</span>
             </div>

             <div className="font-mono text-sm text-ink/70 dark:text-chalk/70 leading-relaxed uppercase tracking-wider space-y-4">
               <div className="grid grid-cols-3 border-b border-ink/10 dark:border-chalk/10 pb-2">
                 <span className="col-span-1 opacity-50">framework</span>
                 <span className="col-span-2 font-semibold text-ink dark:text-chalk">react.js</span>
               </div>
               <div className="grid grid-cols-3 border-b border-ink/10 dark:border-chalk/10 pb-2">
                 <span className="col-span-1 opacity-50">styling</span>
                 <span className="col-span-2 font-semibold text-ink dark:text-chalk">tailwind css</span>
               </div>
               <div className="grid grid-cols-3 border-b border-ink/10 dark:border-chalk/10 pb-2">
                 <span className="col-span-1 opacity-50">physics</span>
                 <span className="col-span-2 font-semibold text-ink dark:text-chalk">framer motion</span>
               </div>
               <div className="grid grid-cols-3 pb-2">
                 <span className="col-span-1 opacity-50">routing</span>
                 <span className="col-span-2 font-semibold text-ink dark:text-chalk">react router dom</span>
               </div>
             </div>
          </FluidCard>
        </motion.div>

      </div>
    </PageTransition>
  );
}
