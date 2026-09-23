import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const LINKS = [
  { href: "/",         label: "Home"     },
  { href: "/about",    label: "About"    },
  { href: "/projects", label: "Projects" },
  { href: "/contact",  label: "Contact"  },
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

function MobileMenu({ open, onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: "100%" }}
      animate={{ opacity: open ? 1 : 0, x: open ? "0%" : "100%" }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      style={{ pointerEvents: open ? "auto" : "none" }}
      className="fixed inset-0 z-40 bg-chalk dark:bg-void flex flex-col px-6 pt-20 pb-12 md:hidden"
    >
      {LINKS.map(({ href, label }, i) => (
        <motion.div
          key={href}
          initial={{ x: 30, opacity: 0 }}
          animate={open ? { x: 0, opacity: 1 } : {}}
          transition={{ delay: i * 0.07 + 0.1, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="border-b border-line-light dark:border-line-dark"
        >
          <Link
            to={href}
            onClick={onClose}
            className="block font-display text-5xl text-ink dark:text-chalk py-4 hover:text-neon dark:hover:text-neon transition-colors duration-200"
          >
            {label}
          </Link>
        </motion.div>
      ))}
    </motion.div>
  );
}

export default function Navbar({ dark, onToggle }) {
  const [scrolled, setScrolled] = useState(false);
  const [hidden,   setHidden]   = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  const location = useLocation();
  let prev = 0;

  useMotionValueEvent(scrollY, "change", (y) => {
    setScrolled(y > 40);
    setHidden(y > prev && y > 120 && !menuOpen);
    prev = y;
  });

  return (
    <>
      <motion.header
        initial={{ y: "-100%" }}
        animate={{ y: hidden ? "-100%" : "0%" }}
        transition={{ delay: 1.8, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300
          bg-chalk dark:bg-void
          ${scrolled || menuOpen ? "border-b border-line-light dark:border-line-dark" : ""}`}
      >
        <div className="max-w-6xl mx-auto px-6 h-12 flex items-center justify-between">

          {/* Name mark */}
          <Link
            to="/"
            className="font-display text-xl tracking-tight text-ink dark:text-chalk
                       hover:text-neon dark:hover:text-neon transition-colors duration-200"
          >
            DARYL TUMANENG
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {LINKS.map(({ href, label }) => {
              const isActive = location.pathname === href;
              return (
                <Link
                  key={href}
                  to={href}
                  className={`mono-label transition-colors duration-200 px-2 py-0.5 rounded-sm
                    ${isActive
                      ? "bg-neon text-ink dark:bg-transparent dark:text-neon"
                      : "hover:bg-neon hover:text-ink dark:hover:bg-transparent dark:hover:text-neon"}`}
                >
                  {label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-4">
            <ThemeToggle dark={dark} onToggle={onToggle} />

            {/* Mobile hamburger */}
            <button
              className="md:hidden flex flex-col gap-[5px] p-1"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="menu"
            >
              <motion.span
                className="block w-5 h-px bg-ink dark:bg-chalk"
                animate={menuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.3 }}
              />
              <motion.span
                className="block w-5 h-px bg-ink dark:bg-chalk"
                animate={menuOpen ? { scaleX: 0 } : { scaleX: 1 }}
                transition={{ duration: 0.3 }}
              />
              <motion.span
                className="block w-5 h-px bg-ink dark:bg-chalk"
                animate={menuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.3 }}
              />
            </button>
          </div>
        </div>
      </motion.header>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
