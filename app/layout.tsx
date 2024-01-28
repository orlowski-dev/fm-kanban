import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { CustomThemeProvider } from "./providers";
import "./globals.css";

const pjs = Plus_Jakarta_Sans({
  subsets: ["latin-ext"],
  weight: ["500", "700"],
  variable: "--pjs",
});

export const metadata: Metadata = {
  title: "Kanban",
  description: "Task management web app",
  icons: ["/brand/favicon.png"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${pjs.variable} bg-light-grey text-black dark:bg-very-dark-grey dark:text-white transition-colors`}
      >
        <CustomThemeProvider>{children}</CustomThemeProvider>
      </body>
    </html>
  );
}
