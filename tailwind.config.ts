import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./data/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        background: "#050505",
        foreground: "#f5f5f5",
        surface: "#0d0d0d",
        border: "#1b1b1b",
        muted: "#a3a3a3",
        accent: "#ef4444",
        "accent-dark": "#b91c1c"
      },
      boxShadow: {
        glow: "0 24px 80px rgba(239, 68, 68, 0.16)"
      },
      backgroundImage: {
        grid: "linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)"
      }
    }
  },
  plugins: []
};

export default config;
