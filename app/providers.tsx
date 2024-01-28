"use client";

import type { ReactNode } from "react";
import { ThemeProvider } from "next-themes";

export const CustomThemeProvider = ({ children }: { children: ReactNode }) => (
  <ThemeProvider enableSystem defaultTheme="system" attribute="class">
    {children}
  </ThemeProvider>
);
