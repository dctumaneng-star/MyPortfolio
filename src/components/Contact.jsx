import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Send, Mail, GitBranch, Link2, MessageCircle, ArrowRight } from "lucide-react";

const SOCIALS = [
  { icon: <GitBranch size={18} />, label: "GitHub", handle: "@daryltumaneng", href: "#" },
  { icon: <Link2 size={18} />, label: "LinkedIn", handle: "Daryl Cruz Tumaneng", href: "#" },
  { icon: <Mail size={18} />, label: "Email", handle: "daryl@example.com", href: "mailto:daryl@example.com" },
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
    <section id="contact" className="py-32 px-6 md:px-16 lg:px-24 bg-dark-100 relative overflow-hidden">
      {/* Giant watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
        <span className="font-display text-[20vw] text-white/[0.015] leading-none select-none whitespace-nowrap">
          CONTACT
        </span>
      </div>

      <div className="max-w-6xl mx-auto relative z-10" ref={ref}>
        {/* Heading */}
        <div className="mb-20">
          <motion.p
            className="section-label mb-4"
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            / Get In Touch
          </motion.p>
          <div className="overflow-hidden">
            <motion.h2
              className="font-display text-[clamp(3rem,7vw,7rem)] leading-none tracking-tightest uppercase text-white"
              initial={{ y: "100%" }}
              animate={inView ? { y: "0%" } : {}}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            >
              Let's Build
              <br />
              <span className="text-neon">Something.</span>
            </motion.h2>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Left: Form */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            {submitted ? (
              <div className="glass-card rounded-2xl p-12 text-center">
                <div className="w-16 h-16 rounded-full bg-neon/10 border border-neon/30 flex items-center justify-center text-neon mx-auto mb-6 shadow-neon-sm">
                  <Send size={24} />
                </div>
                <h3 className="font-display text-3xl text-white mb-2">Message Sent!</h3>
                <p className="text-ash">I'll get back to you as soon as possible.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {[
                  { id: "name", label: "Your Name", type: "text", placeholder: "e.g. Lando Norris" },
                  { id: "email", label: "Email Address", type: "email", placeholder: "you@example.com" },
                ].map(({ id, label, type, placeholder }) => (
                  <div key={id} className="relative">
                    <label htmlFor={id} className="section-label block mb-2">{label}</label>
                    <input
                      id={id}
                      type={type}
                      required
                      placeholder={placeholder}
                      onFocus={() => setFocused(id)}
                      onBlur={() => setFocused(null)}
                      className={`w-full bg-dark-300 border rounded-xl px-5 py-4 text-white text-sm font-body 
                        placeholder-ash/40 outline-none transition-all duration-300 cursor-none
                        ${focused === id ? "border-neon shadow-neon-sm" : "border-white/10"}`}
                    />
                  </div>
                ))}

                <div className="relative">
                  <label htmlFor="message" className="section-label block mb-2">Message</label>
                  <textarea
                    id="message"
                    required
                    rows={5}
                    placeholder="Tell me about your project..."
                    onFocus={() => setFocused("message")}
                    onBlur={() => setFocused(null)}
                    className={`w-full bg-dark-300 border rounded-xl px-5 py-4 text-white text-sm font-body 
                      placeholder-ash/40 outline-none resize-none transition-all duration-300 cursor-none
                      ${focused === "message" ? "border-neon shadow-neon-sm" : "border-white/10"}`}
                  />
                </div>

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full flex items-center justify-center gap-3 py-4 rounded-xl
                    bg-neon text-dark font-bold text-sm tracking-wider uppercase
                    hover:shadow-neon-md transition-shadow duration-300 cursor-none"
                >
                  Send Message <ArrowRight size={16} />
                </motion.button>
              </form>
            )}
          </motion.div>

          {/* Right: Socials + info */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.5, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-8"
          >
            <div>
              <p className="text-ash leading-relaxed text-sm max-w-sm">
                I'm currently open to freelance projects, internship extensions, and full-time opportunities.
                If you have a project in mind or just want to connect — don't hesitate to reach out.
              </p>
            </div>

            <div className="space-y-4">
              {SOCIALS.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="group flex items-center gap-4 p-4 glass-card rounded-xl hover:border-neon/30 transition-all duration-300"
                >
                  <div className="w-10 h-10 rounded-lg bg-dark-400 flex items-center justify-center text-ash group-hover:text-neon group-hover:bg-neon/10 transition-all duration-300">
                    {social.icon}
                  </div>
                  <div className="flex-1">
                    <p className="text-white text-sm font-medium">{social.label}</p>
                    <p className="text-ash text-xs font-mono">{social.handle}</p>
                  </div>
                  <ArrowRight size={14} className="text-ash group-hover:text-neon group-hover:translate-x-1 transition-all duration-300" />
                </a>
              ))}
            </div>

            {/* Availability badge */}
            <div className="glass-card rounded-xl p-5 border border-neon/20">
              <div className="flex items-center gap-3 mb-2">
                <span className="w-2 h-2 rounded-full bg-neon animate-pulse" />
                <p className="text-neon text-sm font-semibold">Currently Available</p>
              </div>
              <p className="text-ash text-xs leading-relaxed">
                Open to full-stack roles, internship opportunities, and freelance web projects.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
