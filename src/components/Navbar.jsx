import { motion } from "framer-motion";
import ThemeToggle from "./ThemeToggle";

const NAV = [
  { href: "#about",      label: "About" },
  { href: "#work",       label: "Work" },
  { href: "#projects",   label: "Projects" },
  { href: "#skills",     label: "Skills" },
  { href: "#education",  label: "Education" },
];

export default function Navbar({ dark, onToggle }) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-ink-900 border-b border-ink-100 dark:border-ink-800 transition-colors duration-300">
      <div className="max-w-5xl mx-auto px-6 h-12 flex items-center justify-between">

        {/* Name mark */}
        <a
          href="#"
          className="font-sans font-semibold text-sm tracking-tighter text-ink-900 dark:text-ink-50 hover:opacity-60 transition-opacity duration-200"
        >
          DARYL TUMANENG.
        </a>

        {/* Nav — desktop */}
        <nav className="hidden md:flex items-center gap-8">
          {NAV.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              className="label hover:text-ink-900 dark:hover:text-ink-100 transition-colors duration-200"
            >
              {label}
            </a>
          ))}
        </nav>

        {/* Toggle */}
        <ThemeToggle dark={dark} onToggle={onToggle} />
      </div>
    </header>
  );
}
