import { useEffect, useState } from "react";

function LiveTime() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("en-PH", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
          timeZone: "Asia/Manila",
        }) + " PHT"
      );
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <span className="font-mono text-2xs text-ink-400 dark:text-ink-500 tabular-nums">
      {time}
    </span>
  );
}

/**
 * Baseline — persistent docked footer.
 * Houses: availability status · live clock · social links.
 * Grounded by a single top hairline (no other decoration).
 */
export default function Baseline() {
  return (
    <footer
      className="fixed bottom-0 left-0 right-0 z-50
                 bg-white dark:bg-ink-900
                 border-t border-ink-100 dark:border-ink-800
                 transition-colors duration-300"
    >
      <div className="max-w-5xl mx-auto px-6 h-12 flex items-center justify-between gap-4">

        {/* Status */}
        <div className="flex items-center gap-2">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-ink-400 dark:bg-ink-500 animate-pulse" />
          <span className="font-mono text-2xs text-ink-400 dark:text-ink-500 tracking-wider-xl uppercase hidden sm:inline">
            Available
          </span>
        </div>

        {/* Live clock — center */}
        <LiveTime />

        {/* Social links */}
        <nav className="flex items-center gap-5">
          <a
            href="https://linkedin.com/in/daryl-tumaneng-a594a1196"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-2xs text-ink-400 dark:text-ink-500 hover:text-ink-900 dark:hover:text-ink-100 transition-colors duration-200 tracking-wider-xl uppercase"
          >
            LinkedIn
          </a>
          <a
            href="https://github.com/daryltumaneng"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-2xs text-ink-400 dark:text-ink-500 hover:text-ink-900 dark:hover:text-ink-100 transition-colors duration-200 tracking-wider-xl uppercase"
          >
            GitHub
          </a>
        </nav>

      </div>
    </footer>
  );
}
