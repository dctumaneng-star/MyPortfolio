import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import PageTransition from "../components/PageTransition";
import { KineticText, TE_EASE } from "../components/KineticText";
import { isFirstLoad } from "../utils/firstLoad";
import FluidCard from "../components/FluidCard";

export default function Contact() {
  const { scrollYProgress } = useScroll();
  const yParallax = useTransform(scrollYProgress, [0, 1], [0, -40]);

  const delayCascade = isFirstLoad ? 1.8 : 0.1;

  return (
    <PageTransition className="pt-8 pb-16 justify-center lowercase">
      <motion.div style={{ y: yParallax }} className="max-w-6xl mx-auto px-6 w-full flex-1 flex flex-col justify-center">
        
        <div className="overflow-hidden mb-6">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: delayCascade, duration: 0.6, ease: TE_EASE }}
          >
            <span className="neon-tag lowercase">open for opportunities</span>
          </motion.div>
        </div>

        <div className="mb-12">
          <KineticText text="let's build" className="font-display font-medium text-5xl sm:text-7xl md:text-8xl lg:text-[8rem] tracking-tighter leading-none text-ink dark:text-chalk mb-2 md:mb-0" delay={delayCascade + 0.1} />
          <KineticText text="something" className="font-display font-medium text-5xl sm:text-7xl md:text-8xl lg:text-[8rem] tracking-tighter leading-none text-stroke text-ink dark:text-chalk mb-2 md:mb-0" delay={delayCascade + 0.2} />
          <KineticText text="great." className="font-display font-medium text-5xl sm:text-7xl md:text-8xl lg:text-[8rem] tracking-tighter leading-none text-ink dark:text-chalk" delay={delayCascade + 0.3} />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: delayCascade + 0.5, duration: 0.7, ease: TE_EASE }}
        >
          <FluidCard
            as="a"
            href="mailto:dctumaneng13@gmail.com"
            className="group inline-flex items-center gap-6 liquid-glass px-8 md:px-12 py-6 md:py-8 transition-colors duration-300 cursor-none w-fit"
            data-hover="true"
          >
            <span className="font-display font-medium text-3xl md:text-5xl text-ink dark:text-chalk transition-colors duration-150 relative z-20">
              initiate contact
            </span>
            <div className="overflow-hidden z-20 relative">
              <ArrowUpRight size={40} className="text-ink dark:text-chalk group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300" />
            </div>
          </FluidCard>
        </motion.div>

        <motion.div 
          className="mt-20 pt-8 border-t border-line-light dark:border-line-dark grid grid-cols-1 md:grid-cols-3 gap-8"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: delayCascade + 0.7, duration: 0.7, ease: TE_EASE }}
        >
          <div>
            <p className="mono-label mb-2">email</p>
            <p className="font-mono text-ink dark:text-chalk">dctumaneng13@gmail.com</p>
          </div>
          <div>
            <p className="mono-label mb-2">phone</p>
            <p className="font-mono text-ink dark:text-chalk">0969-596-7105</p>
          </div>
          <div>
            <p className="mono-label mb-2">location</p>
            <p className="font-mono text-ink dark:text-chalk">rocka village, tabang, plaridel, bulacan</p>
          </div>
        </motion.div>

      </motion.div>
    </PageTransition>
  );
}
