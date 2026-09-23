import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import PageTransition from "../components/PageTransition";

export default function Contact() {
  return (
    <PageTransition className="pt-8 pb-16 justify-center lowercase">
      <div className="max-w-6xl mx-auto px-6 w-full flex-1 flex flex-col justify-center">
        
        <div className="overflow-hidden mb-6">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
          >
            <span className="neon-tag lowercase">open for opportunities</span>
          </motion.div>
        </div>

        <div className="mb-12">
          {["let's build", "something", "great."].map((line, i) => (
            <div key={i} className="overflow-hidden">
              <motion.h1
                className={`font-display font-medium text-display-xl leading-none ${i === 1 ? 'text-stroke text-ink dark:text-chalk' : 'text-ink dark:text-chalk'}`}
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
          <motion.a
            href="mailto:dctumaneng13@gmail.com"
            whileTap={{ scale: 0.97 }}
            className="group inline-flex items-center gap-6 border-2 border-ink dark:border-chalk px-8 md:px-12 py-6 md:py-8 bg-chalk dark:bg-void hover:bg-neon dark:hover:bg-neon hover:border-neon dark:hover:border-neon transition-all duration-300 relative overflow-hidden cursor-none shadow-[6px_6px_0px_0px_rgba(10,10,10,1)] dark:shadow-[6px_6px_0px_0px_rgba(245,245,243,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[4px_4px_0px_0px_rgba(200,255,0,1)] dark:hover:shadow-[4px_4px_0px_0px_rgba(200,255,0,1)] active:translate-x-[6px] active:translate-y-[6px] active:shadow-none"
            data-hover="true"
          >
            <span className="font-display font-medium text-3xl md:text-5xl text-ink dark:text-chalk group-hover:text-void transition-colors duration-300 relative z-10">
              initiate contact
            </span>
            <ArrowUpRight size={40} className="text-ink dark:text-chalk group-hover:text-void transition-colors duration-300 relative z-10" />
          </motion.a>
        </motion.div>

        <motion.div 
          className="mt-20 pt-8 border-t border-line-light dark:border-line-dark grid grid-cols-1 md:grid-cols-3 gap-8"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.7 }}
        >
          <div>
            <p className="mono-label mb-2">email</p>
            <p className="font-mono text-sm text-ink/70 dark:text-chalk/60 lowercase">
              dctumaneng13@gmail.com
            </p>
          </div>
          <div>
            <p className="mono-label mb-2">phone</p>
            <p className="font-mono text-sm text-ink/70 dark:text-chalk/60 lowercase">
              0969-596-7105
            </p>
          </div>
          <div>
            <p className="mono-label mb-2">location</p>
            <p className="font-mono text-sm text-ink/70 dark:text-chalk/60 lowercase">
              rocka village, tabang, plaridel, bulacan
            </p>
          </div>
        </motion.div>

      </div>
    </PageTransition>
  );
}
