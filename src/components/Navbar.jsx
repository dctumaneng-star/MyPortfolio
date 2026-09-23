import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useState } from "react";
import { ArrowRight } from "lucide-react";

const NAV_LINKS = [
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" },
];

/* OFF+BRAND style nav link with fill-track underline reveal */
function NavLink({ href, label }) {
  return (
    <a href={href} className="group relative flex items-center gap-1.5 py-1">
      {/* Text — stagger-text shadow trick from OFF+BRAND:
          duplicate text stacked via text-shadow that shifts on hover */}
      <span
        className="font-mono text-xs tracking-widest uppercase text-ash group-hover:text-white transition-colors duration-300"
        style={{ textShadow: "0px 1em 0px rgba(200,255,0,0.8)" }}
      >
        {label}
      </span>
      {/* Arrow icon — slides in from left */}
      <motion.span
        className="font-mono text-xs text-neon opacity-0 group-hover:opacity-100 transition-all duration-300"
        initial={{ x: -8 }}
        whileHover={{ x: 0 }}
      >
        →
      </motion.span>
      {/* Link track fill — OFF+BRAND signature bottom line */}
      <span className="absolute bottom-0 left-0 h-px w-full bg-white/10">
        <span
          className="absolute inset-0 bg-neon origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"
          style={{ transitionTimingFunction: "cubic-bezier(0.165,0.84,0.44,1)" }}
        />
      </span>
    </a>
  );
}

export default function Navbar() {
  const [visible, setVisible] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  let lastY = 0;

  useMotionValueEvent(scrollY, "change", (y) => {
    setScrolled(y > 60);
    setVisible(y < 80 || y < lastY);
    lastY = y;
  });

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500
          ${scrolled ? "bg-dark/85 backdrop-blur-md border-b border-white/5" : ""}`}
        animate={{ y: visible ? 0 : -100 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="flex items-center justify-between px-6 md:px-16 lg:px-24 h-16">

          {/* Brand */}
          <a href="#" className="group flex items-center gap-2.5">
            {/* OFF+BRAND style: logo text with stagger-text shadow trick */}
            <div className="overflow-hidden">
              <span
                className="font-display text-xl tracking-widest uppercase text-white group-hover:text-neon transition-colors duration-300 block"
                style={{ textShadow: "0px 1em 0px #C8FF00" }}
              >
                DCT
              </span>
            </div>
            {/* Plus mark — OFF+BRAND's "+BRAND" signature */}
            <span className="text-neon font-mono text-sm leading-none">+</span>
            <div className="overflow-hidden">
              <span
                className="font-mono text-[10px] tracking-widest text-ash/60 group-hover:text-neon/80 transition-colors duration-300 uppercase block"
              >
                dev
              </span>
            </div>
          </a>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-10">
            {NAV_LINKS.map(({ href, label }) => (
              <NavLink key={href} href={href} label={label} />
            ))}
          </nav>

          {/* CTA — OFF+BRAND btn-w style */}
          <div className="hidden md:flex items-center gap-4">
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="group relative flex items-center gap-2 px-5 py-2.5 rounded-full
                border border-neon/40 hover:border-neon bg-neon/0 hover:bg-neon/5
                text-white text-xs font-mono tracking-widest uppercase
                transition-all duration-300 overflow-hidden"
            >
              <span>Hire Me</span>
              <ArrowRight size={12} className="text-neon group-hover:translate-x-0.5 transition-transform" />
              {/* Neon fill sweep */}
              <span className="absolute inset-0 bg-neon origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 -z-10 rounded-full"
                style={{ transitionTimingFunction: "cubic-bezier(0.165,0.84,0.44,1)" }}
              />
            </motion.a>
          </div>

          {/* Mobile hamburger — OFF+BRAND 3 lines style */}
          <button
            className="md:hidden flex flex-col gap-[5px] p-2 group"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="menu"
          >
            <motion.span
              className="block w-5 h-px bg-white"
              animate={menuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3 }}
            />
            <motion.span
              className="block w-5 h-px bg-white"
              animate={menuOpen ? { scaleX: 0 } : { scaleX: 1 }}
              transition={{ duration: 0.3 }}
            />
            <motion.span
              className="block w-5 h-px bg-white"
              animate={menuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3 }}
            />
          </button>
        </div>
      </motion.header>

      {/* Mobile fullscreen menu — OFF+BRAND overlay style */}
      <AnimateMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}

function AnimateMenu({ open, onClose }) {
  return (
    <motion.div
      className="fixed inset-0 z-40 bg-dark flex flex-col px-8 pt-24 pb-12 md:hidden"
      initial={{ opacity: 0, x: "100%" }}
      animate={{ opacity: open ? 1 : 0, x: open ? "0%" : "100%" }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      style={{ pointerEvents: open ? "auto" : "none" }}
    >
      {/* Corner */}
      <div className="absolute top-8 right-8 w-5 h-5 border-t border-r border-neon/40" />

      <nav className="flex flex-col gap-2 flex-1 justify-center">
        {NAV_LINKS.map(({ href, label }, i) => (
          <motion.a
            key={href}
            href={href}
            onClick={onClose}
            className="group relative flex items-center justify-between py-4 border-b border-white/5"
            initial={{ x: 40, opacity: 0 }}
            animate={open ? { x: 0, opacity: 1 } : { x: 40, opacity: 0 }}
            transition={{ delay: i * 0.08 + 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="font-display text-5xl uppercase tracking-tight text-white group-hover:text-neon transition-colors duration-300">
              {label}
            </span>
            <ArrowRight size={20} className="text-ash group-hover:text-neon group-hover:translate-x-1 transition-all duration-300" />
          </motion.a>
        ))}
      </nav>

      <div className="font-mono text-xs text-ash/30 tracking-widest">
        DARYL CRUZ TUMANENG · MANILA PH
      </div>
    </motion.div>
  );
}
