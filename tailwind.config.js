/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        neon: {
          DEFAULT: "#00E5C0", // Petronas Green
          dim:     "#00B395",
          glow:    "rgba(0,229,192,0.15)",
        },
        void:  "#0B0C10", // Obsidian Black
        chalk: "#FFFFFF", // Stark White
        line: {
          light: "#E2E4E6", // Slate / Silver
          dark:  "#1F2229",
        },
        ink: {
          muted:   "#6E737F",
          DEFAULT: "#11141A", // Dark graphite
        },
      },
      fontFamily: {
        display: ["'Inter'", "sans-serif"],
        body:    ["'Inter'", "sans-serif"],
        mono:    ["'JetBrains Mono'", "monospace"],
      },
      fontSize: {
        "display-xl": ["clamp(3.5rem,9vw,8rem)",  { lineHeight: "0.95", letterSpacing: "-0.04em" }],
        "display-lg": ["clamp(2.5rem,7vw,6rem)",  { lineHeight: "0.95", letterSpacing: "-0.03em" }],
        "display-md": ["clamp(1.5rem,4vw,4rem)",  { lineHeight: "0.95", letterSpacing: "-0.02em" }],
        "label":      ["0.6rem",                  { lineHeight: "1",    letterSpacing: "0.2em"   }],
      },
      transitionTimingFunction: {
        "expo":   "cubic-bezier(0.16,1,0.3,1)",
        "cinema": "cubic-bezier(0.77,0,0.175,1)",
      },
      keyframes: {
        ticker: {
          "0%":   { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "pulse-dot": {
          "0%,100%": { opacity: 1 },
          "50%":     { opacity: 0.3 },
        },
      },
      animation: {
        ticker:      "ticker 30s linear infinite",
        "pulse-dot": "pulse-dot 2s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
