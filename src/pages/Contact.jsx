import { useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import PageTransition from "../components/PageTransition";
import { KineticText, TE_EASE } from "../components/KineticText";
import { isFirstLoad } from "../utils/firstLoad";
import FluidCard from "../components/FluidCard";

export default function Contact() {
  const [status, setStatus] = useState("idle"); // idle, loading, success, error
  const { scrollYProgress } = useScroll();
  const yParallax = useTransform(scrollYProgress, [0, 1], [0, -40]);

  const delayCascade = isFirstLoad ? 1.8 : 0.1;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    
    const formData = new FormData(e.target);
    // Hardcode Web3Forms URL as requested for plugging in API key
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });
      
      if (res.ok) {
        setStatus("success");
        e.target.reset();
        setTimeout(() => setStatus("idle"), 3000);
      } else {
        setStatus("error");
        setTimeout(() => setStatus("idle"), 3000);
      }
    } catch (err) {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3000);
    }
  };

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

        {/* Liquid Glass Contact Form */}
        <motion.form
          onSubmit={handleSubmit}
          className="w-full max-w-2xl mt-8 grid gap-6"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: delayCascade + 0.5, duration: 0.7, ease: TE_EASE }}
        >
          {/* Web3Forms Access Key */}
          <input type="hidden" name="access_key" value="YOUR_WEB3FORMS_ACCESS_KEY" />
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="group flex flex-col gap-2 relative">
              <label htmlFor="name" className="mono-label ml-2">full name</label>
              <input 
                type="text" 
                name="name" 
                id="name" 
                required 
                className="w-full liquid-glass border border-line-light dark:border-line-dark rounded-2xl px-6 py-4 outline-none focus:border-neon dark:focus:border-neon transition-colors duration-300 font-body text-ink dark:text-chalk placeholder:text-ink/30 dark:placeholder:text-chalk/30 shadow-inner"
                placeholder="john doe"
              />
            </div>
            
            <div className="group flex flex-col gap-2 relative">
              <label htmlFor="email" className="mono-label ml-2">email address</label>
              <input 
                type="email" 
                name="email" 
                id="email" 
                required 
                className="w-full liquid-glass border border-line-light dark:border-line-dark rounded-2xl px-6 py-4 outline-none focus:border-neon dark:focus:border-neon transition-colors duration-300 font-body text-ink dark:text-chalk placeholder:text-ink/30 dark:placeholder:text-chalk/30 shadow-inner"
                placeholder="john@example.com"
              />
            </div>
          </div>

          <div className="group flex flex-col gap-2 relative">
            <label htmlFor="subject" className="mono-label ml-2">subject</label>
            <input 
              type="text" 
              name="subject" 
              id="subject" 
              required 
              className="w-full liquid-glass border border-line-light dark:border-line-dark rounded-2xl px-6 py-4 outline-none focus:border-neon dark:focus:border-neon transition-colors duration-300 font-body text-ink dark:text-chalk placeholder:text-ink/30 dark:placeholder:text-chalk/30 shadow-inner"
              placeholder="project inquiry"
            />
          </div>

          <div className="group flex flex-col gap-2 relative">
            <label htmlFor="message" className="mono-label ml-2">message</label>
            <textarea 
              name="message" 
              id="message" 
              required 
              rows={4}
              className="w-full liquid-glass border border-line-light dark:border-line-dark rounded-2xl px-6 py-4 outline-none focus:border-neon dark:focus:border-neon transition-colors duration-300 font-body text-ink dark:text-chalk placeholder:text-ink/30 dark:placeholder:text-chalk/30 shadow-inner resize-none"
              placeholder="tell me about your project..."
            />
          </div>

          <FluidCard
            as="button"
            type="submit"
            disabled={status === "loading"}
            className="group mt-4 flex items-center justify-center gap-4 liquid-glass rounded-2xl border border-line-light dark:border-line-dark px-8 py-5 transition-colors duration-300 hover:bg-neon dark:hover:bg-neon hover:border-neon dark:hover:border-neon cursor-none w-full md:w-auto self-start"
            data-hover="true"
          >
            <span className="font-display font-medium text-2xl text-ink dark:text-chalk group-hover:text-void transition-colors duration-300 relative z-20">
              {status === "idle" && "send transmission"}
              {status === "loading" && "initiating..."}
              {status === "success" && "transmission sent"}
              {status === "error" && "error. retry?"}
            </span>
            {status === "idle" && (
              <div className="overflow-hidden z-20 relative text-ink dark:text-chalk group-hover:text-void transition-colors duration-300">
                <ArrowUpRight size={28} className="group-hover:translate-x-1.5 group-hover:-translate-y-1.5 transition-all duration-300" />
              </div>
            )}
          </FluidCard>
        </motion.form>

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
