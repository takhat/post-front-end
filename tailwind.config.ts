import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "dark-grey": "#0a0a23",
        "light-grey": "#f5f6f7",
        white: "#ffffff",
        black: "#000",
      },
      spacing: {
        "10": "10px",
        "1.3": "1.3rem",
        "1.2": "1.2rem",
      },
      borderRadius: {
        "15": "15px",
      },
      fontSize: {
        xl: "1.5rem", // Adjust if necessary
        lg: "1.2rem",
        base: "1.3rem",
      },
      screens: {
        md: "768px",
      },
    },
  },
  plugins: [],
};

export default config;
