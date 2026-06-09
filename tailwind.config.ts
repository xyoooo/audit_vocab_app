import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#1f2933",
        paper: "#f7f8fb",
        line: "#dde3ec",
        brand: "#0f766e",
        accent: "#2563eb",
        good: "#16803c",
        bad: "#b42318"
      },
      boxShadow: {
        soft: "0 14px 40px rgba(31, 41, 51, 0.08)"
      }
    }
  },
  plugins: []
};

export default config;
