import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
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
    <html lang="en">
      <body className={`${pjs.variable}`}>{children}</body>
    </html>
  );
}
