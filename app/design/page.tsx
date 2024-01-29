import type { Metadata } from "next";
import { Button, IconButton, LinkButton } from "@/components/button";
import { HiArrowLeft, HiArrowRight, HiCloudDownload } from "react-icons/hi";
import ThemeToggler from "@/components/theme-toggler";
import { FormControl } from "@/components/form-control";
import Input from "@/components/input";
import Textarea from "@/components/textarea";
import Checkbox from "@/components/checkbox";
import Select from "@/components/select";

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
      <div className="grid gap-2">
        <h2 className="text-hlg">Form Control</h2>
      </div>
      <h2 className="text-hlg">Input</h2>
      <div className="p-6 rounded-lg bg-white dark:bg-dark-grey transition-colors flex justify-center items-center flex-wrap gap-3">
        <Input />
      </div>
      <h2 className="text-hlg">Textarea</h2>
      <div className="p-6 rounded-lg bg-white dark:bg-dark-grey transition-colors flex justify-center items-center flex-wrap gap-3">
        <Textarea />
      </div>
      <h2 className="text-hlg">Checkbox</h2>
      <div className="p-6 rounded-lg bg-white dark:bg-dark-grey transition-colors grid justify-center items-center gap-3">
        <Checkbox label="Task 1" />
        <Checkbox label="Default checked" defaultChecked />
      </div>
      <h2 className="text-hlg">Select</h2>
      <div className="p-6 rounded-lg bg-white dark:bg-dark-grey transition-colors grid justify-center items-center gap-3">
        <Select
          options={[
            "Item",
            "Item",
            "Item",
            "Item",
            "Item",
            "Item",
            "Item",
            "Item",
          ]}
        />
      </div>
      <h2 className="text-hlg">FormControl</h2>
      <div className="p-6 rounded-lg bg-white dark:bg-dark-grey transition-colors flex justify-center items-center flex-wrap gap-3">
        <FormControl labelText="Form control" helpText="This is help text">
          <Input placeholder="Placeholder text" />
        </FormControl>
        <FormControl
          labelText="Form control - error state"
          helpText="This is help text"
          error
        >
          <Input />
        </FormControl>
        <FormControl labelText="Form control with textarea">
          <Textarea />
        </FormControl>
      </div>
    </main>
  );
};

export default DesignPage;
