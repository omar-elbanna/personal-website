import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Warm paper background family
        bg: "#f5efe2",
        surface: "#fffdf8",
        border: "#e6ddca",
        muted: "#7c7566",
        fg: "#20304f",
        // Brand: navy for structure, red for pop
        navy: {
          DEFAULT: "#17325c",
          soft: "#3a568c",
        },
        red: {
          DEFAULT: "#d1402f",
          soft: "#e28275",
        },
        // Alias kept so existing utility classes resolve to navy
        accent: {
          DEFAULT: "#17325c",
          soft: "#3a568c",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      maxWidth: {
        content: "64rem",
      },
      boxShadow: {
        sticker: "0 8px 20px -8px rgba(23, 50, 92, 0.35)",
      },
    },
  },
  plugins: [],
};

export default config;
