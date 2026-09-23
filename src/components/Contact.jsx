import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Send, Mail, GitBranch, Link2, ArrowRight } from "lucide-react";

const SOCIALS = [
  { icon: <GitBranch size={16} />, label: "GitHub", handle: "@daryltumaneng", href: "#" },
  { icon: <Link2 size={16} />, label: "LinkedIn", handle: "Daryl Cruz Tumaneng", href: "#" },
  { icon: <Mail size={16} />, label: "Email", handle: "daryl@example.com", href: "mailto:daryl@example.com" },
];

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [focused, setFocused] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="contact" className="bg-dark relative overflow-hidden">
      {/* OFF+BRAND style: massive full-width heading that bleeds to edges */}
      <div className="border-t border-white/5 pt-20 md:pt-32 pb-16 px-6 md:px-16 lg:px-24" ref={ref}>

        {/* Section watermark */}
        <div className="absolute top-16 right-0 font-display text-[18vw] text-white/[0.02] leading-none select-none pointer-events-none pr-2">
          04
        </div>

        <motion.p
          className="section-label mb-8"
          initial={{ opacity: 0, x: -20 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          / Get In Touch
        </motion.p>

        {/* Giant heading — line-by-line, OFF+BRAND stacked style */}
        <div className="mb-16 md:mb-24">
          {["Let's Build", "Something"].map((line, i) => (
            <div key={i} className="overflow-hidden">
              <motion.h2
                className={`font-display uppercase leading-none tracking-tightest ${
                  i === 0
                    ? "text-white"
                    : "text-stroke"
                }`}
                style={{ fontSize: "clamp(3rem,9vw,9rem)" }}
                initial={{ y: "105%" }}
                animate={inView ? { y: "0%" } : {}}
                transition={{ delay: i * 0.15 + 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              >
                {line}{i === 1 && <span className="text-neon">.</span>}
              </motion.h2>
            </div>
          ))}
        </div>

        {/* Content grid */}
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">

          {/* Left: Form */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            {submitted ? (
              <div className="glass-card rounded-2xl p-12 text-center border-neon/20">
                <div className="w-14 h-14 rounded-full bg-neon/10 border border-neon/30 flex items-center justify-center text-neon mx-auto mb-6">
                  <Send size={20} />
                </div>
                <h3 className="font-display text-4xl text-white mb-2 uppercase tracking-tight">Sent!</h3>
                <p className="text-ash text-sm">I'll get back to you as soon as possible.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-0">
                {[
                  { id: "name", label: "Your Name", type: "text", placeholder: "e.g. Lando Norris" },
                  { id: "email", label: "Email Address", type: "email", placeholder: "you@example.com" },
                ].map(({ id, label, type, placeholder }) => (
                  /* OFF+BRAND: border-b only input fields */
                  <div key={id} className="border-b border-white/10 hover:border-neon/30 transition-colors duration-300 py-4">
                    <label htmlFor={id} className="section-label block mb-2">{label}</label>
                    <input
                      id={id}
                      type={type}
                      required
                      placeholder={placeholder}
                      onFocus={() => setFocused(id)}
                      onBlur={() => setFocused(null)}
                      className={`w-full bg-transparent text-white text-sm font-body 
                        placeholder-ash/30 outline-none transition-all duration-300 cursor-none py-1`}
                    />
                  </div>
                ))}

                <div className="border-b border-white/10 hover:border-neon/30 transition-colors duration-300 py-4">
                  <label htmlFor="message" className="section-label block mb-2">Message</label>
                  <textarea
                    id="message"
                    required
                    rows={4}
                    placeholder="Tell me about your project..."
                    onFocus={() => setFocused("message")}
                    onBlur={() => setFocused(null)}
                    className="w-full bg-transparent text-white text-sm font-body 
                      placeholder-ash/30 outline-none resize-none transition-all duration-300 cursor-none py-1"
                  />
                </div>

                {/* OFF+BRAND btn-w style submit */}
                <div className="pt-8">
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="group relative inline-flex items-center gap-3 px-8 py-4 
                      border border-neon/40 hover:border-neon rounded-full
                      font-mono text-xs text-white tracking-widest uppercase
                      overflow-hidden transition-colors duration-300 cursor-none"
                  >
                    <span className="relative z-10">Send Message</span>
                    <ArrowRight size={14} className="text-neon relative z-10 group-hover:translate-x-1 transition-transform" />
                    {/* Neon fill sweep */}
                    <span
                      className="absolute inset-0 bg-neon origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 -z-0"
                      style={{ transitionTimingFunction: "cubic-bezier(0.165,0.84,0.44,1)" }}
                    />
                    <span className="absolute inset-0 group-hover:text-dark" />
                  </motion.button>
                </div>
              </form>
            )}
          </motion.div>

          {/* Right: Info + socials */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.6, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-10"
          >
            <p className="text-ash text-sm leading-relaxed max-w-sm">
              I'm open to freelance projects, internship extensions, and full-time opportunities.
              If you have a project in mind or just want to connect — reach out.
            </p>

            {/* Socials — OFF+BRAND border-row style */}
            <div>
              {SOCIALS.map((social, i) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="group flex items-center justify-between py-4 border-b border-white/5 hover:border-neon/20 transition-colors duration-300"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-ash group-hover:text-neon transition-colors duration-300">{social.icon}</span>
                    <div>
                      <p className="text-white text-sm font-medium">{social.label}</p>
                      <p className="text-ash text-xs font-mono">{social.handle}</p>
                    </div>
                  </div>
                  <ArrowRight size={14} className="text-ash/30 group-hover:text-neon group-hover:translate-x-1 transition-all duration-300" />
                </a>
              ))}
            </div>

            {/* Availability — neon pill */}
            <div className="flex items-center gap-3 pt-2">
              <div className="w-2 h-2 rounded-full bg-neon animate-pulse" />
              <p className="font-mono text-xs text-neon tracking-wider">Currently Available for Work</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
