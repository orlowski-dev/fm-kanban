"use client";

import { HiSun, HiMoon } from "react-icons/hi";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";

const toggleVariants = {
  light: { x: "0rem" },
  dark: { x: "1.25rem" },
};

const ThemeToggler = () => {
  const { theme, setTheme } = useTheme();

  return (
    <div className="min-w-[180px] w-full px-4 py-2 rounded-md inline-flex items-center justify-center gap-3 bg-light-grey dark:bg-very-dark-grey transition-colors">
      <button
        className="text-lg text-medium-grey p-1"
        title="Set light theme"
        onClick={() => setTheme("light")}
      >
        <HiSun />
      </button>
      <div
        className="w-[2.5rem] h-[1.25rem] rounded-full bg-main-purple p-[0.1875rem] cursor-pointer"
        role="button"
        title="Toggle theme"
        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      >
        <motion.div
          animate={theme}
          variants={toggleVariants}
          className="w-[0.875rem] h-[0.875rem] bg-white rounded-full"
        ></motion.div>
      </div>
      <button
        className="text-lg text-medium-grey p-1"
        title="Set dark theme"
        onClick={() => setTheme("dark")}
      >
        <HiMoon />
      </button>
    </div>
  );
};

export default ThemeToggler;
