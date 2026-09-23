import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const LINKS = [
  { href: "/about",     label: "About"     },
  { href: "/projects",  label: "Projects"  },
  { href: "/contact",   label: "Contact"   },
];

function ThemeToggle({ dark, onToggle }) {
  return (
    <button
      onClick={onToggle}
      className="toggle-track"
      aria-label="Toggle dark mode"
      aria-pressed={dark}
    >
      <span className="toggle-thumb" />
    </button>
  );
}

export default function Navbar({ dark, onToggle }) {
  const [scrolled, setScrolled] = useState(false);
  const [hidden,   setHidden]   = useState(false);
  const { scrollY } = useScroll();
  const location = useLocation();
  let prev = 0;

  useMotionValueEvent(scrollY, "change", (y) => {
    setScrolled(y > 40);
    setHidden(y > prev && y > 120);
    prev = y;
  });

  return (
    <motion.header
      animate={{ y: hidden ? -100 : 0 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300
        bg-chalk dark:bg-void
        ${scrolled ? "border-b border-line-light dark:border-line-dark" : ""}`}
    >
      <div className="max-w-6xl mx-auto px-6 h-12 flex items-center justify-between">

        {/* Name */}
        <Link 
          to="/" 
          className="font-display text-xl tracking-tight text-ink dark:text-chalk
                     hover:text-neon dark:hover:text-neon transition-colors duration-200"
        >
          DARYL TUMANENG
        </Link>

        {/* Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {LINKS.map(({ href, label }) => {
            const isActive = location.pathname === href;
            return (
              <Link
                key={href}
                to={href}
                className={`mono-label transition-colors duration-200
                  ${isActive ? 'text-neon dark:text-neon' : 'hover:text-neon dark:hover:text-neon'}
                `}
              >
                {label}
              </Link>
            );
          })}
        </nav>

        {/* Toggle */}
        <ThemeToggle dark={dark} onToggle={onToggle} />
      </div>
    </motion.header>
  );
}
