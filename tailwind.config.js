/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: ["'Inter'", "Helvetica Neue", "Arial", "sans-serif"],
        mono: ["'JetBrains Mono'", "'Fira Code'", "monospace"],
      },
      colors: {
        // Light mode tokens
        ink: {
          DEFAULT: "#0A0A0A",
          50:  "#F5F5F5",
          100: "#E8E8E8",
          200: "#D0D0D0",
          300: "#A8A8A8",
          400: "#707070",
          500: "#404040",
          600: "#282828",
          700: "#1A1A1A",
          800: "#111111",
          900: "#0A0A0A",
        },
      },
      fontSize: {
        "2xs": ["0.625rem", { lineHeight: "1", letterSpacing: "0.1em" }],
      },
      letterSpacing: {
        tightest: "-0.04em",
        "wider-xl": "0.2em",
      },
      borderWidth: {
        px: "1px",
      },
      transitionTimingFunction: {
        "expo-out": "cubic-bezier(0.16,1,0.3,1)",
      },
    },
  },
  plugins: [],
};
