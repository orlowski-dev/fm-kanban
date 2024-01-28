import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      black: "#000112",
      "very-dark-grey": "#20212C",
      "dark-grey": "#2B2C37",
      "lines-dark": "#3E3F4E",
      "medium-grey": "#828FA3",
      "lines-light": "#E4EBFA",
      "light-grey": "#F4F7FD",
      white: "#ffffff",
      "main-purple": "#635FC7",
      "main-purple-hover": "#A8A4FF",
      red: "#EA5555",
      "red-hover": "#FF9898",
      "secondary-light": "#EFEFF9",
      "secondary-light-hover": "#D8D7F1",
      "secodnary-dark": "#3E3F4E",
      "secodnary-dark-hover": "#5E5F75",
    },
    extend: {
      fontSize: {
        hxl: [
          "1.625rem",
          {
            lineHeight: "2rem",
            fontWeight: 700,
          },
        ],
        hlg: [
          "1.25rem",
          {
            lineHeight: "1.5625rem",
            fontWeight: 700,
          },
        ],
        hmd: [
          "1.0625rem",
          {
            lineHeight: "1.3125rem",
            fontWeight: 700,
          },
        ],
        hsm: [
          "0.875rem",
          {
            lineHeight: "1.0625rem",
            fontWeight: 700,
          },
        ],
        body: [
          "0.9375rem",
          {
            lineHeight: "1.5625rem",
            fontWeight: 500,
          },
        ],
        bodysm: [
          "0.875rem",
          {
            lineHeight: "1.0625rem",
            fontWeight: 700,
          },
        ],
      },
    },
  },
  plugins: [],
  darkMode: "class",
};
export default config;
