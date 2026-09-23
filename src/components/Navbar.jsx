import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const NAV_LINKS = [
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  const [visible, setVisible] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  let lastY = 0;

  useMotionValueEvent(scrollY, "change", (y) => {
    setScrolled(y > 60);
    setVisible(y < 60 || y < lastY);
    lastY = y;
  });

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300
          ${scrolled ? "backdrop-blur-md bg-dark/80 border-b border-white/5" : ""}`}
        animate={{ y: visible ? 0 : -100 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="flex items-center justify-between px-6 md:px-16 lg:px-24 h-16">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2 group">
            <span className="font-display text-xl tracking-widest uppercase text-white group-hover:text-neon transition-colors duration-300">
              DCT
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-neon animate-pulse" />
          </a>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map(({ href, label }) => (
              <a
                key={href}
                href={href}
                className="font-mono text-xs text-ash hover:text-neon tracking-widest uppercase transition-colors duration-200 relative group"
              >
                {label}
                <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-neon group-hover:w-full transition-all duration-300" />
              </a>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-4">
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="px-5 py-2 rounded-full bg-neon text-dark text-xs font-bold tracking-widest uppercase hover:shadow-neon-sm transition-shadow duration-300"
            >
              Hire Me
            </motion.a>
          </div>

          {/* Mobile menu btn */}
          <button
            className="md:hidden text-white hover:text-neon transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <motion.div
        className="fixed inset-0 z-40 bg-dark/95 backdrop-blur-lg flex flex-col items-center justify-center gap-8 md:hidden"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: menuOpen ? 1 : 0, y: menuOpen ? 0 : -20, pointerEvents: menuOpen ? "auto" : "none" }}
        transition={{ duration: 0.3 }}
      >
        {NAV_LINKS.map(({ href, label }) => (
          <a
            key={href}
            href={href}
            onClick={() => setMenuOpen(false)}
            className="font-display text-5xl text-white hover:text-neon transition-colors duration-200 tracking-tight"
          >
            {label}
          </a>
        ))}
      </motion.div>
    </>
  );
}

