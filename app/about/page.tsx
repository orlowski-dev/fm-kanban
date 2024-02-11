import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About :: Kanban",
};

const AboutPage = () => {
  return (
    <main className="p-6 max-w-lg mx-auto grid gap-6">
      <h1 className="text-hxl">Project Kanban</h1>
      <article className="grid gap-3">
        <h2 className="text-hlg">About</h2>
        <p>
          This is my solution for Frontend Mentor Challenge build with Next.js,
          React.js, Tailwindcss and MongoDB.
        </p>
        <p>
          You can log in using this credentials: email: user@email.com password:
          zaq1@WSX
        </p>
      </article>
    </main>
  );
};

export default AboutPage;
