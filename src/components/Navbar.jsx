import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

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
      whileTap={{ scale: 0.95 }}
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
            className="block font-display font-medium text-5xl text-ink dark:text-chalk py-4 hover:text-neon dark:hover:text-neon transition-colors duration-200 lowercase cursor-none"
            data-hover="true"
          >
            {label}
          </Link>
        </motion.div>
      ))}
    </motion.div>
  );
}

export default function Navbar({ dark, onToggle, onReboot }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  const location = useLocation();
  const navigate = useNavigate();

  useMotionValueEvent(scrollY, "change", (y) => {
    setScrolled(y > 40);
  });

  return (
    <>
      <motion.header
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        className="fixed top-3 left-1/2 z-50 transition-colors duration-300 w-[95%] max-w-5xl rounded-full"
        style={{ x: "-50%" }}
      >
        {/* The background materializes independently, transitioning opacity */}
        <motion.div 
          layoutId="navbar-bg"
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
          className="absolute inset-0 rounded-full overflow-hidden liquid-glass grain-overlay border border-ink/10 dark:border-chalk/10" 
          style={{ borderRadius: 9999 }}
        />
        
        <div className="relative px-8 h-14 flex items-center justify-between z-10">

          {/* Name mark - Reboot Trigger */}
          <button
            onClick={() => {
              navigate("/");
              if (onReboot) onReboot();
            }}
            className="font-display font-medium text-xl tracking-tight text-ink dark:text-chalk
                       hover:text-neon dark:hover:text-neon transition-colors duration-200 lowercase block cursor-none"
            data-hover="true"
          >
            <motion.span 
              layoutId="brand-name" 
              transition={{ layout: { type: "spring", stiffness: 100, damping: 20 } }} 
              className="inline-flex whitespace-nowrap overflow-visible relative z-10"
            >
              {"daryl tumaneng.".split("").map((char, index) => (
                <motion.span
                  key={index}
                  className={char === " " ? "w-[0.25em]" : "inline-block"}
                >
                  {char}
                </motion.span>
              ))}
            </motion.span>
          </button>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8 lowercase">
            {LINKS.map(({ href, label }) => {
              const isActive = location.pathname === href;
              return (
                <Link
                  key={href}
                  to={href}
                  className={`nav-item mono-label transition-colors duration-200 cursor-none relative
                    ${isActive ? "text-neon opacity-100" : "text-ink dark:text-chalk opacity-60 hover:opacity-100 hover:text-neon dark:hover:text-neon"}`}
                  data-hover="true"
                >
                  {label}
                  {isActive && (
                    <motion.div 
                      layoutId="nav-indicator"
                      className="absolute -bottom-1 left-0 right-0 h-[1px] bg-neon"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-4">
            <div className="nav-item">
              <ThemeToggle dark={dark} onToggle={onToggle} />
            </div>

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
