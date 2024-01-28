import ThemeToggler from "@/components/theme-toggler";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Design :: Kanban",
};

const DesignPage = () => {
  return (
    <main className="max-w-2xl mx-auto p-6 grid gap-6">
      <h1 className="text-hxl">Design</h1>
      <h2 className="text-hlg">Theme Toggler</h2>
      <div className="p-6 rounded-lg bg-white dark:bg-dark-grey transition-colors flex justify-center">
        <ThemeToggler />
      </div>
    </main>
  );
};

export default DesignPage;
