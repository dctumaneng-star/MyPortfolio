/**
 * ThemeToggle — minimal slide switch
 * Props: dark (bool), onToggle (fn)
 */
export default function ThemeToggle({ dark, onToggle }) {
  return (
    <button
      onClick={onToggle}
      role="switch"
      aria-checked={dark}
      aria-label="Toggle dark mode"
      className="toggle-track focus:outline-none focus-visible:ring-1 focus-visible:ring-ink-400"
    >
      <span className="toggle-thumb" />
      <span className="sr-only">{dark ? "Switch to light mode" : "Switch to dark mode"}</span>
    </button>
  );
}

