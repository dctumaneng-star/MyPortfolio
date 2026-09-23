/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // Core palette — LN4-inspired neon on dark
        neon: {
          DEFAULT: "#C8FF00",   // Fluorescent yellow-green (LN4 papaya)
          dim:    "#9BCC00",
          glow:   "#DEFF4D",
        },
        dark: {
          DEFAULT: "#0A0A0A",  // Pitch black
          100:    "#111111",
          200:    "#161616",
          300:    "#1E1E1E",
          400:    "#252525",
          500:    "#2E2E2E",
        },
        ash: {
          DEFAULT: "#8A8A8A",
          light:  "#C0C0C0",
          dark:   "#4A4A4A",
        },
      },
      fontFamily: {
        display: ["'Bebas Neue'", "Impact", "sans-serif"],
        body:    ["'Inter'", "system-ui", "sans-serif"],
        mono:    ["'JetBrains Mono'", "'Fira Code'", "monospace"],
      },
      fontSize: {
        "10xl": ["10rem",  { lineHeight: "0.9", letterSpacing: "-0.04em" }],
        "11xl": ["12rem",  { lineHeight: "0.85", letterSpacing: "-0.05em" }],
        "12xl": ["14rem",  { lineHeight: "0.8",  letterSpacing: "-0.06em" }],
        "fluid-hero": ["clamp(5rem,12vw,12rem)", { lineHeight: "0.9" }],
      },
      letterSpacing: {
        tightest: "-0.06em",
        widest2:  "0.3em",
      },
      backgroundImage: {
        "neon-gradient": "linear-gradient(135deg, #C8FF00 0%, #9BCC00 100%)",
        "dark-gradient": "linear-gradient(180deg, #0A0A0A 0%, #111111 100%)",
        "radial-neon":   "radial-gradient(ellipse at center, rgba(200,255,0,0.15) 0%, transparent 70%)",
        "noise":         "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E\")",
      },
      animation: {
        "ticker":       "ticker 20s linear infinite",
        "ticker-slow":  "ticker 40s linear infinite",
        "pulse-neon":   "pulseNeon 2s ease-in-out infinite",
        "spin-slow":    "spin 8s linear infinite",
        "float":        "float 6s ease-in-out infinite",
        "scanline":     "scanline 8s linear infinite",
      },
      keyframes: {
        ticker: {
          "0%":   { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        pulseNeon: {
          "0%, 100%": { boxShadow: "0 0 5px #C8FF00, 0 0 20px rgba(200,255,0,0.3)" },
          "50%":      { boxShadow: "0 0 20px #C8FF00, 0 0 60px rgba(200,255,0,0.6)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%":      { transform: "translateY(-20px)" },
        },
        scanline: {
          "0%":   { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100vh)" },
        },
      },
      boxShadow: {
        "neon-sm":  "0 0 5px #C8FF00, 0 0 15px rgba(200,255,0,0.3)",
        "neon-md":  "0 0 10px #C8FF00, 0 0 30px rgba(200,255,0,0.4)",
        "neon-lg":  "0 0 20px #C8FF00, 0 0 60px rgba(200,255,0,0.5)",
        "neon-xl":  "0 0 30px #C8FF00, 0 0 100px rgba(200,255,0,0.6)",
        "inner-neon": "inset 0 0 30px rgba(200,255,0,0.1)",
      },
      transitionTimingFunction: {
        "expo-out": "cubic-bezier(0.16,1,0.3,1)",
        "expo-in":  "cubic-bezier(0.7,0,0.84,0)",
        "spring":   "cubic-bezier(0.34,1.56,0.64,1)",
      },
    },
  },
  plugins: [],
};

