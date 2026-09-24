import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const LINKS = [
  { href: "/",         label: "home"     },
  { href: "/about",    label: "about"    },
  { href: "/projects", label: "projects" },
  { href: "/contact",  label: "contact"  },
];

function ThemeToggle({ dark, onToggle }) {
  return (
    <motion.button
      onClick={onToggle}
      className="relative flex items-center w-10 h-5 bg-chalk/20 dark:bg-void/40 rounded-full border border-ink/10 dark:border-chalk/10 cursor-none"
      whileTap={{ scale: 0.9 }}
      aria-label="Toggle dark mode"
      data-hover="true"
    >
      <motion.div
        layout
        initial={false}
        animate={{ x: dark ? 18 : 0 }}
        transition={{ type: "spring", stiffness: 500, damping: 30, mass: 0.8 }}
        className="w-4 h-4 bg-ink dark:bg-neon rounded-full ml-0.5 shadow-sm"
      />
    </motion.button>
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
            className="block font-display font-medium text-5xl text-ink dark:text-chalk py-4 hover:text-ink dark:hover:text-neon transition-colors duration-200 lowercase"
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

  // Reveal navbar when hovering near the top of the screen
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (hidden && e.clientY < 60) {
        setHidden(false);
      }
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [hidden]);

  return (
    <>
      <motion.header
        animate={{ y: hidden ? -100 : 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        className="fixed top-6 left-1/2 z-50 transition-colors duration-300 w-[95%] max-w-5xl rounded-full"
        style={{ x: "-50%" }}
      >
        {/* The background materializes independently, expanding from the text's location */}
        <div className="absolute inset-0 rounded-full overflow-hidden nav-reveal-bg liquid-glass grain-overlay" style={{ transformOrigin: "10% 50%" }} />
        
        <div className="relative px-8 h-14 flex items-center justify-between z-10">

          {/* Name mark - ALWAYS visible for layout morphing */}
          <Link
            to="/"
            className="font-display font-medium text-xl tracking-tight text-ink dark:text-chalk
                       hover:text-ink dark:hover:text-neon transition-colors duration-200 lowercase block"
          >
            <motion.span layoutId="brand-name" transition={{ type: "spring", stiffness: 100, damping: 20 }} className="inline-block relative z-10">daryl tumaneng.</motion.span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8 lowercase nav-item">
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

          <div className="flex items-center gap-4 nav-item">
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
