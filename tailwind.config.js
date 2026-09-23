/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        neon: {
          DEFAULT: "#C8FF00",
          dim:     "#9BCC00",
          glow:    "rgba(200,255,0,0.15)",
        },
        void:  "#0A0A0A",
        chalk: "#F5F5F3",
        line: {
          light: "#E0E0E0",
          dark:  "#1E1E1E",
        },
        ink: {
          muted:   "#707070",
          DEFAULT: "#0A0A0A",
        },
      },
      fontFamily: {
        display: ["'Bebas Neue'", "sans-serif"],
        body:    ["'Inter'", "sans-serif"],
        mono:    ["'JetBrains Mono'", "monospace"],
      },
      fontSize: {
        "display-xl": ["clamp(5rem,14vw,12rem)",  { lineHeight: "0.9",  letterSpacing: "0.01em" }],
        "display-lg": ["clamp(3rem,8vw,7rem)",    { lineHeight: "0.92", letterSpacing: "0.02em" }],
        "display-md": ["clamp(2rem,5vw,4rem)",    { lineHeight: "0.94", letterSpacing: "0.02em" }],
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
