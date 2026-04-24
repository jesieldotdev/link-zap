import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        zap: {
          50:  "#e8f5ee",
          100: "#d0eedd",
          200: "#a1ddbb",
          300: "#72cc99",
          400: "#43bc77",
          500: "#25D366",
          600: "#1da855",
          700: "#128C7E",
          800: "#075E54",
          900: "#044039",
        },
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      animation: {
        "fade-up":   "fadeUp 0.3s ease-out",
        "fade-in":   "fadeIn 0.2s ease-out",
        "scale-in":  "scaleIn 0.2s ease-out",
        "pulse-zap": "pulseZap 2s cubic-bezier(0.4,0,0.6,1) infinite",
        "slide-down":"slideDown 0.3s ease-out",
      },
      keyframes: {
        fadeUp: {
          "0%":   { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%":   { opacity: "0" },
          "100%": { opacity: "1" },
        },
        scaleIn: {
          "0%":   { opacity: "0", transform: "scale(0.95)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        pulseZap: {
          "0%, 100%": { opacity: "1" },
          "50%":      { opacity: "0.5" },
        },
        slideDown: {
          "0%":   { opacity: "0", transform: "translateY(-8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      boxShadow: {
        "card": "0 1px 3px 0 rgba(0,0,0,0.08), 0 4px 16px 0 rgba(0,0,0,0.06)",
        "card-hover": "0 4px 12px 0 rgba(0,0,0,0.12), 0 8px 32px 0 rgba(0,0,0,0.08)",
        "zap":  "0 4px 24px 0 rgba(37,211,102,0.25)",
      },
    },
  },
  plugins: [],
};

export default config;
