import type { Metadata } from "next";
import { Button, IconButton, LinkButton } from "@/components/button";
import { HiArrowLeft, HiArrowRight, HiCloudDownload } from "react-icons/hi";
import ThemeToggler from "@/components/theme-toggler";

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
      <div className="grid gap-2">
        <h2 className="text-hlg">Button, IconButton, LinkButton</h2>
        <h3 className="text-hmd">Sizes</h3>
      </div>
      <div className="p-6 rounded-lg bg-white dark:bg-dark-grey transition-colors flex justify-center items-center flex-wrap gap-3">
        <Button size="sm">Small</Button>
        <Button size="md">Medium</Button>
        <Button size="lg">Large</Button>
      </div>
      <h3 className="text-hmd">Variants</h3>
      <div className="p-6 rounded-lg bg-white dark:bg-dark-grey transition-colors flex justify-center items-center flex-wrap gap-3">
        <Button variant="primary">Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="destructive">Destructive</Button>
        <Button variant="ghost">Ghost</Button>
      </div>
      <h3 className="text-hmd">Start icon, end icon, loading</h3>
      <div className="p-6 rounded-lg bg-white dark:bg-dark-grey transition-colors flex justify-center items-center flex-wrap gap-3">
        <Button startIcon={<HiArrowLeft />}>Start icon</Button>
        <Button endIcon={<HiArrowRight />}>End icon</Button>
        <Button loading>Loading</Button>
      </div>
      <h3 className="text-hmd">LinkButton</h3>
      <div className="p-6 rounded-lg bg-white dark:bg-dark-grey transition-colors flex justify-center items-center flex-wrap gap-3">
        <LinkButton href="/design" variant="primary">
          Primary
        </LinkButton>
        <LinkButton href="/design" variant="secondary">
          Secondary
        </LinkButton>
        <LinkButton href="/design" variant="destructive">
          Destructive
        </LinkButton>
        <LinkButton href="/design" variant="ghost">
          Ghost
        </LinkButton>
      </div>
      <h3 className="text-hmd">IconButton</h3>
      <div className="p-6 rounded-lg bg-white dark:bg-dark-grey transition-colors flex justify-center items-center flex-wrap gap-3">
        <IconButton title="Test download" size="sm">
          <HiCloudDownload />
        </IconButton>
        <IconButton title="Test download" size="md">
          <HiCloudDownload />
        </IconButton>
        <IconButton title="Test download" size="lg">
          <HiCloudDownload />
        </IconButton>
        <IconButton title="Test download" size="lg" loading>
          <HiCloudDownload />
        </IconButton>
        <IconButton title="Test download" size="md" loading>
          <HiCloudDownload />
        </IconButton>
        <IconButton title="Test download" size="sm" loading>
          <HiCloudDownload />
        </IconButton>
      </div>
    </main>
  );
};

export default DesignPage;